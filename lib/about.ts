import type {Locale} from '@/lib/i18n';

type Competency = {
  title: string;
  description?: string;
  items: string[];
  closing?: string;
};

type Experience = {
  company: string;
  role: string;
  period: string;
  description: string;
  responsibilities?: string[];
  achievements?: string[];
  takeaway?: string;
};

type ResearchArea = {
  title: string;
  body: string;
  items?: string[];
};

export type AboutProfile = {
  title: string;
  summary: string;
  years: string;
  intro: string[];
  belief: string[];
  competenciesTitle: string;
  competencies: Competency[];
  experienceTitle: string;
  experiences: Experience[];
  educationTitle: string;
  education: {
    school: string;
    degree: string;
    period: string;
  };
  researchTitle: string;
  researchIntro: string;
  research: ResearchArea[];
  valuesTitle: string;
  values: string[];
  valuesClosing: string;
};

const zh: AboutProfile = {
  title: '郑勇',
  summary: '产品负责人 | 解决方案架构 | 第一性原理实践者',
  years: '17 年技术、产品与行业实践经验',
  intro: [
    '职业经历横跨软件研发、大数据平台、海外项目、产品管理、解决方案设计与商业化落地。',
    '长期关注复杂系统、组织效率、技术演进与商业模式之间的关系，擅长从业务场景中识别机会，并将复杂问题抽象为可落地、可复制的解决方案。'
  ],
  belief: ['技术是工具', '产品是载体', '商业是结果', '认知决定上限'],
  competenciesTitle: '核心能力',
  competencies: [
    {
      title: '产品与解决方案',
      items: ['场景化解决方案设计', '产品化抽象与能力沉淀', '产品生命周期管理', '商业模式分析', '行业研究与机会识别']
    },
    {
      title: '技术理解',
      description: '拥有 10 年以上软件研发背景。虽然目前已不从事一线开发工作，但能够理解技术系统的边界、复杂度与工程化落地过程。',
      items: ['系统架构边界', '技术复杂度评估', '数据平台能力建设', 'AI 与算法工程化落地过程', '产品与研发协同机制'],
      closing: '我不负责实现技术，但负责判断是否值得做、如何做更合理，以及如何组织资源实现目标。'
    },
    {
      title: '商业化能力',
      description: '擅长从用户价值、成本结构、技术可行性、市场规模、复制能力与长期竞争壁垒等维度分析业务。',
      items: ['用户价值', '成本结构', '技术可行性', '市场规模', '复制能力', '长期竞争壁垒'],
      closing: '关注的不只是项目交付，更关注一件事能否成为持续增长的业务。'
    }
  ],
  experienceTitle: '职业经历',
  experiences: [
    {
      company: '海康威视系统技术有限公司',
      role: '产品经理 / 高级解决方案顾问',
      period: '2019 - 至今',
      description: '负责智慧园区及行业数字化场景解决方案设计与推广。',
      responsibilities: ['复杂项目需求分析', '解决方案设计', '场景化产品规划', '区域业务支持', '行业研究与竞争分析'],
      achievements: [
        '主导智慧机房场景解决方案规划与推广',
        '获得公司级优秀场景化解决方案奖项',
        '打造多个区域标杆案例',
        '推动场景方案标准化与复制落地',
        '输出产品可行性与商业价值分析'
      ]
    },
    {
      company: '海康威视数字技术股份有限公司',
      role: '数据研发 / 项目经理',
      period: '2017 - 2019',
      description: '负责车辆大数据产品研发、时空引擎预研项目与数据能力平台建设。',
      takeaway: '深入理解了数据、能力、产品与业务之间的转化过程。'
    },
    {
      company: '海康威视海外软件业务',
      role: '软件工程师 / 项目经理',
      period: '2013 - 2017',
      description: '参与新加坡平安城市项目建设，多次赴新加坡现场实施与问题解决。',
      responsibilities: ['需求分析', '系统设计', '项目交付', '海外客户沟通'],
      takeaway: '这段经历让我理解：真正的软件价值不在代码本身，而在于解决真实世界的问题。'
    },
    {
      company: '文思创新（外派华为）',
      role: '软件工程师',
      period: '2012 - 2013',
      description: '参与物联网及行业数字化项目研发，深入接触华为研发体系与工程管理方法。'
    },
    {
      company: '恒生电子',
      role: '软件工程师',
      period: '2010 - 2011',
      description: '参与企业级软件产品研发，建立软件工程基础能力。'
    }
  ],
  educationTitle: '教育背景',
  education: {
    school: '内蒙古工业大学',
    degree: '软件工程学士',
    period: '2005 - 2009'
  },
  researchTitle: '研究方向',
  researchIntro: '除本职工作外，我长期研究以下领域：',
  research: [
    {title: '第一性原理', body: '通过回归事物本质理解世界。'},
    {title: '系统思维', body: '关注结构、反馈、约束与演化，而非孤立事件。', items: ['结构', '反馈', '约束', '演化']},
    {
      title: 'AI 与技术革命',
      body: '关注技术如何改变商业与社会。',
      items: ['人工智能', '自动驾驶', '机器人', '航天产业', '数据中心', '数字基础设施']
    },
    {
      title: '投资与商业分析',
      body: '长期研究科技企业、平台型商业模式与竞争壁垒。',
      items: ['科技企业', '平台型商业模式', '网络效应', '竞争壁垒', '戴维斯双击']
    }
  ],
  valuesTitle: '价值观',
  values: ['长期主义', '第一性原理', '独立思考', '责任优先', '持续学习'],
  valuesClosing: '我相信，人与人之间最大的差异，最终来自认知系统的差异。而持续构建更好的认知系统，是终身事业。'
};

