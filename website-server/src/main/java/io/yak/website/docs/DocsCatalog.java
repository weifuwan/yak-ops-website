package io.yak.website.docs;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.yak.website.docs.DocsModels.DocumentResponse;
import io.yak.website.docs.DocsModels.NavigationItem;
import io.yak.website.docs.DocsModels.NavigationResponse;
import io.yak.website.docs.DocsModels.NavigationSection;
import io.yak.website.docs.DocsModels.SearchHit;
import io.yak.website.docs.DocsModels.SearchResponse;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.regex.Pattern;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

/**
 * Immutable documentation catalog loaded from the backend classpath.
 *
 * <p>Only slugs declared in navigation.json are addressable at runtime. Request
 * parameters are never converted directly to filesystem or classpath paths.</p>
 */
@Component
public class DocsCatalog {

    private static final String DOCS_ROOT = "docs/";
    private static final int SEARCH_RESULT_LIMIT = 12;
    private static final Pattern SAFE_SLUG =
            Pattern.compile("^[a-z0-9][a-z0-9/_-]*$");
    private static final Pattern MARKDOWN_LINK =
            Pattern.compile("!?\\[([^\\]]*)]\\([^)]*\\)");
    private static final Pattern MARKDOWN_MARKERS =
            Pattern.compile("[#>*_~`|]");

    private final NavigationResponse navigation;
    private final Map<String, DocEntry> docsBySlug;
    private final List<DocEntry> orderedDocs;
    private final Map<String, Integer> positionBySlug;

    public DocsCatalog(ObjectMapper objectMapper) {
        NavigationResponse source = readNavigation(objectMapper);
        CatalogState state = buildCatalog(source);
        this.navigation = state.navigation();
        this.docsBySlug = state.docsBySlug();
        this.orderedDocs = state.orderedDocs();
        this.positionBySlug = state.positionBySlug();
    }

    public NavigationResponse navigation() {
        return navigation;
    }

    public Optional<DocumentResponse> document(String slug) {
        if (!StringUtils.hasText(slug)) {
            return Optional.empty();
        }
        DocEntry entry = docsBySlug.get(slug.trim());
        if (entry == null) {
            return Optional.empty();
        }

        Integer position = positionBySlug.get(entry.item().slug());
        NavigationItem previous = position != null && position > 0
                ? orderedDocs.get(position - 1).item()
                : null;
        NavigationItem next = position != null && position + 1 < orderedDocs.size()
                ? orderedDocs.get(position + 1).item()
                : null;

        return Optional.of(new DocumentResponse(
                entry.item().slug(),
                entry.item().title(),
                entry.section(),
                entry.markdown(),
                previous,
                next));
    }

    public SearchResponse search(String rawQuery) {
        String query = rawQuery == null ? "" : rawQuery.trim();
        if (query.isEmpty()) {
            return new SearchResponse("", List.of());
        }

        String normalizedQuery = query.toLowerCase(Locale.ROOT);
        List<ScoredHit> scored = new ArrayList<>();
        for (DocEntry entry : orderedDocs) {
            int score = score(entry, normalizedQuery);
            if (score <= 0) {
                continue;
            }
            scored.add(new ScoredHit(
                    score,
                    new SearchHit(
                            entry.item().slug(),
                            entry.item().title(),
                            entry.section(),
                            snippet(entry.plainText(), normalizedQuery))));
        }

        scored.sort((left, right) -> Integer.compare(right.score(), left.score()));
        List<SearchHit> hits = scored.stream()
                .limit(SEARCH_RESULT_LIMIT)
                .map(ScoredHit::hit)
                .toList();
        return new SearchResponse(query, hits);
    }

    private NavigationResponse readNavigation(ObjectMapper objectMapper) {
        ClassPathResource resource = new ClassPathResource(DOCS_ROOT + "navigation.json");
        if (!resource.exists()) {
            throw new IllegalStateException("Missing docs navigation.json");
        }
        try (InputStream input = resource.getInputStream()) {
            return objectMapper.readValue(input, NavigationResponse.class);
        } catch (IOException exception) {
            throw new IllegalStateException("Failed to read docs navigation", exception);
        }
    }

