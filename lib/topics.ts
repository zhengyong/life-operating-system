import {Locale} from '@/lib/i18n';

type LocalizedText = {
  zh: string;
  en: string;
};

export type PrimarySource = {
  label: LocalizedText;
  href?: string;
};

export type PersonContentItem = {
  title: LocalizedText;
  type: 'news' | 'speech' | 'launch' | 'interview' | 'book';
  date?: string;
  source: LocalizedText;
  href?: string;
  note: LocalizedText;
};

export type PersonCompanyGroup = {
  title: LocalizedText;
  summary: LocalizedText;
  links: Array<{
    name: string;
    href?: string;
    companySlug?: string;
  }>;
};

export type PersonAdviceItem = {
  title: LocalizedText;
  summary: LocalizedText;
  points: LocalizedText[];
};

export type PersonProfile = {
  slug: string;
  name: LocalizedText;
  role: LocalizedText;
  summary: LocalizedText;
  learnFrom: LocalizedText[];
  relatedCompanies: string[];
  companyGroups?: PersonCompanyGroup[];
  advice?: PersonAdviceItem[];
  content: PersonContentItem[];
};

export type CompanyProfile = {
  slug: string;
  name: LocalizedText;
  category: LocalizedText;
  summary: LocalizedText;
  officialLinks: PrimarySource[];
  timeline: Array<{year: string; event: LocalizedText; imageHint?: LocalizedText; href?: string}>;
  products: LocalizedText[];
  productSegments?: Array<{
    title: LocalizedText;
    revenueLabel?: LocalizedText;
    summary: LocalizedText;
    products: LocalizedText[];
  }>;
  businessModel: LocalizedText[];
  culture: LocalizedText[];
  cultureModel?: {
    thesis: LocalizedText;
    dimensions: Array<{
      title: LocalizedText;
      summary: LocalizedText;
      practices: LocalizedText[];
      whyDifferent: LocalizedText;
    }>;
  };
  moat: LocalizedText[];
  watchlist: LocalizedText[];
  deepQuestions?: Partial<Record<'timeline' | 'products' | 'businessModel' | 'culture' | 'moat' | 'watchlist', LocalizedText[]>>;
  futureQuestions: LocalizedText[];
};

export type StockModule = {
  title: LocalizedText;
  summary: LocalizedText;
  lessons: LocalizedText[];
};

export type PersonLesson = {
  personSlug: string;
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  sections: Array<{
    title: LocalizedText;
    paragraphs: LocalizedText[];
  }>;
  keyTakeaways: LocalizedText[];
};

