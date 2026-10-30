package io.yak.website.docs;

import io.yak.website.account.domain.WebsiteSessionRegistry;
import io.yak.website.account.domain.WebsiteUser;
import io.yak.website.common.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.regex.Pattern;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Per-user documentation history. User identity comes exclusively from the website's
 * HttpOnly login session; public search never requires a session.
 */
@RestController
@RequestMapping("/api/v1/docs/search-history")
public class DocsSearchHistoryController {

    private static final int MAX_QUERY_LENGTH = 80;
    private static final int MAX_SLUG_LENGTH = 255;
    private static final int RETENTION_DAYS = 90;
    private static final Pattern ANCHOR = Pattern.compile("^[a-zA-Z0-9_-]{1,128}$");

    private final WebsiteSessionRegistry sessions;
    private final DocsSearchHistoryMapper historyMapper;
    private final DocsCatalog catalog;

    public DocsSearchHistoryController(
            WebsiteSessionRegistry sessions,
            DocsSearchHistoryMapper historyMapper,
            DocsCatalog catalog) {
        this.sessions = sessions;
        this.historyMapper = historyMapper;
        this.catalog = catalog;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<HistoryItem>>> recent(HttpServletRequest request) {
        Optional<WebsiteUser> user = sessions.currentUser(request);
        if (user.isEmpty()) {
            return unauthorized();
        }
        List<HistoryItem> items = historyMapper.recent(
                        user.get().getId(), LocalDateTime.now().minusDays(RETENTION_DAYS))
                .stream()
                .filter(item -> item.getDocumentSlug() == null
                        || catalog.document(item.getDocumentSlug()).isPresent())
                .map(HistoryItem::new)
                .toList();
        return ok(items);
    }

    @PostMapping
    @Transactional
    public ResponseEntity<ApiResponse<HistoryItem>> save(
            @RequestBody SaveRequest body, HttpServletRequest request) {
        Optional<WebsiteUser> user = sessions.currentUser(request);
        if (user.isEmpty()) {
            return unauthorized();
        }
        if (body == null) {
            return invalid("Missing history entry");
        }
        String query = body.getSearchQuery() == null ? "" : body.getSearchQuery().trim();
        String slug = StringUtils.hasText(body.getDocumentSlug()) ? body.getDocumentSlug().trim() : null;
        String anchor = StringUtils.hasText(body.getAnchor()) ? body.getAnchor().trim() : null;

        if (query.length() > MAX_QUERY_LENGTH || (slug == null && query.isEmpty())) {
            return invalid("Search query must contain 1–80 characters when no document is selected");
        }
        if (slug != null && (slug.length() > MAX_SLUG_LENGTH || catalog.document(slug).isEmpty())) {
            return invalid("Unknown documentation page");
        }
        if (anchor != null && (slug == null || !ANCHOR.matcher(anchor).matches())) {
            return invalid("Invalid document anchor");
        }

        String key = slug == null ? "query:" + query.toLowerCase(Locale.ROOT) : "doc:" + slug;
        LocalDateTime now = LocalDateTime.now();
        historyMapper.pruneExpired(now.minusDays(RETENTION_DAYS));
        historyMapper.save(user.get().getId(), key, query, slug, anchor, now);

        HistoryItem item = new HistoryItem(query, slug, anchor, now);
        return ok(item);
    }

    @DeleteMapping
    @Transactional
    public ResponseEntity<ApiResponse<String>> clear(HttpServletRequest request) {
        Optional<WebsiteUser> user = sessions.currentUser(request);
        if (user.isEmpty()) {
            return unauthorized();
        }
        historyMapper.clear(user.get().getId());
        return ok("History cleared");
    }

    private <T> ResponseEntity<ApiResponse<T>> ok(T data) {
        return ResponseEntity.ok()
                .cacheControl(CacheControl.noStore())
                .body(ApiResponse.success(data));
    }

    private <T> ResponseEntity<ApiResponse<T>> unauthorized() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .cacheControl(CacheControl.noStore())
                .body(ApiResponse.fail(HttpStatus.UNAUTHORIZED.value(), "Login required"));
    }

    private <T> ResponseEntity<ApiResponse<T>> invalid(String message) {
        return ResponseEntity.badRequest()
                .cacheControl(CacheControl.noStore())
                .body(ApiResponse.fail(HttpStatus.BAD_REQUEST.value(), message));
    }

    /** Only information needed to render the user's history is exposed. */
    public static class HistoryItem {
        private String searchQuery;
        private String documentSlug;
        private String anchor;
        private LocalDateTime updatedAt;

        public HistoryItem() {}

        public HistoryItem(DocsSearchHistory item) {
            this(item.getSearchQuery(), item.getDocumentSlug(), item.getAnchor(), item.getUpdatedAt());
        }

        public HistoryItem(String searchQuery, String documentSlug, String anchor, LocalDateTime updatedAt) {
            this.searchQuery = searchQuery;
            this.documentSlug = documentSlug;
            this.anchor = anchor;
            this.updatedAt = updatedAt;
        }

        public String getSearchQuery() { return searchQuery; }
        public String getDocumentSlug() { return documentSlug; }
        public String getAnchor() { return anchor; }
        public LocalDateTime getUpdatedAt() { return updatedAt; }
    }

    public static class SaveRequest {
        private String searchQuery;
        private String documentSlug;
        private String anchor;

        public String getSearchQuery() { return searchQuery; }
        public void setSearchQuery(String searchQuery) { this.searchQuery = searchQuery; }
        public String getDocumentSlug() { return documentSlug; }
        public void setDocumentSlug(String documentSlug) { this.documentSlug = documentSlug; }
        public String getAnchor() { return anchor; }
        public void setAnchor(String anchor) { this.anchor = anchor; }
    }
}