    private CatalogState buildCatalog(NavigationResponse source) {
        if (source == null || !StringUtils.hasText(source.defaultSlug())) {
            throw new IllegalStateException("Docs defaultSlug must not be blank");
        }
        if (source.sections() == null || source.sections().isEmpty()) {
            throw new IllegalStateException("Docs sections must not be empty");
        }

        Set<String> seenSlugs = new HashSet<>();
        List<NavigationSection> sections = new ArrayList<>();
        Map<String, DocEntry> docs = new LinkedHashMap<>();
        List<DocEntry> ordered = new ArrayList<>();
        Map<String, Integer> positions = new HashMap<>();

        for (NavigationSection section : source.sections()) {
            if (section == null || !StringUtils.hasText(section.title())) {
                throw new IllegalStateException("Docs section title must not be blank");
            }
            if (section.items() == null || section.items().isEmpty()) {
                throw new IllegalStateException(
                        "Docs section must contain items: " + section.title());
            }

            List<NavigationItem> items = new ArrayList<>();
            for (NavigationItem item : section.items()) {
                validateItem(item, seenSlugs);
                String markdown = readMarkdown(item.slug());
                DocEntry entry = new DocEntry(
                        normalizeItem(item),
                        section.title().trim(),
                        markdown,
                        toPlainText(markdown));
                positions.put(entry.item().slug(), ordered.size());
                ordered.add(entry);
                docs.put(entry.item().slug(), entry);
                items.add(entry.item());
            }
            sections.add(new NavigationSection(section.title().trim(), List.copyOf(items)));
        }

        String defaultSlug = source.defaultSlug().trim();
        if (!docs.containsKey(defaultSlug)) {
            throw new IllegalStateException(
                    "Docs defaultSlug is not declared in navigation: " + defaultSlug);
        }

        return new CatalogState(
                new NavigationResponse(defaultSlug, List.copyOf(sections)),
                Map.copyOf(docs),
                List.copyOf(ordered),
                Map.copyOf(positions));
    }

    private void validateItem(NavigationItem item, Set<String> seenSlugs) {
        if (item == null
                || !StringUtils.hasText(item.slug())
                || !StringUtils.hasText(item.title())) {
            throw new IllegalStateException("Docs item slug/title must not be blank");
        }
        String slug = item.slug().trim();
        if (!SAFE_SLUG.matcher(slug).matches()
                || slug.contains("..")
                || slug.contains("//")
                || slug.endsWith("/")) {
            throw new IllegalStateException("Unsafe docs slug: " + slug);
        }
        if (!seenSlugs.add(slug)) {
            throw new IllegalStateException("Duplicate docs slug: " + slug);
        }
    }

    private NavigationItem normalizeItem(NavigationItem item) {
        String description = item.description() == null ? "" : item.description().trim();
        return new NavigationItem(
                item.slug().trim(),
                item.title().trim(),
                description);
    }

    private String readMarkdown(String slug) {
        ClassPathResource resource = new ClassPathResource(DOCS_ROOT + slug + ".md");
        if (!resource.exists()) {
            throw new IllegalStateException(
                    "Docs navigation references a missing document: " + slug);
        }
        try (InputStream input = resource.getInputStream()) {
            return new String(input.readAllBytes(), StandardCharsets.UTF_8);
        } catch (IOException exception) {
            throw new IllegalStateException("Failed to read document: " + slug, exception);
        }
    }

    private int score(DocEntry entry, String query) {
        String title = entry.item().title().toLowerCase(Locale.ROOT);
        String section = entry.section().toLowerCase(Locale.ROOT);
        String text = entry.searchText();
        int score = 0;
        if (title.equals(query)) {
            score += 160;
        } else if (title.contains(query)) {
            score += 100;
        }
        if (section.contains(query)) {
            score += 35;
        }
        int occurrences = countOccurrences(text, query);
        if (occurrences > 0) {
            score += 12 + Math.min(occurrences, 16);
        }
        return score;
    }

    private int countOccurrences(String text, String query) {
        int count = 0;
        int from = 0;
        while (from < text.length()) {
            int index = text.indexOf(query, from);
            if (index < 0) {
                break;
            }
            count++;
            from = index + Math.max(1, query.length());
        }
        return count;
    }

    private String snippet(String plainText, String normalizedQuery) {
        String normalizedText = plainText.toLowerCase(Locale.ROOT);
        int match = normalizedText.indexOf(normalizedQuery);
        if (match < 0) {
            return plainText.length() <= 140
                    ? plainText
                    : plainText.substring(0, 140).trim() + "…";
        }
        int start = Math.max(0, match - 42);
        int end = Math.min(
                plainText.length(),
                match + normalizedQuery.length() + 88);
        String prefix = start > 0 ? "…" : "";
        String suffix = end < plainText.length() ? "…" : "";
        return prefix + plainText.substring(start, end).trim() + suffix;
    }

    private String toPlainText(String markdown) {
        String text = MARKDOWN_LINK.matcher(markdown).replaceAll("$1");
        text = text.replaceAll("(?m)^\\s*```[a-zA-Z0-9_-]*\\s*$", " ");
        text = text.replace("```", " ");
        text = MARKDOWN_MARKERS.matcher(text).replaceAll(" ");
        return text.replaceAll("\\s+", " ").trim();
    }

    private record DocEntry(
            NavigationItem item,
            String section,
            String markdown,
            String plainText) {

        String searchText() {
            return plainText.toLowerCase(Locale.ROOT);
        }
    }

    private record ScoredHit(int score, SearchHit hit) {}

    private record CatalogState(
            NavigationResponse navigation,
            Map<String, DocEntry> docsBySlug,
            List<DocEntry> orderedDocs,
            Map<String, Integer> positionBySlug) {}
}