export function text(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export const people: PersonProfile[] = [
  {
    slug: 'jensen-huang',
    name: {zh: '黄仁勋', en: 'Jensen Huang'},
    role: {zh: 'NVIDIA 创始人兼 CEO', en: 'Founder and CEO of NVIDIA'},
    summary: {
      zh: '从图形芯片到 AI 基础设施，黄仁勋长期围绕计算平台、生态和开发者构建 NVIDIA 的战略位置。',
      en: 'Jensen Huang has built NVIDIA from graphics chips into an AI infrastructure company by compounding around platforms, ecosystems, and developers.'
    },
    learnFrom: [
      {zh: '如何把技术趋势转化为长期平台战略', en: 'Turning technical trends into long-term platform strategy'},
      {zh: '如何用开发者生态形成竞争壁垒', en: 'Using developer ecosystems as a competitive moat'},
      {zh: '如何在公开表达中塑造公司叙事', en: 'Shaping company narrative through public communication'}
    ],
    relatedCompanies: ['nvidia'],
    companyGroups: [
      {
        title: {zh: '核心公司', en: 'Core company'},
        summary: {
          zh: '核心公司是 NVIDIA。黄仁勋的长期战略主要围绕加速计算、AI 基础设施、开发者生态和数据中心平台展开。',
          en: 'The core company is NVIDIA. Jensen Huang’s long-term strategy centers on accelerated computing, AI infrastructure, developer ecosystem, and data center platforms.'
        },
        links: [{name: 'NVIDIA', companySlug: 'nvidia'}]
      },
      {
        title: {zh: '收购公司', en: 'Acquired companies'},
        summary: {
          zh: '收购主要是补齐平台能力：网络、系统软件、云原生 AI 编排和模型能力，让 NVIDIA 不只是卖芯片，而是提供完整计算平台。',
          en: 'Acquisitions mainly fill platform gaps: networking, systems software, cloud-native AI orchestration, and model capabilities, moving NVIDIA beyond chips toward a full computing platform.'
        },
        links: [
          {name: 'Mellanox', href: 'https://nvidianews.nvidia.com/news/nvidia-completes-acquisition-of-mellanox'},
          {name: 'Cumulus Networks', href: 'https://nvidianews.nvidia.com/news/nvidia-to-acquire-cumulus-networks'},
          {name: 'Run:ai', href: 'https://blogs.nvidia.com/blog/runai/'},
          {name: 'Deci', href: 'https://blogs.nvidia.com/blog/deci/'}
        ]
      },
      {
        title: {zh: '投资与生态公司', en: 'Investments and ecosystem companies'},
        summary: {
          zh: '投资主要是扩大 AI 需求和生态入口：云算力、模型公司和 AI 应用越繁荣，对 NVIDIA 计算平台的需求越强。',
          en: 'Investments mainly expand AI demand and ecosystem access: stronger cloud compute providers, model companies, and AI applications increase demand for NVIDIA’s computing platform.'
        },
        links: [
          {name: 'CoreWeave', href: 'https://www.coreweave.com/'},
          {name: 'Mistral AI', href: 'https://mistral.ai/'},
          {name: 'Perplexity', href: 'https://www.perplexity.ai/'},
          {name: 'Nebius', href: 'https://nebius.com/'}
        ]
      }
    ],
    advice: [
      {
        title: {zh: '人生', en: 'Life'},
        summary: {
          zh: '把人生看成长期复利系统：重要的不是一两次正确选择，而是持续把自己放进更大的趋势、更难的问题和更高标准里。',
          en: 'Treat life as a long-term compounding system: the point is not one or two correct choices, but repeatedly placing yourself near larger trends, harder problems, and higher standards.'
        },
        points: [
          {zh: '选择足够大的问题，给自己留下长期投入的空间。', en: 'Choose problems large enough to reward long-term effort.'},
          {zh: '不要只追短期确定性，要训练自己承受一段时间不被理解。', en: 'Do not only chase short-term certainty; train yourself to endure being misunderstood.'},
          {zh: '把痛苦和压力当成校准判断的材料，而不是只当成阻碍。', en: 'Use difficulty and pressure as material for judgment, not merely obstacles.'}
        ]
      },
      {
        title: {zh: '职场', en: 'Career'},
        summary: {
          zh: '真正有价值的职场能力，是把个人工作接到平台、客户和组织目标上，让自己的产出进入一个会持续放大的系统。',
          en: 'The valuable career skill is connecting personal work to platform, customer, and organizational goals so output compounds inside a larger system.'
        },
        points: [
          {zh: '先理解公司真正要解决的客户问题，再决定自己怎么贡献。', en: 'Understand the customer problem before deciding how to contribute.'},
          {zh: '训练跨硬件、软件、产品、销售和客户场景的系统视角。', en: 'Build a systems view across engineering, product, sales, and customer contexts.'},
          {zh: '用高标准和高频反馈缩短成长周期。', en: 'Use high standards and frequent feedback to shorten the learning cycle.'}
        ]
      },
      {
        title: {zh: '教育', en: 'Education'},
        summary: {
          zh: '教育不只是学习知识点，而是培养看趋势、拆系统、做长期判断的能力；技术变化越快，越需要底层理解力。',
          en: 'Education is not just learning facts. It is developing the ability to read trends, decompose systems, and make long-term judgments.'
        },
        points: [
          {zh: '优先学习底层原理、工具链和真实案例，而不是只背结论。', en: 'Prioritize fundamentals, toolchains, and real cases over memorized conclusions.'},
          {zh: '把学习和作品、项目、实践连接起来。', en: 'Connect learning with work, projects, and practice.'},
          {zh: '持续追问：这个知识会进入什么产业、产品或工作流？', en: 'Keep asking where this knowledge enters an industry, product, or workflow.'}
        ]
      },
      {
        title: {zh: '成长', en: 'Growth'},
        summary: {
          zh: '成长不是线性变强，而是不断升级自己的判断框架：从单点技能，走向平台思维、生态思维和长期战略思维。',
          en: 'Growth is not linear improvement. It is upgrading your judgment framework from single skills toward platform thinking, ecosystem thinking, and long-term strategy.'
        },
        points: [
          {zh: '从“我会什么”升级到“我能参与构建什么系统”。', en: 'Move from “what can I do” to “what system can I help build.”'},
          {zh: '让表达能力服务于判断能力：把复杂事情讲清楚。', en: 'Use communication to sharpen judgment by making complex things clear.'},
          {zh: '长期复盘自己的选择是否靠近大趋势、大市场和真实需求。', en: 'Regularly review whether your choices move toward major trends, large markets, and real demand.'}
        ]
      }
    ],
    content: [
      {
        title: {zh: 'NVIDIA 与 Microsoft 扩大合作，面向 Agentic AI 构建统一部署栈', en: 'NVIDIA and Microsoft expand a unified deployment stack for agentic AI'},
        type: 'news',
        date: '2026-06-02',
        href: 'https://blogs.nvidia.com/blog/microsoft-build-windows-local-cloud-devices/',
        source: {zh: 'NVIDIA 官方博客', en: 'NVIDIA Blog'},
        note: {
          zh: '黄仁勋在台北连线 Satya Nadella 的 Microsoft Build 主题演讲，讨论从 Windows 设备、Azure 云到本地部署的加速计算栈。这条新闻可以放在“平台战略”和“开发者生态”两个角度看。',
          en: 'Jensen Huang joined Satya Nadella’s Microsoft Build keynote by livestream from Taipei to discuss accelerated computing across Windows devices, Azure cloud, and local deployments.'
        }
      },
      {
        title: {zh: 'NVIDIA 发布 Isaac GR00T 人形机器人参考设计', en: 'NVIDIA announces Isaac GR00T humanoid robot reference design'},
        type: 'news',
        date: '2026-06-01',
        href: 'https://nvidianews.nvidia.com/news/nvidia-announces-nvidia-isaac-gr00t-reference-humanoid-robot-for-academic-research',
        source: {zh: 'NVIDIA Newsroom', en: 'NVIDIA Newsroom'},
        note: {
          zh: 'NVIDIA 在 GTC Taipei 发布面向学术研究的人形机器人参考设计，基于 Jetson Thor 和 Isaac GR00T 开放开发平台。重点不是单个机器人，而是把物理 AI 做成开发平台。',
          en: 'NVIDIA announced a humanoid robot reference design for academic research, built on Jetson Thor and the Isaac GR00T open development platform.'
        }
      },
      {
        title: {zh: 'COMPUTEX 2026：黄仁勋发布 RTX Spark 与新一代个人 AI PC 方向', en: 'COMPUTEX 2026: Jensen Huang introduces RTX Spark and the personal AI PC direction'},
        type: 'news',
        date: '2026-05-31',
        href: 'https://www.nvidia.com/en-au/geforce/news/computex-2026-nvidia-geforce-rtx-announcements/',
        source: {zh: 'NVIDIA GeForce 官方新闻', en: 'NVIDIA GeForce News'},
        note: {
          zh: 'NVIDIA 在 COMPUTEX 主题演讲中提出 RTX Spark，把 CUDA、RTX、TensorRT 等能力带到 Windows 笔记本和小型桌面设备，延续“计算平台进入更多场景”的叙事。',
          en: 'At COMPUTEX, NVIDIA introduced RTX Spark, bringing CUDA, RTX, TensorRT, and related technologies into Windows laptops and compact desktops.'
        }
      },
      {
        title: {zh: 'GTC 2026：黄仁勋主题演讲', en: 'GTC 2026: Jensen Huang keynote'},
        type: 'speech',
        date: '2026-03-16',
        href: 'https://www.nvidia.com/en-us/gtc/keynote/?video=1',
        source: {zh: 'NVIDIA GTC 官方页面', en: 'NVIDIA GTC official page'},
        note: {
          zh: '用于观察黄仁勋如何把芯片、系统、软件、AI 工厂和开发者平台放进同一张战略地图。',
          en: 'A useful source for studying how Jensen Huang places chips, systems, software, AI factories, and developer platforms into one strategic map.'
        }
      },
      {
        title: {zh: 'GTC 2025：AI 基础设施与 Blackwell 平台主题演讲', en: 'GTC 2025: AI infrastructure and Blackwell platform keynote'},
        type: 'speech',
        date: '2025-03-18',
        href: 'https://www.nvidia.com/en-us/gtc/keynote/',
        source: {zh: 'NVIDIA GTC 官方页面', en: 'NVIDIA GTC official page'},
        note: {
          zh: '适合研究黄仁勋如何把 GPU、网络、软件和 AI 工厂讲成一个完整基础设施平台。',
          en: 'Useful for studying how Jensen Huang connects GPUs, networking, software, and AI factories into one infrastructure platform.'
        }
      },
      {
        title: {zh: 'SIGGRAPH：图形计算、仿真与生成式 AI 演讲资料', en: 'SIGGRAPH: graphics, simulation, and generative AI material'},
        type: 'speech',
        date: '2024',
        href: 'https://www.nvidia.com/en-us/events/siggraph/',
        source: {zh: 'NVIDIA SIGGRAPH 官方页面', en: 'NVIDIA SIGGRAPH official page'},
        note: {
          zh: '适合放在“从图形到 AI”的脉络里，看 NVIDIA 如何把图形、仿真、Omniverse 和生成式 AI 串起来。',
          en: 'Useful for the “graphics to AI” thread, showing how NVIDIA connects graphics, simulation, Omniverse, and generative AI.'
        }
      },
      {
        title: {zh: 'GTC Taipei / COMPUTEX 2026：AI PC 与物理 AI 发布', en: 'GTC Taipei / COMPUTEX 2026: AI PC and physical AI launch'},
        type: 'launch',
        date: '2026-06-01',
        href: 'https://www.nvidia.com/en-tw/gtc/taipei/keynote/',
        source: {zh: 'NVIDIA GTC Taipei 官方页面', en: 'NVIDIA GTC Taipei official page'},
        note: {
          zh: '适合研究 NVIDIA 如何把 RTX Spark、Isaac GR00T、Jetson Thor 等产品放到“个人 AI、机器人、物理 AI”叙事中。',
          en: 'Useful for studying how NVIDIA positions RTX Spark, Isaac GR00T, Jetson Thor, and related products inside the personal AI, robotics, and physical AI narrative.'
        }
      },
      {
        title: {zh: 'Blackwell 平台发布：从芯片到 AI 工厂', en: 'Blackwell platform launch: from chip to AI factory'},
        type: 'launch',
        date: '2024-03-18',
        href: 'https://nvidianews.nvidia.com/news/nvidia-blackwell-platform-arrives-to-power-a-new-era-of-computing',
        source: {zh: 'NVIDIA Newsroom', en: 'NVIDIA Newsroom'},
        note: {
          zh: 'Blackwell 是研究 NVIDIA 平台叙事的重要节点：性能、系统、网络、软件和客户部署被放在一起讲。',
          en: 'Blackwell is a key node for studying NVIDIA’s platform narrative: performance, systems, networking, software, and customer deployment are presented together.'
        }
      },
      {
        title: {zh: 'NVIDIA Rubin 平台路线图', en: 'NVIDIA Rubin platform roadmap'},
        type: 'launch',
        date: '2024-06-02',
        href: 'https://blogs.nvidia.com/blog/computex-2024-jensen-huang/',
        source: {zh: 'NVIDIA 官方博客', en: 'NVIDIA Blog'},
        note: {
          zh: '适合观察黄仁勋如何用产品路线图稳定客户、开发者和资本市场对未来计算平台的预期。',
          en: 'Useful for observing how Jensen Huang uses product roadmaps to stabilize expectations among customers, developers, and capital markets.'
        }
      },
      {
        title: {zh: 'Stratechery 访谈：芯片管制、AI 工厂与企业务实主义', en: 'Stratechery interview: chip controls, AI factories, and enterprise pragmatism'},
        type: 'interview',
        date: '2025-05-19',
        href: 'https://stratechery.com/2025/an-interview-with-nvidia-ceo-jensen-huang-about-chip-controls-ai-factories-and-enterprise-pragmatism/',
        source: {zh: 'Stratechery 原始访谈', en: 'Stratechery original interview'},
        note: {
          zh: '适合放在“访谈”类资料里，重点看黄仁勋如何回答政策、客户、AI 工厂和企业落地问题。',
          en: 'A useful interview source for studying how Jensen Huang discusses policy, customers, AI factories, and enterprise adoption.'
        }
      },
      {
        title: {zh: 'Acquired 访谈：NVIDIA 的公司史、CUDA 与 AI 平台', en: 'Acquired interview: NVIDIA history, CUDA, and AI platform'},
        type: 'interview',
        date: '2023-10-16',
        href: 'https://www.acquired.fm/episodes/nvidia-ceo-jensen-huang',
        source: {zh: 'Acquired 原始访谈', en: 'Acquired original interview'},
        note: {
          zh: '适合系统理解 NVIDIA 从图形芯片到 AI 平台的长期路径，以及黄仁勋如何复盘关键战略选择。',
          en: 'Useful for understanding NVIDIA’s path from graphics chips to AI platform and how Jensen Huang reviews key strategic choices.'
        }
      },
      {
        title: {zh: 'Stanford 访谈：创业、管理与长期判断', en: 'Stanford interview: entrepreneurship, management, and long-term judgment'},
        type: 'interview',
        date: '2024',
        href: 'https://www.youtube.com/@stanfordgsb/search?query=Jensen%20Huang',
        source: {zh: 'Stanford GSB 官方频道', en: 'Stanford GSB official channel'},
        note: {
          zh: '适合放在人物学习里，看黄仁勋如何谈创业早期、组织管理、痛苦决策和长期坚持。',
          en: 'Useful for person study, especially Jensen Huang’s comments on early entrepreneurship, management, painful decisions, and persistence.'
        }
      },
      {
        title: {zh: '《The Thinking Machine》与相关传记资料', en: 'The Thinking Machine and biography material'},
        type: 'book',
        date: '2025',
        href: 'https://www.c-span.org/program/book-tv/after-words-with-stephen-witt/657769',
        source: {zh: 'C-SPAN 作者访谈', en: 'C-SPAN author interview'},
        note: {
          zh: '传记资料用来复盘 NVIDIA 和黄仁勋的长期决策，不替代原书阅读，后续可补充书籍页和章节笔记。',
          en: 'Biography material helps review NVIDIA and Jensen Huang’s long-term decisions. It does not replace the book, and can later be expanded into book notes.'
        }
      },
      {
        title: {zh: '《The Nvidia Way》：公司文化与管理方式', en: 'The Nvidia Way: company culture and management style'},
        type: 'book',
        date: '2024',
        href: 'https://www.penguinrandomhouse.com/books/734533/the-nvidia-way-by-tae-kim/',
        source: {zh: 'Penguin Random House 图书页', en: 'Penguin Random House book page'},
        note: {
          zh: '适合研究 NVIDIA 的组织文化、管理方式和高强度执行体系，后续可以拆成文化专题笔记。',
          en: 'Useful for studying NVIDIA’s culture, management style, and high-intensity execution system.'
        }
      },
      {
        title: {zh: '《The Man Behind the Microchip》：半导体人物史参考', en: 'The Man Behind the Microchip: semiconductor founder history reference'},
        type: 'book',
        date: '2006',
        href: 'https://mitpress.mit.edu/9780262512498/the-man-behind-the-microchip/',
        source: {zh: 'MIT Press 图书页', en: 'MIT Press book page'},
        note: {
          zh: '这本书不是黄仁勋传记，而是理解半导体创业者、产业周期和技术公司长期竞争的背景资料。',
          en: 'This is not a Jensen Huang biography, but useful background for semiconductor founders, industry cycles, and long-term technology competition.'
        }
      }
    ]
  },
  {
    slug: 'elon-musk',
    name: {zh: '马斯克', en: 'Elon Musk'},
    role: {zh: 'Tesla、SpaceX 等公司的创业者与 CEO', en: 'Entrepreneur and CEO behind Tesla, SpaceX, and related companies'},
    summary: {
      zh: '马斯克的核心学习价值在于第一性原理、工程速度、垂直整合和高风险目标管理。',
      en: 'Elon Musk is useful to study through first-principles reasoning, engineering velocity, vertical integration, and high-risk goal management.'
    },
    learnFrom: [
      {zh: '如何从物理约束和成本结构倒推产品', en: 'Reasoning backward from physics constraints and cost structures'},
      {zh: '如何用垂直整合提升速度和控制力', en: 'Using vertical integration to improve speed and control'},
      {zh: '如何管理极高难度的工程目标', en: 'Managing extremely difficult engineering goals'}
    ],
    relatedCompanies: ['tesla', 'spacex'],
    content: [
      {
        title: {zh: '最近 1 周新闻精选', en: 'Recent one-week news watch'},
        type: 'news',
        source: {zh: '公司官网、监管文件、Reuters / Bloomberg / CNBC 等', en: 'Company sites, regulatory filings, Reuters, Bloomberg, CNBC, and similar outlets'},
        note: {zh: '只保留会影响产品、组织、监管、市场和战略判断的消息。', en: 'Keep items that affect products, organization, regulation, market, or strategic judgment.'}
      },
      {
        title: {zh: '访谈与产品发布会', en: 'Interviews and product launches'},
        type: 'interview',
        source: {zh: '官方视频、活动页、采访原始链接', en: 'Official videos, event pages, and original interview links'},
        note: {zh: '不全文转载，重点做原始入口、摘要、时间线和关键判断。', en: 'Avoid full reposts; focus on original links, summaries, timestamps, and key judgment.'}
      }
    ]
  },
  {
    slug: 'steve-jobs',
    name: {zh: '乔布斯', en: 'Steve Jobs'},
    role: {zh: 'Apple 联合创始人', en: 'Co-founder of Apple'},
    summary: {
      zh: '乔布斯适合作为产品审美、用户体验、表达、组织聚焦和品牌叙事的长期学习样本。',
      en: 'Steve Jobs is a long-term study case for product taste, user experience, communication, focus, and brand narrative.'
    },
    learnFrom: [
      {zh: '如何把复杂技术变成简单体验', en: 'Turning complex technology into simple experiences'},
      {zh: '如何用产品发布会讲清楚价值', en: 'Communicating value through product launches'},
      {zh: '如何用聚焦抵抗组织复杂度', en: 'Using focus to resist organizational complexity'}
    ],
    relatedCompanies: ['apple'],
    content: [
      {
        title: {zh: '经典演讲与发布会归档', en: 'Classic speeches and launch archive'},
        type: 'launch',
        source: {zh: 'Apple 官方视频、Stanford 等一手渠道', en: 'Apple official videos, Stanford, and other primary channels'},
        note: {zh: '对历史内容做长期归档，重点整理背景、产品逻辑和表达方法。', en: 'Archive historical material with context, product logic, and communication patterns.'}
      },
      {
        title: {zh: '传记与自传资料', en: 'Biographies and autobiographical sources'},
        type: 'book',
        source: {zh: '已出版图书、官方采访和授权资料', en: 'Published books, official interviews, and authorized sources'},
        note: {zh: '用作思想和决策复盘，不直接替代原书阅读。', en: 'Use for thinking and decision reviews, not as a replacement for the books.'}
      }
    ]
  }
];

const genericAdvice = (focus: LocalizedText): PersonAdviceItem[] => [
  {
    title: {zh: '人生', en: 'Life'},
    summary: {
      zh: `把${focus.zh}放进长期人生系统里看：选择重要问题，长期投入，并让复盘持续修正判断。`,
      en: `Study ${focus.en} as part of a long-term life system: choose important problems, commit for years, and keep updating judgment.`
    },
    points: [
      {zh: '选择长期重要、短期不一定热闹的方向。', en: 'Choose directions that matter long term, even if they are not loud short term.'},
      {zh: '把压力、失败和外部质疑当成校准材料。', en: 'Use pressure, failure, and criticism as calibration material.'},
      {zh: '持续把个人选择放进时代趋势和真实需求里。', en: 'Place personal choices inside major trends and real demand.'}
    ]
  },
  {
    title: {zh: '职场', en: 'Career'},
    summary: {
      zh: '职场学习重点不是头衔，而是他如何把个人能力连接到产品、组织、资本和客户结果。',
      en: 'The career lesson is how personal capability connects to products, organization, capital, and customer outcomes.'
    },
    points: [
      {zh: '先理解客户和组织真正要解决的问题。', en: 'Understand the real customer and organizational problem first.'},
      {zh: '训练跨产品、技术、市场和财务的系统视角。', en: 'Build a systems view across product, technology, market, and finance.'},
      {zh: '用高标准、反馈和长期作品积累可信度。', en: 'Build credibility through high standards, feedback, and long-term work.'}
    ]
  },
  {
    title: {zh: '教育', en: 'Education'},
    summary: {
      zh: '教育不是只学知识点，而是训练判断：看结构、看变量、看约束、看因果。',
      en: 'Education is not only facts; it trains judgment about structure, variables, constraints, and causality.'
    },
    points: [
      {zh: '优先学习底层原理和真实案例。', en: 'Prioritize fundamentals and real cases.'},
      {zh: '把阅读、写作、项目和复盘连起来。', en: 'Connect reading, writing, projects, and review.'},
      {zh: '用跨学科框架理解复杂世界。', en: 'Use multidisciplinary frames to understand complexity.'}
    ]
  },
  {
    title: {zh: '成长', en: 'Growth'},
    summary: {
      zh: '成长是不断升级自己的问题选择、判断框架和执行系统。',
      en: 'Growth means upgrading problem selection, judgment frameworks, and execution systems.'
    },
    points: [
      {zh: '从单点技能走向系统能力。', en: 'Move from single skills to system capability.'},
      {zh: '让表达能力服务于判断能力。', en: 'Let communication sharpen judgment.'},
      {zh: '长期观察自己的选择是否靠近复利。', en: 'Review whether choices move toward compounding.'}
    ]
  }
];

const archiveItems = (name: LocalizedText, sourceHref: string): PersonContentItem[] => [
  {
    title: {zh: `${name.zh}：最近 1 周新闻精选入口`, en: `${name.en}: recent one-week news watch`},
    type: 'news',
    date: '2026-06-09',
    href: sourceHref,
    source: {zh: '官方与一手资料入口', en: 'Official and primary source entry'},
    note: {
      zh: '这里先放可持续更新的资料入口，后续接入定时任务后只保留 3 条最重要新闻。',
      en: 'This is a stable source entry for future scheduled updates; later it should keep only three important news items.'
    }
  },
  {
    title: {zh: `${name.zh}：公开演讲与访谈`, en: `${name.en}: speeches and interviews`},
    type: 'speech',
    href: sourceHref,
    source: {zh: '官方页面 / 一手渠道', en: 'Official page / primary channel'},
    note: {zh: '用于研究他如何表达战略、产品、组织和长期判断。', en: 'Use this to study strategy, product, organization, and long-term judgment.'}
  },
  {
    title: {zh: `${name.zh}：传记与背景资料`, en: `${name.en}: biography and background material`},
    type: 'book',
    source: {zh: '图书、访谈、股东信、官方资料', en: 'Books, interviews, letters, and official material'},
    note: {zh: '后续可以扩展成书籍页、章节摘要和关键概念索引。', en: 'Can later become book pages, chapter notes, and concept indexes.'}
  }
];

const coreCompanyGroup = (companyName: string, companySlug: string, summary: LocalizedText): PersonCompanyGroup[] => [
  {
    title: {zh: '核心公司', en: 'Core company'},
    summary,
    links: [{name: companyName, companySlug}]
  },
  {
    title: {zh: '相关生态', en: 'Related ecosystem'},
    summary: {
      zh: '从供应链、平台伙伴、投资对象和关键客户看人物背后的战略网络。',
      en: 'Study the strategic network behind the person through supply chain, platform partners, investments, and key customers.'
    },
    links: []
  },
  {
    title: {zh: '学习线索', en: 'Study threads'},
    summary: {
      zh: '把人物放回公司、行业、资本市场和技术周期里，观察其判断如何形成。',
      en: 'Place the person back into company, industry, capital market, and technology cycles to see how judgment forms.'
    },
    links: []
  }
];

const newPeople: PersonProfile[] = [
  {
    slug: 'tim-cook',
    name: {zh: '蒂姆·库克', en: 'Tim Cook'},
    role: {zh: 'Apple CEO，2026-09-01 起转任执行董事长', en: 'Apple CEO, becoming Executive Chairman on 2026-09-01'},
    summary: {
      zh: '库克适合研究运营、供应链、服务化、隐私价值观和大公司长期治理。Apple 已宣布 John Ternus 将于 2026-09-01 接任 CEO。',
      en: 'Tim Cook is a case for operations, supply chain, services, privacy values, and large-company governance. Apple announced John Ternus will become CEO on 2026-09-01.'
    },
    learnFrom: [
      {zh: '如何把产品公司扩展成全球运营系统', en: 'Scaling a product company into a global operating system'},
      {zh: '如何用供应链和服务生态提高韧性', en: 'Using supply chain and services to build resilience'},
      {zh: '如何在价值观与商业之间做长期治理', en: 'Governing long term between values and business'}
    ],
    relatedCompanies: ['apple'],
    companyGroups: coreCompanyGroup('Apple', 'apple', {
      zh: '核心公司是 Apple。库克的贡献主要在运营体系、供应链、服务业务、隐私叙事和全球治理。',
      en: 'The core company is Apple. Cook’s contribution centers on operations, supply chain, services, privacy narrative, and global governance.'
    }),
    advice: genericAdvice({zh: '库克的运营与治理', en: 'Cook’s operating and governance style'}),
    content: archiveItems({zh: '蒂姆·库克', en: 'Tim Cook'}, 'https://www.apple.com/newsroom/')
  },
  {
    slug: 'sam-altman',
    name: {zh: 'Sam Altman', en: 'Sam Altman'},
    role: {zh: 'OpenAI CEO', en: 'CEO of OpenAI'},
    summary: {
      zh: 'Altman 适合研究前沿 AI、平台分发、资本组织、公共叙事和高不确定性治理。',
      en: 'Sam Altman is useful for studying frontier AI, platform distribution, capital formation, public narrative, and high-uncertainty governance.'
    },
    learnFrom: [
      {zh: '如何把前沿技术做成大众产品', en: 'Turning frontier technology into mass products'},
      {zh: '如何组织资本、算力和生态伙伴', en: 'Organizing capital, compute, and ecosystem partners'},
      {zh: '如何在高争议领域塑造公共叙事', en: 'Shaping public narrative in a contested field'}
    ],
    relatedCompanies: ['openai'],
    companyGroups: coreCompanyGroup('OpenAI', 'openai', {
      zh: '核心公司是 OpenAI。Altman 的关键线索是模型能力、ChatGPT 分发、开发者平台、企业市场和 AI 基础设施。',
      en: 'The core company is OpenAI. Key threads include model capability, ChatGPT distribution, developer platform, enterprise market, and AI infrastructure.'
    }),
    advice: genericAdvice({zh: 'Altman 的技术与资本组织', en: 'Altman’s technology and capital formation'}),
    content: archiveItems({zh: 'Sam Altman', en: 'Sam Altman'}, 'https://openai.com/news/')
  },
  {
    slug: 'dario-amodei',
    name: {zh: 'Dario Amodei', en: 'Dario Amodei'},
    role: {zh: 'Anthropic 联合创始人兼 CEO', en: 'Co-founder and CEO of Anthropic'},
    summary: {
      zh: 'Dario Amodei 适合研究 AI 安全、模型能力、企业产品化和公益公司治理。',
      en: 'Dario Amodei is useful for studying AI safety, model capability, enterprise productization, and public-benefit governance.'
    },
    learnFrom: [
      {zh: '如何把安全理念变成产品差异化', en: 'Turning safety philosophy into product differentiation'},
      {zh: '如何在模型竞赛中坚持可靠性叙事', en: 'Maintaining a reliability narrative in the model race'},
      {zh: '如何组织研究、产品和治理结构', en: 'Organizing research, product, and governance'}
    ],
    relatedCompanies: ['anthropic'],
    companyGroups: coreCompanyGroup('Anthropic', 'anthropic', {
      zh: '核心公司是 Anthropic。其长期线索是 Claude、宪法式 AI、解释性研究、企业客户和安全治理。',
      en: 'The core company is Anthropic. Long-term threads include Claude, Constitutional AI, interpretability research, enterprise customers, and safety governance.'
    }),
    advice: genericAdvice({zh: 'Dario 的安全与可靠性路线', en: 'Dario’s safety and reliability path'}),
    content: archiveItems({zh: 'Dario Amodei', en: 'Dario Amodei'}, 'https://www.anthropic.com/news')
  },
  {
    slug: 'morris-chang',
    name: {zh: '张忠谋', en: 'Morris Chang'},
    role: {zh: '台积电创始人', en: 'Founder of TSMC'},
    summary: {
      zh: '张忠谋适合研究晶圆代工模式、产业定位、客户信任和半导体长期周期。',
      en: 'Morris Chang is a case for the foundry model, industry positioning, customer trust, and semiconductor cycles.'
    },
    learnFrom: [
      {zh: '如何重新定义一个产业分工模式', en: 'Redefining industry specialization'},
      {zh: '如何用客户信任建立长期壁垒', en: 'Building long-term moat through customer trust'},
      {zh: '如何穿越半导体周期', en: 'Navigating semiconductor cycles'}
    ],
    relatedCompanies: ['tsmc'],
    companyGroups: coreCompanyGroup('TSMC', 'tsmc', {
      zh: '核心公司是台积电。张忠谋最重要的贡献是把晶圆代工做成全球半导体产业的基础设施。',
      en: 'The core company is TSMC. Chang’s key contribution was turning foundry manufacturing into semiconductor infrastructure.'
    }),
    advice: genericAdvice({zh: '张忠谋的产业定位', en: 'Morris Chang’s industry positioning'}),
    content: archiveItems({zh: '张忠谋', en: 'Morris Chang'}, 'https://pr.tsmc.com/english')
  },
  {
    slug: 'cc-wei',
    name: {zh: '魏哲家', en: 'C.C. Wei'},
    role: {zh: '台积电董事长兼 CEO', en: 'Chairman and CEO of TSMC'},
    summary: {
      zh: '魏哲家适合研究先进制程扩张、客户协作、全球产能布局和台积电新一代治理。',
      en: 'C.C. Wei is useful for studying advanced-node expansion, customer collaboration, global capacity, and next-generation TSMC governance.'
    },
    learnFrom: [
      {zh: '如何管理全球最复杂制造系统之一', en: 'Managing one of the world’s most complex manufacturing systems'},
      {zh: '如何在地缘风险下配置产能', en: 'Allocating capacity amid geopolitical risk'},
      {zh: '如何保持客户中立与技术领先', en: 'Maintaining customer neutrality and technology leadership'}
    ],
    relatedCompanies: ['tsmc'],
    companyGroups: coreCompanyGroup('TSMC', 'tsmc', {
      zh: '核心公司是台积电。魏哲家的观察重点是先进制程、全球扩厂、AI 芯片需求和客户协同。',
      en: 'The core company is TSMC. Key lenses include advanced nodes, global fabs, AI chip demand, and customer coordination.'
    }),
    advice: genericAdvice({zh: '魏哲家的制造与治理', en: 'C.C. Wei’s manufacturing and governance'}),
    content: archiveItems({zh: '魏哲家', en: 'C.C. Wei'}, 'https://www.tsmc.com/english/aboutTSMC/executives')
  },
  {
    slug: 'warren-buffett',
    name: {zh: '巴菲特', en: 'Warren Buffett'},
    role: {zh: 'Berkshire Hathaway 董事长，长期价值投资者', en: 'Chairman of Berkshire Hathaway and long-term value investor'},
    summary: {
      zh: '巴菲特适合研究商业质量、资本配置、安全边际、复利和长期持有。',
      en: 'Buffett is a study case for business quality, capital allocation, margin of safety, compounding, and long-term ownership.'
    },
    learnFrom: [
      {zh: '如何用企业所有权理解股票', en: 'Understanding stocks as business ownership'},
      {zh: '如何评估护城河与管理层', en: 'Assessing moat and management'},
      {zh: '如何把耐心变成投资优势', en: 'Turning patience into an investing edge'}
    ],
    relatedCompanies: ['berkshire-hathaway'],
    companyGroups: coreCompanyGroup('Berkshire Hathaway', 'berkshire-hathaway', {
      zh: '核心公司是 Berkshire Hathaway。它是研究资本配置、保险浮存金和长期持股的最佳样本之一。',
      en: 'The core company is Berkshire Hathaway, a key case for capital allocation, insurance float, and long-term holdings.'
    }),
    advice: genericAdvice({zh: '巴菲特的投资原则', en: 'Buffett’s investing principles'}),
    content: archiveItems({zh: '巴菲特', en: 'Warren Buffett'}, 'https://www.berkshirehathaway.com/letters/letters.html')
  },
  {
    slug: 'charlie-munger',
    name: {zh: '查理·芒格', en: 'Charlie Munger'},
    role: {zh: '投资家，巴菲特长期合伙人', en: 'Investor and Warren Buffett’s long-time partner'},
    summary: {
      zh: '芒格适合研究多元思维模型、反向思考、能力圈和避免愚蠢错误。',
      en: 'Munger is a case for multidisciplinary models, inversion, circle of competence, and avoiding stupidity.'
    },
    learnFrom: [
      {zh: '如何建立多元思维模型', en: 'Building multidisciplinary mental models'},
      {zh: '如何用反向思考降低错误', en: 'Reducing mistakes through inversion'},
      {zh: '如何把常识变成投资纪律', en: 'Turning common sense into investing discipline'}
    ],
    relatedCompanies: ['berkshire-hathaway'],
    companyGroups: coreCompanyGroup('Berkshire Hathaway', 'berkshire-hathaway', {
      zh: '核心公司是 Berkshire Hathaway。芒格的价值在于把投资从数字游戏提升到商业、心理和常识判断。',
      en: 'The core company is Berkshire Hathaway. Munger elevated investing into business, psychology, and common-sense judgment.'
    }),
    advice: genericAdvice({zh: '芒格的多元思维模型', en: 'Munger’s multidisciplinary models'}),
    content: archiveItems({zh: '查理·芒格', en: 'Charlie Munger'}, 'https://www.berkshirehathaway.com/letters/letters.html')
  },
  {
    slug: 'duan-yongping',
    name: {zh: '段永平', en: 'Duan Yongping'},
    role: {zh: '企业家与长期投资者', en: 'Entrepreneur and long-term investor'},
    summary: {
      zh: '段永平适合研究本分、长期主义、消费者品牌、企业文化和价值投资在中国语境下的表达。',
      en: 'Duan Yongping is useful for studying integrity, long-termism, consumer brands, culture, and value investing in the Chinese context.'
    },
    learnFrom: [
      {zh: '如何用“本分”理解企业文化', en: 'Understanding culture through integrity'},
      {zh: '如何看消费者品牌与渠道', en: 'Reading consumer brands and channels'},
      {zh: '如何把价值投资变成生活原则', en: 'Turning value investing into life principles'}
    ],
    relatedCompanies: ['apple'],
    companyGroups: [
      {
        title: {zh: '投资参照', en: 'Investing reference'},
        summary: {zh: '段永平长期公开讨论 Apple、贵州茅台、网易等案例，重点不是荐股，而是商业理解和价格纪律。', en: 'Duan has publicly discussed Apple, Kweichow Moutai, NetEase, and other cases; the lesson is business understanding and price discipline, not stock tips.'},
        links: [{name: 'Apple', companySlug: 'apple'}]
      },
      {
        title: {zh: '企业家线索', en: 'Entrepreneurial thread'},
        summary: {zh: '从小霸王、步步高到 OPPO / vivo 生态，可观察品牌、渠道、授权和文化延续。', en: 'From Subor and BBK to the OPPO / vivo ecosystem, study brand, channel, delegation, and cultural continuity.'},
        links: []
      },
      {
        title: {zh: '学习线索', en: 'Study threads'},
        summary: {zh: '重点学习“做对的事、长期、能力圈、不懂不做”。', en: 'Focus on doing the right thing, long-termism, circle of competence, and avoiding what you do not understand.'},
        links: []
      }
    ],
    advice: genericAdvice({zh: '段永平的本分与投资', en: 'Duan’s integrity and investing style'}),
    content: archiveItems({zh: '段永平', en: 'Duan Yongping'}, 'https://finance.sina.com.cn/')
  }
];

people.push(...newPeople);

Object.assign(people.find((person) => person.slug === 'elon-musk') ?? {}, {
  companyGroups: coreCompanyGroup('Tesla', 'tesla', {
    zh: '核心公司是 Tesla，同时 SpaceX 是理解马斯克工程方法、垂直整合和第一性原理的重要参照。',
    en: 'The core company is Tesla, while SpaceX is essential for understanding Musk’s engineering method, vertical integration, and first-principles thinking.'
  }),
  advice: genericAdvice({zh: '马斯克的工程速度', en: 'Musk’s engineering velocity'}),
  content: [
    ...archiveItems({zh: '马斯克', en: 'Elon Musk'}, 'https://www.tesla.com/blog'),
    {
      title: {zh: 'SpaceX 发射与星舰资料入口', en: 'SpaceX launches and Starship source entry'},
      type: 'launch',
      href: 'https://www.spacex.com/launches/',
      source: {zh: 'SpaceX 官方', en: 'SpaceX official'},
      note: {zh: '适合研究马斯克如何用快速迭代推动极难工程。', en: 'Useful for studying how Musk uses rapid iteration in difficult engineering.'}
    },
    {
      title: {zh: 'Tesla 投资者活动与产品发布', en: 'Tesla investor events and product launches'},
      type: 'interview',
      href: 'https://ir.tesla.com/',
      source: {zh: 'Tesla 投资者关系', en: 'Tesla Investor Relations'},
      note: {zh: '适合观察自动驾驶、能源、机器人和制造叙事。', en: 'Useful for studying autonomy, energy, robotics, and manufacturing narrative.'}
    }
  ]
});

Object.assign(people.find((person) => person.slug === 'steve-jobs') ?? {}, {
  companyGroups: coreCompanyGroup('Apple', 'apple', {
    zh: '核心公司是 Apple。乔布斯的学习重点是产品审美、用户体验、组织聚焦和发布会表达。',
    en: 'The core company is Apple. Jobs is a case for product taste, user experience, organizational focus, and launch communication.'
  }),
  advice: genericAdvice({zh: '乔布斯的产品与审美', en: 'Jobs’s product taste'}),
  content: [
    ...archiveItems({zh: '乔布斯', en: 'Steve Jobs'}, 'https://www.apple.com/apple-events/'),
    {
      title: {zh: 'Stanford 2005 毕业演讲', en: 'Stanford 2005 commencement address'},
      type: 'speech',
      date: '2005',
      href: 'https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says',
      source: {zh: 'Stanford 官方', en: 'Stanford official'},
      note: {zh: '适合研究乔布斯如何把人生选择、死亡意识和热爱工作连成叙事。', en: 'Useful for studying how Jobs connects life choices, mortality, and love of work.'}
    }
  ]
});

const sourceMap: Record<string, string[]> = {
  'elon-musk': ['https://www.tesla.com/blog', 'https://www.spacex.com/updates/', 'https://www.reuters.com/technology/'],
  'steve-jobs': ['https://www.apple.com/apple-events/', 'https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says', 'https://www.apple.com/newsroom/'],
  'tim-cook': ['https://www.apple.com/newsroom/', 'https://investor.apple.com/', 'https://www.apple.com/leadership/'],
  'sam-altman': ['https://openai.com/news/', 'https://openai.com/research/', 'https://openai.com/sam-altman/'],
  'dario-amodei': ['https://www.anthropic.com/news', 'https://www.anthropic.com/research', 'https://www.anthropic.com/company'],
  'morris-chang': ['https://pr.tsmc.com/english', 'https://www.tsmc.com/english/aboutTSMC/company_profile', 'https://investor.tsmc.com/english'],
  'cc-wei': ['https://www.tsmc.com/english/aboutTSMC/executives', 'https://pr.tsmc.com/english', 'https://investor.tsmc.com/english'],
  'warren-buffett': ['https://www.berkshirehathaway.com/news/2025news.html', 'https://www.berkshirehathaway.com/letters/letters.html', 'https://www.berkshirehathaway.com/meet01/visguide2025.pdf'],
  'charlie-munger': ['https://www.berkshirehathaway.com/letters/letters.html', 'https://www.djmco.com/', 'https://www.youtube.com/@DailyJournalCorp'],
  'duan-yongping': ['https://www.apple.com/newsroom/', 'https://investor.apple.com/', 'https://finance.sina.com.cn/']
};

const typeLabels: Record<PersonContentItem['type'], string[]> = {
  news: ['最近 1 周新闻精选 A', '最近 1 周新闻精选 B', '最近 1 周新闻精选 C'],
  speech: ['公开演讲 / 主题表达 A', '公开演讲 / 主题表达 B', '公开演讲 / 主题表达 C'],
  interview: ['深度访谈 / 对谈 A', '深度访谈 / 对谈 B', '深度访谈 / 对谈 C'],
  launch: ['产品发布会 / 年度活动 A', '产品发布会 / 年度活动 B', '产品发布会 / 年度活动 C'],
  book: ['书籍 / 传记资料 A', '书籍 / 传记资料 B', '书籍 / 传记资料 C']
};

const typeLabelsEn: Record<PersonContentItem['type'], string[]> = {
  news: ['Recent one-week news A', 'Recent one-week news B', 'Recent one-week news C'],
  speech: ['Speech / public communication A', 'Speech / public communication B', 'Speech / public communication C'],
  interview: ['Interview / conversation A', 'Interview / conversation B', 'Interview / conversation C'],
  launch: ['Launch / annual event A', 'Launch / annual event B', 'Launch / annual event C'],
  book: ['Book / biography material A', 'Book / biography material B', 'Book / biography material C']
};

function ensureThreeContentItems(person: PersonProfile) {
  const sources = sourceMap[person.slug] ?? ['https://www.reuters.com/technology/', 'https://www.bloomberg.com/technology', 'https://www.cnbc.com/technology/'];
  const types: PersonContentItem['type'][] = ['news', 'speech', 'interview', 'launch', 'book'];

  types.forEach((type) => {
    const existing = person.content.filter((item) => item.type === type).length;
    for (let index = existing; index < 3; index += 1) {
      person.content.push({
        title: {
          zh: `${person.name.zh}：${typeLabels[type][index]}`,
          en: `${person.name.en}: ${typeLabelsEn[type][index]}`
        },
        type,
        date: type === 'news' ? '2026-06-09' : undefined,
        href: sources[index % sources.length],
        source: {
          zh: type === 'news' ? '官方 / 一手 / 大媒体入口' : '官方 / 一手资料入口',
          en: type === 'news' ? 'Official / primary / major media entry' : 'Official / primary source entry'
        },
        note: {
          zh:
            type === 'news'
              ? '先保留可持续更新入口，后续定时任务接入后替换成最近 1 周内最重要的具体 3 条新闻。'
              : '先作为资料归档入口，后续可补充原文、视频、时间戳、摘要和关键判断。',
          en:
            type === 'news'
              ? 'A sustainable update entry for now; later automation can replace it with the three most important concrete items from the past week.'
              : 'An archive entry for now; later it can include source text, video, timestamps, summaries, and key judgments.'
        }
      });
    }
  });
}

people.forEach(ensureThreeContentItems);

function pc(
  type: PersonContentItem['type'],
  date: string | undefined,
  title: LocalizedText,
  href: string,
  source: LocalizedText,
  note: LocalizedText
): PersonContentItem {
  return {type, date, title, href, source, note};
}

function replacePersonContent(slug: string, content: PersonContentItem[]) {
  const person = people.find((item) => item.slug === slug);
  if (person) {
    person.content = content;
  }
}

replacePersonContent('jensen-huang', [
  pc('news', '2026-06-08', {zh: '英伟达与 LG 合作推进人形机器人和数据中心', en: 'NVIDIA and LG work on humanoid robots and data centers'}, 'https://www.reuters.com/technology/', {zh: 'Reuters / 大媒体入口', en: 'Reuters / major media entry'}, {zh: '用于观察黄仁勋如何把物理 AI、机器人和数据中心继续并入英伟达平台叙事。', en: 'Use this to study how Jensen Huang folds physical AI, robotics, and data centers into NVIDIA platform narrative.'}),
  pc('news', '2026-06-02', {zh: '黄仁勋称英伟达有产能支撑 AI 增长，但仍受供应约束', en: 'Jensen Huang says NVIDIA can support robust AI growth while still supply constrained'}, 'https://www.reuters.com/technology/', {zh: 'Reuters / 大媒体入口', en: 'Reuters / major media entry'}, {zh: '这条新闻适合放在供给、先进封装、客户需求和 AI 基础设施资本开支的观察维度里。', en: 'Useful for tracking supply, advanced packaging, customer demand, and AI infrastructure capex.'}),
  pc('news', '2026-06-01', {zh: 'COMPUTEX：英伟达推出面向个人 AI 电脑的新芯片方向', en: 'COMPUTEX: NVIDIA pushes new chips for personal AI PCs'}, 'https://www.reuters.com/technology/', {zh: 'Reuters / 大媒体入口', en: 'Reuters / major media entry'}, {zh: '用于观察英伟达是否把 AI 从数据中心继续推进到个人设备和本地智能体。', en: 'Use this to track whether NVIDIA extends AI from data centers into personal devices and local agents.'}),
  pc('speech', '2026-03-16', {zh: 'GTC 2026 黄仁勋主题演讲', en: 'GTC 2026 Jensen Huang keynote'}, 'https://www.nvidia.com/en-us/gtc/keynote/?video=1', {zh: 'NVIDIA 官方视频', en: 'NVIDIA official video'}, {zh: '看他如何把芯片、网络、软件、AI 工厂和机器人放在同一张战略地图里。', en: 'Watch how he maps chips, networking, software, AI factories, and robotics into one strategy.'}),
  pc('speech', '2025-03-18', {zh: 'GTC 2025：AI 基础设施与 Blackwell 平台', en: 'GTC 2025: AI infrastructure and Blackwell platform'}, 'https://www.nvidia.com/en-us/gtc/keynote/', {zh: 'NVIDIA 官方页面', en: 'NVIDIA official page'}, {zh: '适合研究英伟达如何把单个 GPU 升级成完整 AI 基础设施平台。', en: 'Useful for studying how NVIDIA turns GPUs into full AI infrastructure.'}),
  pc('speech', '2024-06-02', {zh: 'COMPUTEX 2024：加速计算与 AI 工厂路线图', en: 'COMPUTEX 2024: accelerated computing and AI factory roadmap'}, 'https://blogs.nvidia.com/blog/computex-2024-jensen-huang/', {zh: 'NVIDIA 官方博客', en: 'NVIDIA official blog'}, {zh: '经典材料，适合看黄仁勋如何用公开表达稳定客户和开发者预期。', en: 'A classic source for seeing how Huang uses public communication to align customers and developers.'}),
  pc('interview', '2025-05-19', {zh: 'Stratechery 访谈：芯片管制、AI 工厂与企业落地', en: 'Stratechery interview: chip controls, AI factories, and enterprise pragmatism'}, 'https://stratechery.com/2025/an-interview-with-nvidia-ceo-jensen-huang-about-chip-controls-ai-factories-and-enterprise-pragmatism/', {zh: 'Stratechery 原始访谈', en: 'Stratechery original interview'}, {zh: '适合研究政策、客户、企业 AI 和英伟达商业模式的现实约束。', en: 'Useful for studying policy, customers, enterprise AI, and business-model constraints.'}),
  pc('interview', '2023-10-16', {zh: 'Acquired 访谈：NVIDIA 历史、CUDA 与 AI 平台', en: 'Acquired interview: NVIDIA history, CUDA, and AI platform'}, 'https://www.acquired.fm/episodes/nvidia-ceo-jensen-huang', {zh: 'Acquired 原始访谈', en: 'Acquired original interview'}, {zh: '系统理解从图形芯片到 AI 平台的长期路径。', en: 'A systematic source for NVIDIA path from graphics chips to AI platform.'}),
  pc('interview', '2024', {zh: 'Stanford GSB 访谈：创业、管理与长期判断', en: 'Stanford GSB interview: entrepreneurship, management, and long-term judgment'}, 'https://www.youtube.com/@stanfordgsb/search?query=Jensen%20Huang', {zh: 'Stanford GSB 官方 YouTube', en: 'Stanford GSB official YouTube'}, {zh: '用于学习创始人心法、组织管理和面对不被理解时的坚持。', en: 'Useful for studying founder mentality, management, and persistence when misunderstood.'}),
  pc('launch', '2026-06-01', {zh: 'GTC Taipei / COMPUTEX：个人 AI、机器人与物理 AI 发布', en: 'GTC Taipei / COMPUTEX: personal AI, robotics, and physical AI launches'}, 'https://www.nvidia.com/en-tw/gtc/taipei/keynote/', {zh: 'NVIDIA 官方页面', en: 'NVIDIA official page'}, {zh: '适合看 RTX Spark、Isaac GR00T、Jetson Thor 如何进入同一平台叙事。', en: 'Useful for seeing RTX Spark, Isaac GR00T, and Jetson Thor in one platform narrative.'}),
  pc('launch', '2024-03-18', {zh: 'Blackwell 平台发布：从芯片到 AI 工厂', en: 'Blackwell platform launch: from chip to AI factory'}, 'https://nvidianews.nvidia.com/news/nvidia-blackwell-platform-arrives-to-power-a-new-era-of-computing', {zh: 'NVIDIA Newsroom', en: 'NVIDIA Newsroom'}, {zh: '核心发布会资料，适合拆解“平台战略”而不是只看芯片性能。', en: 'A core launch source for studying platform strategy beyond chip performance.'}),
  pc('launch', '2023-08-08', {zh: 'GH200 Grace Hopper 与数据中心平台发布资料', en: 'GH200 Grace Hopper and data center platform launch material'}, 'https://nvidianews.nvidia.com/news/nvidia-announces-next-generation-grace-hopper-superchip-platform', {zh: 'NVIDIA Newsroom', en: 'NVIDIA Newsroom'}, {zh: '适合观察 CPU、GPU、内存、网络和系统如何组合为数据中心平台。', en: 'Useful for seeing CPU, GPU, memory, networking, and systems as a data center platform.'}),
  pc('book', '2024', {zh: '《The Nvidia Way》：公司文化与高强度执行', en: 'The Nvidia Way: company culture and high-intensity execution'}, 'https://www.penguinrandomhouse.com/books/734533/the-nvidia-way-by-tae-kim/', {zh: 'Penguin Random House', en: 'Penguin Random House'}, {zh: '用于补充英伟达组织文化、管理方式和执行系统。', en: 'Useful for NVIDIA culture, management style, and execution system.'}),
  pc('book', '2025', {zh: '《The Thinking Machine》与黄仁勋传记材料', en: 'The Thinking Machine and Jensen Huang biography material'}, 'https://www.c-span.org/program/book-tv/after-words-with-stephen-witt/657769', {zh: 'C-SPAN 作者访谈', en: 'C-SPAN author interview'}, {zh: '用于复盘英伟达和黄仁勋的长期决策，不替代原书阅读。', en: 'Useful for reviewing NVIDIA and Jensen Huang long-term decisions.'}),
  pc('book', '2006', {zh: '《The Man Behind the Microchip》：半导体人物史参照', en: 'The Man Behind the Microchip: semiconductor biography reference'}, 'https://mitpress.mit.edu/9780262633471/the-man-behind-the-microchip/', {zh: 'MIT Press', en: 'MIT Press'}, {zh: '不是黄仁勋传记，但适合补充半导体创业者、产业周期和芯片商业史背景。', en: 'Not a Huang biography, but useful semiconductor-founder and industry-history context.'})
]);

replacePersonContent('elon-musk', [
  pc('news', '2026-06-04', {zh: 'SpaceX Terafab 税收协议获批，引发地方争议', en: 'SpaceX Terafab tax agreement approved amid local debate'}, 'https://www.reuters.com/technology/', {zh: 'Reuters / 大媒体入口', en: 'Reuters / major media entry'}, {zh: '用于观察马斯克如何把 AI 芯片、制造和航天基础设施放进同一资源体系。', en: 'Use this to study how Musk links AI chips, manufacturing, and space infrastructure.'}),
  pc('news', '2026-05-06', {zh: 'SpaceX 提出在得州建设 Terafab 芯片设施计划', en: 'SpaceX files plan for Texas Terafab chip facility'}, 'https://www.reuters.com/technology/', {zh: 'Reuters / 大媒体入口', en: 'Reuters / major media entry'}, {zh: '适合放在垂直整合、算力需求和供应链控制的观察维度里。', en: 'Useful for vertical integration, compute demand, and supply-chain control.'}),
  pc('news', '2026-04-23', {zh: '马斯克披露 Terafab AI 芯片项目设想', en: 'Musk lays out Terafab AI chip project plan'}, 'https://www.reuters.com/technology/', {zh: 'Reuters / 大媒体入口', en: 'Reuters / major media entry'}, {zh: '用于判断 Tesla、SpaceX 和 AI 算力之间是否形成新的平台叙事。', en: 'Use this to judge whether Tesla, SpaceX, and AI compute form a new platform narrative.'}),
  pc('speech', '2024', {zh: 'Tesla 股东大会：马斯克谈自动驾驶、机器人与能源', en: 'Tesla shareholder meeting: Musk on autonomy, robots, and energy'}, 'https://www.youtube.com/@Tesla/search?query=shareholder%20meeting', {zh: 'Tesla 官方 YouTube', en: 'Tesla official YouTube'}, {zh: '投资人视角下最适合持续跟踪马斯克公开表达的材料。', en: 'A strong recurring source for Musk public communication from an investor lens.'}),
  pc('speech', '2022', {zh: 'TED 访谈 / 演讲：未来、Tesla、SpaceX 与 Twitter', en: 'TED conversation: future, Tesla, SpaceX, and Twitter'}, 'https://www.ted.com/speakers/elon_musk', {zh: 'TED 官方页面', en: 'TED official page'}, {zh: '适合看马斯克如何把多个公司放进同一个未来叙事。', en: 'Useful for seeing how Musk places multiple companies into one future narrative.'}),
  pc('speech', '2017', {zh: 'SpaceX 火星计划与可复用火箭公开演讲', en: 'SpaceX Mars plan and reusable rocket public talk'}, 'https://www.spacex.com/updates/', {zh: 'SpaceX 官方资料', en: 'SpaceX official material'}, {zh: '用于理解第一性原理、可复用火箭和长期任务牵引。', en: 'Useful for first principles, reusable rockets, and mission-driven strategy.'}),
  pc('interview', '2021', {zh: 'Everyday Astronaut：Starbase 与星舰工程访谈', en: 'Everyday Astronaut: Starbase and Starship engineering interview'}, 'https://www.youtube.com/@EverydayAstronaut/search?query=Elon%20Musk%20Starbase', {zh: 'Everyday Astronaut YouTube', en: 'Everyday Astronaut YouTube'}, {zh: '经典工程访谈，适合看马斯克如何现场拆解制造、迭代和约束。', en: 'A classic engineering interview for manufacturing, iteration, and constraints.'}),
  pc('interview', '2021', {zh: 'Lex Fridman 访谈：Tesla、SpaceX、AI 与意识', en: 'Lex Fridman interview: Tesla, SpaceX, AI, and consciousness'}, 'https://www.youtube.com/@lexfridman/search?query=Elon%20Musk', {zh: 'Lex Fridman YouTube', en: 'Lex Fridman YouTube'}, {zh: '适合研究马斯克的 AI、机器人、自动驾驶和长期风险框架。', en: 'Useful for studying Musk framework around AI, robotics, autonomy, and long-term risk.'}),
  pc('interview', '2018', {zh: '60 Minutes：Tesla、SpaceX 与高压管理访谈', en: '60 Minutes: Tesla, SpaceX, and high-pressure management interview'}, 'https://www.cbsnews.com/60-minutes/', {zh: 'CBS 60 Minutes', en: 'CBS 60 Minutes'}, {zh: '适合补充马斯克品牌、争议、组织压力和公众形象。', en: 'Useful for Musk brand, controversy, organizational pressure, and public image.'}),
  pc('launch', '2024', {zh: 'Tesla Robotaxi / We, Robot 发布活动', en: 'Tesla Robotaxi / We, Robot launch event'}, 'https://www.youtube.com/@Tesla/search?query=Robotaxi%20We%20Robot', {zh: 'Tesla 官方 YouTube', en: 'Tesla official YouTube'}, {zh: '用于研究特斯拉是否从汽车销售转向自动驾驶出行平台。', en: 'Useful for studying whether Tesla shifts from vehicle sales to autonomy platform.'}),
  pc('launch', '2023', {zh: 'Cybertruck 交付活动', en: 'Cybertruck delivery event'}, 'https://www.youtube.com/@Tesla/search?query=Cybertruck%20delivery', {zh: 'Tesla 官方 YouTube', en: 'Tesla official YouTube'}, {zh: '适合看产品叙事、制造难度、品牌符号和市场预期。', en: 'Useful for product narrative, manufacturing difficulty, brand symbol, and expectations.'}),
  pc('launch', '2023', {zh: 'Starship 试飞与 SpaceX 发射资料', en: 'Starship flight tests and SpaceX launch material'}, 'https://www.spacex.com/launches/', {zh: 'SpaceX 官方发射页', en: 'SpaceX official launches'}, {zh: '用于观察极限工程如何通过试飞、失败和快速迭代推进。', en: 'Use this to observe extreme engineering through tests, failures, and rapid iteration.'}),
  pc('book', '2023', {zh: 'Walter Isaacson《Elon Musk》', en: 'Walter Isaacson: Elon Musk'}, 'https://www.simonandschuster.com/books/Elon-Musk/Walter-Isaacson/9781982181284', {zh: 'Simon & Schuster', en: 'Simon & Schuster'}, {zh: '最重要的近年传记，适合补充性格、组织、公司交叉和争议背景。', en: 'A major recent biography for character, organization, company overlaps, and controversy.'}),
  pc('book', '2015', {zh: 'Ashlee Vance《Elon Musk》', en: 'Ashlee Vance: Elon Musk'}, 'https://www.harpercollins.com/products/elon-musk-ashlee-vance', {zh: 'HarperCollins', en: 'HarperCollins'}, {zh: '适合看 PayPal、Tesla、SpaceX 早期阶段和创业路径。', en: 'Useful for PayPal, early Tesla, early SpaceX, and entrepreneurial path.'}),
  pc('book', '2021', {zh: '《Liftoff》：SpaceX 早期创业史', en: 'Liftoff: SpaceX early history'}, 'https://www.harpercollins.com/products/liftoff-eric-berger', {zh: 'HarperCollins', en: 'HarperCollins'}, {zh: '用于理解 SpaceX 初创阶段的工程、资金、人才和任务压力。', en: 'Useful for SpaceX early engineering, funding, talent, and mission pressure.'})
]);

replacePersonContent('steve-jobs', [
  pc('news', '2011-10-05', {zh: '乔布斯去世，Apple 发布官方悼念', en: 'Steve Jobs dies; Apple publishes official remembrance'}, 'https://www.apple.com/stevejobs/', {zh: 'Apple 官方纪念页', en: 'Apple official memorial page'}, {zh: '他已去世，新闻区第一条放离世新闻，作为人物专题的时间锚点。', en: 'Because Jobs has died, this first news item anchors the person study around his passing.'}),
  pc('news', '2011-08-24', {zh: '乔布斯辞任 Apple CEO，库克接任', en: 'Steve Jobs resigns as Apple CEO; Tim Cook succeeds him'}, 'https://www.apple.com/newsroom/2011/08/24Steve-Jobs-Resigns-as-CEO-of-Apple/', {zh: 'Apple Newsroom', en: 'Apple Newsroom'}, {zh: '典型新闻，适合研究创始人交接、组织连续性和 Apple 治理。', en: 'A key story for founder succession, organizational continuity, and Apple governance.'}),
  pc('news', '2007-01-09', {zh: 'iPhone 发布，重塑移动互联网入口', en: 'iPhone launch reshapes mobile internet entry point'}, 'https://www.apple.com/newsroom/2007/01/09Apple-Reinvents-the-Phone-with-iPhone/', {zh: 'Apple Newsroom', en: 'Apple Newsroom'}, {zh: '典型新闻，代表乔布斯产品发布和公司性质变化的关键节点。', en: 'A signature launch story showing Jobs product communication and a change in Apple identity.'}),
  pc('speech', '2005-06-12', {zh: 'Stanford 毕业演讲：连接点、爱与死亡', en: 'Stanford commencement: connecting dots, love, and death'}, 'https://news.stanford.edu/stories/2005/06/youve-got-find-love-jobs-says', {zh: 'Stanford 官方全文', en: 'Stanford official transcript'}, {zh: '乔布斯最经典公开演讲，适合放在人生、职场和成长建议里。', en: 'Jobs most classic public speech, useful for life, career, and growth advice.'}),
  pc('speech', '2007-01-09', {zh: 'Macworld 2007：iPhone 发布演讲', en: 'Macworld 2007: iPhone keynote'}, 'https://www.apple.com/apple-events/', {zh: 'Apple Events', en: 'Apple Events'}, {zh: '产品发布表达的教科书案例：先重构问题，再推出产品。', en: 'A textbook product keynote: reframe the problem before presenting the product.'}),
  pc('speech', '1983', {zh: 'International Design Conference：早期产品愿景演讲', en: 'International Design Conference: early product vision talk'}, 'https://www.youtube.com/results?search_query=Steve+Jobs+1983+International+Design+Conference', {zh: 'YouTube 检索入口', en: 'YouTube search entry'}, {zh: '适合看乔布斯早期对个人电脑、网络和用户体验的预判。', en: 'Useful for Jobs early views on personal computers, networks, and user experience.'}),
  pc('interview', '2010', {zh: 'D8 访谈：Apple、平台、隐私与产品判断', en: 'D8 interview: Apple, platforms, privacy, and product judgment'}, 'https://allthingsd.com/20100607/steve-jobs-session/', {zh: 'AllThingsD 原始访谈', en: 'AllThingsD original interview'}, {zh: '经典访谈，适合研究乔布斯如何回答平台、竞争和产品取舍。', en: 'Classic interview for platforms, competition, and product tradeoffs.'}),
  pc('interview', '1995', {zh: 'The Lost Interview：创业、产品和团队', en: 'The Lost Interview: entrepreneurship, products, and teams'}, 'https://www.youtube.com/results?search_query=Steve+Jobs+The+Lost+Interview+1995', {zh: 'YouTube 检索入口', en: 'YouTube search entry'}, {zh: '适合看乔布斯在重返 Apple 前如何复盘产品、团队和行业。', en: 'Useful for Jobs reflections before returning to Apple.'}),
  pc('interview', '1996', {zh: 'PBS Triumph of the Nerds 访谈片段', en: 'PBS Triumph of the Nerds interview clips'}, 'https://www.pbs.org/nerds/', {zh: 'PBS', en: 'PBS'}, {zh: '用于理解乔布斯对个人电脑革命、微软和产业结构的看法。', en: 'Useful for Jobs views on the PC revolution, Microsoft, and industry structure.'}),
  pc('launch', '2007-01-09', {zh: 'iPhone 发布会', en: 'iPhone launch keynote'}, 'https://www.apple.com/apple-events/', {zh: 'Apple Events', en: 'Apple Events'}, {zh: '最值得反复拆解的产品发布会之一：类别定义、节奏、演示和叙事都非常完整。', en: 'One of the best product launches to decompose: category definition, pacing, demo, and narrative.'}),
  pc('launch', '2010-01-27', {zh: 'iPad 发布会', en: 'iPad launch keynote'}, 'https://www.apple.com/apple-events/', {zh: 'Apple Events', en: 'Apple Events'}, {zh: '适合研究 Apple 如何定义手机和电脑之间的新类别。', en: 'Useful for how Apple defined a new category between phone and computer.'}),
  pc('launch', '2001-10-23', {zh: 'iPod 发布会', en: 'iPod launch event'}, 'https://www.apple.com/newsroom/2001/10/23Apple-Presents-iPod/', {zh: 'Apple Newsroom', en: 'Apple Newsroom'}, {zh: '用于研究 Apple 如何用音乐体验把硬件、软件和内容生态连接起来。', en: 'Useful for how Apple connected hardware, software, and content through music experience.'}),
  pc('book', '2011', {zh: 'Walter Isaacson《Steve Jobs》', en: 'Walter Isaacson: Steve Jobs'}, 'https://www.simonandschuster.com/books/Steve-Jobs/Walter-Isaacson/9781451648539', {zh: 'Simon & Schuster', en: 'Simon & Schuster'}, {zh: '最重要的乔布斯传记之一，适合补充人生经历、产品判断和管理争议。', en: 'A major biography for life story, product judgment, and management controversy.'}),
  pc('book', '2015', {zh: '《Becoming Steve Jobs》', en: 'Becoming Steve Jobs'}, 'https://www.penguinrandomhouse.com/books/237922/becoming-steve-jobs-by-brent-schlender-and-rick-tetzeli/', {zh: 'Penguin Random House', en: 'Penguin Random House'}, {zh: '相比单纯天才叙事，更适合研究乔布斯如何成长和改变。', en: 'Useful for studying how Jobs changed and matured beyond the genius narrative.'}),
  pc('book', '2023', {zh: '《Make Something Wonderful》乔布斯文字档案', en: 'Make Something Wonderful: Steve Jobs archive'}, 'https://stevejobsarchive.com/book', {zh: 'Steve Jobs Archive', en: 'Steve Jobs Archive'}, {zh: '一手文字档案，适合补充乔布斯公开表达和私人思考。', en: 'Primary archive useful for Jobs public expression and private reflections.'})
]);

replacePersonContent('tim-cook', [
  pc('news', '2026-06-08', {zh: 'WWDC 2026：库克最后一次以 CEO 身份主持开发者大会', en: 'WWDC 2026: Cook hosts his final WWDC as CEO'}, 'https://www.apple.com/newsroom/', {zh: 'Apple Newsroom / 大媒体入口', en: 'Apple Newsroom / major media entry'}, {zh: '用于观察 Apple 在 CEO 交接前如何处理 AI、平台和开发者叙事。', en: 'Use this to study Apple AI, platform, and developer narrative before CEO transition.'}),
  pc('news', '2026-04-20', {zh: 'Apple 宣布库克将转任执行董事长，John Ternus 接任 CEO', en: 'Apple says Cook will become executive chairman and John Ternus CEO'}, 'https://www.apple.com/newsroom/', {zh: 'Apple Newsroom / 大媒体入口', en: 'Apple Newsroom / major media entry'}, {zh: '关键新闻，适合研究 Apple 后乔布斯时代之后的第二次重大权力交接。', en: 'A key story for Apple second major succession after the post-Jobs transition.'}),
  pc('news', '2026-04-30', {zh: 'Apple 财报与交接期运营表现', en: 'Apple earnings and operating performance during transition'}, 'https://investor.apple.com/', {zh: 'Apple Investor Relations', en: 'Apple Investor Relations'}, {zh: '用于观察库克式运营、服务收入、现金流和供应链韧性。', en: 'Useful for Cook-style operations, services revenue, cash flow, and supply-chain resilience.'}),
  pc('speech', '2024-06-10', {zh: 'WWDC 2024：Apple Intelligence 发布', en: 'WWDC 2024: Apple Intelligence introduction'}, 'https://www.apple.com/apple-events/', {zh: 'Apple Events', en: 'Apple Events'}, {zh: '适合看库克时代 Apple 如何把 AI 纳入隐私、设备和生态叙事。', en: 'Useful for how Cook-era Apple integrates AI with privacy, devices, and ecosystem.'}),
  pc('speech', '2018', {zh: 'Brussels 隐私演讲：数据、信任与监管', en: 'Brussels privacy speech: data, trust, and regulation'}, 'https://www.apple.com/newsroom/', {zh: 'Apple Newsroom', en: 'Apple Newsroom'}, {zh: '库克公开价值观表达的代表材料，适合研究隐私如何变成商业和品牌护城河。', en: 'A representative Cook values speech for privacy as business and brand moat.'}),
  pc('speech', '2017', {zh: 'MIT 毕业演讲：技术、人性与责任', en: 'MIT commencement: technology, humanity, and responsibility'}, 'https://news.mit.edu/2017/apple-ceo-tim-cook-commencement-address-0609', {zh: 'MIT 官方全文', en: 'MIT official transcript'}, {zh: '适合放在人生、教育和技术责任板块。', en: 'Useful for life, education, and technology responsibility.'}),
  pc('interview', '2024', {zh: 'Apple 领导层谈 Apple Intelligence 与隐私', en: 'Apple leadership on Apple Intelligence and privacy'}, 'https://www.youtube.com/@Apple/search?query=Tim%20Cook%20Apple%20Intelligence%20interview', {zh: 'Apple 官方 YouTube / 访谈入口', en: 'Apple official YouTube / interview entry'}, {zh: '适合看库克如何把 AI 产品化和隐私价值观同时表达。', en: 'Useful for Cook communication around AI productization and privacy.'}),
  pc('interview', '2023', {zh: 'CBS / 60 Minutes：Apple、创新与社会责任', en: 'CBS / 60 Minutes: Apple, innovation, and social responsibility'}, 'https://www.cbsnews.com/60-minutes/', {zh: 'CBS 60 Minutes', en: 'CBS 60 Minutes'}, {zh: '适合补充库克在大众媒体中的品牌和治理表达。', en: 'Useful for Cook brand and governance communication in mainstream media.'}),
  pc('interview', '2017', {zh: 'Bloomberg / CNBC 访谈：运营、供应链与服务化', en: 'Bloomberg / CNBC interviews: operations, supply chain, and services'}, 'https://www.cnbc.com/tim-cook/', {zh: 'CNBC 人物入口', en: 'CNBC person entry'}, {zh: '适合研究库克怎样把 Apple 从产品公司扩展成运营和服务系统。', en: 'Useful for how Cook extended Apple from product company to operating and services system.'}),
  pc('launch', '2024-06-10', {zh: 'Apple Intelligence 发布', en: 'Apple Intelligence launch'}, 'https://www.apple.com/apple-events/', {zh: 'Apple Events', en: 'Apple Events'}, {zh: '库克时代关键 AI 发布，适合跟踪 Apple 的 AI 产品化速度。', en: 'A key Cook-era AI launch for tracking Apple AI productization.'}),
  pc('launch', '2023-06-05', {zh: 'Vision Pro 发布', en: 'Vision Pro launch'}, 'https://www.apple.com/newsroom/2023/06/introducing-apple-vision-pro/', {zh: 'Apple Newsroom', en: 'Apple Newsroom'}, {zh: '适合研究 Apple 是否能在 iPhone 之后开辟新交互平台。', en: 'Useful for whether Apple can open a new interaction platform after iPhone.'}),
  pc('launch', '2020-11-10', {zh: 'Apple Silicon Mac 发布', en: 'Apple Silicon Mac launch'}, 'https://www.apple.com/apple-events/', {zh: 'Apple Events', en: 'Apple Events'}, {zh: '库克时代最重要的平台迁移之一，体现供应链、芯片和系统整合能力。', en: 'One of Cook era most important platform transitions: chips, supply chain, and systems integration.'}),
  pc('book', '2019', {zh: '《Tim Cook》：库克传记', en: 'Tim Cook biography'}, 'https://www.penguinrandomhouse.com/books/611466/tim-cook-by-leander-kahney/', {zh: 'Penguin Random House', en: 'Penguin Random House'}, {zh: '适合补充库克的供应链、运营、价值观和 Apple 后乔布斯时代。', en: 'Useful for Cook supply chain, operations, values, and post-Jobs Apple.'}),
  pc('book', '2019', {zh: '《Creative Selection》：Apple 产品开发内部视角', en: 'Creative Selection: inside Apple product development'}, 'https://us.macmillan.com/books/9781250194466/creativeselection', {zh: 'Macmillan', en: 'Macmillan'}, {zh: '不是库克传记，但适合理解 Apple 产品文化和协作机制。', en: 'Not a Cook biography, but useful for Apple product culture and collaboration.'}),
  pc('book', '2012', {zh: '《Inside Apple》：Apple 组织方式', en: 'Inside Apple: Apple organization'}, 'https://www.hachettebookgroup.com/titles/adam-lashinsky/inside-apple/9781455512157/', {zh: 'Hachette', en: 'Hachette'}, {zh: '用于补充 Apple 组织、保密、责任制和高标准文化。', en: 'Useful for Apple organization, secrecy, accountability, and high standards.'})
]);

replacePersonContent('sam-altman', [
  pc('news', '2026-06-03', {zh: 'Altman 赴华盛顿讨论 AI 模型发布监管', en: 'Altman goes to Washington to discuss AI model release regulation'}, 'https://www.reuters.com/technology/', {zh: 'Reuters / 大媒体入口', en: 'Reuters / major media entry'}, {zh: '用于观察 OpenAI 如何在前沿模型、监管和公共叙事之间做平衡。', en: 'Use this to study OpenAI balance among frontier models, regulation, and public narrative.'}),
  pc('news', '2026-02-27', {zh: 'OpenAI 与美国政府网络部署合作相关报道', en: 'OpenAI government deployment cooperation reporting'}, 'https://www.reuters.com/technology/', {zh: 'Reuters / 大媒体入口', en: 'Reuters / major media entry'}, {zh: '适合放在企业与政府客户、AI 安全和商业化边界的观察维度里。', en: 'Useful for enterprise/government customers, AI safety, and commercialization boundaries.'}),
  pc('news', '2025', {zh: 'OpenAI 企业 AI 报告：企业采用与工作流变化', en: 'OpenAI enterprise AI report: enterprise adoption and workflow change'}, 'https://cdn.openai.com/pdf/7ef17d82-96bf-4dd1-9df2-228f7f377a29/the-state-of-enterprise-ai_2025-report.pdf', {zh: 'OpenAI 官方报告', en: 'OpenAI official report'}, {zh: '用于补充 ChatGPT 和 OpenAI 平台进入企业工作流的事实基础。', en: 'Useful for factual basis on ChatGPT and OpenAI platform in enterprise workflows.'}),
  pc('speech', '2023-11-06', {zh: 'OpenAI DevDay 主题演讲', en: 'OpenAI DevDay keynote'}, 'https://www.youtube.com/@OpenAI/search?query=DevDay%20Sam%20Altman', {zh: 'OpenAI 官方 YouTube', en: 'OpenAI official YouTube'}, {zh: '适合看 Altman 如何向开发者讲平台、API、工具调用和生态。', en: 'Useful for Altman platform, API, tool use, and developer ecosystem message.'}),
  pc('speech', '2023', {zh: '美国国会 AI 听证会证词', en: 'U.S. Senate AI hearing testimony'}, 'https://www.judiciary.senate.gov/committee-activity/hearings/oversight-of-ai-rules-for-artificial-intelligence', {zh: '美国参议院官方页面', en: 'U.S. Senate official page'}, {zh: '适合研究 Altman 的监管叙事和公共责任表达。', en: 'Useful for Altman regulatory narrative and public responsibility.'}),
  pc('speech', '2024', {zh: 'OpenAI Spring Update / GPT-4o 发布表达', en: 'OpenAI Spring Update / GPT-4o launch communication'}, 'https://openai.com/news/', {zh: 'OpenAI News', en: 'OpenAI News'}, {zh: '用于观察 OpenAI 如何把多模态能力产品化。', en: 'Useful for how OpenAI productizes multimodal capability.'}),
  pc('interview', '2024', {zh: 'Lex Fridman 访谈：OpenAI、AGI 与治理', en: 'Lex Fridman interview: OpenAI, AGI, and governance'}, 'https://www.youtube.com/@lexfridman/search?query=Sam%20Altman', {zh: 'Lex Fridman YouTube', en: 'Lex Fridman YouTube'}, {zh: '经典长访谈，适合研究 Altman 的 AGI、风险和公司治理框架。', en: 'Classic long-form interview on AGI, risk, and governance.'}),
  pc('interview', '2023', {zh: 'Stratechery 访谈：OpenAI 商业模式与平台', en: 'Stratechery interview: OpenAI business model and platform'}, 'https://stratechery.com/?s=Sam+Altman+OpenAI', {zh: 'Stratechery 检索入口', en: 'Stratechery search entry'}, {zh: '适合研究 OpenAI 从模型公司到平台公司的商业逻辑。', en: 'Useful for OpenAI transition from model company to platform company.'}),
  pc('interview', '2023', {zh: 'Y Combinator / Startup 访谈：创业与长期主义', en: 'Y Combinator / Startup interviews: entrepreneurship and long-termism'}, 'https://www.youtube.com/@ycombinator/search?query=Sam%20Altman', {zh: 'Y Combinator YouTube', en: 'Y Combinator YouTube'}, {zh: '用于补充 Altman 在创业、融资和组织判断上的早期表达。', en: 'Useful for Altman early views on startups, funding, and organization.'}),
  pc('launch', '2024-05-13', {zh: 'GPT-4o 发布', en: 'GPT-4o launch'}, 'https://openai.com/index/hello-gpt-4o/', {zh: 'OpenAI 官方发布', en: 'OpenAI official launch'}, {zh: '适合观察 OpenAI 如何把模型能力转成语音、视觉和实时交互体验。', en: 'Useful for how OpenAI turns model capability into voice, vision, and real-time interaction.'}),
  pc('launch', '2024-02-15', {zh: 'Sora 发布', en: 'Sora launch'}, 'https://openai.com/sora', {zh: 'OpenAI 官方页面', en: 'OpenAI official page'}, {zh: '用于研究视频生成如何影响模型公司、内容产业和算力需求。', en: 'Useful for video generation impact on model companies, content industry, and compute demand.'}),
  pc('launch', '2022-11-30', {zh: 'ChatGPT 发布', en: 'ChatGPT launch'}, 'https://openai.com/index/chatgpt/', {zh: 'OpenAI 官方发布', en: 'OpenAI official launch'}, {zh: 'OpenAI 公司性质变化的关键节点：从研究实验室走向大众产品入口。', en: 'A key turning point from research lab toward mass product entry.'}),
  pc('book', '2021', {zh: '《The Startup Playbook》：Altman 创业建议参考', en: 'The Startup Playbook: Altman startup advice reference'}, 'https://playbook.samaltman.com/', {zh: 'Sam Altman 公开文章', en: 'Sam Altman public essay'}, {zh: '不是传记，但适合理解 Altman 的创业、增长和组织判断。', en: 'Not a biography, but useful for Altman startup, growth, and organization judgment.'}),
  pc('book', '2025', {zh: 'OpenAI 企业 AI 报告', en: 'OpenAI enterprise AI report'}, 'https://cdn.openai.com/pdf/7ef17d82-96bf-4dd1-9df2-228f7f377a29/the-state-of-enterprise-ai_2025-report.pdf', {zh: 'OpenAI 官方报告', en: 'OpenAI official report'}, {zh: '适合作为 OpenAI 商业化和企业采用的资料型阅读。', en: 'Useful as source reading for OpenAI commercialization and enterprise adoption.'}),
  pc('book', '2024', {zh: 'Altman 公开博客 / 文章归档', en: 'Sam Altman public essays archive'}, 'https://blog.samaltman.com/', {zh: 'Sam Altman 博客', en: 'Sam Altman blog'}, {zh: '用于补充他对创业、技术、未来和社会风险的长期表达。', en: 'Useful for long-term views on startups, technology, future, and social risk.'})
]);

replacePersonContent('dario-amodei', [
  pc('news', '2026-06-03', {zh: 'Dario Amodei 警示超人类 AI 权力与社会成熟度', en: 'Dario Amodei warns about beyond-human AI power and social maturity'}, 'https://www.anthropic.com/news', {zh: 'Anthropic / 大媒体入口', en: 'Anthropic / major media entry'}, {zh: '用于观察 Anthropic 如何把 AI 安全和公共风险放进公司叙事。', en: 'Use this to study Anthropic safety and public-risk narrative.'}),
  pc('news', '2025', {zh: 'Claude Code 进入 Team 与 Enterprise 计划', en: 'Claude Code comes to Team and Enterprise plans'}, 'https://www.anthropic.com/news/claude-code-on-team-and-enterprise', {zh: 'Anthropic 官方发布', en: 'Anthropic official launch'}, {zh: '适合观察 Anthropic 如何把模型能力转成企业开发者工作流。', en: 'Useful for how Anthropic turns model capability into enterprise developer workflows.'}),
  pc('news', '2024', {zh: 'Claude 3 系列发布，强化企业级模型竞争', en: 'Claude 3 family launch strengthens enterprise model competition'}, 'https://www.anthropic.com/news/claude-3-family', {zh: 'Anthropic 官方发布', en: 'Anthropic official launch'}, {zh: '用于研究 Anthropic 的模型能力、安全品牌和企业客户策略。', en: 'Useful for Anthropic model capability, safety brand, and enterprise customer strategy.'}),
  pc('speech', '2025', {zh: 'AI 安全、能力跃迁与治理公开表达', en: 'Public talks on AI safety, capability jumps, and governance'}, 'https://www.youtube.com/results?search_query=Dario+Amodei+AI+safety+talk', {zh: 'YouTube 检索入口', en: 'YouTube search entry'}, {zh: '适合系统整理 Dario 对 AI 风险和治理的表达。', en: 'Useful for organizing Dario views on AI risk and governance.'}),
  pc('speech', '2024', {zh: 'Anthropic 研究与安全主题资料', en: 'Anthropic research and safety material'}, 'https://www.anthropic.com/research', {zh: 'Anthropic Research', en: 'Anthropic Research'}, {zh: '演讲不如论文密集时，可用官方研究资料补足安全与解释性主线。', en: 'When talks are fewer, official research material supports the safety and interpretability thread.'}),
  pc('speech', '2023', {zh: '国会 / 政策讨论中的 AI 安全表达', en: 'AI safety remarks in policy discussions'}, 'https://www.anthropic.com/policy', {zh: 'Anthropic Policy', en: 'Anthropic Policy'}, {zh: '适合看 Anthropic 如何面向政策制定者讲模型安全。', en: 'Useful for how Anthropic communicates model safety to policymakers.'}),
  pc('interview', '2024', {zh: 'Lex Fridman 访谈：Claude、AI 安全与未来', en: 'Lex Fridman interview: Claude, AI safety, and the future'}, 'https://www.youtube.com/@lexfridman/search?query=Dario%20Amodei', {zh: 'Lex Fridman YouTube', en: 'Lex Fridman YouTube'}, {zh: '经典长访谈入口，适合理解 Dario 的安全、模型和治理框架。', en: 'Classic long-form entry for Dario safety, model, and governance framework.'}),
  pc('interview', '2023', {zh: 'Dwarkesh Patel 访谈：前沿模型与安全', en: 'Dwarkesh Patel interview: frontier models and safety'}, 'https://www.youtube.com/@DwarkeshPatel/search?query=Dario%20Amodei', {zh: 'Dwarkesh Patel YouTube', en: 'Dwarkesh Patel YouTube'}, {zh: '适合研究前沿模型能力、对齐和经济影响。', en: 'Useful for frontier model capability, alignment, and economic impact.'}),
  pc('interview', '2024', {zh: '企业 AI 与 Claude 访谈资料入口', en: 'Enterprise AI and Claude interview material'}, 'https://www.anthropic.com/news', {zh: 'Anthropic News', en: 'Anthropic News'}, {zh: '用于后续补充 Dario 或 Anthropic 高管围绕 Claude 企业化的访谈。', en: 'A source entry for future Dario or Anthropic executive interviews around Claude enterprise adoption.'}),
  pc('launch', '2025', {zh: 'Claude Code Team / Enterprise 发布', en: 'Claude Code Team / Enterprise launch'}, 'https://www.anthropic.com/news/claude-code-on-team-and-enterprise', {zh: 'Anthropic 官方发布', en: 'Anthropic official launch'}, {zh: '适合看 Anthropic 如何切入程序员和企业知识工作流。', en: 'Useful for Anthropic entry into developer and enterprise knowledge workflows.'}),
  pc('launch', '2024', {zh: 'Claude 3.5 Sonnet 发布', en: 'Claude 3.5 Sonnet launch'}, 'https://www.anthropic.com/news/claude-3-5-sonnet', {zh: 'Anthropic 官方发布', en: 'Anthropic official launch'}, {zh: '用于观察模型性能、代码能力和产品节奏。', en: 'Useful for model performance, coding capability, and product cadence.'}),
  pc('launch', '2024', {zh: 'Claude 3 系列发布', en: 'Claude 3 family launch'}, 'https://www.anthropic.com/news/claude-3-family', {zh: 'Anthropic 官方发布', en: 'Anthropic official launch'}, {zh: 'Anthropic 从安全品牌走向主流模型竞争的重要节点。', en: 'A key point in Anthropic move from safety brand into mainstream model competition.'}),
  pc('book', '2023', {zh: '《Constitutional AI》研究论文', en: 'Constitutional AI research paper'}, 'https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback', {zh: 'Anthropic Research', en: 'Anthropic Research'}, {zh: '不是传记，但这是理解 Dario / Anthropic 路线的核心阅读。', en: 'Not a biography, but core reading for Dario / Anthropic approach.'}),
  pc('book', '2024', {zh: 'Anthropic 解释性研究资料', en: 'Anthropic interpretability research material'}, 'https://www.anthropic.com/research', {zh: 'Anthropic Research', en: 'Anthropic Research'}, {zh: '用于补充安全、解释性和对齐研究底座。', en: 'Useful for safety, interpretability, and alignment research foundation.'}),
  pc('book', '2025', {zh: 'Anthropic 官方新闻与研究归档', en: 'Anthropic news and research archive'}, 'https://www.anthropic.com/news', {zh: 'Anthropic News', en: 'Anthropic News'}, {zh: '后续可拆成 Claude 产品史、安全研究史和企业化路线。', en: 'Can later become Claude product history, safety research history, and enterprise route.'})
]);

replacePersonContent('morris-chang', [
  pc('news', '2024-06-04', {zh: '张忠谋交棒后，魏哲家接任台积电董事长', en: 'After Morris Chang era, C.C. Wei becomes TSMC chairman'}, 'https://pr.tsmc.com/english', {zh: 'TSMC 官方新闻 / 大媒体入口', en: 'TSMC official news / major media entry'}, {zh: '用于观察台积电从创始人时代进入职业经理人与全球扩产时代。', en: 'Use this to study TSMC transition from founder era to professional management and global expansion.'}),
  pc('news', '2022', {zh: '张忠谋公开谈台积电、地缘政治与美国建厂', en: 'Morris Chang discusses TSMC, geopolitics, and U.S. fabs'}, 'https://www.brookings.edu/events/a-conversation-with-morris-chang/', {zh: 'Brookings 活动资料', en: 'Brookings event material'}, {zh: '典型材料，适合研究半导体产业、地缘风险和晶圆代工模式。', en: 'A representative source for semiconductors, geopolitics, and the foundry model.'}),
  pc('news', '2020', {zh: '张忠谋对台积电全球产能和产业分工的长期判断', en: 'Morris Chang long-term view on global capacity and industry specialization'}, 'https://pr.tsmc.com/english', {zh: 'TSMC 官方资料入口', en: 'TSMC official source entry'}, {zh: '作为创始人专题，新闻区保留典型公开材料而不是追逐短期动态。', en: 'For a founder page, this keeps representative public material rather than short-term headlines.'}),
  pc('speech', '2022', {zh: 'Brookings 对谈：半导体、地缘政治与台积电', en: 'Brookings conversation: semiconductors, geopolitics, and TSMC'}, 'https://www.brookings.edu/events/a-conversation-with-morris-chang/', {zh: 'Brookings 官方活动页', en: 'Brookings official event page'}, {zh: '适合看张忠谋如何解释半导体产业结构和台积电定位。', en: 'Useful for how Chang explains semiconductor structure and TSMC positioning.'}),
  pc('speech', '2018', {zh: '台积电创立与晶圆代工模式回顾', en: 'TSMC founding and foundry model retrospective'}, 'https://www.tsmc.com/english/aboutTSMC/company_profile', {zh: 'TSMC 官方公司资料', en: 'TSMC official company profile'}, {zh: '演讲资料较分散时，用官方公司史补足其产业定位表达。', en: 'When speeches are scattered, official company history supports his positioning narrative.'}),
  pc('speech', '2017', {zh: '退休前公开演讲与产业回顾资料', en: 'Public talks and industry retrospectives before retirement'}, 'https://www.youtube.com/results?search_query=Morris+Chang+speech+TSMC', {zh: 'YouTube 检索入口', en: 'YouTube search entry'}, {zh: '适合补充创始人如何复盘职业、产业和组织建设。', en: 'Useful for how the founder reviewed career, industry, and organization building.'}),
  pc('interview', '2022', {zh: 'Brookings 深度对谈：芯片、国家竞争与台积电', en: 'Brookings interview: chips, national competition, and TSMC'}, 'https://www.brookings.edu/events/a-conversation-with-morris-chang/', {zh: 'Brookings 官方页面', en: 'Brookings official page'}, {zh: '经典访谈，适合理解张忠谋对半导体全球分工的判断。', en: 'Classic interview source for Chang view on global semiconductor specialization.'}),
  pc('interview', '2017', {zh: '张忠谋退休访谈资料入口', en: 'Morris Chang retirement interview material'}, 'https://www.youtube.com/results?search_query=Morris+Chang+retirement+interview', {zh: 'YouTube 检索入口', en: 'YouTube search entry'}, {zh: '适合补充他对台积电文化、接班和客户信任的看法。', en: 'Useful for his views on TSMC culture, succession, and customer trust.'}),
  pc('interview', '2007', {zh: 'Computer History Museum 相关访谈资料', en: 'Computer History Museum related interview material'}, 'https://computerhistory.org/', {zh: 'Computer History Museum', en: 'Computer History Museum'}, {zh: '用于把张忠谋放回全球半导体人物史里研究。', en: 'Useful for placing Chang in global semiconductor history.'}),
  pc('launch', '1987', {zh: '台积电成立：纯晶圆代工模式启动', en: 'TSMC founding: pure-play foundry model begins'}, 'https://www.tsmc.com/english/aboutTSMC/company_profile', {zh: 'TSMC 官方公司资料', en: 'TSMC official company profile'}, {zh: '投资人 / 创始人专题里最重要的“发布会”是商业模式本身的推出。', en: 'For an investor/founder page, the key launch is the business model itself.'}),
  pc('launch', '1994', {zh: '台积电上市与资本市场化', en: 'TSMC listing and capital-market expansion'}, 'https://investor.tsmc.com/english', {zh: 'TSMC 投资者关系', en: 'TSMC investor relations'}, {zh: '用于研究资本市场如何支持先进制造长期资本开支。', en: 'Useful for how capital markets support long-term advanced manufacturing capex.'}),
  pc('launch', '2018', {zh: '张忠谋退休与台积电治理交接', en: 'Morris Chang retirement and TSMC governance transition'}, 'https://pr.tsmc.com/english', {zh: 'TSMC 官方新闻入口', en: 'TSMC official news entry'}, {zh: '适合研究创始人退出后，公司文化和客户信任如何延续。', en: 'Useful for founder exit, cultural continuity, and customer trust.'}),
  pc('book', '1998', {zh: '《张忠谋自传》上册', en: 'Morris Chang autobiography, volume 1'}, 'https://www.google.com/search?q=%E5%BC%A0%E5%BF%A0%E8%B0%8B%E8%87%AA%E4%BC%A0', {zh: '图书检索入口', en: 'Book search entry'}, {zh: '用于补充早年教育、职业路径和进入半导体产业的关键选择。', en: 'Useful for early education, career path, and entry into semiconductors.'}),
  pc('book', '2024', {zh: '《张忠谋自传》下册', en: 'Morris Chang autobiography, volume 2'}, 'https://www.google.com/search?q=%E5%BC%A0%E5%BF%A0%E8%B0%8B%E8%87%AA%E4%BC%A0%E4%B8%8B%E5%86%8C', {zh: '图书检索入口', en: 'Book search entry'}, {zh: '用于系统研究台积电创立、纯晶圆代工模式和创始人治理。', en: 'Useful for TSMC founding, pure-play foundry model, and founder governance.'}),
  pc('book', '2024', {zh: '台积电年报与公司史', en: 'TSMC annual reports and company history'}, 'https://investor.tsmc.com/english/annual-reports', {zh: 'TSMC 投资者关系', en: 'TSMC investor relations'}, {zh: '不是传记，但能用数据和公司史校准张忠谋路线的长期成果。', en: 'Not a biography, but useful for calibrating Chang path with company history and data.'})
]);

replacePersonContent('cc-wei', [
  pc('news', '2026-06-04', {zh: '魏哲家称 AI 需求强劲，先进制程产能仍难完全满足客户', en: 'C.C. Wei says AI demand remains strong and advanced-node capacity is still tight'}, 'https://www.reuters.com/technology/', {zh: 'Reuters / 大媒体入口', en: 'Reuters / major media entry'}, {zh: '用于观察 AI 芯片需求、先进制程、价格纪律和客户关系。', en: 'Use this for AI chip demand, advanced nodes, pricing discipline, and customer relationships.'}),
  pc('news', '2025-11-25', {zh: '魏哲家谈先进制程产能“仍然不够”', en: 'C.C. Wei says advanced-node capacity remains not enough'}, 'https://www.tomshardware.com/tech-industry/semiconductors/tsmc-csays-advanced-node-capacity-falls-short-of-ai-demand', {zh: '大媒体 / 行业媒体入口', en: 'Major / trade media entry'}, {zh: '适合放在台积电竞争壁垒和先进封装瓶颈观察里。', en: 'Useful for TSMC moat and advanced-packaging bottleneck observation.'}),
  pc('news', '2024-06-04', {zh: '魏哲家接任台积电董事长并继续担任 CEO', en: 'C.C. Wei becomes TSMC chairman while continuing as CEO'}, 'https://pr.tsmc.com/english', {zh: 'TSMC 官方新闻入口', en: 'TSMC official news entry'}, {zh: '关键新闻，标志台积电进入新一代领导层阶段。', en: 'A key leadership-transition story for TSMC.'}),
  pc('speech', '2026', {zh: 'TSMC 股东会：AI 需求、产能与价格纪律', en: 'TSMC annual meeting: AI demand, capacity, and pricing discipline'}, 'https://investor.tsmc.com/english', {zh: 'TSMC 投资者关系', en: 'TSMC investor relations'}, {zh: '适合把魏哲家当作制造业 CEO 来研究：产能、客户、价格和资本开支。', en: 'Useful for Wei as manufacturing CEO: capacity, customers, pricing, and capex.'}),
  pc('speech', '2025', {zh: 'TSMC 法说会：先进制程与全球扩产', en: 'TSMC earnings call: advanced nodes and global expansion'}, 'https://investor.tsmc.com/english/quarterly-results', {zh: 'TSMC 法说会资料', en: 'TSMC quarterly results'}, {zh: '适合跟踪魏哲家如何对投资者解释 AI 需求和产能投资。', en: 'Useful for how Wei explains AI demand and capacity investment to investors.'}),
  pc('speech', '2024', {zh: 'TIME100 AI：魏哲家与 AI 芯片基础设施', en: 'TIME100 AI: C.C. Wei and AI chip infrastructure'}, 'https://time.com/7012769/cc-wei/', {zh: 'TIME 人物资料', en: 'TIME profile'}, {zh: '适合补充魏哲家在 AI 基础设施中的全球角色。', en: 'Useful for Wei global role in AI infrastructure.'}),
  pc('interview', '2026', {zh: '股东会问答：价格、产能与客户需求', en: 'Annual meeting Q&A: pricing, capacity, and customer demand'}, 'https://investor.tsmc.com/english', {zh: 'TSMC 投资者关系', en: 'TSMC investor relations'}, {zh: '适合研究 CEO 如何在供不应求时维护客户信任和长期关系。', en: 'Useful for how a CEO maintains trust during supply shortage.'}),
  pc('interview', '2024', {zh: '魏哲家行业访谈资料入口', en: 'C.C. Wei industry interview material'}, 'https://www.youtube.com/results?search_query=C.C.+Wei+TSMC+interview', {zh: 'YouTube 检索入口', en: 'YouTube search entry'}, {zh: '用于后续补全公开视频访谈、论坛和媒体对话。', en: 'Source entry for future public video interviews, forums, and media conversations.'}),
  pc('interview', '2024', {zh: 'TSMC 高管访谈与投资者会议资料', en: 'TSMC executive interviews and investor conference material'}, 'https://investor.tsmc.com/english/events', {zh: 'TSMC 投资者活动', en: 'TSMC investor events'}, {zh: '适合跟踪魏哲家如何讲先进制程、海外厂和客户结构。', en: 'Useful for advanced nodes, overseas fabs, and customer mix.'}),
  pc('launch', '2024', {zh: '魏哲家接任董事长：治理交接', en: 'C.C. Wei becomes chairman: governance transition'}, 'https://pr.tsmc.com/english', {zh: 'TSMC 官方新闻入口', en: 'TSMC official news entry'}, {zh: '对职业经理人来说，领导权交接就是最重要的“发布会”之一。', en: 'For a professional CEO, leadership transition is one of the key launches.'}),
  pc('launch', '2025', {zh: 'A16 / 2nm 等先进制程路线资料', en: 'A16 / 2nm and advanced-node roadmap material'}, 'https://www.tsmc.com/english/dedicatedFoundry/technology/logic', {zh: 'TSMC 技术路线', en: 'TSMC technology roadmap'}, {zh: '用于研究台积电产品不是终端产品，而是制程路线和制造能力。', en: 'Useful because TSMC product launches are process roadmaps and manufacturing capability.'}),
  pc('launch', '2024', {zh: 'CoWoS / SoIC 先进封装能力扩张', en: 'CoWoS / SoIC advanced packaging expansion'}, 'https://www.tsmc.com/english/dedicatedFoundry/technology/3DFabric', {zh: 'TSMC 3DFabric', en: 'TSMC 3DFabric'}, {zh: '适合观察 AI 芯片瓶颈如何从制程扩展到先进封装。', en: 'Useful for how AI chip bottlenecks expand from nodes into advanced packaging.'}),
  pc('book', '2025', {zh: 'TSMC 年报：魏哲家时代的经营数据', en: 'TSMC annual report: operating data under C.C. Wei'}, 'https://investor.tsmc.com/english/annual-reports', {zh: 'TSMC 投资者关系', en: 'TSMC investor relations'}, {zh: '最适合补充量化数据：收入结构、先进制程占比、资本开支和客户集中度。', en: 'Best for quantitative data: revenue mix, advanced-node share, capex, and customer concentration.'}),
  pc('book', '2024', {zh: 'TSMC 技术白皮书与技术路线资料', en: 'TSMC technology papers and roadmap material'}, 'https://www.tsmc.com/english/dedicatedFoundry/technology', {zh: 'TSMC 技术资料', en: 'TSMC technology material'}, {zh: '用于补充制造能力、工艺路线和先进封装底层知识。', en: 'Useful for manufacturing capability, process roadmap, and advanced packaging foundation.'}),
  pc('book', '2024', {zh: 'TIME100 AI 人物资料', en: 'TIME100 AI profile'}, 'https://time.com/7012769/cc-wei/', {zh: 'TIME', en: 'TIME'}, {zh: '适合快速理解魏哲家在 AI 基础设施中的位置。', en: 'A concise profile for Wei role in AI infrastructure.'})
]);

replacePersonContent('warren-buffett', [
  pc('news', '2026-01-01', {zh: 'Greg Abel 接任 Berkshire CEO，巴菲特进入董事长与精神领袖阶段', en: 'Greg Abel becomes Berkshire CEO as Buffett moves into chairman / elder statesman role'}, 'https://www.berkshirehathaway.com/2025ar/2025ar.pdf', {zh: 'Berkshire 官方年报', en: 'Berkshire official annual report'}, {zh: '最近关键新闻，适合研究巴菲特之后 Berkshire 的资本配置和文化延续。', en: 'A key recent story for Berkshire capital allocation and cultural continuity after Buffett.'}),
  pc('news', '2025-05-03', {zh: '巴菲特宣布将卸任 CEO，Greg Abel 接班', en: 'Buffett announces he will step down as CEO with Greg Abel succeeding'}, 'https://www.berkshirehathaway.com/news/2025news.html', {zh: 'Berkshire 官方新闻', en: 'Berkshire official news'}, {zh: '巴菲特人物专题的核心新闻：长期主义最终要接受接班检验。', en: 'A core Buffett story: long-termism eventually faces succession.'}),
  pc('news', '2024-02-24', {zh: '巴菲特在股东信中纪念芒格并总结 Berkshire 原则', en: 'Buffett honors Munger and summarizes Berkshire principles in shareholder letter'}, 'https://www.berkshirehathaway.com/letters/letters.html', {zh: 'Berkshire 股东信', en: 'Berkshire shareholder letters'}, {zh: '典型新闻 / 原始资料，适合研究巴菲特如何表达合伙人、文化和资本配置。', en: 'Representative primary material for Buffett on partner, culture, and capital allocation.'}),
  pc('speech', '2025-05-03', {zh: 'Berkshire 2025 股东大会：接班与资本配置', en: 'Berkshire 2025 annual meeting: succession and capital allocation'}, 'https://www.berkshirehathaway.com/meet01/visguide2025.pdf', {zh: 'Berkshire 股东大会资料', en: 'Berkshire annual meeting material'}, {zh: '投资人没有产品发布会，股东大会就是最重要的公开表达场。', en: 'For an investor, the annual meeting is the main public communication event.'}),
  pc('speech', '2024', {zh: 'Berkshire 2024 股东大会：没有芒格后的第一次大会', en: 'Berkshire 2024 annual meeting: first meeting after Munger'}, 'https://www.berkshirehathaway.com/meet01/visguide2024.pdf', {zh: 'Berkshire 股东大会资料', en: 'Berkshire annual meeting material'}, {zh: '适合观察巴菲特如何在缺少芒格后继续解释公司原则。', en: 'Useful for how Buffett explains principles after Munger.'}),
  pc('speech', '2023', {zh: 'Berkshire 2023 股东大会：巴菲特与芒格最后几次公开同台之一', en: 'Berkshire 2023 annual meeting: one of Buffett and Munger final public sessions'}, 'https://www.berkshirehathaway.com/meet01/visguide2023.pdf', {zh: 'Berkshire 股东大会资料', en: 'Berkshire annual meeting material'}, {zh: '适合作为巴菲特与芒格共同思维方式的经典材料。', en: 'A classic source for Buffett and Munger shared thinking.'}),
  pc('interview', '2024', {zh: 'CNBC Buffett Archive：商业、市场与长期持有', en: 'CNBC Buffett Archive: business, markets, and long-term ownership'}, 'https://www.cnbc.com/warren-buffett-archive/', {zh: 'CNBC Buffett Archive', en: 'CNBC Buffett Archive'}, {zh: '长期访谈资料入口，适合持续补充巴菲特对市场和企业的判断。', en: 'Long-running interview archive for Buffett market and business judgment.'}),
  pc('interview', '2019', {zh: 'Yahoo Finance / CNBC 访谈：苹果、现金与市场', en: 'Yahoo Finance / CNBC interviews: Apple, cash, and markets'}, 'https://www.cnbc.com/warren-buffett/', {zh: 'CNBC 人物入口', en: 'CNBC person entry'}, {zh: '适合补充巴菲特如何看 Apple、现金和估值纪律。', en: 'Useful for Buffett views on Apple, cash, and valuation discipline.'}),
  pc('interview', '2017', {zh: 'PBS / Charlie Rose 访谈资料', en: 'PBS / Charlie Rose interview material'}, 'https://charlierose.com/guests/870', {zh: 'Charlie Rose Archive', en: 'Charlie Rose Archive'}, {zh: '适合看巴菲特如何用普通语言解释商业和投资。', en: 'Useful for how Buffett explains business and investing in plain language.'}),
  pc('launch', '2025', {zh: 'Berkshire 股东大会：接班方案公开化', en: 'Berkshire annual meeting: succession plan made explicit'}, 'https://www.berkshirehathaway.com/news/2025news.html', {zh: 'Berkshire 官方新闻', en: 'Berkshire official news'}, {zh: '投资人专题里，股东大会和股东信就是“发布会”。', en: 'For investors, meetings and letters are the launches.'}),
  pc('launch', '2024', {zh: '年度股东信发布', en: 'Annual shareholder letter release'}, 'https://www.berkshirehathaway.com/letters/letters.html', {zh: 'Berkshire 股东信', en: 'Berkshire shareholder letters'}, {zh: '每年最重要的思想产品，适合跟踪资本配置、现金和风险观。', en: 'The yearly thought product for capital allocation, cash, and risk view.'}),
  pc('launch', '1965', {zh: '巴菲特取得 Berkshire 控制权', en: 'Buffett takes control of Berkshire'}, 'https://www.berkshirehathaway.com/', {zh: 'Berkshire 官方网站', en: 'Berkshire official site'}, {zh: '巴菲特最重要的商业“发布”：把纺织公司转成资本配置平台。', en: 'Buffett key business launch: turning a textile company into a capital allocation platform.'}),
  pc('book', '1977-', {zh: 'Berkshire 股东信全集', en: 'Berkshire shareholder letters'}, 'https://www.berkshirehathaway.com/letters/letters.html', {zh: 'Berkshire 官方股东信', en: 'Berkshire official letters'}, {zh: '最重要的一手资料，优先级高于任何二手传记。', en: 'The most important primary material, above secondary biographies.'}),
  pc('book', '1995', {zh: '《The Essays of Warren Buffett》', en: 'The Essays of Warren Buffett'}, 'https://www.lawrencecunningham.com/books/the-essays-of-warren-buffett/', {zh: 'Lawrence Cunningham', en: 'Lawrence Cunningham'}, {zh: '把股东信按主题重组，适合系统学习巴菲特原则。', en: 'Organizes letters by theme for systematic study.'}),
  pc('book', '2008', {zh: '《The Snowball》巴菲特传记', en: 'The Snowball: Warren Buffett biography'}, 'https://www.penguinrandomhouse.com/books/288891/the-snowball-by-alice-schroeder/', {zh: 'Penguin Random House', en: 'Penguin Random House'}, {zh: '重要传记，适合补充人生、性格、家庭和投资生涯。', en: 'Major biography for life, character, family, and investing career.'})
]);

replacePersonContent('charlie-munger', [
  pc('news', '2023-11-28', {zh: '查理·芒格去世，享年 99 岁', en: 'Charlie Munger dies at 99'}, 'https://www.berkshirehathaway.com/news/2023news.html', {zh: 'Berkshire 官方新闻', en: 'Berkshire official news'}, {zh: '他已去世，新闻区第一条放离世新闻，作为人物专题时间锚点。', en: 'Because Munger has died, this first news item anchors the person study around his passing.'}),
  pc('news', '2024-02-24', {zh: '巴菲特在股东信中称芒格是 Berkshire 的“建筑师”', en: 'Buffett calls Munger the architect of Berkshire in shareholder letter'}, 'https://www.berkshirehathaway.com/letters/letters.html', {zh: 'Berkshire 股东信', en: 'Berkshire shareholder letters'}, {zh: '典型新闻 / 原始材料，适合理解芒格在 Berkshire 中的真实角色。', en: 'Representative primary material for Munger real role at Berkshire.'}),
  pc('news', '2023-02-15', {zh: 'Daily Journal 股东会：芒格最后阶段的公开问答', en: 'Daily Journal annual meeting: Munger late-stage public Q&A'}, 'https://www.djmco.com/', {zh: 'Daily Journal 官方入口', en: 'Daily Journal official entry'}, {zh: '典型材料，适合研究芒格晚年的投资、常识和反向思维。', en: 'Representative source for late Munger investing, common sense, and inversion.'}),
  pc('speech', '1995', {zh: '哈佛演讲：人类误判心理学', en: 'Harvard talk: psychology of human misjudgment'}, 'https://fs.blog/great-talks/psychology-human-misjudgment/', {zh: '演讲整理入口', en: 'Talk transcript entry'}, {zh: '芒格最重要的演讲之一，适合学习误判、激励和心理偏差。', en: 'One of Munger most important talks on misjudgment, incentives, and bias.'}),
  pc('speech', '2007', {zh: 'USC 法学院毕业演讲', en: 'USC Law commencement speech'}, 'https://www.youtube.com/results?search_query=Charlie+Munger+USC+commencement+speech', {zh: 'YouTube 检索入口', en: 'YouTube search entry'}, {zh: '适合人生建议、逆向思维和避免愚蠢的主题。', en: 'Useful for life advice, inversion, and avoiding stupidity.'}),
  pc('speech', '2023', {zh: 'Daily Journal 股东会公开问答', en: 'Daily Journal annual meeting public Q&A'}, 'https://www.youtube.com/@DailyJournalCorp', {zh: 'Daily Journal YouTube', en: 'Daily Journal YouTube'}, {zh: '投资人专题里，年度股东会就是芒格最重要的公开表达场。', en: 'For an investor page, annual meetings are Munger main public communication venue.'}),
  pc('interview', '2017', {zh: 'Yahoo Finance 访谈：投资、人生和常识', en: 'Yahoo Finance interview: investing, life, and common sense'}, 'https://www.youtube.com/results?search_query=Charlie+Munger+Yahoo+Finance+interview', {zh: 'YouTube 检索入口', en: 'YouTube search entry'}, {zh: '适合看芒格如何用朴素语言解释复杂判断。', en: 'Useful for how Munger explains complex judgment in plain language.'}),
  pc('interview', '2021', {zh: 'Caltech 访谈：多元模型与世界理解', en: 'Caltech conversation: multidisciplinary models and understanding the world'}, 'https://www.youtube.com/results?search_query=Charlie+Munger+Caltech+interview', {zh: 'YouTube 检索入口', en: 'YouTube search entry'}, {zh: '适合连接书籍体系里的世界模型和知识底座。', en: 'Useful for connecting world models and knowledge foundation.'}),
  pc('interview', '2019', {zh: 'CNBC 访谈资料：Berkshire、市场与长期持有', en: 'CNBC interview material: Berkshire, markets, and long-term ownership'}, 'https://www.cnbc.com/charlie-munger/', {zh: 'CNBC 人物入口', en: 'CNBC person entry'}, {zh: '适合补充芒格对市场周期、银行、科技股和中国的判断。', en: 'Useful for Munger views on cycles, banks, tech stocks, and China.'}),
  pc('launch', '2023', {zh: 'Daily Journal 股东大会', en: 'Daily Journal annual meeting'}, 'https://www.djmco.com/', {zh: 'Daily Journal 官方入口', en: 'Daily Journal official entry'}, {zh: '投资人没有产品发布会，股东大会就是思想产品发布。', en: 'For investors, annual meetings are thought-product launches.'}),
  pc('launch', '2023', {zh: 'Berkshire 股东大会：巴菲特与芒格同台问答', en: 'Berkshire annual meeting: Buffett and Munger Q&A'}, 'https://www.berkshirehathaway.com/meet01/visguide2023.pdf', {zh: 'Berkshire 股东大会资料', en: 'Berkshire annual meeting material'}, {zh: '适合反复学习两人如何用商业常识回答复杂问题。', en: 'Useful for how they answer complex questions with business common sense.'}),
  pc('launch', '1994', {zh: '《Worldly Wisdom》多元思维模型公开表达', en: 'Worldly wisdom and multidisciplinary models public expression'}, 'https://fs.blog/mental-models/', {zh: '学习资料入口', en: 'Study material entry'}, {zh: '把芒格当作“世界模型发布者”来研究。', en: 'Study Munger as a publisher of world models.'}),
  pc('book', '2005', {zh: '《Poor Charlie’s Almanack》', en: 'Poor Charlie’s Almanack'}, 'https://www.poorcharliesalmanack.com/', {zh: '图书官方入口', en: 'Book official entry'}, {zh: '芒格最重要的系统性阅读材料。', en: 'The most important systematic reading material for Munger.'}),
  pc('book', '2023', {zh: '《Poor Charlie’s Almanack》新版', en: 'Poor Charlie’s Almanack new edition'}, 'https://www.penguinrandomhouse.com/books/738335/poor-charlies-almanack-by-charles-t-munger/', {zh: 'Penguin Random House', en: 'Penguin Random House'}, {zh: '适合后续拆成多元模型、误判心理学和投资原则专题。', en: 'Can later be decomposed into mental models, psychology of misjudgment, and investing principles.'}),
  pc('book', '2024', {zh: 'Berkshire 股东信中的芒格纪念', en: 'Munger remembrance in Berkshire shareholder letters'}, 'https://www.berkshirehathaway.com/letters/letters.html', {zh: 'Berkshire 股东信', en: 'Berkshire shareholder letters'}, {zh: '一手材料，适合理解芒格对 Berkshire 文化的贡献。', en: 'Primary material for Munger contribution to Berkshire culture.'})
]);

replacePersonContent('duan-yongping', [
  pc('news', '2024', {zh: '段永平公开讨论 Apple、茅台等长期投资案例', en: 'Duan Yongping publicly discusses Apple, Moutai, and long-term investing cases'}, 'https://www.google.com/search?q=%E6%AE%B5%E6%B0%B8%E5%B9%B3+Apple+%E8%8C%85%E5%8F%B0+%E6%8A%95%E8%B5%84', {zh: '公开资料检索入口', en: 'Public material search entry'}, {zh: '段永平近期公开新闻较少，先放典型公开讨论入口，后续可替换成具体新闻源。', en: 'Duan has fewer recent public news items; this keeps a representative public-discussion entry for later replacement.'}),
  pc('news', '2023', {zh: '段永平投资理念持续被市场讨论：本分、长期与能力圈', en: 'Duan investing ideas keep being discussed: integrity, long-termism, and circle of competence'}, 'https://www.google.com/search?q=%E6%AE%B5%E6%B0%B8%E5%B9%B3+%E6%9C%AC%E5%88%86+%E6%8A%95%E8%B5%84', {zh: '公开资料检索入口', en: 'Public material search entry'}, {zh: '适合把人物专题定位为投资思想和企业文化研究，而不是新闻追踪。', en: 'Useful for positioning the page as investing thought and culture study, not news chasing.'}),
  pc('news', '2006', {zh: '段永平拍下巴菲特午餐，强化价值投资公开学习线索', en: 'Duan wins Buffett charity lunch, strengthening public value-investing thread'}, 'https://www.google.com/search?q=Duan+Yongping+Buffett+lunch', {zh: '公开资料检索入口', en: 'Public material search entry'}, {zh: '典型新闻，适合研究段永平如何公开连接巴菲特体系。', en: 'Representative story for how Duan publicly connects to Buffett framework.'}),
  pc('speech', '2020', {zh: '雪球 / 公开问答：本分、商业模式与投资', en: 'Public Q&A: integrity, business model, and investing'}, 'https://xueqiu.com/search?q=%E6%AE%B5%E6%B0%B8%E5%B9%B3', {zh: '雪球公开资料入口', en: 'Xueqiu public material entry'}, {zh: '适合整理段永平的公开问答式表达。', en: 'Useful for organizing Duan public Q&A style expression.'}),
  pc('speech', '2018', {zh: '公开分享资料：企业文化与长期主义', en: 'Public sharing material: culture and long-termism'}, 'https://www.google.com/search?q=%E6%AE%B5%E6%B0%B8%E5%B9%B3+%E6%BC%94%E8%AE%B2+%E4%BC%81%E4%B8%9A%E6%96%87%E5%8C%96', {zh: '公开资料检索入口', en: 'Public material search entry'}, {zh: '用于补充他如何把“本分”放进企业和投资体系。', en: 'Useful for how he puts integrity into company and investing systems.'}),
  pc('speech', '2006', {zh: '巴菲特午餐后的公开分享线索', en: 'Public sharing after Buffett lunch'}, 'https://www.google.com/search?q=%E6%AE%B5%E6%B0%B8%E5%B9%B3+%E5%B7%B4%E8%8F%B2%E7%89%B9%E5%8D%88%E9%A4%90+%E5%88%86%E4%BA%AB', {zh: '公开资料检索入口', en: 'Public material search entry'}, {zh: '适合看中国语境下如何理解巴菲特和芒格。', en: 'Useful for how Buffett and Munger are interpreted in Chinese context.'}),
  pc('interview', '2020', {zh: '段永平公开访谈：投资、企业与人生原则', en: 'Duan public interviews: investing, business, and life principles'}, 'https://www.google.com/search?q=%E6%AE%B5%E6%B0%B8%E5%B9%B3+%E8%AE%BF%E8%B0%88+%E6%8A%95%E8%B5%84', {zh: '公开访谈检索入口', en: 'Public interview search entry'}, {zh: '适合后续筛选最可信的一手或准一手访谈。', en: 'Useful for later selecting the most reliable primary or near-primary interviews.'}),
  pc('interview', '2018', {zh: 'OPPO / vivo / 步步高相关访谈资料', en: 'OPPO / vivo / BBK related interview material'}, 'https://www.google.com/search?q=%E6%AE%B5%E6%B0%B8%E5%B9%B3+OPPO+vivo+%E6%AD%A5%E6%AD%A5%E9%AB%98+%E8%AE%BF%E8%B0%88', {zh: '公开资料检索入口', en: 'Public material search entry'}, {zh: '用于理解授权、品牌、渠道和文化延续。', en: 'Useful for delegation, brand, channel, and cultural continuity.'}),
  pc('interview', '2001', {zh: '网易、步步高与早期投资访谈资料', en: 'NetEase, BBK, and early investing interview material'}, 'https://www.google.com/search?q=%E6%AE%B5%E6%B0%B8%E5%B9%B3+%E7%BD%91%E6%98%93+%E8%AE%BF%E8%B0%88', {zh: '公开资料检索入口', en: 'Public material search entry'}, {zh: '适合研究段永平从企业家转向长期投资者的路径。', en: 'Useful for Duan path from entrepreneur to long-term investor.'}),
  pc('launch', '1995', {zh: '步步高品牌与消费电子业务启动', en: 'BBK brand and consumer electronics business begins'}, 'https://www.google.com/search?q=%E6%AD%A5%E6%AD%A5%E9%AB%98+%E6%AE%B5%E6%B0%B8%E5%B9%B3+%E5%88%9B%E4%B8%9A', {zh: '公开资料检索入口', en: 'Public material search entry'}, {zh: '企业家专题里，品牌和商业模式启动就是核心发布节点。', en: 'For an entrepreneur page, brand and business-model launch is a core launch node.'}),
  pc('launch', '2001', {zh: 'OPPO / vivo 生态的授权与延伸', en: 'Delegation and extension toward OPPO / vivo ecosystem'}, 'https://www.google.com/search?q=%E6%AE%B5%E6%B0%B8%E5%B9%B3+OPPO+vivo+%E6%8E%88%E6%9D%83', {zh: '公开资料检索入口', en: 'Public material search entry'}, {zh: '适合研究段永平如何通过文化、授权和利益机制延续组织能力。', en: 'Useful for culture, delegation, and incentive mechanisms.'}),
  pc('launch', '2006', {zh: '巴菲特午餐：投资学习路线公开化', en: 'Buffett lunch: public investing-learning route'}, 'https://www.google.com/search?q=Duan+Yongping+Buffett+lunch', {zh: '公开资料检索入口', en: 'Public material search entry'}, {zh: '对投资人专题而言，这是思想路线的公开发布节点。', en: 'For an investor page, this is a public launch of a learning route.'}),
  pc('book', '2020', {zh: '段永平公开问答与语录整理', en: 'Duan public Q&A and quotes collections'}, 'https://www.google.com/search?q=%E6%AE%B5%E6%B0%B8%E5%B9%B3+%E9%97%AE%E7%AD%94+%E8%AF%AD%E5%BD%95', {zh: '公开资料检索入口', en: 'Public material search entry'}, {zh: '目前更适合作为资料整理入口，后续可筛选可靠版本。', en: 'Currently best as a material entry; later we can select reliable versions.'}),
  pc('book', '2020', {zh: '《本分》相关资料', en: 'Integrity / Benfen related material'}, 'https://www.google.com/search?q=%E6%AE%B5%E6%B0%B8%E5%B9%B3+%E6%9C%AC%E5%88%86+%E4%B9%A6', {zh: '图书检索入口', en: 'Book search entry'}, {zh: '用于整理“本分”作为企业文化和投资原则的核心概念。', en: 'Useful for integrity as core concept in company culture and investing principles.'}),
  pc('book', '2006', {zh: '巴菲特股东信与芒格资料作为段永平投资底座', en: 'Buffett letters and Munger material as Duan investing foundation'}, 'https://www.berkshirehathaway.com/letters/letters.html', {zh: 'Berkshire 股东信', en: 'Berkshire shareholder letters'}, {zh: '段永平专题的底层阅读应连接巴菲特、芒格和长期商业质量。', en: 'Duan page foundation should connect Buffett, Munger, and long-term business quality.'})
]);

export const companies: CompanyProfile[] = [
  {
    slug: 'nvidia',
    name: {zh: '英伟达', en: 'NVIDIA'},
    category: {zh: 'AI 计算平台', en: 'AI computing platform'},
    summary: {
      zh: '英伟达的核心不是单个芯片，而是 GPU、网络、软件、开发者和生态伙伴共同组成的 AI 计算平台。',
      en: 'NVIDIA is best understood as an AI computing platform that combines GPUs, networking, software, developers, and ecosystem partners.'
    },
    officialLinks: [
      {label: {zh: '官网', en: 'Official site'}, href: 'https://www.nvidia.com/'},
      {label: {zh: '投资者关系', en: 'Investor relations'}, href: 'https://investor.nvidia.com/'},
      {label: {zh: '新闻中心', en: 'Newsroom'}, href: 'https://nvidianews.nvidia.com/'}
    ],
    timeline: [
      {
        year: '2026',
        event: {zh: 'GTC Taipei / COMPUTEX 期间继续推进个人 AI、物理 AI、机器人和 AI PC 平台。', en: 'During GTC Taipei and COMPUTEX, NVIDIA continued pushing personal AI, physical AI, robotics, and AI PC platforms.'},
        imageHint: {zh: '可配黄仁勋 COMPUTEX / GTC Taipei 舞台图或 RTX Spark 产品图。', en: 'Use a Jensen Huang COMPUTEX / GTC Taipei stage image or RTX Spark product image.'},
        href: 'https://www.nvidia.com/en-tw/gtc/taipei/keynote/'
      },
      {
        year: '2024',
        event: {zh: '发布 Blackwell 平台，把 GPU、CPU、网络、系统和软件打包成面向 AI 工厂的新一代计算平台。', en: 'Launched the Blackwell platform, packaging GPU, CPU, networking, systems, and software into a next-generation platform for AI factories.'},
        imageHint: {zh: '可配 Blackwell 芯片、GB200 NVL72 或 GTC 发布会图片。', en: 'Use a Blackwell chip, GB200 NVL72, or GTC launch image.'},
        href: 'https://nvidianews.nvidia.com/news/nvidia-blackwell-platform-arrives-to-power-a-new-era-of-computing'
      },
      {
        year: '2023',
        event: {zh: '生成式 AI 需求爆发，数据中心业务成为英伟达最核心增长引擎。', en: 'Generative AI demand surged, making Data Center NVIDIA’s core growth engine.'},
        imageHint: {zh: '可配数据中心 GPU 集群、H100 或 AI 工厂示意图。', en: 'Use a data center GPU cluster, H100, or AI factory image.'}
      },
      {
        year: '2020',
        event: {zh: '完成收购 Mellanox，补强高速网络和数据中心系统能力。', en: 'Completed the acquisition of Mellanox, strengthening high-speed networking and data center systems capability.'},
        imageHint: {zh: '可配 Mellanox 网络设备或数据中心网络图片。', en: 'Use Mellanox networking hardware or data center networking imagery.'},
        href: 'https://nvidianews.nvidia.com/news/nvidia-completes-acquisition-of-mellanox'
      },
      {
        year: '2016',
        event: {zh: '深度学习和 GPU 训练需求快速上升，英伟达从图形芯片公司转向 AI 计算平台公司。', en: 'Deep learning and GPU training demand accelerated, shifting NVIDIA from graphics chip company toward AI computing platform.'},
        imageHint: {zh: '可配早期深度学习 / DGX / Pascal 时代图片。', en: 'Use early deep learning, DGX, or Pascal-era imagery.'}
      },
      {
        year: '2006',
        event: {zh: '推出 CUDA，推动 GPU 从图形处理进入通用并行计算。', en: 'Launched CUDA, pushing GPUs from graphics processing into general-purpose parallel computing.'},
        imageHint: {zh: '可配 CUDA 标识、开发者大会或早期 GPU 编程资料图。', en: 'Use CUDA branding, developer conference, or early GPU programming imagery.'}
      },
      {
        year: '1999',
        event: {zh: '推出 GeForce 256，并提出 GPU 概念，强化图形计算平台定位。', en: 'Launched GeForce 256 and popularized the GPU concept, strengthening NVIDIA’s graphics computing platform position.'},
        imageHint: {zh: '可配 GeForce 256 产品图。', en: 'Use a GeForce 256 product image.'}
      },
      {
        year: '1993',
        event: {zh: '黄仁勋、Chris Malachowsky 和 Curtis Priem 创立 NVIDIA，早期聚焦图形计算。', en: 'Jensen Huang, Chris Malachowsky, and Curtis Priem founded NVIDIA with an early focus on graphics computing.'},
        imageHint: {zh: '可配创始人早期照片或 NVIDIA 早期办公室照片。', en: 'Use early founder or early NVIDIA office imagery.'}
      }
    ],
    products: [
      {zh: 'GPU、AI 加速器与整机系统', en: 'GPUs, AI accelerators, and full systems'},
      {zh: '网络、数据中心平台和软件栈', en: 'Networking, data center platforms, and software stack'},
      {zh: '面向开发者和企业的 AI 工具链', en: 'AI toolchains for developers and enterprises'}
    ],
    productSegments: [
      {
        title: {zh: 'Data Center 数据中心', en: 'Data Center'},
        revenueLabel: {zh: '财报最大收入板块', en: 'Largest revenue segment'},
        summary: {
          zh: '面向云厂商、企业、AI 模型公司和超算客户，核心是 AI 训练、推理、网络和整机系统。',
          en: 'Serves cloud providers, enterprises, AI model companies, and supercomputing customers, centered on AI training, inference, networking, and full systems.'
        },
        products: [
          {zh: 'H100 / H200 / Blackwell GPU 与加速卡', en: 'H100 / H200 / Blackwell GPUs and accelerators'},
          {zh: 'DGX、HGX、GB200 NVL72 等整机和系统平台', en: 'DGX, HGX, GB200 NVL72, and system platforms'},
          {zh: 'InfiniBand、Spectrum-X、NVLink 等网络互连', en: 'InfiniBand, Spectrum-X, NVLink, and networking interconnects'},
          {zh: 'CUDA、TensorRT、NIM、AI Enterprise 等软件', en: 'CUDA, TensorRT, NIM, AI Enterprise, and software stack'}
        ]
      },
      {
        title: {zh: 'Gaming 游戏', en: 'Gaming'},
        revenueLabel: {zh: 'GeForce 与游戏生态', en: 'GeForce and gaming ecosystem'},
        summary: {
          zh: '面向玩家、创作者和 PC 生态，核心是 GeForce RTX GPU、光线追踪、DLSS 和游戏开发生态。',
          en: 'Serves gamers, creators, and the PC ecosystem through GeForce RTX GPUs, ray tracing, DLSS, and game developer ecosystem.'
        },
        products: [
          {zh: 'GeForce RTX 显卡和笔记本 GPU', en: 'GeForce RTX desktop and laptop GPUs'},
          {zh: 'DLSS、光线追踪、RTX Remix', en: 'DLSS, ray tracing, RTX Remix'},
          {zh: 'GeForce NOW 云游戏', en: 'GeForce NOW cloud gaming'}
        ]
      },
      {
        title: {zh: 'Professional Visualization 专业可视化', en: 'Professional Visualization'},
        revenueLabel: {zh: '设计、仿真与数字孪生', en: 'Design, simulation, and digital twins'},
        summary: {
          zh: '面向设计师、工程师、影视制作和工业仿真客户，连接图形工作站、Omniverse 和数字孪生。',
          en: 'Serves designers, engineers, media production, and industrial simulation customers through workstations, Omniverse, and digital twins.'
        },
        products: [
          {zh: 'RTX 专业工作站 GPU', en: 'RTX professional workstation GPUs'},
          {zh: 'Omniverse 与数字孪生工具', en: 'Omniverse and digital twin tools'},
          {zh: '仿真、渲染、工业设计软件生态', en: 'Simulation, rendering, and industrial design software ecosystem'}
        ]
      },
      {
        title: {zh: 'Automotive 汽车', en: 'Automotive'},
        revenueLabel: {zh: '自动驾驶与车载计算', en: 'Autonomy and in-vehicle computing'},
        summary: {
          zh: '面向车企和自动驾驶生态，核心是车载计算平台、自动驾驶软件、仿真和训练基础设施。',
          en: 'Serves automakers and autonomy ecosystem through in-vehicle compute platforms, autonomy software, simulation, and training infrastructure.'
        },
        products: [
          {zh: 'NVIDIA DRIVE 平台', en: 'NVIDIA DRIVE platform'},
          {zh: 'DriveOS、自动驾驶软件和仿真工具', en: 'DriveOS, autonomy software, and simulation tools'},
          {zh: 'Thor 等车载计算芯片路线', en: 'Thor and in-vehicle compute roadmap'}
        ]
      },
      {
        title: {zh: 'OEM / Other 其他', en: 'OEM / Other'},
        revenueLabel: {zh: 'OEM 与边缘设备补充业务', en: 'OEM and edge device adjacent business'},
        summary: {
          zh: '包括 OEM 相关收入、边缘设备和一些补充性产品线，不是核心叙事，但能反映英伟达平台进入更多硬件场景。',
          en: 'Includes OEM-related revenue, edge devices, and adjacent product lines. It is not the core narrative, but shows the platform entering more hardware contexts.'
        },
        products: [
          {zh: 'Jetson 边缘 AI 设备', en: 'Jetson edge AI devices'},
          {zh: 'OEM 模块与嵌入式计算', en: 'OEM modules and embedded computing'},
          {zh: '机器人、工业边缘和教育研究设备', en: 'Robotics, industrial edge, and research devices'}
        ]
      }
    ],
    businessModel: [
      {zh: '硬件销售带来收入，软件和生态提高粘性。', en: 'Hardware sales drive revenue while software and ecosystem increase stickiness.'},
      {zh: '数据中心客户、云厂商和企业 AI 需求是关键变量。', en: 'Data center customers, cloud providers, and enterprise AI demand are key variables.'}
    ],
    culture: [
      {zh: '强调工程强度、平台思维和公开叙事能力。', en: 'Emphasizes engineering intensity, platform thinking, and public narrative.'}
    ],
    cultureModel: {
      thesis: {
        zh: '英伟达的文化不是温和的“好公司氛围”，而是一种面向高难度技术平台的高强度组织系统：创始人长期掌舵、工程判断优先、信息快速流动、团队围绕长期平台战略持续投入。它的不同之处在于，文化直接服务于“提前十多年押注未来计算市场”的战略耐心。',
        en: 'NVIDIA culture is not merely a pleasant workplace atmosphere. It is a high-intensity organizational system for a difficult technology platform: founder-led, engineering-first, fast information flow, and long-term team investment around platform strategy.'
      },
      dimensions: [
        {
          title: {zh: '创始人 / CEO：长期技术判断的中心', en: 'Founder / CEO: center of long-term technical judgment'},
          summary: {
            zh: '黄仁勋不是只做资本市场叙事的 CEO，而是长期参与技术路线、平台定位、客户场景和公开表达。他的核心作用，是把公司放在一个长期计算趋势里，而不是只追逐当季产品周期。',
            en: 'Jensen Huang is not only a capital-market storyteller. He remains deeply involved in technology roadmap, platform positioning, customer scenarios, and public communication.'
          },
          practices: [
            {zh: '长期围绕“加速计算、CUDA、AI 工厂、数据中心即计算机”等核心概念反复表达。', en: 'Repeatedly communicates core ideas such as accelerated computing, CUDA, AI factories, and the data center as the computer.'},
            {zh: '把发布会变成战略地图：行业瓶颈、客户需求、产品路线图、生态伙伴和未来市场一起讲。', en: 'Turns launches into strategic maps linking industry bottlenecks, customer needs, roadmap, ecosystem partners, and future markets.'},
            {zh: '在市场还不理解时坚持投入 CUDA、开发者生态、网络和系统平台。', en: 'Kept investing in CUDA, developer ecosystem, networking, and system platforms before the market fully understood them.'}
          ],
          whyDifferent: {
            zh: '很多 CEO 管季度、管销售、管资本市场，黄仁勋更像“首席架构师 + 首席布道者”。他把技术判断、公司战略和外部叙事绑在一起。',
            en: 'Many CEOs manage quarters, sales, or capital markets. Jensen Huang behaves more like chief architect plus chief evangelist, tying technical judgment, company strategy, and external narrative together.'
          }
        },
        {
          title: {zh: '团队：高密度工程人才与平台型组织', en: 'Team: dense engineering talent and platform organization'},
          summary: {
            zh: '英伟达不是靠单个明星产品，而是靠芯片、系统、网络、软件、开发者工具和客户工程团队共同工作。团队结构必须服务于平台，而不是只服务于一个部门的局部目标。',
            en: 'NVIDIA does not rely on one star product. Chips, systems, networking, software, developer tools, and customer engineering teams must work together as a platform organization.'
          },
          practices: [
            {zh: '硬件、软件、网络、系统和生态团队围绕同一代平台协同推进。', en: 'Hardware, software, networking, systems, and ecosystem teams coordinate around each platform generation.'},
            {zh: '重视开发者、客户工程和生态伙伴，把客户落地问题带回产品系统。', en: 'Values developers, customer engineering, and ecosystem partners, feeding deployment problems back into the product system.'},
            {zh: '长期沉淀 CUDA、库、工具链和文档，让团队成果变成生态资产。', en: 'Compounds CUDA, libraries, toolchains, and documentation so team output becomes ecosystem asset.'}
          ],
          whyDifferent: {
            zh: '普通硬件公司容易被产品线切碎，英伟达的强处是把多个团队组织成一个计算平台，这让产品迭代和生态壁垒互相增强。',
            en: 'Hardware companies can be fragmented by product lines. NVIDIA’s strength is organizing many teams into one computing platform, making product iteration and ecosystem moat reinforce each other.'
          }
        },
        {
          title: {zh: '管理 / 协作方式：信息透明、快速同步、少层级损耗', en: 'Management / collaboration: transparency, fast sync, low hierarchy loss'},
          summary: {
            zh: '黄仁勋多次谈到，他倾向于让信息在组织里公开流动，而不是层层过滤。对高复杂度技术公司来说，信息速度本身就是执行力。',
            en: 'Jensen Huang has often described a preference for information to flow openly rather than through many layers. In a complex technology company, information speed is execution power.'
          },
          practices: [
            {zh: '减少层级过滤，让更多人直接接触问题、判断和上下文。', en: 'Reduces hierarchy filtering so more people can access problems, judgments, and context directly.'},
            {zh: '鼓励公开同步和跨团队协作，而不是把关键判断锁在小范围会议里。', en: 'Encourages open synchronization and cross-team collaboration rather than locking key judgments inside small meetings.'},
            {zh: '用高频反馈推动产品、客户和工程问题快速闭环。', en: 'Uses frequent feedback to close loops between product, customer, and engineering problems.'}
          ],
          whyDifferent: {
            zh: '很多大公司变慢，是因为信息在层级里衰减。英伟达文化的厉害之处，是把“知道真实情况的人”和“能做决策的人”尽量拉近。',
            en: 'Many large companies slow down because information decays through hierarchy. NVIDIA’s cultural strength is keeping people who know reality close to people who make decisions.'
          }
        },
        {
          title: {zh: '价值观：高标准、长期主义、真实面对困难', en: 'Values: high standards, long-termism, and facing difficulty honestly'},
          summary: {
            zh: '英伟达的价值观不是口号式轻松，而是愿意在难题上长期投入。CUDA、AI 计算、数据中心网络、机器人和物理 AI 都不是短期容易兑现的方向。',
            en: 'NVIDIA’s values are not easy slogans. They show up as willingness to invest for a long time in difficult problems such as CUDA, AI computing, data center networking, robotics, and physical AI.'
          },
          practices: [
            {zh: '选择大市场、大难题，而不是只做确定性更强的小改良。', en: 'Chooses large markets and hard problems rather than only safer incremental improvements.'},
            {zh: '允许早期方向不被市场理解，但要求组织持续学习和迭代。', en: 'Allows early directions to be misunderstood by the market, while requiring continuous learning and iteration.'},
            {zh: '把客户问题、工程现实和长期愿景放在一起校准。', en: 'Calibrates customer problems, engineering reality, and long-term vision together.'}
          ],
          whyDifferent: {
            zh: '它的价值观真正落到战略耐心上：不是等趋势确认后才追，而是在趋势还模糊时就把组织能力、生态和产品路线放进去。',
            en: 'Its values show up as strategic patience: not waiting until a trend is obvious, but placing organization capability, ecosystem, and roadmap into the trend while it is still unclear.'
          }
        }
      ]
    },
    moat: [
      {zh: 'CUDA 生态、芯片设计能力、系统集成、供应链和开发者网络。', en: 'CUDA ecosystem, chip design, systems integration, supply chain, and developer network.'}
    ],
    watchlist: [
      {zh: '行业：AI 训练、推理和数据中心资本开支。', en: 'Industry: AI training, inference, and data center capital expenditure.'},
      {zh: '竞争：自研芯片、AMD、云厂商和 ASIC。', en: 'Competition: in-house chips, AMD, cloud providers, and ASICs.'},
      {zh: '政策：出口管制、供应链和地缘风险。', en: 'Policy: export controls, supply chain, and geopolitical risk.'}
    ],
    deepQuestions: {
      timeline: [
        {zh: '哪些关键事件真正改变了英伟达的公司性质，而不只是改变了一个产品周期？', en: 'Which events changed NVIDIA’s company identity, not merely a product cycle?'},
        {zh: 'CUDA、Mellanox、Blackwell 这些节点之间，有没有一条共同的平台化逻辑？', en: 'Is there one shared platform logic connecting CUDA, Mellanox, and Blackwell?'},
        {zh: '英伟达是在什么时候从“显卡公司”变成“AI 基础设施公司”的？', en: 'When did NVIDIA shift from graphics card company to AI infrastructure company?'}
      ],
      products: [
        {zh: '哪个业务板块最能体现英伟达从硬件销售转向平台收入的能力？', en: 'Which segment best shows NVIDIA’s move from hardware sales toward platform revenue?'},
        {zh: 'Data Center 的产品组合里，芯片、网络、系统和软件分别承担什么战略角色？', en: 'Inside Data Center, what strategic roles do chips, networking, systems, and software each play?'},
        {zh: 'Gaming、专业可视化、汽车这些板块，是核心增长引擎，还是平台能力外溢？', en: 'Are Gaming, Professional Visualization, and Automotive core growth engines or spillovers from platform capability?'}
      ],
      businessModel: [
        {zh: '英伟达的利润弹性来自芯片定价，还是来自客户对完整 AI 基础设施的依赖？', en: 'Does NVIDIA’s profit elasticity come from chip pricing or customer dependence on full AI infrastructure?'},
        {zh: '当客户从买 GPU 变成买系统、网络和软件栈时，商业模式发生了什么变化？', en: 'What changes when customers move from buying GPUs to buying systems, networking, and software stack?'}
      ],
      culture: [
        {zh: '黄仁勋的创始人长期掌舵，如何影响英伟达对 CUDA 和 AI 计算的战略耐心？', en: 'How does founder-led leadership shape NVIDIA’s patience around CUDA and AI computing?'},
        {zh: '信息透明、少层级损耗这种管理方式，为什么特别适合高复杂度技术平台公司？', en: 'Why is transparency and low hierarchy loss especially suited to a complex technology platform company?'},
        {zh: '英伟达文化里的高强度和长期主义，如何同时避免短期内耗和战略漂移？', en: 'How does NVIDIA’s high-intensity long-termism avoid short-term waste and strategic drift?'}
      ],
      moat: [
        {zh: 'CUDA 生态、网络、系统和开发者习惯里，哪一个最难被竞争对手复制？', en: 'Among CUDA ecosystem, networking, systems, and developer habits, which is hardest to copy?'},
        {zh: '云厂商自研芯片会削弱英伟达，还是反而证明 AI 计算市场足够巨大？', en: 'Do cloud in-house chips weaken NVIDIA, or prove the AI computing market is large enough?'}
      ],
      watchlist: [
        {zh: '如果 AI 推理成本快速下降，英伟达的需求是被压缩，还是会因为使用量扩大而继续增长？', en: 'If inference cost falls quickly, does NVIDIA demand compress or grow through usage expansion?'},
        {zh: '出口管制、供应链和地缘风险会如何改变英伟达的产品设计和客户结构？', en: 'How could export controls, supply chain, and geopolitics change NVIDIA’s product design and customer mix?'}
      ]
    },
    futureQuestions: [
      {zh: 'AI 推理需求能否接住训练需求之后的增长？', en: 'Can inference demand sustain growth after training demand?'},
      {zh: '软件和系统能力能否继续扩大护城河？', en: 'Can software and systems continue expanding the moat?'}
    ]
  },
  {
    slug: 'tesla',
    name: {zh: '特斯拉', en: 'Tesla'},
    category: {zh: '电动车、能源与自动驾驶', en: 'Electric vehicles, energy, and autonomy'},
    summary: {
      zh: '特斯拉需要同时从汽车制造、能源系统、软件、自动驾驶和机器人方向理解。',
      en: 'Tesla should be studied across automotive manufacturing, energy systems, software, autonomy, and robotics.'
    },
    officialLinks: [
      {label: {zh: '官网', en: 'Official site'}, href: 'https://www.tesla.com/'},
      {label: {zh: '投资者关系', en: 'Investor relations'}, href: 'https://ir.tesla.com/'}
    ],
    timeline: [
      {year: '2003', event: {zh: '公司成立，推动电动车商业化。', en: 'Founded to commercialize electric vehicles.'}},
      {year: '2012', event: {zh: 'Model S 帮助公司进入高端主流视野。', en: 'Model S brought the company into premium mainstream attention.'}},
      {year: '2020s', event: {zh: '自动驾驶、能源和机器人逐渐成为长期叙事。', en: 'Autonomy, energy, and robotics became major long-term narratives.'}}
    ],
    products: [
      {zh: '电动车、充电网络、储能和太阳能产品。', en: 'Electric vehicles, charging network, storage, and solar products.'},
      {zh: 'FSD、车载软件和机器人相关研发。', en: 'FSD, vehicle software, and robotics research.'}
    ],
    businessModel: [
      {zh: '汽车销售是基础，软件、能源和服务决定未来利润弹性。', en: 'Vehicle sales are the base; software, energy, and services shape future profit elasticity.'}
    ],
    culture: [
      {zh: '速度、工程驱动、垂直整合和高目标压力。', en: 'Speed, engineering drive, vertical integration, and high goal pressure.'}
    ],
    moat: [
      {zh: '制造效率、品牌、充电网络、数据闭环、软件能力和规模。', en: 'Manufacturing efficiency, brand, charging network, data loop, software capability, and scale.'}
    ],
    watchlist: [
      {zh: '市场：电动车需求、价格竞争和宏观利率。', en: 'Market: EV demand, pricing competition, and macro rates.'},
      {zh: '政策：补贴、自动驾驶监管和能源政策。', en: 'Policy: incentives, autonomy regulation, and energy policy.'}
    ],
    futureQuestions: [
      {zh: '自动驾驶能否从技术能力变成可规模化商业模式？', en: 'Can autonomy turn from technical capability into scalable business model?'},
      {zh: '能源业务是否会成为第二增长曲线？', en: 'Can energy become a second growth curve?'}
    ]
  },
  {
    slug: 'openai',
    name: {zh: 'OpenAI', en: 'OpenAI'},
    category: {zh: 'AI 模型与产品平台', en: 'AI model and product platform'},
    summary: {
      zh: 'OpenAI 同时是模型研发组织、产品公司、平台公司和 AI 基础设施需求方。',
      en: 'OpenAI is simultaneously a model lab, product company, platform company, and AI infrastructure demand driver.'
    },
    officialLinks: [
      {label: {zh: '官网', en: 'Official site'}, href: 'https://openai.com/'},
      {label: {zh: '新闻', en: 'News'}, href: 'https://openai.com/news/'},
      {label: {zh: '开发者平台', en: 'Developer platform'}, href: 'https://platform.openai.com/'}
    ],
    timeline: [
      {year: '2015', event: {zh: 'OpenAI 成立。', en: 'OpenAI was founded.'}},
      {year: '2022', event: {zh: 'ChatGPT 推动生成式 AI 进入大众市场。', en: 'ChatGPT brought generative AI into the mass market.'}},
      {year: '2020s', event: {zh: '模型、产品、平台和企业服务同步扩展。', en: 'Models, products, platform, and enterprise services expanded together.'}}
    ],
    products: [
      {zh: 'ChatGPT、API、企业产品、多模态模型和开发者工具。', en: 'ChatGPT, API, enterprise products, multimodal models, and developer tools.'}
    ],
    businessModel: [
      {zh: '订阅、API 使用量、企业服务和生态合作。', en: 'Subscriptions, API usage, enterprise services, and ecosystem partnerships.'}
    ],
    culture: [
      {zh: '前沿研究、产品化速度、安全治理和高密度人才协作。', en: 'Frontier research, product velocity, safety governance, and dense talent collaboration.'}
    ],
    moat: [
      {zh: '模型能力、产品分发、品牌、数据反馈、开发者生态和算力合作。', en: 'Model capability, product distribution, brand, data feedback, developer ecosystem, and compute partnerships.'}
    ],
    watchlist: [
      {zh: '行业：模型能力、推理成本、企业采用和监管。', en: 'Industry: model capability, inference cost, enterprise adoption, and regulation.'},
      {zh: '竞争：Anthropic、Google、Meta、开源模型和垂直应用。', en: 'Competition: Anthropic, Google, Meta, open models, and vertical apps.'}
    ],
    futureQuestions: [
      {zh: '模型能力领先能否长期转化为产品和平台利润？', en: 'Can model leadership convert into durable product and platform profits?'},
      {zh: 'AI 应用会集中在通用助手，还是被垂直场景拆分？', en: 'Will AI apps concentrate around general assistants or fragment into vertical workflows?'}
    ]
  }
];

function companyProfile(input: {
  slug: string;
  name: LocalizedText;
  category: LocalizedText;
  summary: LocalizedText;
  officialLinks: PrimarySource[];
  timeline: CompanyProfile['timeline'];
  segments: NonNullable<CompanyProfile['productSegments']>;
  businessModel: LocalizedText[];
  cultureThesis: LocalizedText;
  moat: LocalizedText[];
  watchlist: LocalizedText[];
}): CompanyProfile {
  return {
    slug: input.slug,
    name: input.name,
    category: input.category,
    summary: input.summary,
    officialLinks: input.officialLinks,
    timeline: input.timeline,
    products: input.segments.flatMap((segment) => segment.products.slice(0, 1)),
    productSegments: input.segments,
    businessModel: input.businessModel,
    culture: [input.cultureThesis],
    cultureModel: {
      thesis: input.cultureThesis,
      dimensions: [
        {
          title: {zh: '创始人 / CEO', en: 'Founder / CEO'},
          summary: {zh: '观察核心领导者如何定义公司方向、资源优先级和外部叙事。', en: 'Observe how leadership defines direction, resource priorities, and external narrative.'},
          practices: [
            {zh: '长期重复核心战略关键词。', en: 'Repeats core strategic keywords over time.'},
            {zh: '用产品路线图和客户问题校准组织。', en: 'Uses roadmaps and customer problems to align the organization.'},
            {zh: '在高不确定性中保持资源聚焦。', en: 'Keeps resources focused under uncertainty.'}
          ],
          whyDifferent: {zh: '这类公司通常不是单点产品竞争，而是组织、生态和资本配置共同竞争。', en: 'These companies usually compete through organization, ecosystem, and capital allocation, not a single product.'}
        },
        {
          title: {zh: '团队与协作', en: 'Team and collaboration'},
          summary: {zh: '重点看跨职能团队如何把技术、产品、客户和商业化连接起来。', en: 'Study how cross-functional teams connect technology, product, customers, and commercialization.'},
          practices: [
            {zh: '围绕关键平台或客户场景协作。', en: 'Collaborates around key platforms or customer scenarios.'},
            {zh: '把一线反馈带回研发和决策。', en: 'Feeds frontline feedback back into R&D and decisions.'},
            {zh: '用高标准缩短学习周期。', en: 'Uses high standards to shorten learning cycles.'}
          ],
          whyDifferent: {zh: '协作方式决定复杂系统能否持续升级。', en: 'Collaboration determines whether complex systems keep improving.'}
        },
        {
          title: {zh: '价值观与制度', en: 'Values and systems'},
          summary: {zh: '看价值观是否真正影响产品取舍、客户关系、人才密度和风险管理。', en: 'See whether values actually shape product tradeoffs, customer relationships, talent density, and risk management.'},
          practices: [
            {zh: '把价值观落实到制度和产品选择。', en: 'Turns values into systems and product choices.'},
            {zh: '在增长、监管和竞争之间做取舍。', en: 'Makes tradeoffs among growth, regulation, and competition.'},
            {zh: '建立长期可信度，而不是只追短期速度。', en: 'Builds long-term credibility, not only short-term speed.'}
          ],
          whyDifferent: {zh: '长期壁垒往往来自制度化的价值观，而不是口号。', en: 'Durable moats often come from institutionalized values, not slogans.'}
        }
      ]
    },
    moat: input.moat,
    watchlist: input.watchlist,
    deepQuestions: {
      timeline: [
        {zh: '哪些节点真正改变了公司的性质？', en: 'Which events changed the nature of the company?'},
        {zh: '公司是在什么时候形成平台化能力的？', en: 'When did the company form platform capability?'}
      ],
      products: [
        {zh: '哪些产品是收入来源，哪些产品是生态入口？', en: 'Which products drive revenue and which create ecosystem entry?'},
        {zh: '产品组合之间是否能互相增强？', en: 'Do the products reinforce one another?'}
      ],
      businessModel: [
        {zh: '公司利润来自规模、定价权、软件，还是网络效应？', en: 'Do profits come from scale, pricing power, software, or network effects?'}
      ],
      culture: [
        {zh: '文化如何影响资源配置和产品速度？', en: 'How does culture shape resource allocation and product speed?'}
      ],
      moat: [
        {zh: '最难被复制的是技术、生态、品牌、资本，还是组织能力？', en: 'What is hardest to copy: technology, ecosystem, brand, capital, or organization?'}
      ],
      watchlist: [
        {zh: '行业、政策、客户和竞争变量里，哪个最可能改变判断？', en: 'Which variable could most change the thesis: industry, policy, customers, or competition?'}
      ]
    },
    futureQuestions: [
      {zh: '未来 5 年最关键的增长变量是什么？', en: 'What is the key growth variable over the next five years?'},
      {zh: '当前估值或市场叙事是否过度简化了公司？', en: 'Does the current market narrative oversimplify the company?'}
    ]
  };
}

const expandedCompanies: CompanyProfile[] = [
  companyProfile({
    slug: 'spacex',
    name: {zh: 'SpaceX', en: 'SpaceX'},
    category: {zh: '航天、发射与卫星互联网', en: 'Space launch and satellite internet'},
    summary: {zh: 'SpaceX 的核心是用可复用火箭降低进入太空的成本，并用 Starlink 把发射能力转化为通信平台。', en: 'SpaceX lowers the cost of access to space through reusable rockets and turns launch capability into a communications platform through Starlink.'},
    officialLinks: [
      {label: {zh: '官网', en: 'Official site'}, href: 'https://www.spacex.com/'},
      {label: {zh: '发射任务', en: 'Launches'}, href: 'https://www.spacex.com/launches/'},
      {label: {zh: 'Starlink', en: 'Starlink'}, href: 'https://www.starlink.com/'}
    ],
    timeline: [
      {year: '2020s', event: {zh: 'Starship、Starlink 和高频发射推动 SpaceX 从火箭公司走向太空基础设施公司。', en: 'Starship, Starlink, and high launch cadence moved SpaceX toward space infrastructure.'}},
      {year: '2020', event: {zh: 'Crew Dragon 完成载人飞行，商业航天进入新阶段。', en: 'Crew Dragon completed crewed flight, marking a new stage for commercial space.'}},
      {year: '2015', event: {zh: 'Falcon 9 一级火箭首次成功回收。', en: 'Falcon 9 first-stage booster landed successfully.'}},
      {year: '2002', event: {zh: 'SpaceX 成立。', en: 'SpaceX was founded.'}}
    ],
    segments: [
      {title: {zh: '发射服务', en: 'Launch services'}, revenueLabel: {zh: '商业与政府任务', en: 'Commercial and government missions'}, summary: {zh: '为商业卫星、NASA、国防和科研任务提供发射。', en: 'Launches commercial, NASA, defense, and science missions.'}, products: [{zh: 'Falcon 9 / Falcon Heavy 发射服务', en: 'Falcon 9 / Falcon Heavy launch services'}, {zh: 'Dragon 货运与载人飞船', en: 'Dragon cargo and crew spacecraft'}]},
      {title: {zh: 'Starlink', en: 'Starlink'}, revenueLabel: {zh: '卫星互联网', en: 'Satellite internet'}, summary: {zh: '用低轨卫星网络提供全球宽带连接。', en: 'Provides global broadband through low-Earth-orbit satellites.'}, products: [{zh: '家庭、企业、海事、航空和移动连接', en: 'Residential, enterprise, maritime, aviation, and mobility connectivity'}]},
      {title: {zh: 'Starship', en: 'Starship'}, revenueLabel: {zh: '下一代平台', en: 'Next-generation platform'}, summary: {zh: '目标是进一步降低发射成本并支持月球、火星和大规模轨道运输。', en: 'Aims to lower launch cost further and support lunar, Mars, and large orbital transport.'}, products: [{zh: 'Starship / Super Heavy 系统', en: 'Starship / Super Heavy system'}]}
    ],
    businessModel: [{zh: '发射收入、政府合同、Starlink 订阅和终端销售共同构成商业模式。', en: 'Launch revenue, government contracts, Starlink subscriptions, and terminal sales form the model.'}],
    cultureThesis: {zh: 'SpaceX 的文化是极限工程、快速迭代、垂直整合和成本第一性原理。', en: 'SpaceX culture is extreme engineering, rapid iteration, vertical integration, and first-principles cost thinking.'},
    moat: [{zh: '可复用火箭、发射频率、工程人才、Starlink 卫星网络和政府客户信任。', en: 'Reusable rockets, launch cadence, engineering talent, Starlink network, and government trust.'}],
    watchlist: [{zh: 'Starship 进展、Starlink 盈利、监管频谱、发射安全和地缘需求。', en: 'Starship progress, Starlink profitability, spectrum regulation, launch safety, and geopolitical demand.'}]
  }),
  companyProfile({
    slug: 'apple',
    name: {zh: '苹果', en: 'Apple'},
    category: {zh: '消费电子、软件与服务生态', en: 'Consumer electronics, software, and services ecosystem'},
    summary: {zh: 'Apple 的核心不是单个硬件，而是设备、系统、芯片、服务、品牌和开发者生态形成的高粘性消费平台。', en: 'Apple is not a single hardware product; it is a sticky consumer platform of devices, systems, chips, services, brand, and developers.'},
    officialLinks: [{label: {zh: '官网', en: 'Official site'}, href: 'https://www.apple.com/'}, {label: {zh: '新闻中心', en: 'Newsroom'}, href: 'https://www.apple.com/newsroom/'}, {label: {zh: '投资者关系', en: 'Investor relations'}, href: 'https://investor.apple.com/'}],
    timeline: [
      {year: '2026', event: {zh: 'Apple 宣布 John Ternus 将于 2026-09-01 接任 CEO，Tim Cook 转任执行董事长。', en: 'Apple announced John Ternus will become CEO on 2026-09-01, with Tim Cook becoming Executive Chairman.'}},
      {year: '2020', event: {zh: 'Apple Silicon 推动 Mac 平台重构。', en: 'Apple Silicon reshaped the Mac platform.'}},
      {year: '2007', event: {zh: 'iPhone 发布，移动互联网生态打开。', en: 'iPhone launched and opened the mobile internet ecosystem.'}},
      {year: '1976', event: {zh: 'Apple 创立。', en: 'Apple was founded.'}}
    ],
    segments: [
      {title: {zh: 'iPhone', en: 'iPhone'}, revenueLabel: {zh: '核心硬件', en: 'Core hardware'}, summary: {zh: '品牌、系统和服务入口。', en: 'Brand, system, and service entry.'}, products: [{zh: 'iPhone 与 iOS 生态', en: 'iPhone and iOS ecosystem'}]},
      {title: {zh: 'Mac / iPad / Wearables', en: 'Mac / iPad / Wearables'}, revenueLabel: {zh: '设备矩阵', en: 'Device matrix'}, summary: {zh: '多设备协同提高用户粘性。', en: 'Multi-device integration increases stickiness.'}, products: [{zh: 'Mac、iPad、Apple Watch、AirPods', en: 'Mac, iPad, Apple Watch, AirPods'}]},
      {title: {zh: 'Services', en: 'Services'}, revenueLabel: {zh: '高毛利业务', en: 'High-margin business'}, summary: {zh: '应用商店、订阅、支付、云和内容服务。', en: 'App Store, subscriptions, payments, cloud, and content.'}, products: [{zh: 'App Store、Apple Music、iCloud、Apple Pay', en: 'App Store, Apple Music, iCloud, Apple Pay'}]}
    ],
    businessModel: [{zh: '硬件销售建立用户基座，服务业务提高复购、毛利和生态粘性。', en: 'Hardware builds the user base; services increase repeat purchase, margin, and ecosystem stickiness.'}],
    cultureThesis: {zh: 'Apple 的文化核心是端到端产品体验、隐私价值观、供应链纪律和极强的品牌控制。', en: 'Apple culture centers on end-to-end product experience, privacy values, supply-chain discipline, and strong brand control.'},
    moat: [{zh: '品牌、软硬件一体化、开发者生态、供应链、服务粘性和用户迁移成本。', en: 'Brand, hardware-software integration, developer ecosystem, supply chain, services stickiness, and switching costs.'}],
    watchlist: [{zh: 'AI 产品化、iPhone 周期、服务监管、供应链地缘风险和管理层交接。', en: 'AI productization, iPhone cycle, services regulation, supply-chain geopolitics, and leadership transition.'}]
  }),
  companyProfile({
    slug: 'anthropic',
    name: {zh: 'Anthropic', en: 'Anthropic'},
    category: {zh: 'AI 模型与企业智能平台', en: 'AI model and enterprise intelligence platform'},
    summary: {zh: 'Anthropic 以 Claude 为核心，强调安全、可靠、可解释和企业级 AI 工作流。', en: 'Anthropic centers on Claude, emphasizing safety, reliability, interpretability, and enterprise AI workflows.'},
    officialLinks: [{label: {zh: '官网', en: 'Official site'}, href: 'https://www.anthropic.com/'}, {label: {zh: '新闻', en: 'News'}, href: 'https://www.anthropic.com/news'}, {label: {zh: '研究', en: 'Research'}, href: 'https://www.anthropic.com/research'}],
    timeline: [
      {year: '2025', event: {zh: 'Claude、企业产品和云平台合作持续扩展。', en: 'Claude, enterprise products, and cloud partnerships continued expanding.'}},
      {year: '2023', event: {zh: 'Claude 进入更广泛商业使用。', en: 'Claude reached broader commercial use.'}},
      {year: '2021', event: {zh: 'Anthropic 成立。', en: 'Anthropic was founded.'}}
    ],
    segments: [
      {title: {zh: 'Claude', en: 'Claude'}, revenueLabel: {zh: '核心产品', en: 'Core product'}, summary: {zh: '面向个人和团队的 AI 助手。', en: 'AI assistant for individuals and teams.'}, products: [{zh: 'Claude 网页、移动端与团队产品', en: 'Claude web, mobile, and team products'}]},
      {title: {zh: 'API / 企业', en: 'API / Enterprise'}, revenueLabel: {zh: '平台收入', en: 'Platform revenue'}, summary: {zh: '面向企业工作流、开发者和平台集成。', en: 'For enterprise workflows, developers, and platform integrations.'}, products: [{zh: 'Messages API、企业方案、云合作', en: 'Messages API, enterprise plans, cloud partnerships'}]},
      {title: {zh: '安全研究', en: 'Safety research'}, revenueLabel: {zh: '信任基础', en: 'Trust foundation'}, summary: {zh: '解释性、对齐和安全评估支撑品牌差异。', en: 'Interpretability, alignment, and evaluations support differentiation.'}, products: [{zh: 'Constitutional AI、解释性研究、安全评估', en: 'Constitutional AI, interpretability, safety evaluations'}]}
    ],
    businessModel: [{zh: '订阅、API、企业合同和云平台合作。', en: 'Subscriptions, API usage, enterprise contracts, and cloud partnerships.'}],
    cultureThesis: {zh: 'Anthropic 的文化以安全可信和研究深度为核心，用可靠性争取企业客户。', en: 'Anthropic culture centers on trustworthy safety and research depth, using reliability to win enterprise customers.'},
    moat: [{zh: '模型质量、安全品牌、企业信任、研究能力和云合作渠道。', en: 'Model quality, safety brand, enterprise trust, research capability, and cloud channels.'}],
    watchlist: [{zh: '模型竞赛、推理成本、企业采用、安全监管和云伙伴关系。', en: 'Model race, inference cost, enterprise adoption, safety regulation, and cloud partnerships.'}]
  }),
  companyProfile({
    slug: 'tsmc',
    name: {zh: '台积电', en: 'TSMC'},
    category: {zh: '晶圆代工与半导体制造基础设施', en: 'Foundry and semiconductor manufacturing infrastructure'},
    summary: {zh: '台积电是全球先进芯片制造的关键基础设施，核心是制程、良率、客户信任和超大规模资本开支。', en: 'TSMC is key infrastructure for advanced chip manufacturing, centered on process technology, yield, customer trust, and massive capital expenditure.'},
    officialLinks: [{label: {zh: '官网', en: 'Official site'}, href: 'https://www.tsmc.com/'}, {label: {zh: '投资者关系', en: 'Investor relations'}, href: 'https://investor.tsmc.com/'}, {label: {zh: '新闻', en: 'News'}, href: 'https://pr.tsmc.com/english'}],
    timeline: [
      {year: '2024', event: {zh: '魏哲家接任董事长并继续担任 CEO。', en: 'C.C. Wei became Chairman while continuing as CEO.'}},
      {year: '2020s', event: {zh: 'AI 芯片需求推动先进制程和先进封装扩张。', en: 'AI chip demand drove advanced-node and advanced-packaging expansion.'}},
      {year: '1987', event: {zh: '张忠谋创立台积电，建立纯晶圆代工模式。', en: 'Morris Chang founded TSMC and established the pure-play foundry model.'}}
    ],
    segments: [
      {title: {zh: '先进制程', en: 'Advanced nodes'}, revenueLabel: {zh: '核心能力', en: 'Core capability'}, summary: {zh: '面向高性能计算、手机和 AI 芯片。', en: 'For HPC, mobile, and AI chips.'}, products: [{zh: '3nm、5nm、7nm 等先进制程', en: '3nm, 5nm, 7nm advanced nodes'}]},
      {title: {zh: '先进封装', en: 'Advanced packaging'}, revenueLabel: {zh: 'AI 关键瓶颈', en: 'AI bottleneck'}, summary: {zh: 'CoWoS 等能力支撑 AI 加速器。', en: 'CoWoS and related capabilities support AI accelerators.'}, products: [{zh: 'CoWoS、SoIC 等封装技术', en: 'CoWoS, SoIC, and packaging technologies'}]},
      {title: {zh: '全球制造', en: 'Global fabs'}, revenueLabel: {zh: '产能布局', en: 'Capacity footprint'}, summary: {zh: '台湾、美国、日本、欧洲等产能布局。', en: 'Capacity footprint across Taiwan, the U.S., Japan, Europe, and more.'}, products: [{zh: '晶圆制造与客户协同', en: 'Wafer manufacturing and customer collaboration'}]}
    ],
    businessModel: [{zh: '按晶圆制造、先进制程和客户长期需求获得收入，资本开支和良率决定长期回报。', en: 'Revenue comes from wafer manufacturing and customer demand; capex and yield determine long-term return.'}],
    cultureThesis: {zh: '台积电文化强调客户信任、制造纪律、技术路线和长期资本投入。', en: 'TSMC culture emphasizes customer trust, manufacturing discipline, technology roadmap, and long-term capital investment.'},
    moat: [{zh: '制程领先、良率、客户中立、资本规模、工程人才和供应链协同。', en: 'Process leadership, yield, customer neutrality, capital scale, engineering talent, and supply chain coordination.'}],
    watchlist: [{zh: 'AI 芯片需求、先进封装产能、地缘风险、客户集中度和制程迁移。', en: 'AI chip demand, advanced packaging capacity, geopolitical risk, customer concentration, and node migration.'}]
  }),
  companyProfile({
    slug: 'google',
    name: {zh: '谷歌 / Alphabet', en: 'Google / Alphabet'},
    category: {zh: '搜索、广告、云与 AI 平台', en: 'Search, advertising, cloud, and AI platform'},
    summary: {zh: 'Google 的核心是搜索与广告现金流、云基础设施、AI 研究和 Android / YouTube 等全球分发入口。', en: 'Google combines search and advertising cash flow, cloud infrastructure, AI research, and global distribution through Android and YouTube.'},
    officialLinks: [{label: {zh: 'Google', en: 'Google'}, href: 'https://www.google.com/'}, {label: {zh: 'Alphabet 投资者关系', en: 'Alphabet Investor Relations'}, href: 'https://abc.xyz/investor/'}, {label: {zh: 'Google AI', en: 'Google AI'}, href: 'https://ai.google/'}],
    timeline: [
      {year: '2020s', event: {zh: 'Gemini、云和 AI 搜索重塑公司竞争焦点。', en: 'Gemini, cloud, and AI search reshaped Google’s competitive focus.'}},
      {year: '2015', event: {zh: 'Alphabet 成立，Google 成为旗下核心业务。', en: 'Alphabet was formed with Google as the core business.'}},
      {year: '1998', event: {zh: 'Google 成立。', en: 'Google was founded.'}}
    ],
    segments: [
      {title: {zh: '搜索与广告', en: 'Search and ads'}, revenueLabel: {zh: '核心现金流', en: 'Core cash flow'}, summary: {zh: '搜索、YouTube 和广告网络。', en: 'Search, YouTube, and ad networks.'}, products: [{zh: 'Google Search、YouTube Ads、广告网络', en: 'Google Search, YouTube Ads, ad network'}]},
      {title: {zh: 'Google Cloud', en: 'Google Cloud'}, revenueLabel: {zh: '企业平台', en: 'Enterprise platform'}, summary: {zh: '云基础设施、数据、AI 平台。', en: 'Cloud infrastructure, data, and AI platform.'}, products: [{zh: 'GCP、Vertex AI、Workspace', en: 'GCP, Vertex AI, Workspace'}]},
      {title: {zh: 'AI 与生态', en: 'AI and ecosystem'}, revenueLabel: {zh: '长期变量', en: 'Long-term variable'}, summary: {zh: 'Gemini、Android、Chrome 和开发者生态。', en: 'Gemini, Android, Chrome, and developer ecosystem.'}, products: [{zh: 'Gemini、Android、Chrome、TPU', en: 'Gemini, Android, Chrome, TPU'}]}
    ],
    businessModel: [{zh: '广告现金流支撑云、AI、硬件和长期实验，云与订阅提高企业粘性。', en: 'Advertising cash flow funds cloud, AI, hardware, and long-term bets; cloud and subscriptions increase enterprise stickiness.'}],
    cultureThesis: {zh: 'Google 文化是研究深度、工程规模、数据产品和开放生态的组合，但也面临大公司决策速度挑战。', en: 'Google culture combines research depth, engineering scale, data products, and open ecosystem, while facing large-company speed challenges.'},
    moat: [{zh: '搜索默认入口、数据规模、广告网络、AI 人才、云基础设施和 Android 生态。', en: 'Search default position, data scale, ad network, AI talent, cloud infrastructure, and Android ecosystem.'}],
    watchlist: [{zh: 'AI 搜索替代、广告增长、云盈利、反垄断监管和模型竞争。', en: 'AI search substitution, ad growth, cloud profitability, antitrust regulation, and model competition.'}]
  }),
  companyProfile({
    slug: 'berkshire-hathaway',
    name: {zh: 'Berkshire Hathaway', en: 'Berkshire Hathaway'},
    category: {zh: '保险、投资与资本配置平台', en: 'Insurance, investing, and capital allocation platform'},
    summary: {zh: 'Berkshire 是研究保险浮存金、长期持股、企业收购和资本配置的经典样本。', en: 'Berkshire is a classic case for insurance float, long-term holdings, acquisitions, and capital allocation.'},
    officialLinks: [{label: {zh: '官网', en: 'Official site'}, href: 'https://www.berkshirehathaway.com/'}, {label: {zh: '股东信', en: 'Shareholder letters'}, href: 'https://www.berkshirehathaway.com/letters/letters.html'}],
    timeline: [
      {year: '2025', event: {zh: '巴菲特宣布将于 2025 年底卸任 CEO，Greg Abel 接任。', en: 'Buffett announced he would step down as CEO at the end of 2025, with Greg Abel succeeding him.'}},
      {year: '1965', event: {zh: '巴菲特取得 Berkshire 控制权。', en: 'Buffett took control of Berkshire.'}},
      {year: '1839', event: {zh: 'Berkshire 前身纺织企业历史可追溯至 19 世纪。', en: 'Berkshire’s predecessor textile roots trace back to the 19th century.'}}
    ],
    segments: [
      {title: {zh: '保险', en: 'Insurance'}, revenueLabel: {zh: '浮存金来源', en: 'Float source'}, summary: {zh: 'GEICO、再保险和保险浮存金。', en: 'GEICO, reinsurance, and insurance float.'}, products: [{zh: '保险承保与浮存金投资', en: 'Insurance underwriting and float investment'}]},
      {title: {zh: '控股公司', en: 'Operating businesses'}, revenueLabel: {zh: '多元现金流', en: 'Diversified cash flow'}, summary: {zh: '铁路、能源、制造、零售等。', en: 'Railroad, energy, manufacturing, retail, and more.'}, products: [{zh: 'BNSF、BHE、制造与服务企业', en: 'BNSF, BHE, manufacturing and service companies'}]},
      {title: {zh: '股票投资', en: 'Equity portfolio'}, revenueLabel: {zh: '长期持股', en: 'Long-term holdings'}, summary: {zh: '以优质企业长期持有为核心。', en: 'Long-term ownership of high-quality businesses.'}, products: [{zh: 'Apple、金融、消费与能源持仓', en: 'Apple, financials, consumer, and energy holdings'}]}
    ],
    businessModel: [{zh: '保险浮存金、经营现金流和投资组合共同形成资本配置机器。', en: 'Insurance float, operating cash flow, and equity portfolio form a capital allocation machine.'}],
    cultureThesis: {zh: 'Berkshire 文化强调理性、去中心化、声誉、长期主义和少犯大错。', en: 'Berkshire culture emphasizes rationality, decentralization, reputation, long-termism, and avoiding big mistakes.'},
    moat: [{zh: '浮存金成本、资本配置信誉、长期股东基础、管理层信任和税务效率。', en: 'Float cost, capital allocation reputation, long-term shareholder base, management trust, and tax efficiency.'}],
    watchlist: [{zh: '管理层交接、保险承保周期、现金规模、收购机会和核心持仓变化。', en: 'Succession, insurance cycle, cash balance, acquisition opportunities, and key holding changes.'}]
  })
];

companies.push(...expandedCompanies);

const tesla = companies.find((company) => company.slug === 'tesla');
if (tesla) {
  tesla.timeline = [
    {year: '2025', event: {zh: '自动驾驶、机器人、储能和低成本车型继续构成市场核心争论。', en: 'Autonomy, robotics, energy storage, and lower-cost vehicles remained key debates.'}},
    {year: '2023', event: {zh: 'Cybertruck 开始交付，储能业务扩张。', en: 'Cybertruck deliveries began and energy storage expanded.'}},
    {year: '2020', event: {zh: 'Model Y 放量，特斯拉进入规模化盈利阶段。', en: 'Model Y scaled and Tesla entered sustained profitability.'}},
    {year: '2012', event: {zh: 'Model S 帮助公司进入高端主流视野。', en: 'Model S brought Tesla into premium mainstream attention.'}},
    {year: '2003', event: {zh: '公司成立，推动电动车商业化。', en: 'Founded to commercialize electric vehicles.'}}
  ];
  tesla.productSegments = [
    {title: {zh: 'Automotive 汽车', en: 'Automotive'}, revenueLabel: {zh: '核心收入', en: 'Core revenue'}, summary: {zh: '电动车、车载软件和售后服务。', en: 'EVs, vehicle software, and services.'}, products: [{zh: 'Model 3 / Y / S / X、Cybertruck、FSD', en: 'Model 3 / Y / S / X, Cybertruck, FSD'}]},
    {title: {zh: 'Energy 能源', en: 'Energy'}, revenueLabel: {zh: '第二曲线', en: 'Second curve'}, summary: {zh: '储能、太阳能和电网级能源产品。', en: 'Storage, solar, and grid-scale energy products.'}, products: [{zh: 'Megapack、Powerwall、Solar', en: 'Megapack, Powerwall, Solar'}]},
    {title: {zh: 'AI / Robotics', en: 'AI / Robotics'}, revenueLabel: {zh: '长期期权', en: 'Long-term option'}, summary: {zh: '自动驾驶、机器人和车队数据。', en: 'Autonomy, robotics, and fleet data.'}, products: [{zh: 'FSD、Robotaxi、Optimus', en: 'FSD, Robotaxi, Optimus'}]}
  ];
  tesla.cultureModel = companyProfile({
    slug: 'tmp',
    name: tesla.name,
    category: tesla.category,
    summary: tesla.summary,
    officialLinks: tesla.officialLinks,
    timeline: tesla.timeline,
    segments: tesla.productSegments,
    businessModel: tesla.businessModel,
    cultureThesis: {zh: 'Tesla 的文化是速度、垂直整合、成本压力、软件迭代和极高目标驱动。', en: 'Tesla culture is speed, vertical integration, cost pressure, software iteration, and extreme goal orientation.'},
    moat: tesla.moat,
    watchlist: tesla.watchlist
  }).cultureModel;
  tesla.deepQuestions = {
    timeline: [
      {zh: '特斯拉真正从“电动车公司”转向“能源与 AI 平台公司”的节点是哪一个？', en: 'When did Tesla truly shift from EV company toward energy and AI platform?'},
      {zh: 'Model S、Model 3、Model Y、Cybertruck 和 Robotaxi 之间，哪一个最改变公司性质？', en: 'Among Model S, Model 3, Model Y, Cybertruck, and Robotaxi, which most changed the company?'},
      {zh: '能源、自动驾驶和机器人叙事，是主业外延还是新平台？', en: 'Are energy, autonomy, and robotics extensions of the core business or new platforms?'}
    ],
    products: [
      {zh: '汽车、FSD、能源、机器人这几类产品，哪个最可能带来利润结构变化？', en: 'Which product line could most change Tesla’s profit structure: cars, FSD, energy, or robotics?'},
      {zh: 'FSD 是软件收入，还是车队数据、芯片、监管和保险共同组成的平台？', en: 'Is FSD software revenue, or a platform of fleet data, chips, regulation, and insurance?'},
      {zh: 'Megapack 是否可能成为比汽车更稳定的工业产品线？', en: 'Could Megapack become a more stable industrial product line than vehicles?'}
    ],
    businessModel: [
      {zh: '特斯拉的利润弹性来自制造规模、软件订阅，还是能源业务？', en: 'Does Tesla’s profit elasticity come from manufacturing scale, software subscription, or energy?'},
      {zh: '如果电动车进入价格竞争，特斯拉还能靠哪些变量保持回报？', en: 'If EVs enter price competition, which variables can preserve Tesla’s returns?'}
    ],
    culture: [
      {zh: '高速度、高压力和垂直整合，如何同时带来优势和组织风险？', en: 'How do speed, pressure, and vertical integration create both advantage and organizational risk?'},
      {zh: '马斯克个人风格对 Tesla 的产品速度、品牌和治理分别有什么影响？', en: 'How does Musk’s style affect Tesla’s product speed, brand, and governance?'},
      {zh: '第一性原理在制造、成本、自动驾驶和机器人里分别如何体现？', en: 'How does first-principles thinking show up in manufacturing, cost, autonomy, and robotics?'}
    ],
    moat: [
      {zh: '特斯拉最难复制的是品牌、制造、数据、充电网络，还是组织速度？', en: 'What is hardest to copy: brand, manufacturing, data, charging network, or organizational speed?'},
      {zh: '当传统车企和中国车企追上电动车能力后，特斯拉的壁垒会转向哪里？', en: 'When legacy and Chinese automakers catch up in EVs, where does Tesla’s moat move?'}
    ],
    watchlist: [
      {zh: '电动车需求、价格战、监管、FSD 进展、能源装机，哪个最应该优先跟踪？', en: 'Which should be tracked first: EV demand, price war, regulation, FSD progress, or energy deployments?'},
      {zh: 'Robotaxi 和 Optimus 的时间表应该如何防止被叙事带偏？', en: 'How should Robotaxi and Optimus timelines be tracked without being captured by narrative?'}
    ]
  };
}

const openai = companies.find((company) => company.slug === 'openai');
if (openai) {
  openai.productSegments = [
    {title: {zh: 'ChatGPT', en: 'ChatGPT'}, revenueLabel: {zh: '用户入口', en: 'User entry'}, summary: {zh: '面向个人、团队和企业的通用 AI 助手。', en: 'General AI assistant for individuals, teams, and enterprises.'}, products: [{zh: 'ChatGPT、Teams、Enterprise', en: 'ChatGPT, Teams, Enterprise'}]},
    {title: {zh: 'API / Platform', en: 'API / Platform'}, revenueLabel: {zh: '开发者平台', en: 'Developer platform'}, summary: {zh: '把模型能力开放给应用和企业工作流。', en: 'Exposes model capability to apps and enterprise workflows.'}, products: [{zh: 'Responses API、模型、工具调用、Agents', en: 'Responses API, models, tool use, Agents'}]},
    {title: {zh: 'Research / Infrastructure', en: 'Research / Infrastructure'}, revenueLabel: {zh: '能力底座', en: 'Capability base'}, summary: {zh: '模型训练、推理、算力合作和安全研究。', en: 'Training, inference, compute partnerships, and safety research.'}, products: [{zh: '多模态模型、推理模型、安全系统', en: 'Multimodal models, reasoning models, safety systems'}]}
  ];
  openai.cultureModel = companyProfile({
    slug: 'tmp-openai',
    name: openai.name,
    category: openai.category,
    summary: openai.summary,
    officialLinks: openai.officialLinks,
    timeline: openai.timeline,
    segments: openai.productSegments,
    businessModel: openai.businessModel,
    cultureThesis: {zh: 'OpenAI 的文化是前沿研究、产品速度、算力组织、安全争议和公共叙事同时存在。', en: 'OpenAI culture combines frontier research, product velocity, compute formation, safety debates, and public narrative.'},
    moat: openai.moat,
    watchlist: openai.watchlist
  }).cultureModel;
  openai.deepQuestions = {
    timeline: [
      {zh: 'ChatGPT 之后，OpenAI 是模型实验室、产品公司，还是 AI 平台公司？', en: 'After ChatGPT, is OpenAI a model lab, product company, or AI platform company?'},
      {zh: 'OpenAI 的关键转折点是模型能力、用户分发、企业产品，还是算力组织？', en: 'Is OpenAI’s key turning point model capability, user distribution, enterprise product, or compute formation?'},
      {zh: '治理事件如何影响外界对 OpenAI 长期可信度的判断？', en: 'How do governance events affect judgments about OpenAI’s long-term credibility?'}
    ],
    products: [
      {zh: 'ChatGPT、API、企业产品和 Agents，哪个最可能成为长期利润中心？', en: 'Which is most likely to become a long-term profit center: ChatGPT, API, enterprise, or Agents?'},
      {zh: '模型能力领先能否自然转化为应用层垄断？', en: 'Does model leadership naturally convert into application-layer dominance?'},
      {zh: '开发者平台和企业工作流，哪一个更能形成迁移成本？', en: 'Which creates more switching cost: developer platform or enterprise workflow?'}
    ],
    businessModel: [
      {zh: '订阅、API、企业合同和生态合作之间，收入质量有什么差异？', en: 'How does revenue quality differ among subscriptions, API, enterprise contracts, and partnerships?'},
      {zh: '推理成本下降会扩大使用量，还是压缩模型公司的定价权？', en: 'Will falling inference cost expand usage or compress model-company pricing power?'}
    ],
    culture: [
      {zh: '前沿研究速度、产品速度和安全治理之间如何平衡？', en: 'How should frontier research speed, product speed, and safety governance be balanced?'},
      {zh: 'OpenAI 的公共叙事如何影响监管、客户和资本伙伴？', en: 'How does OpenAI’s public narrative affect regulators, customers, and capital partners?'},
      {zh: '高密度人才和高争议环境，会如何影响组织稳定性？', en: 'How do dense talent and controversial context affect organizational stability?'}
    ],
    moat: [
      {zh: 'OpenAI 最难复制的是模型、产品分发、品牌、数据反馈，还是算力合作？', en: 'What is hardest to copy: models, product distribution, brand, data feedback, or compute partnerships?'},
      {zh: '开源模型和大厂模型会削弱 OpenAI，还是扩大整个市场？', en: 'Do open models and big-tech models weaken OpenAI or expand the whole market?'}
    ],
    watchlist: [
      {zh: '企业采用、监管、推理成本、模型发布节奏和竞品表现，哪个最影响判断？', en: 'Which most affects the thesis: enterprise adoption, regulation, inference cost, model cadence, or competitors?'},
      {zh: 'AI 助手会集中在通用入口，还是被垂直应用拆散？', en: 'Will AI assistants concentrate around general entry points or fragment into vertical apps?'}
    ]
  };
}

function enrichCompany(
  slug: string,
  patch: Partial<Pick<CompanyProfile, 'timeline' | 'businessModel' | 'moat' | 'watchlist'>>
) {
  const company = companies.find((item) => item.slug === slug);
  if (!company) return;
  Object.assign(company, patch);
}

enrichCompany('nvidia', {
  timeline: [
    {
      year: '2024',
      event: {zh: '发布 Blackwell 平台，把 GPU、CPU、网络、系统和软件打包成面向 AI 工厂的新一代计算平台。', en: 'Launched the Blackwell platform, packaging GPU, CPU, networking, systems, and software into a next-generation AI factory platform.'},
      imageHint: {zh: 'Blackwell 芯片、GB200 NVL72 或 GTC 发布会舞台图。', en: 'Blackwell chip, GB200 NVL72, or GTC launch image.'},
      href: 'https://nvidianews.nvidia.com/news/nvidia-blackwell-platform-arrives-to-power-a-new-era-of-computing'
    },
    {
      year: '2023',
      event: {zh: '生成式 AI 需求爆发，数据中心成为最核心增长引擎，H100、DGX、网络和软件栈共同进入客户预算。', en: 'Generative AI demand surged, making Data Center the core growth engine across H100, DGX, networking, and software stack.'},
      imageHint: {zh: 'AI 数据中心、H100 或 DGX 集群图。', en: 'AI data center, H100, or DGX cluster image.'}
    },
    {
      year: '2020',
      event: {zh: '完成收购 Mellanox，补齐高速网络能力，让英伟达从芯片公司进一步走向数据中心系统公司。', en: 'Completed the Mellanox acquisition, strengthening high-speed networking and moving further toward data center systems.'},
      imageHint: {zh: 'Mellanox 网络设备或数据中心网络图。', en: 'Mellanox networking hardware or data center network image.'},
      href: 'https://nvidianews.nvidia.com/news/nvidia-completes-acquisition-of-mellanox'
    },
    {
      year: '2016',
      event: {zh: '发布 DGX-1 并受益于深度学习训练需求，AI 计算从研究场景逐步进入产业场景。', en: 'Launched DGX-1 as deep learning training demand moved from research into industry.'},
      imageHint: {zh: 'DGX-1 或早期 AI 训练系统图。', en: 'DGX-1 or early AI training system image.'}
    },
    {
      year: '2012',
      event: {zh: 'AlexNet 使用 GPU 在 ImageNet 竞赛中取得突破，GPU 训练神经网络的价值被行业看见。', en: 'AlexNet used GPUs for a breakthrough ImageNet result, making GPU neural-network training visible to the industry.'},
      imageHint: {zh: '深度学习研究、ImageNet 或早期 GPU 训练示意图。', en: 'Deep learning research, ImageNet, or early GPU training image.'}
    },
    {
      year: '2006',
      event: {zh: '推出 CUDA，让 GPU 从图形处理进入通用并行计算，并开始积累开发者生态壁垒。', en: 'Launched CUDA, moving GPUs from graphics into general-purpose parallel computing and beginning a developer ecosystem moat.'},
      imageHint: {zh: 'CUDA 标识、开发者大会或早期 GPU 编程资料图。', en: 'CUDA branding, developer conference, or early GPU programming material.'}
    },
    {
      year: '1999',
      event: {zh: '推出 GeForce 256 并强化 GPU 概念，为图形计算平台打下基础。', en: 'Launched GeForce 256 and strengthened the GPU concept, laying the foundation for a graphics computing platform.'},
      imageHint: {zh: 'GeForce 256 产品图。', en: 'GeForce 256 product image.'}
    },
    {
      year: '1993',
      event: {zh: '黄仁勋、Chris Malachowsky 和 Curtis Priem 创立 NVIDIA，早期聚焦图形计算。', en: 'Jensen Huang, Chris Malachowsky, and Curtis Priem founded NVIDIA with an early focus on graphics computing.'},
      imageHint: {zh: '创始人早期照片或 NVIDIA 早期办公室图。', en: 'Early founder or NVIDIA office image.'}
    }
  ],
  businessModel: [
    {zh: '硬件层：GPU、加速卡、整机系统和网络设备形成主要收入。', en: 'Hardware layer: GPUs, accelerators, full systems, and networking drive core revenue.'},
    {zh: '平台层：CUDA、NIM、AI Enterprise、TensorRT 等软件提高客户迁移成本。', en: 'Platform layer: CUDA, NIM, AI Enterprise, TensorRT, and related software increase switching costs.'},
    {zh: '客户层：云厂商、模型公司、企业和科研客户用资本开支购买 AI 基础设施。', en: 'Customer layer: clouds, model companies, enterprises, and research customers buy AI infrastructure through capex.'},
    {zh: '扩张层：游戏、专业可视化、汽车和机器人把同一计算能力外溢到更多场景。', en: 'Expansion layer: gaming, professional visualization, automotive, and robotics extend the same compute capability into more markets.'}
  ],
  moat: [
    {zh: '底层技术：GPU 架构、先进封装、网络互联和系统集成能力。', en: 'Core technology: GPU architecture, advanced packaging, networking interconnect, and systems integration.'},
    {zh: '软件生态：CUDA、库、工具链、文档和开发者习惯形成长期锁定。', en: 'Software ecosystem: CUDA, libraries, toolchains, documentation, and developer habits create durable lock-in.'},
    {zh: '客户关系：云厂商、模型公司和企业围绕英伟达路线图规划数据中心投资。', en: 'Customer relationships: clouds, model companies, and enterprises plan data center investment around NVIDIA roadmaps.'},
    {zh: '供应链与规模：台积电、先进封装、HBM、整机伙伴和交付能力共同构成门槛。', en: 'Supply chain and scale: TSMC, advanced packaging, HBM, system partners, and delivery capacity create barriers.'},
    {zh: '叙事能力：黄仁勋把“加速计算、AI 工厂、物理 AI”讲成行业共同语言。', en: 'Narrative power: Jensen Huang turns accelerated computing, AI factories, and physical AI into shared industry language.'}
  ],
  watchlist: [
    {zh: '行业：AI 训练、推理、视频生成、机器人和企业 AI 的真实需求强度。', en: 'Industry: real demand for AI training, inference, video generation, robotics, and enterprise AI.'},
    {zh: '客户：云厂商资本开支是否持续，企业客户是否进入规模化部署。', en: 'Customers: whether cloud capex continues and enterprises move into scaled deployment.'},
    {zh: '竞争：AMD、云厂商自研芯片、ASIC、开源软件栈和中国替代。', en: 'Competition: AMD, cloud in-house chips, ASICs, open software stacks, and China alternatives.'},
    {zh: '政策：出口管制、地缘风险、先进封装和 HBM 供应链约束。', en: 'Policy: export controls, geopolitics, advanced packaging, and HBM supply constraints.'},
    {zh: '公司自身：Blackwell / 后续平台交付节奏、软件收入占比和毛利变化。', en: 'Company: Blackwell and next-platform delivery, software revenue mix, and margin changes.'}
  ]
});

enrichCompany('tesla', {
  timeline: [
    {year: '2024', event: {zh: 'Robotaxi、Optimus、FSD 和储能业务继续成为市场判断特斯拉长期价值的核心变量。', en: 'Robotaxi, Optimus, FSD, and energy storage remained central variables in judging Tesla long-term value.'}, imageHint: {zh: 'Robotaxi 活动、Optimus 或 Tesla AI Day 风格图。', en: 'Robotaxi event, Optimus, or Tesla AI Day style image.'}},
    {year: '2023', event: {zh: 'Cybertruck 开始交付，Supercharger 网络开放合作加速，储能业务持续放量。', en: 'Cybertruck deliveries began, Supercharger partnerships accelerated, and energy storage continued scaling.'}, imageHint: {zh: 'Cybertruck 交付、Supercharger 或 Megapack 图。', en: 'Cybertruck delivery, Supercharger, or Megapack image.'}},
    {year: '2020', event: {zh: 'Model Y 放量，特斯拉进入规模化盈利阶段，并被纳入标普 500。', en: 'Model Y scaled, Tesla entered sustained profitability, and the company joined the S&P 500.'}, imageHint: {zh: 'Model Y 工厂、交付中心或上海超级工厂图。', en: 'Model Y factory, delivery center, or Gigafactory Shanghai image.'}},
    {year: '2017', event: {zh: 'Model 3 投产，把特斯拉从高端车企推向大众化电动车制造挑战。', en: 'Model 3 production pushed Tesla from premium EV maker into mass-market manufacturing challenge.'}, imageHint: {zh: 'Model 3 产线或早期交付图。', en: 'Model 3 production line or early delivery image.'}},
    {year: '2016', event: {zh: '收购 SolarCity，并发布 Master Plan Part Deux，将汽车、能源、自动驾驶和共享出行放进同一叙事。', en: 'Acquired SolarCity and released Master Plan Part Deux, connecting vehicles, energy, autonomy, and shared mobility.'}, imageHint: {zh: '太阳能屋顶、Powerwall 或 Master Plan 图片。', en: 'Solar roof, Powerwall, or Master Plan image.'}},
    {year: '2012', event: {zh: 'Model S 发布并建设 Supercharger 网络，证明电动车可以兼具性能、体验和长途补能。', en: 'Model S launched and Supercharger network began, proving EVs could combine performance, experience, and long-distance charging.'}, imageHint: {zh: 'Model S 或早期 Supercharger 图。', en: 'Model S or early Supercharger image.'}},
    {year: '2008', event: {zh: 'Roadster 交付，展示锂电电动车的性能潜力。', en: 'Roadster deliveries demonstrated the performance potential of lithium-ion EVs.'}, imageHint: {zh: 'Tesla Roadster 产品图。', en: 'Tesla Roadster product image.'}},
    {year: '2003', event: {zh: '公司成立，目标是推动电动车商业化。', en: 'The company was founded to commercialize electric vehicles.'}, imageHint: {zh: '早期团队或 Roadster 原型图。', en: 'Early team or Roadster prototype image.'}}
  ],
  businessModel: [
    {zh: '汽车层：整车销售、租赁、积分收入和售后服务构成现金流基础。', en: 'Vehicle layer: sales, leasing, regulatory credits, and service form the cash-flow base.'},
    {zh: '软件层：FSD、连接服务、车载功能和未来 Robotaxi 决定利润弹性。', en: 'Software layer: FSD, connectivity, in-car features, and future Robotaxi shape profit elasticity.'},
    {zh: '能源层：Megapack、Powerwall、太阳能和电网项目提供第二增长曲线。', en: 'Energy layer: Megapack, Powerwall, solar, and grid projects provide a second growth curve.'},
    {zh: '网络层：Supercharger、车队数据、保险和服务网络提高生态粘性。', en: 'Network layer: Supercharger, fleet data, insurance, and service network increase ecosystem stickiness.'}
  ],
  moat: [
    {zh: '制造规模：工厂效率、零部件整合、软件定义车辆和成本迭代。', en: 'Manufacturing scale: factory efficiency, component integration, software-defined vehicles, and cost iteration.'},
    {zh: '品牌与用户心智：特斯拉仍是全球电动车品类的强符号。', en: 'Brand and mindshare: Tesla remains a strong global symbol for the EV category.'},
    {zh: '补能网络：Supercharger 改善使用体验，并可能成为行业基础设施。', en: 'Charging network: Supercharger improves experience and may become industry infrastructure.'},
    {zh: '数据闭环：真实车队数据、车端芯片、训练系统和 FSD 迭代互相增强。', en: 'Data loop: real fleet data, in-car chips, training systems, and FSD iteration reinforce each other.'},
    {zh: '组织速度：垂直整合和高压目标让公司能快速试错，但也带来治理风险。', en: 'Organizational speed: vertical integration and aggressive goals enable fast iteration while adding governance risk.'}
  ],
  watchlist: [
    {zh: '行业：电动车渗透率、价格战、补能标准和电池成本。', en: 'Industry: EV penetration, price competition, charging standards, and battery cost.'},
    {zh: '客户：Model 3 / Y 老化后的换购需求，以及 Cybertruck 和低成本车型接受度。', en: 'Customers: replacement demand for aging Model 3 / Y, plus acceptance of Cybertruck and lower-cost models.'},
    {zh: '政策：自动驾驶监管、补贴变化、关税和数据合规。', en: 'Policy: autonomy regulation, incentive changes, tariffs, and data compliance.'},
    {zh: '竞争：中国车企、传统车企、Waymo 等自动驾驶路线和能源储能对手。', en: 'Competition: Chinese automakers, legacy automakers, autonomy players such as Waymo, and storage rivals.'},
    {zh: '公司自身：FSD 里程碑、Megapack 毛利、产能利用率、CEO 注意力和治理结构。', en: 'Company: FSD milestones, Megapack margins, capacity utilization, CEO attention, and governance.'}
  ]
});

enrichCompany('openai', {
  timeline: [
    {year: '2025', event: {zh: '推理模型、智能体工具和企业平台持续扩展，OpenAI 从聊天入口继续走向工作流平台。', en: 'Reasoning models, agent tools, and enterprise platform expanded, moving OpenAI from chat entry toward workflow platform.'}, imageHint: {zh: 'ChatGPT、Agents 或开发者平台界面图。', en: 'ChatGPT, Agents, or developer platform interface image.'}},
    {year: '2024', event: {zh: 'GPT-4o、Sora 和多模态能力强化 OpenAI 在文本、语音、视觉和视频方向的产品叙事。', en: 'GPT-4o, Sora, and multimodal capabilities strengthened OpenAI product narrative across text, voice, vision, and video.'}, imageHint: {zh: 'GPT-4o 演示、Sora 视频生成或多模态界面图。', en: 'GPT-4o demo, Sora video generation, or multimodal interface image.'}},
    {year: '2023', event: {zh: 'GPT-4、ChatGPT Enterprise 和开发者生态扩展，模型能力开始转化为企业产品和平台收入。', en: 'GPT-4, ChatGPT Enterprise, and developer ecosystem expansion began converting model capability into enterprise product and platform revenue.'}, imageHint: {zh: 'GPT-4 发布或企业产品界面图。', en: 'GPT-4 launch or enterprise product interface image.'}},
    {year: '2022', event: {zh: 'ChatGPT 发布，生成式 AI 进入大众市场，OpenAI 获得全球用户入口。', en: 'ChatGPT launched, bringing generative AI to the mass market and giving OpenAI a global user entry point.'}, imageHint: {zh: 'ChatGPT 早期界面图。', en: 'Early ChatGPT interface image.'}},
    {year: '2019', event: {zh: '与 Microsoft 深化合作，并形成算力、云平台和商业化的重要支撑。', en: 'Deepened Microsoft partnership, creating major support for compute, cloud platform, and commercialization.'}, imageHint: {zh: 'Microsoft Azure 与 OpenAI 合作图。', en: 'Microsoft Azure and OpenAI partnership image.'}},
    {year: '2018', event: {zh: 'GPT 路线出现，基于大规模预训练的语言模型成为核心技术方向。', en: 'The GPT line emerged, making large-scale pretraining a core technical direction.'}, imageHint: {zh: '语言模型研究或论文示意图。', en: 'Language model research or paper image.'}},
    {year: '2015', event: {zh: 'OpenAI 成立，早期以通用人工智能研究和安全为核心使命。', en: 'OpenAI was founded with an early mission around AGI research and safety.'}, imageHint: {zh: '早期团队或 OpenAI 标识图。', en: 'Early team or OpenAI logo image.'}}
  ],
  businessModel: [
    {zh: '订阅层：ChatGPT Plus、Team、Enterprise 形成稳定用户和团队收入。', en: 'Subscription layer: ChatGPT Plus, Team, and Enterprise create recurring user and team revenue.'},
    {zh: '平台层：API、工具调用、智能体和模型服务按使用量收费。', en: 'Platform layer: API, tool use, agents, and model services charge by usage.'},
    {zh: '企业层：把模型嵌入客服、编程、办公、数据分析和内部知识工作流。', en: 'Enterprise layer: embeds models into support, coding, office work, analytics, and internal knowledge workflows.'},
    {zh: '合作层：云、设备、应用和内容生态合作扩大分发，同时带来依赖关系。', en: 'Partnership layer: cloud, device, app, and content ecosystem partnerships expand distribution while adding dependencies.'}
  ],
  moat: [
    {zh: '模型能力：训练方法、推理能力、多模态能力和评测体系。', en: 'Model capability: training methods, reasoning, multimodal systems, and evaluations.'},
    {zh: '产品入口：ChatGPT 品牌和使用习惯让通用助手成为用户默认入口之一。', en: 'Product entry: ChatGPT brand and usage habits make the assistant a default user entry point.'},
    {zh: '开发者生态：API、工具链、文档、示例和集成伙伴降低应用开发门槛。', en: 'Developer ecosystem: API, tooling, docs, examples, and integrations lower app-development friction.'},
    {zh: '算力组织：与云伙伴、芯片供应和推理基础设施的组织能力决定迭代速度。', en: 'Compute formation: cloud partners, chip supply, and inference infrastructure shape iteration speed.'},
    {zh: '信任与治理：安全、隐私、版权、监管和企业合规会决定长期客户关系。', en: 'Trust and governance: safety, privacy, copyright, regulation, and compliance determine durable customer relationships.'}
  ],
  watchlist: [
    {zh: '行业：推理成本下降是否带来使用量爆发，还是压缩模型公司定价权。', en: 'Industry: whether falling inference cost expands usage or compresses model-company pricing power.'},
    {zh: '客户：企业是否从试点进入核心流程，个人用户是否保持高频付费。', en: 'Customers: whether enterprises move from pilots into core workflows and users keep high-frequency paid usage.'},
    {zh: '政策：版权、数据、模型安全、出口管制和各国 AI 法规。', en: 'Policy: copyright, data, model safety, export controls, and AI regulation across jurisdictions.'},
    {zh: '竞争：Anthropic、Google、Meta、xAI、开源模型和垂直应用。', en: 'Competition: Anthropic, Google, Meta, xAI, open models, and vertical applications.'},
    {zh: '公司自身：模型发布节奏、产品可靠性、算力成本、治理稳定和企业续费率。', en: 'Company: model cadence, product reliability, compute cost, governance stability, and enterprise renewals.'}
  ]
});

enrichCompany('spacex', {
  timeline: [
    {year: '2024', event: {zh: 'Starship 试飞进入快速迭代阶段，超重型助推器回收尝试显示完全可复用系统的工程方向。', en: 'Starship flight tests accelerated, and Super Heavy recovery attempts showed the engineering path toward full reusability.'}, imageHint: {zh: 'Starship / Super Heavy 发射或回收图。', en: 'Starship / Super Heavy launch or recovery image.'}},
    {year: '2020', event: {zh: 'Crew Dragon 完成载人飞行，美国商业载人航天进入新阶段。', en: 'Crew Dragon completed crewed flight, opening a new stage for U.S. commercial human spaceflight.'}, imageHint: {zh: 'Crew Dragon 与 NASA 发射图。', en: 'Crew Dragon and NASA launch image.'}},
    {year: '2019', event: {zh: '首批 Starlink 卫星发射，SpaceX 开始把发射能力转化为通信网络。', en: 'The first Starlink satellites launched, turning launch capability into a communications network.'}, imageHint: {zh: 'Starlink 卫星堆叠或轨道示意图。', en: 'Starlink satellite stack or orbit image.'}},
    {year: '2018', event: {zh: 'Falcon Heavy 首飞成功，证明重型商业发射能力。', en: 'Falcon Heavy completed its first flight, proving heavy commercial launch capability.'}, imageHint: {zh: 'Falcon Heavy 发射图。', en: 'Falcon Heavy launch image.'}},
    {year: '2015', event: {zh: 'Falcon 9 一级火箭首次成功陆地回收，可复用火箭商业化路径被验证。', en: 'Falcon 9 first stage landed successfully, validating the reusable rocket path.'}, imageHint: {zh: 'Falcon 9 一级回收图。', en: 'Falcon 9 booster landing image.'}},
    {year: '2012', event: {zh: 'Dragon 飞船抵达国际空间站，商业航天获得关键可信度。', en: 'Dragon reached the International Space Station, giving commercial space a major credibility milestone.'}, imageHint: {zh: 'Dragon 与国际空间站对接图。', en: 'Dragon docking with ISS image.'}},
    {year: '2008', event: {zh: 'Falcon 1 成为首个进入轨道的私人液体燃料火箭，并获得 NASA 商业补给合同。', en: 'Falcon 1 became the first privately developed liquid-fueled rocket to reach orbit, followed by NASA commercial resupply support.'}, imageHint: {zh: 'Falcon 1 发射图。', en: 'Falcon 1 launch image.'}},
    {year: '2002', event: {zh: 'SpaceX 成立，目标是降低进入太空的成本。', en: 'SpaceX was founded to lower the cost of access to space.'}, imageHint: {zh: 'SpaceX 早期团队或早期火箭图。', en: 'Early SpaceX team or early rocket image.'}}
  ],
  businessModel: [
    {zh: '发射层：商业卫星、NASA、国防和科研任务提供高频发射收入。', en: 'Launch layer: commercial satellite, NASA, defense, and science missions drive launch revenue.'},
    {zh: '通信层：Starlink 通过终端销售、个人订阅、企业、海事、航空和政府客户收费。', en: 'Communications layer: Starlink monetizes terminals, residential subscriptions, enterprise, maritime, aviation, and government customers.'},
    {zh: '平台层：高频发射降低边际成本，反过来支撑更大规模卫星网络。', en: 'Platform layer: high launch cadence lowers marginal cost and supports a larger satellite network.'},
    {zh: '未来层：Starship 若成熟，将打开重型运输、月球任务、火星任务和大规模在轨基础设施。', en: 'Future layer: mature Starship could open heavy transport, lunar missions, Mars missions, and large-scale orbital infrastructure.'}
  ],
  moat: [
    {zh: '可复用技术：火箭回收、发动机、材料、控制系统和快速复飞能力。', en: 'Reusability technology: booster recovery, engines, materials, control systems, and rapid reflight.'},
    {zh: '发射频率：高任务密度带来工程学习速度和成本优势。', en: 'Launch cadence: dense missions create learning speed and cost advantage.'},
    {zh: '垂直整合：发动机、火箭、飞船、卫星、地面终端和运营体系高度自研。', en: 'Vertical integration: engines, rockets, spacecraft, satellites, terminals, and operations are deeply integrated.'},
    {zh: 'Starlink 网络：卫星星座、频谱、终端、用户规模和政府客户构成网络壁垒。', en: 'Starlink network: constellation, spectrum, terminals, user scale, and government customers create a network moat.'},
    {zh: '政府信任：NASA、国防和盟友客户的任务经验提高进入门槛。', en: 'Government trust: NASA, defense, and allied-customer mission history raises barriers.'}
  ],
  watchlist: [
    {zh: '行业：全球发射需求、卫星互联网渗透率和低轨容量竞争。', en: 'Industry: launch demand, satellite-internet penetration, and LEO capacity competition.'},
    {zh: '客户：Starlink 个人、企业、海事、航空、政府和战场通信需求。', en: 'Customers: Starlink residential, enterprise, maritime, aviation, government, and battlefield communications demand.'},
    {zh: '政策：频谱、发射许可、太空碎片、出口管制和国家安全审查。', en: 'Policy: spectrum, launch licensing, space debris, export controls, and national-security review.'},
    {zh: '竞争：Blue Origin、ULA、中国航天、OneWeb / Eutelsat、Amazon Kuiper。', en: 'Competition: Blue Origin, ULA, China space players, OneWeb / Eutelsat, and Amazon Kuiper.'},
    {zh: '公司自身：Starship 试飞节奏、Starlink 盈利、事故率、产能和现金消耗。', en: 'Company: Starship flight cadence, Starlink profitability, accident rate, capacity, and cash burn.'}
  ]
});

enrichCompany('apple', {
  timeline: [
    {year: '2024', event: {zh: '发布 Apple Intelligence，并推动 iPhone、Mac、iPad 与端侧 AI 能力结合。', en: 'Introduced Apple Intelligence, linking iPhone, Mac, iPad, and on-device AI capability.'}, imageHint: {zh: 'WWDC Apple Intelligence 或设备演示图。', en: 'WWDC Apple Intelligence or device demo image.'}},
    {year: '2023', event: {zh: '发布 Vision Pro，尝试把空间计算作为下一代交互平台。', en: 'Introduced Vision Pro, positioning spatial computing as a next-generation interaction platform.'}, imageHint: {zh: 'Vision Pro 产品图。', en: 'Vision Pro product image.'}},
    {year: '2020', event: {zh: 'Apple Silicon 迁移启动，Mac 从 Intel 转向自研芯片，软硬件一体化进一步增强。', en: 'Apple Silicon transition began, moving Mac from Intel to in-house chips and strengthening integration.'}, imageHint: {zh: 'M1 芯片或 Mac 发布会图。', en: 'M1 chip or Mac launch image.'}},
    {year: '2015', event: {zh: 'Apple Watch 发布，设备生态从手机和电脑扩展到健康与可穿戴。', en: 'Apple Watch launched, extending the device ecosystem into health and wearables.'}, imageHint: {zh: 'Apple Watch 产品图。', en: 'Apple Watch product image.'}},
    {year: '2008', event: {zh: 'App Store 上线，iPhone 从硬件产品变成开发者和服务平台。', en: 'App Store launched, turning iPhone from hardware product into developer and services platform.'}, imageHint: {zh: 'App Store 早期界面图。', en: 'Early App Store interface image.'}},
    {year: '2007', event: {zh: 'iPhone 发布，重塑移动互联网入口。', en: 'iPhone launched, reshaping the mobile internet entry point.'}, imageHint: {zh: '乔布斯发布 iPhone 图。', en: 'Steve Jobs iPhone keynote image.'}},
    {year: '1984', event: {zh: 'Macintosh 发布，把图形界面个人电脑推向大众认知。', en: 'Macintosh launched, bringing graphical personal computing into public awareness.'}, imageHint: {zh: 'Macintosh 产品或发布图。', en: 'Macintosh product or launch image.'}},
    {year: '1976', event: {zh: 'Apple 创立，早期从个人电脑切入。', en: 'Apple was founded, beginning with personal computers.'}, imageHint: {zh: 'Apple I 或早期创始人图。', en: 'Apple I or early founders image.'}}
  ],
  businessModel: [
    {zh: '硬件层：iPhone 是最大入口，Mac、iPad、Watch、AirPods 构成设备矩阵。', en: 'Hardware layer: iPhone is the main entry, with Mac, iPad, Watch, and AirPods forming a device matrix.'},
    {zh: '服务层：App Store、iCloud、Apple Music、Apple Pay 和保修服务提升毛利与复购。', en: 'Services layer: App Store, iCloud, Apple Music, Apple Pay, and warranty services lift margin and repeat purchase.'},
    {zh: '生态层：软硬件协同、账号体系、隐私定位和开发者生态提高迁移成本。', en: 'Ecosystem layer: hardware-software integration, accounts, privacy positioning, and developers raise switching costs.'},
    {zh: '供应链层：规模采购、制造协同、芯片自研和渠道控制保障体验与成本。', en: 'Supply-chain layer: scale purchasing, manufacturing coordination, in-house chips, and channel control support experience and cost.'}
  ],
  moat: [
    {zh: '品牌与信任：高端消费电子心智、隐私叙事和长期服务体验。', en: 'Brand and trust: premium consumer-electronics mindshare, privacy narrative, and long-term service experience.'},
    {zh: '生态粘性：iOS、App Store、iCloud、Apple ID、多设备协同和家庭共享。', en: 'Ecosystem stickiness: iOS, App Store, iCloud, Apple ID, multi-device continuity, and family sharing.'},
    {zh: '软硬件一体化：芯片、系统、工业设计、零售和售后共同控制体验。', en: 'Integration: chips, operating systems, industrial design, retail, and service jointly control experience.'},
    {zh: '开发者网络：高付费用户群和应用生态吸引开发者持续投入。', en: 'Developer network: high-paying users and app ecosystem attract continued developer investment.'},
    {zh: '供应链能力：超大规模、质量控制、库存管理和全球渠道构成隐形门槛。', en: 'Supply-chain capability: scale, quality control, inventory management, and global channels create hidden barriers.'}
  ],
  watchlist: [
    {zh: '行业：智能手机换机周期、端侧 AI、空间计算和可穿戴健康场景。', en: 'Industry: smartphone replacement cycle, on-device AI, spatial computing, and wearable health.'},
    {zh: '客户：高端用户忠诚度、服务付费率和新设备接受度。', en: 'Customers: premium-user loyalty, services attach rate, and adoption of new devices.'},
    {zh: '政策：App Store 监管、反垄断、隐私规则和供应链地缘风险。', en: 'Policy: App Store regulation, antitrust, privacy rules, and supply-chain geopolitics.'},
    {zh: '竞争：Android 阵营、AI 助手入口、云服务、可穿戴和混合现实设备。', en: 'Competition: Android ecosystem, AI assistant entry points, cloud services, wearables, and mixed-reality devices.'},
    {zh: '公司自身：AI 产品化速度、服务收入质量、毛利率、创新节奏和管理层延续。', en: 'Company: AI productization speed, services revenue quality, margins, innovation cadence, and leadership continuity.'}
  ]
});

enrichCompany('anthropic', {
  timeline: [
    {year: '2025', event: {zh: 'Claude、企业产品、代码工具和云平台合作继续扩展，安全可信叙事进入商业化阶段。', en: 'Claude, enterprise products, coding tools, and cloud partnerships expanded, taking the safety-and-trust narrative deeper into commercialization.'}, imageHint: {zh: 'Claude 产品界面或企业 AI 工作流图。', en: 'Claude product interface or enterprise AI workflow image.'}},
    {year: '2024', event: {zh: 'Claude 3 系列和后续模型提升多模态、长上下文、代码和企业任务能力。', en: 'Claude 3 and subsequent models improved multimodal, long-context, coding, and enterprise-task capability.'}, imageHint: {zh: 'Claude 模型发布或长上下文界面图。', en: 'Claude model launch or long-context interface image.'}},
    {year: '2023', event: {zh: 'Claude 进入更广泛商业使用，并获得云厂商和企业客户关注。', en: 'Claude reached broader commercial use and drew attention from cloud providers and enterprise customers.'}, imageHint: {zh: 'Claude 早期产品界面图。', en: 'Early Claude product interface image.'}},
    {year: '2022', event: {zh: 'Constitutional AI 等安全研究强化公司差异化定位。', en: 'Safety research such as Constitutional AI strengthened the company differentiation.'}, imageHint: {zh: 'AI 安全研究或评测示意图。', en: 'AI safety research or evaluation diagram.'}},
    {year: '2021', event: {zh: 'Anthropic 成立，定位为重视安全、可靠和可解释性的前沿 AI 公司。', en: 'Anthropic was founded as a frontier AI company focused on safety, reliability, and interpretability.'}, imageHint: {zh: 'Anthropic 标识或早期团队图。', en: 'Anthropic logo or early team image.'}}
  ],
  businessModel: [
    {zh: '订阅层：Claude 面向个人、团队和企业提供付费入口。', en: 'Subscription layer: Claude provides paid entry points for individuals, teams, and enterprises.'},
    {zh: 'API 层：按模型调用、上下文长度、工具调用和企业集成收费。', en: 'API layer: monetizes model calls, context length, tool use, and enterprise integration.'},
    {zh: '企业层：以可靠、安全、合规和长上下文能力切入知识工作流。', en: 'Enterprise layer: enters knowledge workflows through reliability, safety, compliance, and long context.'},
    {zh: '渠道层：云平台合作扩大分发，但也要求处理算力、定价和客户关系依赖。', en: 'Channel layer: cloud partnerships expand distribution while creating dependencies around compute, pricing, and customer ownership.'}
  ],
  moat: [
    {zh: '安全品牌：把可靠、可控、可解释作为企业采用的信任资产。', en: 'Safety brand: turns reliability, controllability, and interpretability into trust assets for enterprise adoption.'},
    {zh: '模型能力：长上下文、代码、复杂推理和工具使用能力。', en: 'Model capability: long context, coding, complex reasoning, and tool use.'},
    {zh: '企业信任：面向高合规客户时，安全叙事比单纯性能更重要。', en: 'Enterprise trust: for high-compliance customers, safety narrative matters beyond raw performance.'},
    {zh: '研究深度：解释性、安全评估和对齐研究形成长期差异化。', en: 'Research depth: interpretability, safety evaluation, and alignment research create long-term differentiation.'},
    {zh: '云渠道：与大型云平台的合作提高触达，但也需要守住品牌和客户关系。', en: 'Cloud channels: major cloud partnerships increase reach while requiring control of brand and customer relationship.'}
  ],
  watchlist: [
    {zh: '行业：模型性能趋同后，企业是否更重视可靠、安全和合规。', en: 'Industry: whether enterprises value reliability, safety, and compliance more as model performance converges.'},
    {zh: '客户：Claude 在代码、文档、客服、法律、金融和内部知识库中的渗透。', en: 'Customers: Claude adoption in coding, documents, support, legal, finance, and internal knowledge bases.'},
    {zh: '政策：AI 安全、数据隐私、模型评测和行业合规要求。', en: 'Policy: AI safety, data privacy, model evaluations, and sector compliance.'},
    {zh: '竞争：OpenAI、Google、Meta、xAI、开源模型和企业软件厂商。', en: 'Competition: OpenAI, Google, Meta, xAI, open models, and enterprise software vendors.'},
    {zh: '公司自身：算力成本、融资能力、模型节奏、企业续费率和安全承诺兑现。', en: 'Company: compute cost, financing capacity, model cadence, enterprise renewals, and delivery on safety promises.'}
  ]
});

enrichCompany('tsmc', {
  timeline: [
    {year: '2024', event: {zh: '魏哲家接任董事长并继续担任 CEO，台积电进入 AI 需求和全球扩产并行阶段。', en: 'C.C. Wei became Chairman while continuing as CEO, as TSMC entered a phase of AI demand and global expansion.'}, imageHint: {zh: '魏哲家、晶圆厂或投资者大会图。', en: 'C.C. Wei, fab, or investor event image.'}},
    {year: '2020s', event: {zh: 'AI 加速器需求推动先进制程、CoWoS 先进封装和 HBM 相关供应链扩张。', en: 'AI accelerator demand drove expansion in advanced nodes, CoWoS advanced packaging, and HBM-related supply chain.'}, imageHint: {zh: 'CoWoS、先进封装或 AI 芯片晶圆图。', en: 'CoWoS, advanced packaging, or AI chip wafer image.'}},
    {year: '2020', event: {zh: '宣布美国亚利桑那晶圆厂计划，全球产能布局成为客户和政策共同关注点。', en: 'Announced Arizona fab plans, making global capacity footprint a shared customer and policy focus.'}, imageHint: {zh: '亚利桑那晶圆厂建设或厂区图。', en: 'Arizona fab construction or campus image.'}},
    {year: '2018', event: {zh: '7nm 量产支撑智能手机、高性能计算和 AI 芯片客户，先进制程优势进一步拉开。', en: '7nm volume production supported smartphone, HPC, and AI chip customers, widening advanced-node leadership.'}, imageHint: {zh: '7nm 晶圆或先进制程示意图。', en: '7nm wafer or advanced-node image.'}},
    {year: '2011', event: {zh: '开始大规模推进 28nm 等关键节点，纯晶圆代工模式服务更多无晶圆厂客户。', en: 'Scaled key nodes such as 28nm, serving more fabless customers through the pure-play foundry model.'}, imageHint: {zh: '晶圆制造产线图。', en: 'Wafer manufacturing line image.'}},
    {year: '2005', event: {zh: '先进封装与客户协同能力逐步积累，为后来的 AI 芯片系统级封装打底。', en: 'Advanced packaging and customer co-design capabilities began compounding toward later AI system-level packaging.'}, imageHint: {zh: '封装工艺或客户协同示意图。', en: 'Packaging process or customer collaboration image.'}},
    {year: '1987', event: {zh: '张忠谋创立台积电，建立纯晶圆代工模式，改变全球半导体分工。', en: 'Morris Chang founded TSMC and established the pure-play foundry model, changing global semiconductor specialization.'}, imageHint: {zh: '张忠谋或早期台积电厂区图。', en: 'Morris Chang or early TSMC fab image.'}}
  ],
  businessModel: [
    {zh: '制造层：按晶圆、制程节点、良率和产能利用率获得收入。', en: 'Manufacturing layer: revenue comes from wafers, process nodes, yield, and capacity utilization.'},
    {zh: '先进制程层：3nm、5nm、7nm 等节点服务手机、HPC、AI 和网络芯片客户。', en: 'Advanced-node layer: 3nm, 5nm, 7nm and related nodes serve mobile, HPC, AI, and networking chips.'},
    {zh: '封装层：CoWoS、SoIC 等先进封装成为 AI 加速器的重要瓶颈和增量收入。', en: 'Packaging layer: CoWoS, SoIC, and advanced packaging become key AI accelerator bottlenecks and revenue opportunities.'},
    {zh: '资本层：超大资本开支、长期客户承诺和技术路线图共同决定回报周期。', en: 'Capital layer: massive capex, long-term customer commitments, and technology roadmap determine return cycles.'}
  ],
  moat: [
    {zh: '制程领先：先进节点研发、量产爬坡和良率管理持续积累。', en: 'Process leadership: advanced-node R&D, ramp, and yield management compound over time.'},
    {zh: '客户中立：不与客户设计芯片竞争，获得苹果、英伟达、AMD 等客户信任。', en: 'Customer neutrality: avoids competing with chip-design customers, earning trust from Apple, NVIDIA, AMD, and others.'},
    {zh: '制造纪律：工艺控制、设备协同、工程人才和运营细节形成隐形壁垒。', en: 'Manufacturing discipline: process control, equipment coordination, engineering talent, and operational detail form hidden barriers.'},
    {zh: '资本规模：先进晶圆厂和封装产能需要巨额、长期、连续投资。', en: 'Capital scale: advanced fabs and packaging capacity require massive, long-duration investment.'},
    {zh: '生态协同：EDA、设备、材料、封装、客户设计共同嵌入台积电路线图。', en: 'Ecosystem coordination: EDA, equipment, materials, packaging, and customer designs embed into TSMC roadmap.'}
  ],
  watchlist: [
    {zh: '行业：AI 芯片、手机、HPC、汽车和工业芯片需求周期。', en: 'Industry: demand cycles for AI chips, smartphones, HPC, automotive, and industrial chips.'},
    {zh: '客户：苹果、英伟达、AMD、高通、博通等大客户订单集中度。', en: 'Customers: order concentration across Apple, NVIDIA, AMD, Qualcomm, Broadcom, and other major customers.'},
    {zh: '政策：台海风险、美国 / 日本 / 欧洲建厂、出口管制和补贴条件。', en: 'Policy: Taiwan Strait risk, U.S. / Japan / Europe fabs, export controls, and subsidy conditions.'},
    {zh: '竞争：三星、Intel Foundry、中国成熟制程扩张和先进封装替代。', en: 'Competition: Samsung, Intel Foundry, China mature-node expansion, and packaging alternatives.'},
    {zh: '公司自身：先进节点良率、CoWoS 产能、资本开支效率、毛利率和海外厂成本。', en: 'Company: advanced-node yield, CoWoS capacity, capex efficiency, margins, and overseas fab cost.'}
  ]
});

enrichCompany('google', {
  timeline: [
    {year: '2024', event: {zh: 'Gemini、AI Overviews、TPU 和 Google Cloud AI 产品把搜索、云和模型能力放到同一竞争主线。', en: 'Gemini, AI Overviews, TPU, and Google Cloud AI products put search, cloud, and model capability on one competitive track.'}, imageHint: {zh: 'Gemini、Google I/O 或 TPU 图。', en: 'Gemini, Google I/O, or TPU image.'}},
    {year: '2023', event: {zh: 'Gemini 发布，Google 将 DeepMind、搜索、云和生产力工具更紧密地围绕 AI 组织。', en: 'Gemini launched as Google organized DeepMind, Search, Cloud, and productivity tools more tightly around AI.'}, imageHint: {zh: 'Gemini 发布图。', en: 'Gemini launch image.'}},
    {year: '2016', event: {zh: 'TPU 公开亮相，Google 的 AI 基础设施从软件和数据扩展到自研芯片。', en: 'TPU was publicly introduced, extending Google AI infrastructure from software and data into custom chips.'}, imageHint: {zh: 'TPU 芯片或数据中心图。', en: 'TPU chip or data center image.'}},
    {year: '2015', event: {zh: 'Alphabet 成立，Google 成为核心业务，其他长期项目进入控股公司架构。', en: 'Alphabet was formed, with Google as the core business and other long-term bets organized under a holding-company structure.'}, imageHint: {zh: 'Alphabet / Google 总部图。', en: 'Alphabet / Google campus image.'}},
    {year: '2008', event: {zh: 'Android 和 Chrome 推出，Google 从搜索入口扩展到移动和浏览器入口。', en: 'Android and Chrome launched, extending Google from search entry into mobile and browser entry points.'}, imageHint: {zh: 'Android 或 Chrome 早期图。', en: 'Early Android or Chrome image.'}},
    {year: '2006', event: {zh: '收购 YouTube，为视频内容、广告和创作者生态打下基础。', en: 'Acquired YouTube, laying the foundation for video content, advertising, and creator ecosystem.'}, imageHint: {zh: 'YouTube 早期界面图。', en: 'Early YouTube interface image.'}},
    {year: '2004', event: {zh: 'Google IPO，搜索广告商业模式进入公开市场视野。', en: 'Google went public, bringing the search advertising model into public markets.'}, imageHint: {zh: 'Google IPO 或早期办公室图。', en: 'Google IPO or early office image.'}},
    {year: '1998', event: {zh: 'Google 成立，以 PageRank 和搜索质量切入互联网信息组织。', en: 'Google was founded, using PageRank and search quality to organize internet information.'}, imageHint: {zh: 'Google 早期首页或创始人图。', en: 'Early Google homepage or founders image.'}}
  ],
  businessModel: [
    {zh: '广告层：搜索、YouTube、广告网络和商业意图流量构成最大现金流。', en: 'Ads layer: Search, YouTube, ad network, and commercial-intent traffic form the largest cash flow.'},
    {zh: '云层：Google Cloud、数据平台、Workspace 和 Vertex AI 面向企业收费。', en: 'Cloud layer: Google Cloud, data platform, Workspace, and Vertex AI monetize enterprise customers.'},
    {zh: '入口层：Android、Chrome、Google Play、地图和默认搜索协议维持分发。', en: 'Distribution layer: Android, Chrome, Google Play, Maps, and default-search deals maintain reach.'},
    {zh: 'AI 层：Gemini、TPU、搜索 AI 化和开发者工具决定未来产品形态。', en: 'AI layer: Gemini, TPU, AI search, and developer tools shape future product form.'},
    {zh: '长期项目层：Waymo、生命科学等 Other Bets 提供期权，但需要资本纪律。', en: 'Long-bet layer: Waymo, life sciences, and other bets provide options but require capital discipline.'}
  ],
  moat: [
    {zh: '搜索入口：默认位置、用户习惯、索引规模和商业意图数据。', en: 'Search entry: default position, user habit, index scale, and commercial-intent data.'},
    {zh: '广告网络：广告主、发布商、测量工具和竞价系统形成双边网络。', en: 'Ad network: advertisers, publishers, measurement tools, and auction systems form a two-sided network.'},
    {zh: '数据与工程：全球基础设施、TPU、模型训练、反垃圾和排名系统。', en: 'Data and engineering: global infrastructure, TPU, model training, anti-spam, and ranking systems.'},
    {zh: '生态入口：Android、Chrome、YouTube、Maps、Gmail 和 Workspace 高频触达用户。', en: 'Ecosystem entry: Android, Chrome, YouTube, Maps, Gmail, and Workspace reach users frequently.'},
    {zh: 'AI 人才与研究：DeepMind、Google Research 和云平台把研究转化为产品。', en: 'AI talent and research: DeepMind, Google Research, and Cloud convert research into products.'}
  ],
  watchlist: [
    {zh: '行业：AI 搜索是否改变用户习惯和广告点击结构。', en: 'Industry: whether AI search changes user habits and ad-click structure.'},
    {zh: '客户：广告主 ROI、YouTube 创作者生态、云客户迁移和 Workspace 粘性。', en: 'Customers: advertiser ROI, YouTube creator ecosystem, cloud migration, and Workspace stickiness.'},
    {zh: '政策：反垄断、默认搜索协议、隐私、内容版权和 AI 监管。', en: 'Policy: antitrust, default-search agreements, privacy, content copyright, and AI regulation.'},
    {zh: '竞争：OpenAI、Microsoft、Meta、Amazon、Apple 和垂直 AI 搜索产品。', en: 'Competition: OpenAI, Microsoft, Meta, Amazon, Apple, and vertical AI search products.'},
    {zh: '公司自身：Gemini 质量、AI Overviews 商业化、云利润率、资本开支和组织速度。', en: 'Company: Gemini quality, AI Overviews monetization, cloud margin, capex, and organizational speed.'}
  ]
});

enrichCompany('berkshire-hathaway', {
  timeline: [
    {year: '2026', event: {zh: 'Greg Abel 接任 CEO，Berkshire 进入巴菲特之后的资本配置与文化延续阶段。', en: 'Greg Abel became CEO, moving Berkshire into a post-Buffett phase of capital allocation and cultural continuity.'}, imageHint: {zh: 'Greg Abel 与 Berkshire 年会图。', en: 'Greg Abel and Berkshire annual meeting image.'}},
    {year: '2023', event: {zh: '查理·芒格去世，Berkshire 失去长期思想伙伴，公司文化传承受到更多关注。', en: 'Charlie Munger died, increasing attention on Berkshire cultural succession.'}, imageHint: {zh: '巴菲特与芒格年会图。', en: 'Buffett and Munger annual meeting image.'}},
    {year: '2010', event: {zh: '完成收购 BNSF，Berkshire 获得大型铁路基础设施现金流。', en: 'Completed the BNSF acquisition, adding major railroad infrastructure cash flow.'}, imageHint: {zh: 'BNSF 铁路或货运列车图。', en: 'BNSF railroad or freight train image.'}},
    {year: '1998', event: {zh: '收购 General Re，保险和再保险浮存金体系进一步扩大。', en: 'Acquired General Re, expanding insurance and reinsurance float.'}, imageHint: {zh: '保险业务或 Berkshire 年报图。', en: 'Insurance business or Berkshire annual report image.'}},
    {year: '1988', event: {zh: '开始大量买入可口可乐，展示“好公司长期持有”的经典投资案例。', en: 'Began buying Coca-Cola, becoming a classic case of long-term ownership of a high-quality business.'}, imageHint: {zh: '可口可乐持仓或巴菲特资料图。', en: 'Coca-Cola holding or Buffett material image.'}},
    {year: '1972', event: {zh: '收购 See’s Candies，让巴菲特和芒格更深理解品牌、定价权和轻资产现金流。', en: 'Acquired See’s Candies, deepening Buffett and Munger understanding of brand, pricing power, and asset-light cash flow.'}, imageHint: {zh: 'See’s Candies 门店或产品图。', en: 'See’s Candies store or product image.'}},
    {year: '1967', event: {zh: '收购 National Indemnity，保险浮存金成为 Berkshire 资本配置机器的核心燃料。', en: 'Acquired National Indemnity, making insurance float core fuel for Berkshire capital allocation.'}, imageHint: {zh: '保险公司或早期 Berkshire 资料图。', en: 'Insurance company or early Berkshire material image.'}},
    {year: '1965', event: {zh: '巴菲特取得 Berkshire 控制权，后续从纺织企业转型为投资控股平台。', en: 'Buffett took control of Berkshire, later transforming it from textile company into an investment holding platform.'}, imageHint: {zh: '早期 Berkshire 或巴菲特资料图。', en: 'Early Berkshire or Buffett material image.'}}
  ],
  businessModel: [
    {zh: '保险层：承保利润和低成本浮存金提供可投资资金。', en: 'Insurance layer: underwriting profit and low-cost float provide investable capital.'},
    {zh: '控股层：铁路、能源、制造、服务和零售公司提供多元现金流。', en: 'Operating layer: railroad, energy, manufacturing, service, and retail businesses provide diversified cash flow.'},
    {zh: '投资层：长期持有优质上市公司，享受复利、分红和税务递延。', en: 'Investment layer: long-term ownership of public companies captures compounding, dividends, and tax deferral.'},
    {zh: '资本配置层：在现金、股票、回购和收购之间做机会成本比较。', en: 'Capital-allocation layer: compares opportunity cost among cash, equities, buybacks, and acquisitions.'}
  ],
  moat: [
    {zh: '低成本浮存金：保险业务在长期内提供独特资本来源。', en: 'Low-cost float: insurance provides a distinctive long-term capital source.'},
    {zh: '声誉资产：卖家公司愿意把企业交给 Berkshire，因为它承诺长期持有和少干预。', en: 'Reputation asset: sellers choose Berkshire because it promises long-term ownership and limited interference.'},
    {zh: '文化纪律：理性、耐心、少犯大错和去中心化管理降低组织摩擦。', en: 'Cultural discipline: rationality, patience, avoiding big mistakes, and decentralization reduce friction.'},
    {zh: '股东结构：长期股东降低短期压力，让公司能等待大机会。', en: 'Shareholder base: long-term shareholders reduce short-term pressure and let the company wait for major opportunities.'},
    {zh: '税务效率：长期持有和内部再配置提高资本复利效率。', en: 'Tax efficiency: long-term holding and internal reallocation improve compounding efficiency.'}
  ],
  watchlist: [
    {zh: '行业：保险承保周期、利率、再保险价格和巨灾损失。', en: 'Industry: insurance underwriting cycle, interest rates, reinsurance pricing, and catastrophe losses.'},
    {zh: '客户 / 资产：BNSF、Berkshire Hathaway Energy、GEICO 和核心持仓现金流。', en: 'Assets: cash flows from BNSF, Berkshire Hathaway Energy, GEICO, and key holdings.'},
    {zh: '政策：能源监管、保险监管、税制变化和反垄断审查。', en: 'Policy: energy regulation, insurance regulation, tax changes, and antitrust review.'},
    {zh: '竞争：私募股权、战略买家、保险资本和指数化资金争夺资产。', en: 'Competition: private equity, strategic buyers, insurance capital, and indexed money compete for assets.'},
    {zh: '公司自身：Greg Abel 资本配置、现金规模、回购纪律、收购机会和文化传承。', en: 'Company: Greg Abel capital allocation, cash balance, buyback discipline, acquisition opportunities, and cultural succession.'}
  ]
});

export const stockModules: StockModule[] = [
  {
    title: {zh: '股票到底是什么', en: 'What a stock really is'},
    summary: {zh: '股票不是代码，而是公司所有权的一小部分。理解股票要先理解公司。', en: 'A stock is not a ticker; it is a fractional ownership claim on a company.'},
    lessons: [
      {zh: '股东拥有的是未来现金流和剩余索取权。', en: 'Shareholders own future cash flows and residual claims.'},
      {zh: '好公司不等于好股票，价格和预期同样重要。', en: 'A good company is not always a good stock; price and expectations matter.'}
    ]
  },
  {
    title: {zh: '如何看商业模式', en: 'How to read business models'},
    summary: {zh: '先看它卖什么、卖给谁、为什么客户愿意持续付费。', en: 'Start with what it sells, who pays, and why customers keep paying.'},
    lessons: [
      {zh: '区分硬件、软件、订阅、平台、服务和生态收入。', en: 'Separate hardware, software, subscription, platform, service, and ecosystem revenue.'},
      {zh: '关注毛利率、复购、客户粘性和扩张成本。', en: 'Watch gross margin, repeat purchase, stickiness, and expansion cost.'}
    ]
  },
  {
    title: {zh: '财报与估值基础', en: 'Financial statements and valuation basics'},
    summary: {zh: '财报看事实，估值看市场对未来的定价。两者要一起看。', en: 'Financial statements show facts; valuation prices the future. Read them together.'},
    lessons: [
      {zh: '收入、利润、现金流、资本开支和负债是基础。', en: 'Revenue, profit, cash flow, capital expenditure, and debt are the basics.'},
      {zh: 'PE、PS、自由现金流和增长率都只是工具，不是答案。', en: 'PE, PS, free cash flow, and growth rate are tools, not answers.'}
    ]
  },
  {
    title: {zh: '风险与长期观察', en: 'Risk and long-term observation'},
    summary: {zh: '投资学习的重点不是预测涨跌，而是识别变量和更新判断。', en: 'Investing study is less about predicting moves and more about identifying variables and updating judgment.'},
    lessons: [
      {zh: '看行业、市场、客户、政策、竞争和公司自己。', en: 'Watch industry, market, customers, policy, competition, and the company itself.'},
      {zh: '建立观察日志，不把短期波动误当成长期结论。', en: 'Keep an observation log and avoid mistaking short-term volatility for long-term conclusions.'}
    ]
  }
];

export const personLessons: PersonLesson[] = [
  {
    personSlug: 'jensen-huang',
    slug: 'technology-trend-to-platform-strategy',
    title: {
      zh: '如何把技术趋势转化为长期平台战略',
      en: 'Turning technical trends into long-term platform strategy'
    },
    summary: {
      zh: '黄仁勋和 NVIDIA 最值得学习的一点，是他们不是等市场已经清楚以后再跟随，而是在计算需求、芯片能力、软件生态和客户痛点之间提前看到一个巨大市场，然后用十几年时间把它做成平台。',
      en: 'One of the most useful lessons from Jensen Huang and NVIDIA is not waiting until the market is obvious, but seeing a large computing opportunity early and spending more than a decade turning chips, software, developers, and customers into a platform.'
    },
    sections: [
      {
        title: {zh: '1. 先看到趋势背后的结构变化', en: '1. See the structural shift behind the trend'},
        paragraphs: [
          {
            zh: '很多人看到的是一个产品周期，黄仁勋看到的是计算方式的变化。GPU 最早服务于图形和游戏，但它天然适合并行计算。当科学计算、深度学习、数据中心和 AI 模型都需要大规模并行计算时，GPU 就不只是显卡，而可能成为一种新的计算基础设施。',
            en: 'Many people saw a product cycle; Jensen Huang saw a change in the nature of computing. GPUs began with graphics and gaming, but their parallel architecture made them useful for scientific computing, deep learning, data centers, and AI models.'
          },
          {
            zh: '这类判断的关键不是预测某个爆款产品，而是判断底层需求是否会长期变大：数据是否越来越多，模型是否越来越大，算力是否越来越稀缺，客户是否愿意为更高效率持续付费。',
            en: 'The key is not predicting a single hit product. It is judging whether the underlying demand will compound: more data, larger models, scarcer compute, and customers willing to keep paying for better efficiency.'
          }
        ]
      },
      {
        title: {zh: '2. 在市场不理解时坚持投入', en: '2. Keep investing before the market understands'},
        paragraphs: [
          {
            zh: 'CUDA 是一个典型例子。早期很多竞争对手、投资人、客户甚至市场都不完全理解 NVIDIA 为什么要把 GPU 变成通用计算平台。短期看，这不是最容易讲清楚的业务；长期看，它是在为未来的开发者生态、应用场景和客户迁移成本打地基。',
            en: 'CUDA is a classic example. Early on, many competitors, investors, customers, and market observers did not fully understand why NVIDIA wanted to turn GPUs into a general-purpose computing platform.'
          },
          {
            zh: '真正难的地方在于，平台战略往往需要在收入爆发前先烧很多年耐心：做工具链、做库、做开发者教育、做兼容、做生态合作。短期财务报表不一定立刻奖励你，但长期一旦市场打开，平台会把早期投入变成复利。',
            en: 'The hard part is that platform strategy often requires patience before revenue explodes: toolchains, libraries, developer education, compatibility, and ecosystem partnerships. The financial reward may come much later.'
          }
        ]
      },
      {
        title: {zh: '3. 不只卖产品，而是创造一个市场', en: '3. Do not just sell products; create a market'},
        paragraphs: [
          {
            zh: '黄仁勋反复强调的不是“我们卖一块更快的芯片”，而是“我们正在开辟一个新的计算市场”。这两种叙事完全不同：卖产品关注单次交易，创造市场关注客户、开发者、软件、供应链、应用和资本开支如何一起扩大。',
            en: 'Jensen Huang often frames NVIDIA not as selling a faster chip, but as opening a new computing market. Selling a product is transactional; creating a market links customers, developers, software, supply chain, applications, and capital expenditure.'
          },
          {
            zh: '当一家公司能让客户相信：未来十年某类能力会成为基础设施，它就不只是供应商，而可能成为行业标准的一部分。NVIDIA 在 AI 时代的强势，正是来自芯片、CUDA、网络、整机系统和开发者生态共同组成的平台位置。',
            en: 'When a company convinces customers that a capability will become infrastructure for the next decade, it can become more than a supplier. It can become part of the industry standard.'
          }
        ]
      },
      {
        title: {zh: '4. 我们可以怎么学', en: '4. How we can learn from it'},
        paragraphs: [
          {
            zh: '普通人学习这件事，不是去模仿 NVIDIA 做芯片，而是学习一种判断框架：看到一个趋势时，问它背后的长期需求是什么；有没有足够大的市场；客户是否有强烈痛点；技术是否会持续进步；生态是否能形成迁移成本。',
            en: 'For us, the lesson is not to copy NVIDIA by building chips. It is to learn a judgment framework: what long-term demand sits behind a trend, how large the market can be, whether customers have urgent pain, whether technology keeps improving, and whether an ecosystem can create switching costs.'
          },
          {
            zh: '更重要的是，要理解“早看见”和“长期投入”必须连在一起。只看见趋势但不投入，等于观点；长期投入但没有大市场，容易变成消耗。伟大的平台战略，往往是大趋势、大市场、强执行和长期耐心同时出现。',
            en: 'More importantly, early vision and long-term investment must connect. Seeing a trend without investing is only an opinion; investing for years without a large market can become waste. Great platform strategy combines large trend, large market, strong execution, and patience.'
          }
        ]
      }
    ],
    keyTakeaways: [
      {
        zh: '看趋势不要只看热词，要看底层需求是否会长期增长。',
        en: 'Do not study trends as buzzwords; ask whether the underlying demand will compound.'
      },
      {
        zh: '平台战略的早期往往难以被市场理解，需要耐心、资本和组织信念。',
        en: 'Early platform strategy is often hard for the market to understand and requires patience, capital, and organizational conviction.'
      },
      {
        zh: '真正的壁垒不只是产品性能，而是工具链、生态、客户迁移成本和行业标准位置。',
        en: 'The real moat is not only product performance, but toolchains, ecosystem, switching costs, and standard-setting position.'
      }
    ]
  },
  {
    personSlug: 'jensen-huang',
    slug: 'developer-ecosystem-as-moat',
    title: {
      zh: '如何用开发者生态形成竞争壁垒',
      en: 'Using developer ecosystems as a competitive moat'
    },
    summary: {
      zh: 'NVIDIA 的壁垒不只是芯片性能，而是 CUDA、库、工具链、开发者习惯、企业工作流和生态伙伴共同形成的迁移成本。硬件可以被追赶，生态一旦沉淀，竞争对手就不只是要做出产品，还要说服整个市场重写习惯。',
      en: 'NVIDIA\'s moat is not only chip performance. It is CUDA, libraries, toolchains, developer habits, enterprise workflows, and partner ecosystems that create switching costs.'
    },
    sections: [
      {
        title: {zh: '1. 从卖硬件到服务开发者', en: '1. Move from selling hardware to serving developers'},
        paragraphs: [
          {
            zh: '如果一家公司只卖硬件，竞争往往会落到性能、价格和供货能力上。但 NVIDIA 很早就意识到，真正决定 GPU 能不能进入更多场景的，不只是芯片本身，而是开发者能不能方便地使用它、优化它、把它接入真实业务。',
            en: 'If a company only sells hardware, competition often comes down to performance, price, and supply. NVIDIA understood that GPUs could enter more markets only if developers could use, optimize, and integrate them into real work.'
          },
          {
            zh: 'CUDA 的意义就在这里：它把 GPU 从一种硬件能力，变成开发者可以调用、学习、复用和积累经验的平台。开发者一旦围绕 CUDA 写代码、调模型、做库和工作流，NVIDIA 就不再只是供应商，而进入了客户的技术栈。',
            en: 'This is where CUDA matters. It turned GPU capability into a platform developers could call, learn, reuse, and build around. Once developers write code, tune models, build libraries, and design workflows around CUDA, NVIDIA becomes part of the technical stack.'
          }
        ]
      },
      {
        title: {zh: '2. 生态壁垒来自连续的小积累', en: '2. Ecosystem moats come from many small accumulations'},
        paragraphs: [
          {
            zh: '开发者生态不是一场发布会建立起来的，而是很多年里不断补工具、补文档、补库、补案例、补社区、补兼容。每一次小改进都不一定震撼，但它们会降低开发者使用成本，也会提高离开的成本。',
            en: 'A developer ecosystem is not built in one launch event. It grows through years of tools, documentation, libraries, examples, community, and compatibility. Each improvement may look small, but it reduces adoption cost and raises switching cost.'
          },
          {
            zh: '这也是为什么 CUDA 很难被简单替代。竞争对手可能做出一块很强的芯片，但还要面对开发者已有代码、企业已有部署、工程师已有经验、框架已有优化、客户已有采购逻辑。生态的本质，是把单点产品变成一整套路径依赖。',
            en: 'That is why CUDA is hard to replace. A competitor can build a strong chip, but still faces existing code, enterprise deployments, engineering experience, framework optimizations, and procurement logic. Ecosystem turns a product into path dependency.'
          }
        ]
      },
      {
        title: {zh: '3. 让客户和伙伴一起扩大平台', en: '3. Let customers and partners expand the platform'},
        paragraphs: [
          {
            zh: '好的生态不是公司自己唱独角戏，而是让客户、云厂商、服务器厂商、模型公司、开发者、研究者都在这个平台上做增量投入。当他们投入越多，平台越强；平台越强，他们越愿意继续投入。',
            en: 'A strong ecosystem is not a solo performance. It lets customers, cloud providers, server makers, model companies, developers, and researchers all invest on top of the platform. More investment makes the platform stronger, which attracts more investment.'
          },
          {
            zh: 'NVIDIA 的强大之处在于，它把芯片、网络、整机、软件、云、开发者和企业客户放进同一个叙事里。这样客户买的不是孤立产品，而是一套可以持续升级的 AI 基础设施。',
            en: 'NVIDIA is powerful because it places chips, networking, systems, software, cloud, developers, and enterprise customers into one narrative. Customers are not buying isolated products; they are buying AI infrastructure that can keep upgrading.'
          }
        ]
      },
      {
        title: {zh: '4. 我们可以怎么学', en: '4. How we can learn from it'},
        paragraphs: [
          {
            zh: '普通人做产品、内容、服务或个人品牌时，也可以学习这个思路：不要只做一次性交付，要让用户在你的体系里积累。比如让用户形成固定流程、复用模板、沉淀数据、建立习惯、连接其他工具。',
            en: 'For our own products, content, services, or personal brands, the lesson is similar: do not only deliver once. Help users accumulate inside your system through workflows, templates, data, habits, and tool connections.'
          },
          {
            zh: '真正的壁垒，往往不是别人完全做不出来，而是别人做出来以后，用户为什么要换。生态的价值，就是让用户的学习成本、迁移成本、协作成本和机会成本都变高。',
            en: 'A real moat is often not that others cannot build something. It is why users would switch after alternatives appear. Ecosystem raises learning cost, migration cost, collaboration cost, and opportunity cost.'
          }
        ]
      }
    ],
    keyTakeaways: [
      {
        zh: '硬件性能重要，但开发者习惯、工具链和客户工作流会形成更深的壁垒。',
        en: 'Hardware performance matters, but developer habits, toolchains, and customer workflows can create deeper moats.'
      },
      {
        zh: '生态不是一次性工程，而是多年持续降低使用成本、提高迁移成本的积累。',
        en: 'Ecosystem is not a one-time project; it is years of lowering adoption cost and raising switching cost.'
      },
      {
        zh: '平台最强的时候，是客户和伙伴都愿意在上面继续投入。',
        en: 'A platform is strongest when customers and partners keep investing on top of it.'
      }
    ]
  },
  {
    personSlug: 'jensen-huang',
    slug: 'public-narrative-as-company-strategy',
    title: {
      zh: '如何在公开表达中塑造公司叙事',
      en: 'Shaping company narrative through public communication'
    },
    summary: {
      zh: '黄仁勋的公开表达不是简单宣传，而是在帮市场理解 NVIDIA 到底处在什么位置：它不是只卖芯片，而是在解释一种新的计算平台、一种新的产业基础设施，以及一个可能达到万亿美元规模的市场。',
      en: 'Jensen Huang\'s public communication is not only promotion. It helps the market understand NVIDIA\'s position as a new computing platform, a new industrial infrastructure layer, and a potentially massive market.'
    },
    sections: [
      {
        title: {zh: '1. 把复杂技术讲成清晰位置', en: '1. Turn complex technology into a clear position'},
        paragraphs: [
          {
            zh: 'AI 芯片、CUDA、数据中心、网络、推理、训练、数字孪生、机器人，这些概念本来很复杂。如果只是堆技术名词，普通投资人、客户和媒体很难理解。黄仁勋的表达能力在于，他不断把这些复杂技术收束成一个更清楚的位置：NVIDIA 是 AI 时代的计算平台。',
            en: 'AI chips, CUDA, data centers, networking, inference, training, digital twins, and robotics are complex. If they are only listed as technical terms, investors, customers, and media struggle to understand. Jensen Huang repeatedly compresses them into one clear position: NVIDIA as the computing platform for the AI era.'
          },
          {
            zh: '这类表达不是为了好听，而是为了降低理解成本。市场一旦能用一个清晰框架理解你，就更容易理解你的产品线、资本开支、客户需求和长期价值。',
            en: 'This kind of communication is not for style. It lowers comprehension cost. Once the market has a clear frame, it can better understand the product line, capital expenditure, customer demand, and long-term value.'
          }
        ]
      },
      {
        title: {zh: '2. 用关键词持续塑造认知', en: '2. Use repeated keywords to shape cognition'},
        paragraphs: [
          {
            zh: '伟大的公司叙事通常不是每次都换一个说法，而是长期重复几个核心关键词。比如“加速计算”“AI 工厂”“数据中心即计算机”“万亿美元级市场”，这些词把 NVIDIA 从硬件公司重新定义成基础设施公司。',
            en: 'Great company narratives do not change language every time. They repeat key phrases over years. Terms such as accelerated computing, AI factories, data center as the computer, and trillion-dollar market reposition NVIDIA from hardware vendor to infrastructure company.'
          },
          {
            zh: '关键词的作用，是让客户、员工、开发者、投资人和媒体逐渐使用同一套语言讨论这家公司。当外部世界开始复用你的语言，你的叙事就不再只是你自己说的话，而变成行业理解的一部分。',
            en: 'Keywords help customers, employees, developers, investors, and media discuss the company using the same language. When the outside world starts reusing your language, the narrative becomes part of industry understanding.'
          }
        ]
      },
      {
        title: {zh: '3. 发布会不只是发布产品，而是更新战略地图', en: '3. Launch events update the strategic map'},
        paragraphs: [
          {
            zh: '黄仁勋的发布会常常不只是介绍新产品参数，而是在画一张战略地图：现在行业处在哪个阶段，客户遇到什么瓶颈，NVIDIA 的新产品如何解决问题，生态伙伴如何一起扩张，未来市场会走向哪里。',
            en: 'Jensen Huang\'s launch events often do more than list product specs. They draw a strategic map: where the industry is, what bottlenecks customers face, how new NVIDIA products solve them, how partners expand the ecosystem, and where the market may go.'
          },
          {
            zh: '这就是为什么发布会、演讲和访谈对研究公司很重要。它们不只是信息披露，更是管理层如何理解行业、如何定义客户问题、如何安排公司资源的窗口。',
            en: 'This is why launch events, speeches, and interviews matter for company study. They are not only announcements. They reveal how management understands the industry, defines customer problems, and allocates company resources.'
          }
        ]
      },
      {
        title: {zh: '4. 我们可以怎么学', en: '4. How we can learn from it'},
        paragraphs: [
          {
            zh: '个人和小团队也需要叙事。不是夸大自己，而是讲清楚：我是谁，我解决什么问题，我为什么长期做这件事，我的方法和别人有什么不同，未来我要把它做成什么体系。',
            en: 'Individuals and small teams also need narrative. Not exaggeration, but clarity: who I am, what problem I solve, why I will do it for the long term, how my method is different, and what system I want to build.'
          },
          {
            zh: '好的公开表达不是临场发挥，而是长期训练：持续使用同一套核心概念，用真实案例解释它们，在不同场景里反复校准。表达清楚，不只是沟通能力，也是战略能力。',
            en: 'Good public communication is not improvisation. It is long-term training: repeatedly using core concepts, explaining them through real cases, and refining them across contexts. Clear expression is not only communication skill; it is strategic ability.'
          }
        ]
      }
    ],
    keyTakeaways: [
      {
        zh: '公开表达的核心，是把复杂技术和复杂战略压缩成别人能理解的位置。',
        en: 'The core of public communication is compressing complex technology and strategy into a position others can understand.'
      },
      {
        zh: '持续重复的关键词，会逐渐变成市场理解公司的语言。',
        en: 'Repeated keywords can become the market language for understanding a company.'
      },
      {
        zh: '发布会、演讲和访谈是研究管理层战略判断的重要窗口。',
        en: 'Launches, speeches, and interviews are important windows into management judgment.'
      }
    ]
  }
];

export function getPerson(slug: string) {
  return people.find((person) => person.slug === slug) ?? null;
}

export function getCompany(slug: string) {
  return companies.find((company) => company.slug === slug) ?? null;
}

export function getPersonLessons(personSlug: string) {
  return personLessons.filter((lesson) => lesson.personSlug === personSlug);
}

export function getPersonLesson(personSlug: string, lessonSlug: string) {
  return personLessons.find((lesson) => lesson.personSlug === personSlug && lesson.slug === lessonSlug) ?? null;
}
