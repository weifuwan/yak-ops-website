export const DATA_FLOW_STEPS = [
  {
    number: '01',
    verb: 'Connect',
    title: '连接数据，而不是连接孤岛。',
    description: '统一管理数据源与连接信息，让后续同步、开发和治理从同一个上下文开始。',
    tags: ['Datasource', 'Connector', 'Metadata'],
  },
  {
    number: '02',
    verb: 'Move',
    title: '让批处理与 CDC 走同一条路。',
    description: '离线同步和实时同步共享清晰的任务边界，让数据流转不再散落在不同工具里。',
    tags: ['Batch', 'CDC', 'Link-Up'],
  },
  {
    number: '03',
    verb: 'Build',
    title: '从 SQL 到任务，都留在工作流里。',
    description: '把数据开发、调度和执行上下文组织起来，让开发过程更容易理解、复用和追踪。',
    tags: ['SQL', 'Workflow', 'Schedule'],
  },
  {
    number: '04',
    verb: 'Govern',
    title: '质量、元数据与血缘不再事后补。',
    description: '在数据流转过程中持续看见质量问题、上下游关系和影响范围，而不是等用户发现。',
    tags: ['Quality', 'Lineage', 'Governance'],
  },
  {
    number: '05',
    verb: 'Deliver',
    title: '把数据交付成真正可使用的能力。',
    description: '从数据集到服务与可视化，让治理后的数据继续向业务价值流动。',
    tags: ['Dataset', 'Data Service', 'Dashboard'],
  },
] as const;

export const HOME_GITHUB_URL = 'https://github.com/weifuwan/yak-ops';
