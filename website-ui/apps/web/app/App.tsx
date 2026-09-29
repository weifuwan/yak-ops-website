import { BrowserRouter } from 'react-router-dom';

import AppRouter from './router/AppRouter';
import PageViewTracker from './router/PageViewTracker';

export default function App() {
  return (
    <BrowserRouter>
      <PageViewTracker />
      <AppRouter />
    </BrowserRouter>
  );
}
