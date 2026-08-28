package io.yak.website.docs;

import io.yak.framework.common.Result;
import io.yak.website.docs.DocsModels.DocumentResponse;
import io.yak.website.docs.DocsModels.NavigationResponse;
import io.yak.website.docs.DocsModels.SearchResponse;
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
    public ResponseEntity<Result<NavigationResponse>> navigation() {
        accessGuard.requireVerifiedWebsiteUser();
        return ok(catalog.navigation());
    }

    @GetMapping("/content")
    public ResponseEntity<Result<DocumentResponse>> content(
            @RequestParam("slug") String slug) {
        accessGuard.requireVerifiedWebsiteUser();
        return catalog.document(slug)
                .map(this::ok)
                .orElseGet(() -> ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .cacheControl(CacheControl.noStore())
                        .body(Result.buildNotExist("文档不存在")));
    }

    @GetMapping("/search")
    public ResponseEntity<Result<SearchResponse>> search(
            @RequestParam(value = "q", defaultValue = "") String query) {
        accessGuard.requireVerifiedWebsiteUser();
        if (query != null && query.length() > MAX_SEARCH_QUERY_LENGTH) {
            return ResponseEntity
                    .badRequest()
                    .cacheControl(CacheControl.noStore())
                    .body(Result.buildParamIllegal("搜索关键词不能超过 80 个字符"));
        }
        return ok(catalog.search(query));
    }

    private <T> ResponseEntity<Result<T>> ok(T data) {
        return ResponseEntity
                .ok()
                .cacheControl(CacheControl.noStore())
                .body(Result.success(data));
    }
}
