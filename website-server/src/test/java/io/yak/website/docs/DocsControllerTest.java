package io.yak.website.docs;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

class DocsControllerTest {

    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        DocsCatalog catalog = new DocsCatalog(new ObjectMapper());
        mockMvc = MockMvcBuilders.standaloneSetup(new DocsController(catalog)).build();
    }

    @Test
    void navigationIsAvailableWithoutSession() throws Exception {
        mockMvc.perform(get("/api/v1/docs/navigation"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200));
    }

    @Test
    void documentIsAvailableWithoutSession() throws Exception {
        mockMvc.perform(get("/api/v1/docs/content")
                        .queryParam("slug", "deploy/docker-compose"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.data.slug").value("deploy/docker-compose"));
    }

    @Test
    void searchIsAvailableWithoutSession() throws Exception {
        mockMvc.perform(get("/api/v1/docs/search").queryParam("q", "Docker"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200));
    }

    @Test
    void missingDocumentReturnsNotFound() throws Exception {
        mockMvc.perform(get("/api/v1/docs/content").queryParam("slug", "missing/document"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.code").value(404));
    }

    @Test
    void oversizedSearchQueryReturnsBadRequest() throws Exception {
        mockMvc.perform(get("/api/v1/docs/search").queryParam("q", "a".repeat(81)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value(400));
    }
}