const en: AboutProfile = {
  title: 'Yong Zheng',
  summary: 'Product Leader | Solution Architect | First-Principles Thinker',
  years: '17 years of experience across technology, product, and industry practice',
  intro: [
    'My career spans software development, large-scale data systems, overseas projects, product management, solution architecture, and business commercialization.',
    'I focus on the relationship between complex systems, organizational efficiency, technology evolution, and business models. I specialize in identifying opportunities in real business contexts and turning complex problems into scalable, practical solutions.'
  ],
  belief: ['Technology is a tool', 'Products are vehicles', 'Business is the outcome', 'Thinking determines the ceiling'],
  competenciesTitle: 'Core Competencies',
  competencies: [
    {
      title: 'Product & Solution Design',
      items: ['Solution architecture', 'Productization and standardization', 'Product lifecycle management', 'Business model analysis', 'Industry research and opportunity discovery']
    },
    {
      title: 'Technology Understanding',
      description: 'With over 10 years of software engineering experience, I understand system boundaries, engineering complexity, and the practical path from technical capability to implementation.',
      items: ['System architecture boundaries', 'Engineering complexity assessment', 'Data platform capabilities', 'AI solution implementation processes', 'Product-engineering collaboration'],
      closing: 'I no longer build systems directly. Instead, I focus on deciding what should be built, evaluating feasibility, and organizing resources to achieve outcomes.'
    },
    {
      title: 'Business Commercialization',
      description: 'I evaluate opportunities through customer value, cost structure, technical feasibility, market potential, scalability, and long-term competitive advantages.',
      items: ['Customer value', 'Cost structure', 'Technical feasibility', 'Market potential', 'Scalability', 'Long-term advantages'],
      closing: 'My focus is not merely delivering projects. My focus is building sustainable business capabilities.'
    }
  ],
  experienceTitle: 'Professional Experience',
  experiences: [
    {
      company: 'Hikvision System Technology Co., Ltd.',
      role: 'Product Manager / Senior Solution Consultant',
      period: '2019 - Present',
      description: 'Responsible for smart campus and industry digitalization solutions.',
      responsibilities: ['Requirement analysis', 'Solution architecture', 'Scenario-based product planning', 'Regional business support', 'Competitive and market analysis'],
      achievements: [
        'Led smart data center solution planning and commercialization',
        'Received a company-level award for scenario-based innovation',
        'Built multiple benchmark projects',
        'Promoted solution standardization and replication',
        'Conducted product feasibility and business value analysis'
      ]
    },
    {
      company: 'Hikvision Digital Technology Co., Ltd.',
      role: 'Data Engineer / Project Manager',
      period: '2017 - 2019',
      description: 'Worked on vehicle big-data products, spatio-temporal engine research, and data platform capability development.',
      takeaway: 'Developed a deep understanding of how data capabilities evolve into products and business value.'
    },
    {
      company: 'Hikvision Overseas Software Division',
      role: 'Software Engineer / Project Manager',
      period: '2013 - 2017',
      description: 'Participated in the Singapore Safe City Project, including multiple on-site deployments and issue resolution in Singapore.',
      responsibilities: ['Requirement analysis', 'System design', 'Project delivery', 'Customer communication'],
      takeaway: 'This experience taught me that software creates value only when it solves real-world problems.'
    },
    {
      company: 'Pactera (Huawei Outsourcing)',
      role: 'Software Engineer',
      period: '2012 - 2013',
      description: "Worked on IoT and industry digitalization projects, gaining practical experience with Huawei's engineering and management methodologies."
    },
    {
      company: 'Hundsun Technologies',
      role: 'Software Engineer',
      period: '2010 - 2011',
      description: 'Participated in enterprise software development projects and built a solid software engineering foundation.'
    }
  ],
  educationTitle: 'Education',
  education: {
    school: 'Inner Mongolia University of Technology',
    degree: 'Bachelor of Software Engineering',
    period: '2005 - 2009'
  },
  researchTitle: 'Research Interests',
  researchIntro: 'Beyond my professional work, I continuously study:',
  research: [
    {title: 'First-Principles Thinking', body: 'Understanding reality by identifying fundamental truths.'},
    {title: 'Systems Thinking', body: 'Focusing on structures, feedback loops, constraints, and evolution rather than isolated events.', items: ['Structures', 'Feedback loops', 'Constraints', 'Evolution']},
    {
      title: 'AI & Technology Transformation',
      body: 'Studying how technology reshapes business and society.',
      items: ['Artificial intelligence', 'Autonomous driving', 'Robotics', 'Space industry', 'Data centers', 'Digital infrastructure']
    },
    {
      title: 'Investing & Business Analysis',
      body: 'Long-term research on technology companies, platform business models, and durable competitive advantages.',
      items: ['Technology companies', 'Platform business models', 'Network effects', 'Competitive advantages', 'Davis Double Play']
    }
  ],
  valuesTitle: 'Values',
  values: ['Long-term thinking', 'First-principles thinking', 'Independent judgment', 'Responsibility', 'Continuous learning'],
  valuesClosing: 'I believe the greatest difference between people ultimately comes from the quality of their thinking systems. Building better thinking systems is a lifelong pursuit.'
};

export function getAboutProfile(locale: Locale) {
  return locale === 'zh' ? zh : en;
}
