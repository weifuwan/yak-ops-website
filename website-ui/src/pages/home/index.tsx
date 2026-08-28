import { ArrowRightOutlined, GithubOutlined } from '@ant-design/icons';
import { Link } from '@umijs/max';
import { motion, useReducedMotion } from 'framer-motion';
import { type ReactNode, useEffect } from 'react';
import MarketingHeader from './components/MarketingHeader';
import {
  HeroDataFlow,
  IntegrationPreview,
  LineagePreview,
  QualityPreview,
  ServicePreview,
} from './components/ProductVisuals';
import { DATA_FLOW_STEPS, HOME_GITHUB_URL } from './constants';
import './index.less';

type RevealProps = {
  children: ReactNode;
  className?: string;
};

function Reveal({ children, className }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ amount: 0.18, once: true }}
      transition={{ duration: 0.58, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}

function useHomepageMetadata() {
  useEffect(() => {
    const previousTitle = document.title;
    const description = 'Yak Ops 是一个面向数据连接、同步、开发、质量、血缘与数据交付的开放数据运营平台。';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const created = !meta;
    const previousDescription = meta?.content;

    document.title = 'Yak Ops — 让数据流转，更简单';
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;

    return () => {
      document.title = previousTitle;
      if (created) {
        meta?.remove();
      } else if (meta) {
        meta.content = previousDescription || '';
      }
    };
  }, []);
}

export default function HomePage() {
  useHomepageMetadata();

  return (
    <div className="yak-home">
      <MarketingHeader />

      <main>
        <section className="home-hero">
          <Reveal className="home-hero__copy">
            <span className="home-eyebrow">OPEN DATA OPERATIONS</span>
            <h1 className="home-display">
              让数据流转，
              <br />
              <em>更简单。</em>
            </h1>
            <p className="home-hero__lead">
              从连接、同步和开发，到质量、血缘与数据交付。Yak Ops 把数据工程重新放回一条清晰的流里。
            </p>
            <p className="home-hero__verbs">Connect. Build. Govern. Deliver.</p>
            <div className="home-hero__actions">
              <Link className="home-button home-button--dark" to="/register">
                开始使用 <ArrowRightOutlined />
              </Link>
              <Link className="home-button home-button--ghost" to="/docs">
                阅读 Docs
              </Link>
            </div>
            <div className="home-hero__signals" aria-label="Yak Ops 核心能力">
              <span>Batch + CDC</span>
              <span>SQL + Workflow</span>
              <span>Quality + Lineage</span>
            </div>
          </Reveal>

          <HeroDataFlow />
        </section>

        <section className="home-statement" id="platform">
          <Reveal>
            <span className="home-section-label">FROM SOURCE TO VALUE</span>
            <h2 className="home-display">Data should flow. Not get stuck between tools.</h2>
            <p>
              数据集成、开发、治理和交付不应该是四个彼此看不见的系统。Yak Ops 用同一个上下文连接它们。
            </p>
          </Reveal>
        </section>

        <section className="home-flow-story">
          <div className="home-flow-story__intro">
            <span className="home-section-label">ONE PLATFORM</span>
            <h2 className="home-display">Your entire data flow.</h2>
            <p>不是功能菜单的集合，而是一条从数据源到业务价值的连续路径。</p>
          </div>

          <div className="home-flow-story__steps">
            {DATA_FLOW_STEPS.map((step) => (
              <Reveal className="home-flow-step" key={step.number}>
                <div className="home-flow-step__index">{step.number}</div>
                <div className="home-flow-step__body">
                  <span className="home-flow-step__verb">{step.verb}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  <div className="home-flow-step__tags">
                    {step.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="home-product-grid" aria-label="Yak Ops 产品能力预览">
          <Reveal className="home-product-card home-product-card--wide">
            <div className="home-product-card__copy">
              <span className="home-section-label">MOVE</span>
              <h3>一条数据流，两种速度。</h3>
              <p>离线同步与实时 CDC 共享同一套连接、任务和运行语义。</p>
            </div>
            <IntegrationPreview />
          </Reveal>

          <Reveal className="home-product-card" >
            <div className="home-product-card__copy">
              <span className="home-section-label">GOVERN</span>
              <h3>问题应该先被你看到。</h3>
              <p>质量总览不只是分数，还应该告诉你问题在哪里。</p>
            </div>
            <QualityPreview />
          </Reveal>

          <Reveal className="home-product-card">
            <div className="home-product-card__copy">
              <span className="home-section-label">UNDERSTAND</span>
              <h3>每个变化，都有上下游。</h3>
              <p>从表到数据集、从 SQL 到 API，看清数据如何到达用户。</p>
            </div>
            <LineagePreview />
          </Reveal>

          <Reveal className="home-product-card home-product-card--wide">
            <div className="home-product-card__copy">
              <span className="home-section-label">DELIVER</span>
              <h3>治理后的数据，继续向前。</h3>
              <p>把数据集交付成稳定、可理解、可消费的服务能力。</p>
            </div>
            <ServicePreview />
          </Reveal>
        </section>

        <section className="home-feature home-feature--quality" id="quality">
          <Reveal className="home-feature__copy">
            <span className="home-section-label">DATA QUALITY</span>
            <h2 className="home-display">Know your data. Before your users do.</h2>
            <p>
              从质量维度到具体问题，把“数据有没有问题”变成“哪里出了问题、影响了什么、接下来该处理什么”。
            </p>
            <Link className="home-text-link" to="/docs/data-quality/overview">
              了解数据质量 <ArrowRightOutlined />
            </Link>
          </Reveal>
          <Reveal className="home-feature__visual">
            <QualityPreview />
          </Reveal>
        </section>

        <section className="home-feature home-feature--lineage" id="lineage">
          <Reveal className="home-feature__visual">
            <LineagePreview />
          </Reveal>
          <Reveal className="home-feature__copy">
            <span className="home-section-label">DATA LINEAGE</span>
            <h2 className="home-display">From lineage to clarity.</h2>
            <p>当一个字段、一张表或一段 SQL 发生变化，先看清它将沿着哪条链路继续传播。</p>
            <Link className="home-text-link" to="/docs/lineage/overview">
              了解数据血缘 <ArrowRightOutlined />
            </Link>
          </Reveal>
        </section>

        <section className="home-closing">
          <Reveal className="home-closing__inner">
            <span className="home-section-label home-section-label--light">YAK OPS</span>
            <h2 className="home-display">Build the flow. Keep the context.</h2>
            <p>让连接、任务、质量和血缘围绕同一份数据上下文协同，而不是散落在工具之间。</p>
            <div className="home-closing__actions">
              <Link className="home-button home-button--light" to="/register">
                创建 Yak Ops 账号 <ArrowRightOutlined />
              </Link>
              <a className="home-button home-button--dark-outline" href={HOME_GITHUB_URL} target="_blank" rel="noreferrer">
                <GithubOutlined /> GitHub
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="home-footer">
        <div className="home-footer__brand">
          <span className="home-wordmark__mark" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <strong>Yak Ops</strong>
          <span>让数据流转，更简单。</span>
        </div>
        <div className="home-footer__links">
          <Link to="/docs">Docs</Link>
          <Link to="/login">登录</Link>
          <Link to="/register">创建账号</Link>
          <a href={HOME_GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
