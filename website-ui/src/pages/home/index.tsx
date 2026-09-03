import { MARKETING_GITHUB_URL } from '@/config/marketingNavigation';
import { Link } from '@umijs/max';
import './index.less';

const FLOW_STEPS = [
  { key: '01', label: '连接', detail: 'Data Sources' },
  { key: '02', label: '同步', detail: 'Batch / CDC' },
  { key: '03', label: '开发', detail: 'SQL / Python / Shell' },
  { key: '04', label: '编排', detail: 'Workflow / Schedule' },
  { key: '05', label: '质量', detail: 'Rules / Monitor' },
  { key: '06', label: '服务', detail: 'Dataset / API' },
  { key: '07', label: '治理', detail: 'RBAC / Audit' },
] as const;

const CAPABILITIES = [
  {
    index: '01',
    eyebrow: 'CONNECT',
    title: '数据源与集成',
    description: '统一管理数据源连接，覆盖离线同步与实时 CDC，让数据进入平台的入口保持一致。',
    items: ['数据源管理', '离线同步', '实时同步'],
  },
  {
    index: '02',
    eyebrow: 'BUILD',
    title: '数据开发',
    description: '围绕任务的开发、发布与执行形成完整生命周期，并保留可扩展的任务插件能力。',
    items: ['SQL / Python / Shell', '任务发布', '执行记录'],
  },
  {
    index: '03',
    eyebrow: 'ORCHESTRATE',
    title: '工作流与调度',
    description: '把任务组织成可视化工作流，统一处理调度、运行实例、节点状态与操作历史。',
    items: ['可视化工作流', '任务调度', '运行实例'],
  },
  {
    index: '04',
    eyebrow: 'VALIDATE',
    title: '数据质量',
    description: '用规则、模板、监控和执行结果建立质量反馈闭环，不让问题只停留在失败日志里。',
    items: ['质量规则', '表监控', '结果检查'],
  },
  {
    index: '05',
    eyebrow: 'SERVE',
    title: '数据资产与服务',
    description: '从文件、数据集、血缘到数据服务 API，把加工后的数据继续交付给真正需要它的人。',
    items: ['数据集', '数据血缘', '数据服务'],
  },
  {
    index: '06',
    eyebrow: 'GOVERN',
    title: '权限与运营',
    description: '项目空间、用户权限、审计、通知与告警属于同一套运行上下文，而不是散落的后台页面。',
    items: ['项目空间', 'RBAC', '审计与通知'],
  },
] as const;

function ArrowRightIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 10H15M11 6L15 10L11 14"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8 4H5.5A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16h9a1.5 1.5 0 0 0 1.5-1.5V12M11 4h5v5M10 10l6-6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.35"
      />
    </svg>
  );
}

