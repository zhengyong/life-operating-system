import type {ArticleMeta, Category} from '@/lib/content';
import {getArticles} from '@/lib/content';
import type {Locale} from '@/lib/i18n';
import {slugify} from '@/lib/utils';

export type SeoTopicSection = {
  heading: string;
  body: string;
  points: string[];
};

export type SeoTopicRelatedLink = {
  label: string;
  href: string;
  summary: string;
};

export type SeoTopicContent = {
  eyebrow: string;
  title: string;
  summary: string;
  description: string;
  thesis: string;
  keywords: string[];
  tagLabels: string[];
  sections: SeoTopicSection[];
  relatedLinks: SeoTopicRelatedLink[];
};

export type SeoTopic = {
  slug: string;
  category: Category;
  relatedTags: string[];
  priorityArticleSlugs: string[];
  content: Record<Locale, SeoTopicContent>;
};

export const seoTopics: SeoTopic[] = [
  {
    slug: 'life-operating-system',
    category: 'Life OS',
    relatedTags: ['Life OS', 'Operating System', 'Systems Thinking', 'Life Strategy', 'Life Review', 'Long-Termism'],
    priorityArticleSlugs: [
      'life-os-introduction',
      'know-what-your-life-system-optimizes',
      'build-life-dashboard-before-goals',
      'wrong-direction-creates-system-debt',
      'life-positioning-find-your-coordinates',
      'life-os-011-do-not-perfect-personality-operable-system'
    ],
    content: {
      zh: {
        eyebrow: '核心主题',
        title: '人生操作系统',
        summary: '把价值观、目标、能力、关系、健康、财富与复盘放进同一个长期系统，而不是只靠短期努力解决人生问题。',
        description:
          '郑勇关于人生操作系统的系统化主题页，整理 Life OS、系统思维、人生策略、长期主义、复盘与个人成长的核心文章和方法。',
        thesis:
          '人生操作系统不是一套口号，而是普通人在复杂环境里持续做选择、修正方向、积累能力和经营关系的底层框架。',
        keywords: ['人生操作系统', 'Life OS', '系统思维', '人生策略', '长期主义', '个人成长', '复盘'],
        tagLabels: ['人生操作系统', '操作系统', '系统思维', '人生策略', '人生复盘', '长期主义'],
        sections: [
          {
            heading: '先定义系统在优化什么',
            body: '很多人生焦虑不是因为不努力，而是系统默认优化了错误指标：短期反馈、他人评价、即时安全感，或者局部最优。',
            points: ['确认自己的价值排序', '区分目标、指标和手段', '避免把局部效率误认为长期进步']
          },
          {
            heading: '把人生问题看成资源配置',
            body: '时间、注意力、健康、关系和现金流都是有限资源。Life OS 的作用，是让这些资源围绕长期方向形成协同。',
            points: ['建立可复盘的个人仪表盘', '识别高杠杆行动', '给重大决策留下安全边际']
          },
          {
            heading: '用复盘让系统持续升级',
            body: '真正改变人的不是一次顿悟，而是持续记录、反馈、修正和形成新默认动作。',
            points: ['每周检查输入与输出', '沉淀可迁移的方法', '把失败转化为系统信息']
          }
        ],
        relatedLinks: [
          {label: '人生栏目', href: '/zh/life/', summary: '从价值、责任、关系、财富、健康等维度拆解人生长期系统。'},
          {label: '框架体系', href: '/zh/books/', summary: '查看 Life OS 相关书稿、知识架构和长期学习路线。'}
        ]
      },
      en: {
        eyebrow: 'Core topic',
        title: 'Life Operating System',
        summary:
          'A practical framework for aligning values, decisions, capabilities, relationships, health, wealth, and review loops.',
        description:
          "Yong Zheng's topic hub for Life OS, systems thinking, life strategy, long-termism, review, and personal growth.",
        thesis:
          'A Life Operating System is not a slogan. It is the underlying framework for making decisions, correcting direction, compounding capability, and building a life that can keep improving.',
        keywords: ['Life Operating System', 'Life OS', 'systems thinking', 'life strategy', 'long-termism', 'review'],
        tagLabels: ['Life OS', 'Operating System', 'Systems Thinking', 'Life Strategy', 'Life Review', 'Long-Termism'],
        sections: [
          {
            heading: 'Define what the system optimizes',
            body: 'Many life problems come from optimizing the wrong default: short-term feedback, external approval, or local efficiency.',
            points: ['Clarify value hierarchy', 'Separate goals, metrics, and tools', 'Avoid confusing local progress with long-term progress']
          },
          {
            heading: 'Treat life as resource allocation',
            body: 'Time, attention, health, relationships, and cash flow are scarce resources. Life OS helps them reinforce each other.',
            points: ['Build a personal dashboard', 'Find high-leverage actions', 'Keep margin of safety for major decisions']
          },
          {
            heading: 'Upgrade through review loops',
            body: 'People change through records, feedback, corrections, and new defaults more than through one-time insight.',
            points: ['Review input and output weekly', 'Extract reusable methods', 'Turn failure into system information']
          }
        ],
        relatedLinks: [
          {label: 'Life section', href: '/en/life/', summary: 'Explore values, responsibility, relationships, wealth, health, and growth.'},
          {label: 'Frameworks', href: '/en/books/', summary: 'Read the Life OS book architecture and long-term learning map.'}
        ]
      }
    }
  },
  {
    slug: 'first-principles',
    category: 'Methods and Judgment',
    relatedTags: [
      'First-Principles Thinking',
      'First Principles',
      'Systems Thinking',
      'Decision Making',
      'Independent Thinking',
      'Problem Decomposition'
    ],
    priorityArticleSlugs: [
      'first-principles-thinking',
      'doing-the-right-thing-fewer-mistakes',
      'first-principles-053-first-principles-not-method',
      'first-principles-058-before-finding-answers-ask-whether-question-valid',
      'first-principles-071-first-principles-systems-thinking',
      'first-principles-079-how-train-problem'
    ],
    content: {
      zh: {
        eyebrow: '思维方法',
        title: '第一性原理',
        summary: '回到事实、约束、机制和目标本身，重新拆解问题，而不是沿用流行答案和二手结论。',
        description:
          '郑勇关于第一性原理、独立思考、系统思维、问题拆解、决策判断和认知升级的主题页，帮助读者建立可迁移的思考方法。',
        thesis:
          '第一性原理不是显得高级的概念，而是在复杂问题里先把问题问对，再把事实、机制、约束和行动路径重新组织起来。',
        keywords: ['第一性原理', '独立思考', '系统思维', '问题拆解', '决策判断', '认知升级'],
        tagLabels: ['第一性原理', '第一性原理思维', '系统思维', '决策判断', '独立思考', '问题拆解'],
        sections: [
          {
            heading: '先问问题是否成立',
            body: '很多错误决策来自默认接受了别人给的问题。第一性原理的第一步，是检查问题本身的边界和前提。',
            points: ['区分事实、观点、立场和叙事', '识别被隐藏的假设', '重写问题定义']
          },
          {
            heading: '从机制而不是态度出发',
            body: '真正稳定的判断依赖机制理解：激励如何塑造行为，约束如何决定结果，反馈如何改变路径。',
            points: ['看结构而不是口号', '看约束而不是愿望', '看反馈而不是单点结果']
          },
          {
            heading: '把判断训练成日常能力',
            body: '第一性原理不是偶尔用一次的工具，而是长期训练问题定义、证据质量和行动验证的习惯。',
            points: ['拆解真实案例', '记录判断依据', '用结果校准模型']
          }
        ],
        relatedLinks: [
          {label: '方法与判断文章', href: '/zh/categories/methods-and-judgment/', summary: '阅读更多关于问题拆解、决策和判断训练的文章。'},
          {label: '标签：第一性原理', href: '/zh/tags/first-principles-thinking/', summary: '查看所有第一性原理相关内容。'}
        ]
      },
      en: {
        eyebrow: 'Thinking method',
        title: 'First-Principles Thinking',
        summary:
          'Return to facts, constraints, mechanisms, and goals before accepting popular answers or inherited conclusions.',
        description:
          "A topic hub for Yong Zheng's writing on first-principles thinking, independent thinking, systems thinking, problem decomposition, and judgment.",
        thesis:
          'First-principles thinking begins by asking whether the question itself is valid, then reorganizing facts, mechanisms, constraints, and action paths.',
        keywords: ['first-principles thinking', 'independent thinking', 'systems thinking', 'problem decomposition', 'decision making'],
        tagLabels: [
          'First-Principles Thinking',
          'First Principles',
          'Systems Thinking',
          'Decision Making',
          'Independent Thinking',
          'Problem Decomposition'
        ],
        sections: [
          {
            heading: 'Ask whether the question is valid',
            body: 'Many bad decisions come from accepting the wrong question. First-principles thinking starts with boundaries and assumptions.',
            points: ['Separate facts, opinions, positions, and narratives', 'Find hidden assumptions', 'Rewrite the problem definition']
          },
          {
            heading: 'Reason from mechanisms',
            body: 'Stable judgment comes from understanding mechanisms: incentives, constraints, feedback, and path dependence.',
            points: ['Look at structure instead of slogans', 'Look at constraints instead of wishes', 'Look at feedback instead of one result']
          },
          {
            heading: 'Train judgment in daily cases',
            body: 'The method becomes valuable when problem definition, evidence quality, and action verification become habits.',
            points: ['Decompose real cases', 'Record judgment grounds', 'Calibrate models with outcomes']
          }
        ],
        relatedLinks: [
          {label: 'Methods and judgment', href: '/en/categories/methods-and-judgment/', summary: 'Read more essays on problem decomposition and judgment.'},
          {label: 'First-principles tag', href: '/en/tags/first-principles-thinking/', summary: 'Browse all related first-principles content.'}
        ]
      }
    }
  },
  {
    slug: 'lifelong-learning',
    category: 'Learning and Growth',
    relatedTags: [
      'Lifelong Learning',
      'Learning Ability',
      'Knowledge Foundation',
      'Cognitive Compound Interest',
      'AI Learning',
      'Practice'
    ],
    priorityArticleSlugs: [
      'lifelong-learning-cognitive-compound-interest',
      'education-growth-256-lifelong-learning-not',
      'education-growth-298-ordinary-people-how-lifelong-learning-system',
      'education-growth-257-why-knowledge-foundation-matters-more-than-isolated-facts',
      'education-growth-270-learning-fails-when-there-input-without-processing',
      'education-growth-271-how-turn-reading-into-capability-not-collection'
    ],
    content: {
      zh: {
        eyebrow: '成长能力',
        title: '终身学习',
        summary: '把阅读、写作、实践、复盘和 AI 工具变成一个长期学习系统，让知识真正转化为能力。',
        description:
          '郑勇关于终身学习、学习能力、知识底座、认知复利、AI 学习和个人成长系统的主题页，整理高价值学习方法与相关文章。',
        thesis:
          '终身学习不是不断收藏资料，而是让输入、加工、输出、反馈和迁移形成闭环，长期改变一个人的判断和行动能力。',
        keywords: ['终身学习', '学习能力', '知识底座', '认知复利', 'AI 学习', '个人成长', '阅读方法'],
        tagLabels: ['终身学习', '学习能力', '知识底座', '认知复利', 'AI 学习', '实践'],
        sections: [
          {
            heading: '学习要形成闭环',
            body: '只有输入没有加工，知识会停留在熟悉感；只有收藏没有输出，能力不会发生迁移。',
            points: ['输入后做结构化笔记', '用写作完成二次加工', '把知识放到真实问题里验证']
          },
          {
            heading: '知识底座决定理解上限',
            body: 'AI 时代更需要基础学科、世界模型和跨学科常识，否则工具越强，误判也可能越快。',
            points: ['补齐基础概念', '建立知识地图', '用问题牵引学习顺序']
          },
          {
            heading: '让 AI 成为学习系统的一部分',
            body: 'AI 不是替代思考，而是帮助提问、对照、模拟、复盘和加速练习。',
            points: ['用 AI 生成练习题', '让 AI 反问你的假设', '把输出沉淀为个人知识库']
          }
        ],
        relatedLinks: [
          {label: '教育栏目', href: '/zh/education/', summary: '从家庭教育、知识底座和成长路径理解长期学习。'},
          {label: '标签：终身学习', href: '/zh/tags/lifelong-learning/', summary: '查看终身学习相关的全部文章。'}
        ]
      },
      en: {
        eyebrow: 'Growth capability',
        title: 'Lifelong Learning',
        summary:
          'Turn reading, writing, practice, review, and AI tools into a learning system that compounds into capability.',
        description:
          "A topic hub for Yong Zheng's writing on lifelong learning, learning ability, knowledge foundations, cognitive compounding, and AI-assisted learning.",
        thesis:
          'Lifelong learning is not collecting more material. It is a loop of input, processing, output, feedback, and transfer.',
        keywords: ['lifelong learning', 'learning ability', 'knowledge foundation', 'cognitive compounding', 'AI learning'],
        tagLabels: ['Lifelong Learning', 'Learning Ability', 'Knowledge Foundation', 'Cognitive Compound Interest', 'AI Learning', 'Practice'],
        sections: [
          {
            heading: 'Learning needs a loop',
            body: 'Input without processing creates familiarity, not capability. Collection without output rarely transfers into action.',
            points: ['Make structured notes after input', 'Use writing as processing', 'Test knowledge in real problems']
          },
          {
            heading: 'Foundations set the ceiling',
            body: 'In the AI era, foundations, world models, and interdisciplinary common sense matter more because tools amplify judgment.',
            points: ['Rebuild core concepts', 'Create a knowledge map', 'Let questions determine learning order']
          },
          {
            heading: 'Make AI part of the system',
            body: 'AI should help with questions, contrast, simulation, review, and deliberate practice rather than replace thinking.',
            points: ['Generate practice tasks', 'Ask AI to challenge assumptions', 'Convert outputs into a personal knowledge base']
          }
        ],
        relatedLinks: [
          {label: 'Education section', href: '/en/education/', summary: 'Study knowledge foundations, family education, and growth paths.'},
          {label: 'Lifelong learning tag', href: '/en/tags/lifelong-learning/', summary: 'Browse all related lifelong learning content.'}
        ]
      }
    }
  },
  {
    slug: 'company-culture',
    category: 'Company Research',
    relatedTags: ['Company Culture', 'Leadership', 'Organizational Learning', 'Management', 'Great Companies', 'Business Model'],
    priorityArticleSlugs: [
      'ai-technology-241-technology-company-why-system-competition',
      'career-139-why-some-companies-make-people-more-valuable-over-time',
      'career-131-why-higher-level-work-requires-understanding-people-organizations',
      'career-134-what-kind-young-people-deserve-long-term-cultivation',
      'career-142-where-strategic-sense-at-work-comes-from'
    ],
    content: {
      zh: {
        eyebrow: '组织研究',
        title: '企业文化',
        summary: '从产品、组织、激励、人才密度和长期战略理解企业文化，而不是只看墙上的价值观。',
        description:
          '郑勇关于企业文化、伟大公司、组织学习、领导力、管理思维和商业模式的主题页，连接公司研究与个人职业成长。',
        thesis:
          '企业文化不是宣传材料，而是一个组织在压力、资源约束和长期选择中反复表现出来的默认行为系统。',
        keywords: ['企业文化', '伟大公司', '组织学习', '领导力', '管理思维', '商业模式', '人才密度'],
        tagLabels: ['企业文化', '领导力', '组织学习', '管理', '伟大公司', '商业模式'],
        sections: [
          {
            heading: '文化要看默认行为',
            body: '真正的企业文化会体现在如何做决策、如何对待人才、如何处理冲突、如何面对长期投入。',
            points: ['看激励机制', '看人才筛选和培养', '看困难时期的选择']
          },
          {
            heading: '产品和商业模式会塑造文化',
            body: '一家公司卖什么、怎么赚钱、客户是谁，会反过来塑造组织能力和文化气质。',
            points: ['分析收入结构', '理解客户约束', '观察组织能力如何沉淀']
          },
          {
            heading: '把公司研究迁移到个人成长',
            body: '研究伟大公司不是为了崇拜，而是学习战略、组织、产品、长期投入和复利机制。',
            points: ['学习高手如何定义问题', '理解平台与生态', '把组织方法迁移到个人系统']
          }
        ],
        relatedLinks: [
          {label: '公司专题', href: '/zh/companies/', summary: '系统研究 Apple、Tesla、Nvidia、OpenAI 等公司的产品、文化与壁垒。'},
          {label: '人物专题', href: '/zh/people/', summary: '从关键人物理解公司文化背后的长期判断。'}
        ]
      },
      en: {
        eyebrow: 'Organization study',
        title: 'Company Culture',
        summary:
          'Understand culture through products, incentives, talent density, organizational learning, and long-term strategy.',
        description:
          "A topic hub for Yong Zheng's writing on company culture, great companies, organizational learning, leadership, management, and business models.",
        thesis:
          'Company culture is the default behavior system an organization reveals under pressure, constraints, trade-offs, and long-term choices.',
        keywords: ['company culture', 'great companies', 'organizational learning', 'leadership', 'management', 'business model'],
        tagLabels: ['Company Culture', 'Leadership', 'Organizational Learning', 'Management', 'Great Companies', 'Business Model'],
        sections: [
          {
            heading: 'Culture is default behavior',
            body: 'Real culture shows up in decisions, talent treatment, conflict handling, and long-term resource commitments.',
            points: ['Look at incentives', 'Look at talent selection and development', 'Look at choices under pressure']
          },
          {
            heading: 'Products and business models shape culture',
            body: 'What a company sells, how it makes money, and who it serves shape its capabilities and culture.',
            points: ['Analyze revenue structure', 'Understand customer constraints', 'Observe how capabilities compound']
          },
          {
            heading: 'Transfer company study into personal growth',
            body: 'Studying great companies is a way to learn strategy, organization, products, long-term investment, and compounding.',
            points: ['Learn how experts define problems', 'Understand platforms and ecosystems', 'Transfer organizational methods into personal systems']
          }
        ],
        relatedLinks: [
          {label: 'Company studies', href: '/en/companies/', summary: 'Study the products, cultures, and moats of Apple, Tesla, Nvidia, OpenAI, and more.'},
          {label: 'People studies', href: '/en/people/', summary: 'Understand the long-term judgment behind company cultures through key people.'}
        ]
      }
    }
  },
  {
    slug: 'family-education',
    category: 'Education',
    relatedTags: [
      'Family Education',
      'Parent-Child Relationship',
      'Parent-Child Communication',
      'Education Philosophy',
      'Family',
      'Knowledge Foundation'
    ],
    priorityArticleSlugs: [
      'education-growth-282-why-family-education',
      'education-growth-281-family-education-most-system-what',
      'education-growth-254-family-children-most-life-operating-system',
      'education-growth-268-how-family-education',
      'education-growth-295-why-parents-need-manage-their-own-anxiety',
      'education-growth-277-how-parents-can-help-children-build-knowledge-map'
    ],
    content: {
      zh: {
        eyebrow: '教育成长',
        title: '家庭教育',
        summary: '把亲子关系、学习系统、现实感、情绪管理和长期能力培养放在一起看，而不是只盯成绩。',
        description:
          '郑勇关于家庭教育、亲子关系、亲子沟通、教育理念、知识底座和孩子长期成长的主题页，帮助家长建立更系统的教育视角。',
        thesis:
          '家庭教育的核心不是控制孩子，而是帮助孩子在安全、真实、有反馈的环境里逐步建立自己的学习系统和人生操作系统。',
        keywords: ['家庭教育', '亲子关系', '亲子沟通', '教育理念', '孩子成长', '知识底座', '学习系统'],
        tagLabels: ['家庭教育', '亲子关系', '亲子沟通', '教育理念', '家庭', '知识底座'],
        sections: [
          {
            heading: '父母先管理自己的焦虑',
            body: '很多教育问题表面是孩子的问题，底层是父母把短期竞争、同伴比较和不确定性焦虑转移给孩子。',
            points: ['区分孩子需求和父母焦虑', '减少无效比较', '给成长留出时间尺度']
          },
          {
            heading: '学习能力比短期排名更重要',
            body: '长期看，孩子真正需要的是知识底座、表达能力、问题意识、现实感和持续学习的能力。',
            points: ['帮助孩子建立知识地图', '把阅读变成能力', '通过项目和实践获得反馈']
          },
          {
            heading: '家庭是孩子的第一个操作系统',
            body: '孩子会从家庭里学习如何沟通、如何面对失败、如何处理关系、如何理解责任和自由。',
            points: ['创造稳定的沟通环境', '让规则和爱同时存在', '把问题变成共同复盘']
          }
        ],
        relatedLinks: [
          {label: '教育栏目', href: '/zh/education/', summary: '系统阅读家庭教育、学习能力和孩子成长路径。'},
          {label: '标签：家庭教育', href: '/zh/tags/family-education/', summary: '查看家庭教育相关的全部文章。'}
        ]
      },
      en: {
        eyebrow: 'Education and growth',
        title: 'Family Education',
        summary:
          'Connect parent-child relationships, learning systems, reality sense, emotion, and long-term capability beyond grades.',
        description:
          "A topic hub for Yong Zheng's writing on family education, parent-child relationships, communication, education philosophy, and children's long-term growth.",
        thesis:
          'Family education is not controlling children. It is helping them build their own learning system and Life OS in a safe, realistic, feedback-rich environment.',
        keywords: ['family education', 'parent-child relationship', 'parent-child communication', 'education philosophy', 'children growth'],
        tagLabels: ['Family Education', 'Parent-Child Relationship', 'Parent-Child Communication', 'Education Philosophy', 'Family', 'Knowledge Foundation'],
        sections: [
          {
            heading: 'Parents need to manage anxiety first',
            body: 'Many education problems start when short-term competition, comparison, and uncertainty anxiety are transferred to children.',
            points: ['Separate children needs from parent anxiety', 'Reduce useless comparison', 'Give growth a longer time horizon']
          },
          {
            heading: 'Learning ability matters more than short-term ranking',
            body: 'Children need knowledge foundations, expression, problem awareness, reality sense, and the ability to keep learning.',
            points: ['Help children build knowledge maps', 'Turn reading into capability', 'Use projects and practice for feedback']
          },
          {
            heading: 'Family is the first operating system',
            body: 'Children learn communication, failure handling, relationships, responsibility, and freedom first from family defaults.',
            points: ['Create stable communication', 'Let rules and love coexist', 'Turn problems into shared review']
          }
        ],
        relatedLinks: [
          {label: 'Education section', href: '/en/education/', summary: 'Read more on family education, learning ability, and growth paths.'},
          {label: 'Family education tag', href: '/en/tags/family-education/', summary: 'Browse all family education articles.'}
        ]
      }
    }
  }
];

