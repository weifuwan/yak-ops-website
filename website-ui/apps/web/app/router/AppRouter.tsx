import { Route, Routes } from 'react-router-dom';

import ApiPage from '@/app/developers/api';
import ConfigurationPage from '@/app/developers/configuration';
import ContributingPage from '@/app/developers/contributing';
import DeploymentPage from '@/app/developers/deployment';
import DevelopmentPage from '@/app/developers/development';
import DockerPage from '@/app/developers/docker';
import QuickStartPage from '@/app/developers/quick-start';
import DocsPage from '@/app/docs';
import HomePage from '@/app/home';
import MarketingLayout from '@/app/layout/MarketingLayout';
import BatchSyncPage from '@/app/product/batch-sync';
import DataAssetsPage from '@/app/product/data-assets';
import DataDevelopmentPage from '@/app/product/data-development';
import DataQualityPage from '@/app/product/data-quality';
import DataServicesPage from '@/app/product/data-services';
import DataSourcesPage from '@/app/product/data-sources';
import DatasetsPage from '@/app/product/datasets';
import LineagePage from '@/app/product/lineage';
import MetricsPage from '@/app/product/metrics';
import RealtimeSyncPage from '@/app/product/realtime-sync';
import SchedulingPage from '@/app/product/scheduling';
import WorkflowsPage from '@/app/product/workflows';

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