function ProductPreview() {
  return (
    <div className="yak-home-preview" aria-label="Yak Ops 产品能力示意">
      <div className="yak-home-preview__topbar">
        <span className="yak-home-preview__dot" />
        <span className="yak-home-preview__dot" />
        <span className="yak-home-preview__dot" />
        <span className="yak-home-preview__title">workspace / production</span>
        <span className="yak-home-preview__status">healthy</span>
      </div>

      <div className="yak-home-preview__body">
        <aside className="yak-home-preview__sidebar">
          <div className="yak-home-preview__brand">Y</div>
          {['DS', 'SY', 'DV', 'WF', 'DQ', 'API'].map((item, index) => (
            <div className={`yak-home-preview__nav ${index === 3 ? 'is-active' : ''}`} key={item}>
              {item}
            </div>
          ))}
        </aside>

        <div className="yak-home-preview__canvas">
          <div className="yak-home-preview__heading">
            <div>
              <span>Workflow</span>
              <strong>Daily warehouse sync</strong>
            </div>
            <span className="yak-home-preview__run">Run</span>
          </div>

          <div className="yak-home-preview__flow">
            <div className="yak-home-preview__node">
              <span className="yak-home-preview__node-icon">01</span>
              <div>
                <strong>MySQL source</strong>
                <small>Connected</small>
              </div>
              <i className="is-success" />
            </div>
            <span className="yak-home-preview__connector" />
            <div className="yak-home-preview__node is-emphasis">
              <span className="yak-home-preview__node-icon">02</span>
              <div>
                <strong>Sync orders</strong>
                <small>Running · 02:14</small>
              </div>
              <i className="is-running" />
            </div>
            <span className="yak-home-preview__connector" />
            <div className="yak-home-preview__node">
              <span className="yak-home-preview__node-icon">03</span>
              <div>
                <strong>Quality check</strong>
                <small>Waiting</small>
              </div>
              <i />
            </div>
          </div>

          <div className="yak-home-preview__bottom">
            <div className="yak-home-preview__metric">
              <span>运行实例</span>
              <strong>24</strong>
              <small>today</small>
            </div>
            <div className="yak-home-preview__metric">
              <span>成功率</span>
              <strong>98.7%</strong>
              <small>7 days</small>
            </div>
            <div className="yak-home-preview__activity">
              <span>Latest activity</span>
              <div><i className="is-success" /> orders_daily finished</div>
              <div><i className="is-running" /> warehouse_sync running</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="yak-home">
      <section className="yak-home-hero">
        <div className="yak-home-grid" />
        <div className="yak-home-shell yak-home-hero__inner">
          <div className="yak-home-hero__copy">
            <div className="yak-home-kicker">
              <span className="yak-home-kicker__dot" />
              OPEN SOURCE · SELF-HOSTED
            </div>

            <h1>
              把数据连接、开发、调度与治理，
              <span>放进一个控制面。</span>
            </h1>

            <p className="yak-home-hero__description">
              Yak Ops 是一个开源数据运营平台。从数据源、同步、开发和工作流，到质量、数据服务与审计，
              用一套统一的产品体验串起数据工作的完整生命周期。
            </p>

            <div className="yak-home-hero__actions">
              <Link className="yak-home-button yak-home-button--primary" to="/register">
                开始使用
                <span className="yak-home-button__icon"><ArrowRightIcon /></span>
              </Link>
              <Link className="yak-home-button yak-home-button--secondary" to="/docs">
                查看文档
                <span className="yak-home-button__hint">登录后访问</span>
              </Link>
            </div>

            <div className="yak-home-hero__meta">
              <span>一个工作区</span>
              <span>完整开源</span>
              <span>可替换执行引擎</span>
              <span>状态可观测</span>
            </div>
          </div>

          <div className="yak-home-hero__visual">
            <ProductPreview />
          </div>
        </div>
      </section>

      <section className="yak-home-lifecycle">
        <div className="yak-home-shell">
          <div className="yak-home-section-heading">
            <div>
              <span className="yak-home-eyebrow">ONE DATA LIFECYCLE</span>
              <h2>不是一堆独立后台页，而是一条连续的数据工作流。</h2>
            </div>
            <p>
              Yak Ops 把执行引擎放在产品背后。你面对的是统一的任务、状态、权限与运行上下文，而不是不同工具之间不断切换。
            </p>
          </div>

          <div className="yak-home-flow">
            {FLOW_STEPS.map((step, index) => (
              <div className="yak-home-flow__item" key={step.key}>
                <span className="yak-home-flow__number">{step.key}</span>
                <div>
                  <strong>{step.label}</strong>
                  <small>{step.detail}</small>
                </div>
                {index < FLOW_STEPS.length - 1 ? <span className="yak-home-flow__line" /> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="yak-home-capabilities">
        <div className="yak-home-shell">
          <div className="yak-home-section-heading yak-home-section-heading--stacked">
            <div>
              <span className="yak-home-eyebrow">WHAT YOU CAN DO</span>
              <h2>现在，Yak Ops 已经覆盖这些核心能力。</h2>
            </div>
          </div>

          <div className="yak-home-capability-grid">
            {CAPABILITIES.map((capability) => (
              <article className="yak-home-capability-card" key={capability.eyebrow}>
                <div className="yak-home-capability-card__top">
                  <span>{capability.index}</span>
                  <small>{capability.eyebrow}</small>
                </div>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <div className="yak-home-capability-card__tags">
                  {capability.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="yak-home-principles">
        <div className="yak-home-shell yak-home-principles__layout">
          <div className="yak-home-principles__intro">
            <span className="yak-home-eyebrow">HOW WE THINK</span>
            <h2>
              Open source
              <br />
              <em>is the product.</em>
            </h2>
            <p>
              Yak Ops 不是一个为了引流到闭源版本而存在的精简 Demo。开源版本本身，就应该是一套可以真正使用、持续演进的数据运营平台。
            </p>
          </div>

          <div className="yak-home-principles__list">
            <div className="yak-home-principle">
              <span>01</span>
              <div>
                <strong>统一控制面</strong>
                <p>数据源、任务、工作流、质量、数据集、API 与审计事件应该属于同一套产品上下文。</p>
              </div>
            </div>
            <div className="yak-home-principle">
              <span>02</span>
              <div>
                <strong>执行引擎可替换</strong>
                <p>Yak Ops 负责产品概念、生命周期、权限与可观测性，底层引擎专注执行。</p>
              </div>
            </div>
            <div className="yak-home-principle">
              <span>03</span>
              <div>
                <strong>重要状态必须可见</strong>
                <p>长任务、调度、失败、重试和跨模块操作都应该被看见，而不是只剩一个“运行中”。</p>
              </div>
            </div>
            <div className="yak-home-principle">
              <span>04</span>
              <div>
                <strong>扩展能力是一份契约</strong>
                <p>数据源、存储、任务与告警通过插件能力扩展，新增集成不需要重写平台核心。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="yak-home-cta">
        <div className="yak-home-shell yak-home-cta__inner">
          <div>
            <span className="yak-home-eyebrow">START WITH YAK OPS</span>
            <h2>从一次连接开始，把数据工作逐步收进同一个工作区。</h2>
          </div>
          <div className="yak-home-cta__actions">
            <Link className="yak-home-button yak-home-button--light" to="/register">
              创建账号
              <span className="yak-home-button__icon"><ArrowRightIcon /></span>
            </Link>
            <a className="yak-home-button yak-home-button--ghost" href={MARKETING_GITHUB_URL} rel="noreferrer" target="_blank">
              GitHub
              <span className="yak-home-button__icon"><ExternalLinkIcon /></span>
            </a>
          </div>
        </div>
      </section>

      <footer className="yak-home-footer">
        <div className="yak-home-shell yak-home-footer__inner">
          <span>Yak Ops · Open-source data operations platform</span>
          <div>
            <Link to="/">首页</Link>
            <Link to="/docs">文档</Link>
            <a href={MARKETING_GITHUB_URL} rel="noreferrer" target="_blank">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
