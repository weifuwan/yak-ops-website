package io.yak.website.docs;

import java.util.List;

/** API contracts for authenticated documentation delivery. */
public final class DocsModels {

    private DocsModels() {}

    public record NavigationResponse(
            String defaultSlug,
            List<NavigationSection> sections) {}

    public record NavigationSection(
            String title,
            List<NavigationItem> items) {}

    public record NavigationItem(
            String slug,
            String title,
            String description) {}

    public record DocumentResponse(
            String slug,
            String title,
            String section,
            String markdown,
            NavigationItem previous,
            NavigationItem next) {}

    public record SearchResponse(
            String query,
            List<SearchHit> hits) {}

    public record SearchHit(
            String slug,
            String title,
            String section,
            String snippet) {}
}
