package io.yak.website.docs;

import io.yak.website.common.ApiResponse;
import io.yak.website.docs.DocsModels.DocumentResponse;
import io.yak.website.docs.DocsModels.NavigationResponse;
import io.yak.website.docs.DocsModels.SearchResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/** Authenticated documentation delivery API. */
@RestController
@RequestMapping("/api/v1/docs")
public class ProtectedDocsController {

    private static final int MAX_SEARCH_QUERY_LENGTH = 80;

    private final ProtectedDocsCatalog catalog;
    private final ProtectedDocsAccessGuard accessGuard;

    public ProtectedDocsController(
            ProtectedDocsCatalog catalog,
            ProtectedDocsAccessGuard accessGuard) {
        this.catalog = catalog;
        this.accessGuard = accessGuard;
    }

    @GetMapping("/navigation")
    public ResponseEntity<ApiResponse<NavigationResponse>> navigation(
            HttpServletRequest request) {
        accessGuard.requireVerifiedWebsiteUser(request);
        return ok(catalog.navigation());
    }

    @GetMapping("/content")
    public ResponseEntity<ApiResponse<DocumentResponse>> content(
            @RequestParam("slug") String slug,
            HttpServletRequest request) {
        accessGuard.requireVerifiedWebsiteUser(request);
        return catalog.document(slug)
                .map(this::ok)
                .orElseGet(() -> ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .cacheControl(CacheControl.noStore())
                        .body(ApiResponse.fail(HttpStatus.NOT_FOUND.value(), "文档不存在")));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<SearchResponse>> search(
            @RequestParam(value = "q", defaultValue = "") String query,
            HttpServletRequest request) {
        accessGuard.requireVerifiedWebsiteUser(request);
        if (query != null && query.length() > MAX_SEARCH_QUERY_LENGTH) {
            return ResponseEntity
                    .badRequest()
                    .cacheControl(CacheControl.noStore())
                    .body(ApiResponse.fail(
                            HttpStatus.BAD_REQUEST.value(),
                            "搜索关键词不能超过 80 个字符"));
        }
        return ok(catalog.search(query));
    }

    private <T> ResponseEntity<ApiResponse<T>> ok(T data) {
        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.noStore())
                .body(ApiResponse.success(data));
    }
}
