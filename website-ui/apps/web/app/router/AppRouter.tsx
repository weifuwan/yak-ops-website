import { Route, Routes } from 'react-router-dom';

import MarketingLayout from '@/layouts/MarketingLayout';
import ApiPage from '@/pages/developers/api';
import ConfigurationPage from '@/pages/developers/configuration';
import ContributingPage from '@/pages/developers/contributing';
import DeploymentPage from '@/pages/developers/deployment';
import DevelopmentPage from '@/pages/developers/development';
import DockerPage from '@/pages/developers/docker';
import QuickStartPage from '@/pages/developers/quick-start';
import DocsPage from '@/pages/docs';
import HomePage from '@/pages/home';
import BatchSyncPage from '@/pages/product/batch-sync';
import DataAssetsPage from '@/pages/product/data-assets';
import DataDevelopmentPage from '@/pages/product/data-development';
import DataQualityPage from '@/pages/product/data-quality';
import DataServicesPage from '@/pages/product/data-services';
import DataSourcesPage from '@/pages/product/data-sources';
import DatasetsPage from '@/pages/product/datasets';
import LineagePage from '@/pages/product/lineage';
import MetricsPage from '@/pages/product/metrics';
import RealtimeSyncPage from '@/pages/product/realtime-sync';
import SchedulingPage from '@/pages/product/scheduling';
import WorkflowsPage from '@/pages/product/workflows';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/data-sources" element={<DataSourcesPage />} />
        <Route path="/product/batch-sync" element={<BatchSyncPage />} />
        <Route path="/product/realtime-sync" element={<RealtimeSyncPage />} />
        <Route path="/product/data-development" element={<DataDevelopmentPage />} />
        <Route path="/product/workflows" element={<WorkflowsPage />} />
        <Route path="/product/scheduling" element={<SchedulingPage />} />
        <Route path="/product/data-quality" element={<DataQualityPage />} />
        <Route path="/product/lineage" element={<LineagePage />} />
        <Route path="/product/data-assets" element={<DataAssetsPage />} />
        <Route path="/product/datasets" element={<DatasetsPage />} />
        <Route path="/product/data-services" element={<DataServicesPage />} />
        <Route path="/product/metrics" element={<MetricsPage />} />
        <Route path="/developers/quick-start" element={<QuickStartPage />} />
        <Route path="/developers/deployment" element={<DeploymentPage />} />
        <Route path="/developers/docker" element={<DockerPage />} />
        <Route path="/developers/development" element={<DevelopmentPage />} />
        <Route path="/developers/api" element={<ApiPage />} />
        <Route path="/developers/configuration" element={<ConfigurationPage />} />
        <Route path="/developers/contributing" element={<ContributingPage />} />
      </Route>

      <Route path="/docs/*" element={<DocsPage />} />
    </Routes>
  );
}
