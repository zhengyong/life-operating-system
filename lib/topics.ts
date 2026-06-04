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
