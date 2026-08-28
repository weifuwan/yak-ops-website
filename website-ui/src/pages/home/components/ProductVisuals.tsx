import { ApiOutlined, CheckCircleFilled, DatabaseOutlined, ThunderboltFilled } from '@ant-design/icons';
import { motion, useReducedMotion } from 'framer-motion';

const FLOW_NODES = [
  { name: 'MySQL', detail: 'orders', icon: <DatabaseOutlined /> },
  { name: 'Link-Up', detail: 'CDC pipeline', icon: <ThunderboltFilled /> },
  { name: 'Doris', detail: 'warehouse', icon: <DatabaseOutlined /> },
] as const;

export function HeroDataFlow() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="hero-canvas"
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.985 }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.12, ease: 'easeOut' }}
    >
      <div className="hero-canvas__grid" aria-hidden="true" />
      <div className="hero-canvas__topbar">
        <div>
          <span className="hero-canvas__status-dot" />
          Realtime pipeline
        </div>
        <span>Running</span>
      </div>

      <div className="hero-flow">
        {FLOW_NODES.map((node, index) => (
          <div className="hero-flow__segment" key={node.name}>
            <div className={`hero-flow__node${index === 1 ? ' hero-flow__node--active' : ''}`}>
              <span className="hero-flow__icon">{node.icon}</span>
              <span>
                <strong>{node.name}</strong>
                <small>{node.detail}</small>
              </span>
            </div>
            {index < FLOW_NODES.length - 1 ? (
              <div className="hero-flow__line" aria-hidden="true">
                <span className="hero-flow__pulse" />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <div className="hero-canvas__metrics">
        <div>
          <span>Sync mode</span>
          <strong>Incremental</strong>
        </div>
        <div>
          <span>Pipeline</span>
          <strong>Healthy</strong>
        </div>
        <div>
          <span>Quality checks</span>
          <strong className="hero-canvas__metric-accent">12 active</strong>
        </div>
      </div>

      <div className="hero-canvas__activity">
        <div className="hero-canvas__activity-copy">
          <CheckCircleFilled />
          <span>
            <strong>Data keeps moving.</strong>
            <small>Latest checkpoint completed successfully.</small>
          </span>
        </div>
        <span className="hero-canvas__activity-time">now</span>
      </div>
    </motion.div>
  );
}

export function IntegrationPreview() {
  return (
    <div className="product-preview product-preview--integration">
      <div className="product-preview__bar">
        <span>Data Integration</span>
        <span className="product-preview__muted">Live</span>
      </div>
      <div className="integration-preview__body">
        <div className="integration-preview__source">
          <DatabaseOutlined />
          <span>
            <strong>MySQL · orders</strong>
            <small>Source</small>
          </span>
        </div>
        <div className="integration-preview__track">
          <span />
          <i />
        </div>
        <div className="integration-preview__source">
          <DatabaseOutlined />
          <span>
            <strong>Doris · dwd_order</strong>
            <small>Destination</small>
          </span>
        </div>
      </div>
      <div className="integration-preview__footer">
        <span>CDC</span>
        <span>Schema mapped</span>
        <span>Running</span>
      </div>
    </div>
  );
}

export function QualityPreview() {
  return (
    <div className="product-preview quality-preview">
      <div className="product-preview__bar">
        <span>Data Quality</span>
        <span className="product-preview__muted">Today</span>
      </div>
      <div className="quality-preview__body">
        <div className="quality-radar" aria-label="数据质量雷达图">
          <svg viewBox="0 0 220 220" role="img" aria-label="质量维度雷达图">
            <g className="quality-radar__grid">
              <polygon points="110,24 184,67 184,153 110,196 36,153 36,67" />
              <polygon points="110,48 163,79 163,141 110,172 57,141 57,79" />
              <polygon points="110,72 142,91 142,129 110,148 78,129 78,91" />
              <line x1="110" y1="24" x2="110" y2="196" />
              <line x1="36" y1="67" x2="184" y2="153" />
              <line x1="184" y1="67" x2="36" y2="153" />
            </g>
            <polygon className="quality-radar__value" points="110,42 166,78 153,135 110,174 54,142 63,83" />
            <g className="quality-radar__labels">
              <text x="110" y="16">完整性</text>
              <text x="190" y="67">唯一性</text>
              <text x="190" y="160">及时性</text>
              <text x="110" y="214">一致性</text>
              <text x="28" y="160">准确性</text>
              <text x="26" y="67">有效性</text>
            </g>
          </svg>
        </div>
        <div className="quality-issues">
          <div className="quality-issues__summary">
            <span>Issues</span>
            <strong>3</strong>
          </div>
          <div className="quality-issue">
            <i className="quality-issue__dot quality-issue__dot--high" />
            <span>
              <strong>订单号重复</strong>
              <small>ods_order · 唯一性</small>
            </span>
          </div>
          <div className="quality-issue">
            <i className="quality-issue__dot" />
            <span>
              <strong>手机号空值上升</strong>
              <small>dim_customer · 完整性</small>
            </span>
          </div>
          <div className="quality-issue">
            <i className="quality-issue__dot" />
            <span>
              <strong>T+1 延迟</strong>
              <small>dws_sales · 及时性</small>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LineagePreview() {
  return (
    <div className="product-preview lineage-preview">
      <div className="product-preview__bar">
        <span>Data Lineage</span>
        <span className="product-preview__muted">Impact analysis</span>
      </div>
      <div className="lineage-preview__canvas">
        <svg className="lineage-preview__edges" viewBox="0 0 620 300" preserveAspectRatio="none" aria-hidden="true">
          <path d="M130 82 C220 82 210 150 305 150" />
          <path d="M130 218 C220 218 210 150 305 150" />
          <path d="M385 150 C460 150 455 82 535 82" />
          <path d="M385 150 C460 150 455 218 535 218" />
        </svg>
        <div className="lineage-node lineage-node--source lineage-node--top">
          <small>table</small>
          <strong>ods_order</strong>
        </div>
        <div className="lineage-node lineage-node--source lineage-node--bottom">
          <small>table</small>
          <strong>dim_customer</strong>
        </div>
        <div className="lineage-node lineage-node--center">
          <span>SQL</span>
          <strong>dwd_order</strong>
        </div>
        <div className="lineage-node lineage-node--target lineage-node--top">
          <small>dataset</small>
          <strong>Sales Overview</strong>
        </div>
        <div className="lineage-node lineage-node--target lineage-node--bottom">
          <small>api</small>
          <strong>/sales/trend</strong>
        </div>
      </div>
    </div>
  );
}

export function ServicePreview() {
  return (
    <div className="product-preview service-preview">
      <div className="product-preview__bar">
        <span>Data Service</span>
        <span className="service-preview__method">GET</span>
      </div>
      <div className="service-preview__endpoint">
        <ApiOutlined />
        <code>/api/v1/sales/trend</code>
      </div>
      <pre className="service-preview__code">
        <code>{`{
  "region": "east",
  "period": "7d",
  "metrics": ["gmv", "orders"]
}`}</code>
      </pre>
      <div className="service-preview__response">
        <span>200 OK</span>
        <span>Governed dataset</span>
      </div>
    </div>
  );
}
