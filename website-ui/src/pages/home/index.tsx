import MarketingHeader from './components/MarketingHeader';
import './index.less';

export default function HomePage() {
  return (
    <div className="yak-home">
      <MarketingHeader />
      <main className="home-content-shell" aria-label="Yak Ops 网站内容区域">
        <div id="membership" className="home-content-anchor" aria-hidden="true" />
      </main>
    </div>
  );
}
