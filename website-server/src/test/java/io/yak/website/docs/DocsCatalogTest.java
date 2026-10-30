package io.yak.website.docs;

import static org.assertj.core.api.Assertions.assertThat;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DocsCatalogTest {

    private DocsCatalog catalog;

    @BeforeEach
    void setUp() {
        catalog = new DocsCatalog(new ObjectMapper());
    }

    @Test
    void defaultDocumentMustExist() {
        String defaultSlug = catalog.navigation().defaultSlug();

        assertThat(defaultSlug).isNotBlank();
        assertThat(catalog.document(defaultSlug)).isPresent();
    }

    @Test
    void databaseConnectorDocumentsAreRegistered() {
        assertThat(catalog.document("connectors/database/mysql")).isPresent();
        assertThat(catalog.document("connectors/database/postgresql")).isPresent();
        assertThat(catalog.document("connectors/database/oracle")).isPresent();
    }

    @Test
    void connectorDocumentsAreListedInNavigation() {
        assertThat(catalog.navigation().sections().stream()
                .filter(section -> "Connectors".equals(section.title()))
                .flatMap(section -> section.items().stream())
                .map(DocsModels.NavigationItem::slug)
                .toList())
                .containsExactly(
                        "connectors/overview",
                        "connectors/database/mysql",
                        "connectors/database/postgresql",
                        "connectors/database/oracle");
    }

    @Test
    void newDocumentationSectionsAreRegistered() {
        assertThat(catalog.document("getting-started/overview")).isPresent();
        assertThat(catalog.document("getting-started/platform-overview")).isPresent();
        assertThat(catalog.document("getting-started/before-you-begin")).isPresent();
        assertThat(catalog.document("getting-started/deploy")).isPresent();
        assertThat(catalog.document("getting-started/connect-data")).isPresent();
        assertThat(catalog.document("getting-started/integrate-data")).isPresent();
        assertThat(catalog.document("getting-started/build-workflow")).isPresent();
        assertThat(catalog.document("getting-started/data-governance")).isPresent();
        assertThat(catalog.document("connectors/overview")).isPresent();
        assertThat(catalog.document("products/overview")).isPresent();
        assertThat(catalog.document("products/data-integration")).isPresent();
        assertThat(catalog.document("products/data-development")).isPresent();
        assertThat(catalog.document("products/data-governance")).isPresent();
        assertThat(catalog.document("ai/overview")).isPresent();
        assertThat(catalog.document("guides/overview")).isPresent();
        assertThat(catalog.document("admin/overview")).isPresent();
        assertThat(catalog.document("developers/overview")).isPresent();
    }

    @Test
    void previousAndNextStayWithinTheirDocumentationModule() {
        DocsModels.DocumentResponse gettingStarted =
                catalog.document("getting-started/overview").orElseThrow();
        assertThat(gettingStarted.previous()).isNull();
        assertThat(gettingStarted.next().slug()).isEqualTo("getting-started/platform-overview");

        DocsModels.DocumentResponse deploy =
                catalog.document("getting-started/deploy").orElseThrow();
        assertThat(deploy.previous().slug()).isEqualTo("getting-started/before-you-begin");
        assertThat(deploy.next().slug()).isEqualTo("deploy/docker-compose");

        DocsModels.DocumentResponse dockerCompose =
                catalog.document("deploy/docker-compose").orElseThrow();
        assertThat(dockerCompose.previous().slug()).isEqualTo("getting-started/deploy");
        assertThat(dockerCompose.next().slug()).isEqualTo("getting-started/connect-data");

        DocsModels.DocumentResponse lastStep =
                catalog.document("getting-started/data-governance").orElseThrow();
        assertThat(lastStep.previous().slug()).isEqualTo("getting-started/build-workflow");
        assertThat(lastStep.next()).isNull();

        DocsModels.DocumentResponse connectorOverview =
                catalog.document("connectors/overview").orElseThrow();
        assertThat(connectorOverview.previous()).isNull();
        assertThat(connectorOverview.next().slug()).isEqualTo("connectors/database/mysql");

        DocsModels.DocumentResponse mysql =
                catalog.document("connectors/database/mysql").orElseThrow();
        assertThat(mysql.previous().slug()).isEqualTo("connectors/overview");
        assertThat(mysql.next().slug()).isEqualTo("connectors/database/postgresql");

        DocsModels.DocumentResponse oracle =
                catalog.document("connectors/database/oracle").orElseThrow();
        assertThat(oracle.previous().slug()).isEqualTo("connectors/database/postgresql");
        assertThat(oracle.next()).isNull();

        DocsModels.DocumentResponse productsOverview =
                catalog.document("products/overview").orElseThrow();
        assertThat(productsOverview.previous()).isNull();
        assertThat(productsOverview.next().slug()).isEqualTo("products/data-integration");

        DocsModels.DocumentResponse governance =
                catalog.document("products/data-governance").orElseThrow();
        assertThat(governance.next()).isNull();

        DocsModels.DocumentResponse aiOverview =
                catalog.document("ai/overview").orElseThrow();
        assertThat(aiOverview.previous()).isNull();
        assertThat(aiOverview.next()).isNull();
    }

    @Test
    void globalSearchStillReturnsDocumentsAcrossModules() {
        assertThat(catalog.search("Docker").hits())
                .extracting(DocsModels.SearchHit::slug)
                .contains("deploy/docker-compose");
        assertThat(catalog.search("MySQL").hits())
                .extracting(DocsModels.SearchHit::slug)
                .contains("connectors/database/mysql");
    }

    @Test
    void navigationOnlyExposesDeclaredDocuments() {
        assertThat(catalog.document("../README")).isEmpty();
        assertThat(catalog.document("README")).isEmpty();
    }

    @Test
    void searchReturnsDockerComposeGuide() {
        assertThat(catalog.search("Docker").hits())
                .extracting(DocsModels.SearchHit::slug)
                .contains("deploy/docker-compose");
    }
}
