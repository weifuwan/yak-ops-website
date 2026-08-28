import { Link } from '@umijs/max';
import './index.less';

/** Temporary smoke-test screen. PR 4 will replace this with the product homepage. */
export default function HomePage() {
  return (
    <main className="foundation-page">
      <div className="foundation-page__content">
        <span className="foundation-page__eyebrow">Yak Ops Website</span>
        <h1>Core foundation ready.</h1>
        <p>
          Account and protected documentation foundations are now connected. The final marketing experience remains in PR 4.
        </p>
        <div className="foundation-page__actions">
          <Link className="foundation-page__action foundation-page__action--primary" to="/docs">
            打开 Docs
          </Link>
          <Link className="foundation-page__action" to="/register">
            创建账号
          </Link>
        </div>
      </div>
    </main>
  );
}
