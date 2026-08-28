package io.yak.website.docs;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ProtectedDocsCatalogTest {

    private ProtectedDocsCatalog catalog;

    @BeforeEach
    void setUp() {
        catalog = new ProtectedDocsCatalog(new ObjectMapper());
    }

    @Test
    void defaultDocumentMustExist() {
        String defaultSlug = catalog.navigation().defaultSlug();

        assertThat(defaultSlug).isNotBlank();
        assertThat(catalog.document(defaultSlug)).isPresent();
    }

    @Test
    void navigationOnlyExposesDeclaredDocuments() {
        assertThat(catalog.document("../README")).isEmpty();
        assertThat(catalog.document("README")).isEmpty();
    }

    @Test
    void searchReturnsSeedDocumentation() {
        assertThat(catalog.search("质量").hits())
                .extracting(DocsModels.SearchHit::slug)
                .contains("data-quality/overview");
    }
}