export function getSeoTopic(slug: string) {
  return seoTopics.find((topic) => topic.slug === slug) ?? null;
}

export function getSeoTopicContent(topic: SeoTopic, locale: Locale) {
  return topic.content[locale];
}

export function getSeoTopicHref(topic: SeoTopic, locale: Locale) {
  return `/${locale}/topics/${topic.slug}/`;
}

export function getRelatedSeoTopics(topic: SeoTopic) {
  return seoTopics.filter((candidate) => candidate.slug !== topic.slug);
}

function scoreArticle(topic: SeoTopic, article: ArticleMeta) {
  const sharedTags = article.tags.filter((tag) => topic.relatedTags.includes(tag)).length;
  const sameCategory = article.category === topic.category ? 2 : 0;
  const slugScore = topic.relatedTags.some((tag) => article.slug.includes(slugify(tag))) ? 1 : 0;
  return sharedTags * 3 + sameCategory + slugScore;
}

export function getSeoTopicArticles(topic: SeoTopic, locale: Locale, limit = 6) {
  const articles = getArticles(locale);
  const bySlug = new Map(articles.map((article) => [article.slug, article]));
  const priority = topic.priorityArticleSlugs
    .map((slug) => bySlug.get(slug))
    .filter((article): article is ArticleMeta => Boolean(article));
  const prioritySlugs = new Set(priority.map((article) => article.slug));

  const scored = articles
    .filter((article) => !prioritySlugs.has(article.slug))
    .map((article) => ({article, score: scoreArticle(topic, article)}))
    .filter((item) => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return new Date(b.article.date).getTime() - new Date(a.article.date).getTime();
    })
    .map((item) => item.article);

  return [...priority, ...scored].slice(0, limit);
}
