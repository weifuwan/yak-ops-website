package io.yak.website.docs;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.yak.website.account.domain.WebsiteSessionRegistry;
import io.yak.website.account.domain.WebsiteUser;
import io.yak.website.common.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

class DocsSearchHistoryControllerTest {

    private WebsiteSessionRegistry sessions;
    private DocsSearchHistoryMapper mapper;
    private HttpServletRequest request;
    private DocsSearchHistoryController controller;

    @BeforeEach
    void setUp() {
        sessions = mock(WebsiteSessionRegistry.class);
        mapper = mock(DocsSearchHistoryMapper.class);
        request = mock(HttpServletRequest.class);
        controller = new DocsSearchHistoryController(
                sessions, mapper, new DocsCatalog(new ObjectMapper()));
    }

    private void authenticate(Long userId) {
        WebsiteUser user = new WebsiteUser();
        user.setId(userId);
        when(sessions.currentUser(request)).thenReturn(Optional.of(user));
    }

    @Test
    void anonymousVisitorsCannotReadPersonalHistory() {
        when(sessions.currentUser(request)).thenReturn(Optional.empty());

        ResponseEntity<ApiResponse<List<DocsSearchHistoryController.HistoryItem>>> response =
                controller.recent(request);

        assertThat(response.getStatusCode().value()).isEqualTo(401);
        verifyNoInteractions(mapper);
    }

    @Test
    void recentHistoryIsAlwaysScopedToCurrentUser() {
        authenticate(42L);
        when(mapper.recent(eq(42L), any(LocalDateTime.class))).thenReturn(List.of());

        ResponseEntity<ApiResponse<List<DocsSearchHistoryController.HistoryItem>>> response =
                controller.recent(request);

        assertThat(response.getStatusCode().value()).isEqualTo(200);
        verify(mapper).recent(eq(42L), any(LocalDateTime.class));
    }

    @Test
    void savingHistoryUsesSessionIdentityRatherThanSubmittedUserId() {
        authenticate(42L);
        DocsSearchHistoryController.SaveRequest body =
                new DocsSearchHistoryController.SaveRequest();
        body.setSearchQuery("MySQL CDC");
        body.setDocumentSlug("connectors/database/mysql");

        ResponseEntity<ApiResponse<DocsSearchHistoryController.HistoryItem>> response =
                controller.save(body, request);

        assertThat(response.getStatusCode().value()).isEqualTo(200);
        verify(mapper).save(
                eq(42L), eq("doc:connectors/database/mysql"), eq("MySQL CDC"),
                eq("connectors/database/mysql"), eq(null), any(LocalDateTime.class));
    }

    @Test
    void invalidDocumentCannotBeRecorded() {
        authenticate(42L);
        DocsSearchHistoryController.SaveRequest body =
                new DocsSearchHistoryController.SaveRequest();
        body.setSearchQuery("unknown");
        body.setDocumentSlug("hidden/not-in-catalog");

        ResponseEntity<ApiResponse<DocsSearchHistoryController.HistoryItem>> response =
                controller.save(body, request);

        assertThat(response.getStatusCode().value()).isEqualTo(400);
        verify(mapper, never()).save(any(), any(), any(), any(), any(), any());
    }

    @Test
    void queryOnlyHistoryUsesNormalizedKey() {
        authenticate(42L);
        DocsSearchHistoryController.SaveRequest body =
                new DocsSearchHistoryController.SaveRequest();
        body.setSearchQuery("  MySQL  ");

        controller.save(body, request);

        verify(mapper).save(
                eq(42L), eq("query:mysql"), eq("MySQL"),
                eq(null), eq(null), any(LocalDateTime.class));
    }

    @Test
    void clearDeletesOnlyCurrentUsersHistory() {
        authenticate(42L);

        ResponseEntity<ApiResponse<String>> response = controller.clear(request);

        assertThat(response.getStatusCode().value()).isEqualTo(200);
        verify(mapper).clear(42L);
    }

    @Test
    void anonymousVisitorsCannotSaveOrClearHistory() {
        when(sessions.currentUser(request)).thenReturn(Optional.empty());
        DocsSearchHistoryController.SaveRequest body =
                new DocsSearchHistoryController.SaveRequest();
        body.setSearchQuery("MySQL");

        assertThat(controller.save(body, request).getStatusCode().value()).isEqualTo(401);
        assertThat(controller.clear(request).getStatusCode().value()).isEqualTo(401);
        verifyNoInteractions(mapper);
    }
}
