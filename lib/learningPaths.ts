import type {Locale} from '@/lib/i18n';
import {getCategoryHref, getCategoryLabel, getTagHref, getTagLabel} from '@/lib/taxonomy';

type LocalizedText = {
  zh: string;
  en: string;
};

type LearningPathSeed = {
  summary: LocalizedText;
  steps: LocalizedText[];
  tags: string[];
  destinations: Array<{
    href: (locale: Locale) => string;
    label: LocalizedText;
    description: LocalizedText;
  }>;
  exercises: LocalizedText[];
};

const defaultPath: LearningPathSeed = {
  summary: {
    zh: '先建立基本框架，再进入具体文章、标签和专题案例，避免在大量内容里随机浏览。',
    en: 'Start with a basic frame, then move into articles, tags, and topic cases without browsing randomly.'
  },
  steps: [
    {zh: '先读本分类下的核心文章，抓住基本概念。', en: 'Read the core articles in this category first.'},
    {zh: '再查看相关专题，理解人物、公司或书稿里的真实案例。', en: 'Then study related topics for real cases.'},
    {zh: '最后选一个标签继续深挖，形成自己的问题清单。', en: 'Finally pick one tag and build your own question list.'}
  ],
  tags: ['Life OS', 'Systems Thinking', 'Decision Making'],
  destinations: [
    {
      href: (locale) => `/${locale}/articles/`,
      label: {zh: '全部文章', en: 'All Articles'},
      description: {zh: '从完整文章进入系统阅读。', en: 'Read the full essay archive.'}
    },
    {
      href: (locale) => `/${locale}/books/`,
      label: {zh: '框架体系', en: 'Framework System'},
      description: {zh: '回到 Life OS 的总体框架。', en: 'Return to the Life OS framework map.'}
    }
  ],
  exercises: [
    {zh: '写下你进入这个分类最想解决的一个问题。', en: 'Write the one problem you want this category to help solve.'},
    {zh: '选 3 个标签，分别对应一个真实场景。', en: 'Choose three tags and map each to a real situation.'},
    {zh: '读完后记录一个可以在 7 天内验证的小行动。', en: 'Record one small action to test within seven days.'}
  ]
};

const categoryPaths: Record<string, LearningPathSeed> = {
  'Life OS': {
    summary: {
      zh: '把人生当成长期系统工程来读：先看价值与责任，再看认知、方法和行动闭环。',
      en: 'Read life as a long-term systems project: values, responsibility, cognition, methods, and action loops.'
    },
    steps: [
      {zh: '先理解 Life OS 的总论和人生定位。', en: 'Start with the Life OS thesis and life positioning.'},
      {zh: '再进入系统思维、第一性原理和问题拆解。', en: 'Move into systems thinking, first principles, and problem decomposition.'},
      {zh: '最后用复盘和练习把框架落到自己的选择里。', en: 'Use review and practice to apply the frame to your own choices.'}
    ],
    tags: ['Life OS', 'Life Positioning', 'Systems Thinking', 'First-Principles Thinking', 'Review'],
    destinations: [
      {
        href: (locale) => `/${locale}/books/recommendations/life-operating-system/`,
        label: {zh: '人生操作系统书稿', en: 'Life OS Book'},
        description: {zh: '从书稿结构看完整系统。', en: 'See the complete system through the book structure.'}
      },
      {
        href: (locale) => `/${locale}/life/`,
        label: {zh: '人生模块', en: 'Life Module'},
        description: {zh: '把框架转入关系、健康、财富和成长。', en: 'Apply the frame to relationships, health, wealth, and growth.'}
      }
    ],
    exercises: [
      {zh: '画出你当前的人生系统：目标、约束、资源、习惯和反馈。', en: 'Map your current life system: goals, constraints, resources, habits, and feedback.'},
      {zh: '找出一个长期反复出现的问题，判断它属于哪个系统环节。', en: 'Find one recurring problem and identify the system layer behind it.'},
      {zh: '设计一个 7 天小实验，验证一个改动是否有效。', en: 'Design a seven-day experiment to test one change.'}
    ]
  },
  'Methods and Judgment': {
    summary: {
      zh: '这个分类训练的是判断力：把问题看清、拆开、排序，并转成行动。',
      en: 'This category trains judgment: see the problem, decompose it, prioritize it, and act.'
    },
    steps: [
      {zh: '先区分事实、假设、情绪和立场。', en: 'Separate facts, assumptions, emotion, and position.'},
      {zh: '再用第一性原理和问题拆解找到关键约束。', en: 'Use first principles and decomposition to find key constraints.'},
      {zh: '最后形成行动抓手和复盘标准。', en: 'Turn judgment into actions and review criteria.'}
    ],
    tags: ['First-Principles Thinking', 'Problem Decomposition', 'Decision Making', 'Analysis', 'Judgment'],
    destinations: [
      {
        href: (locale) => `/${locale}/books/recommendations/breakthrough-methods/`,
        label: {zh: '破局方法书稿', en: 'Breakthrough Methods'},
        description: {zh: '围绕分析、判断和行动建立方法体系。', en: 'Build a system for analysis, judgment, and action.'}
      },
      {
        href: (locale) => `/${locale}/people/`,
        label: {zh: '人物专题', en: 'People Studies'},
        description: {zh: '从高手选择里观察判断力。', en: 'Observe judgment through exceptional people.'}
      }
    ],
    exercises: [
      {zh: '选一个近期难题，写出事实、假设、约束、目标。', en: 'Pick one hard problem and list facts, assumptions, constraints, and goals.'},
      {zh: '写出 3 个可选方案和各自的最大风险。', en: 'Write three options and the biggest risk for each.'},
      {zh: '定义一个复盘标准：怎样算这次判断更好？', en: 'Define a review standard for better judgment.'}
    ]
  },
  'Learning and Growth': {
    summary: {
      zh: '把学习从随机输入变成能力复利：输入、理解、输出、反馈和迁移。',
      en: 'Turn learning from random input into capability compounding: input, understanding, output, feedback, and transfer.'
    },
    steps: [
      {zh: '先建立长期学习和认知复利的观念。', en: 'Start with lifelong learning and cognitive compounding.'},
      {zh: '再设计自己的输入、输出和反馈系统。', en: 'Design your input, output, and feedback system.'},
      {zh: '最后用项目或作品验证能力增长。', en: 'Validate growth through projects or artifacts.'}
    ],
    tags: ['Lifelong Learning', 'Knowledge Foundation', 'Cognitive Compound Interest', 'Feedback', 'Practice'],
    destinations: [
      {
        href: (locale) => `/${locale}/education/`,
        label: {zh: '教育模块', en: 'Education Module'},
        description: {zh: '从教育视角理解能力形成。', en: 'Understand capability formation through education.'}
      },
      {
        href: (locale) => `/${locale}/books/recommendations/knowledge-foundation/`,
        label: {zh: '知识底座书稿', en: 'Knowledge Foundation'},
        description: {zh: '补齐学科结构和通识底座。', en: 'Build disciplinary structure and broad literacy.'}
      }
    ],
    exercises: [
      {zh: '列出你正在学习的 3 件事，判断哪一件能形成复利。', en: 'List three things you are learning and identify which can compound.'},
      {zh: '为一个能力设计输入、输出、反馈三件套。', en: 'Design input, output, and feedback for one capability.'},
      {zh: '用一个作品或项目检验本周学习成果。', en: 'Use one artifact or project to test this week’s learning.'}
    ]
  },
  Career: {
    summary: {
      zh: '职业不是简历堆叠，而是能力、平台、现金流、作品和长期选择的组合。',
      en: 'Career is not resume accumulation; it combines capability, platform, cash flow, artifacts, and long-term choices.'
    },
    steps: [
      {zh: '先判断自己的阶段：起步、深化、跃迁还是转型。', en: 'Identify your stage: entry, deepening, transition, or leverage.'},
      {zh: '再看能力、平台和现金流之间的关系。', en: 'Study the relationship between capability, platform, and cash flow.'},
      {zh: '最后把职业选择放进长期人生系统里。', en: 'Place career choices inside the long-term life system.'}
    ],
    tags: ['Career Development', 'Career Planning', 'Professional Capability', 'Skill Development', 'High-Value Roles'],
    destinations: [
      {
        href: (locale) => `/${locale}/career/`,
        label: {zh: '职场模块', en: 'Career Module'},
        description: {zh: '系统梳理职业成长、选择和复盘。', en: 'Study career growth, choices, and reviews systematically.'}
      },
      {
        href: (locale) => `/${locale}/people/`,
        label: {zh: '人物专题', en: 'People Studies'},
        description: {zh: '从长期职业路径看选择质量。', en: 'Study choice quality through long-term career paths.'}
      }
    ],
    exercises: [
      {zh: '写下你当前职业阶段的主要瓶颈。', en: 'Write the main bottleneck in your current career stage.'},
      {zh: '列出一个可以提升现金流或能力密度的小行动。', en: 'List one action that can improve cash flow or capability density.'},
      {zh: '复盘最近一次职业选择：它优化了短期还是长期？', en: 'Review one recent career choice: did it optimize the short term or long term?'}
    ]
  },
  Education: {
    summary: {
      zh: '教育的核心不是灌输知识，而是形成能力结构、好奇心、判断力和长期学习系统。',
      en: 'Education is not information delivery; it forms capability, curiosity, judgment, and lifelong learning systems.'
    },
    steps: [
      {zh: '先理解教育目标：清醒、自由、负责和有创造力。', en: 'Start with the goal: clarity, freedom, responsibility, and creativity.'},
      {zh: '再看不同阶段的能力重点。', en: 'Study capability priorities across stages.'},
      {zh: '最后把教育落到家庭、学校和项目实践。', en: 'Apply education through family, school, and projects.'}
    ],
    tags: ['Education Philosophy', 'Personalized Learning', 'Project-Based Learning', 'Family Education', 'Curriculum'],
    destinations: [
      {
        href: (locale) => `/${locale}/education/`,
        label: {zh: '教育模块', en: 'Education Module'},
        description: {zh: '围绕理念、实践和案例展开。', en: 'Explore philosophy, practice, and cases.'}
      },
      {
        href: (locale) => `/${locale}/categories/learning-and-growth/`,
        label: {zh: '学习与成长', en: 'Learning and Growth'},
        description: {zh: '连接个人学习和长期成长。', en: 'Connect education with personal growth.'}
      }
    ],
    exercises: [
      {zh: '写下你认为教育最应该保护的一种能力。', en: 'Write one capability education should protect most.'},
      {zh: '为一个孩子或学习者设计一个小项目。', en: 'Design one small project for a learner.'},
      {zh: '复盘一次学习失败，判断是目标、方法还是反馈出了问题。', en: 'Review one learning failure and locate the issue: goal, method, or feedback.'}
    ]
  },
  'AI and Technology': {
    summary: {
      zh: 'AI 与技术部分重点看趋势、工具、平台、生态和普通人如何迁移能力。',
      en: 'AI and technology focuses on trends, tools, platforms, ecosystems, and how people transfer capability.'
    },
    steps: [
      {zh: '先理解技术趋势和平台变化。', en: 'Start with technology trends and platform shifts.'},
      {zh: '再看工具如何改变学习、工作和创造。', en: 'Study how tools change learning, work, and creation.'},
      {zh: '最后用具体项目训练 AI 协作能力。', en: 'Use projects to train AI collaboration.'}
    ],
    tags: ['AI', 'AI Tools', 'AI Learning', 'Technology Trend', 'Developer Ecosystem'],
    destinations: [
      {
        href: (locale) => `/${locale}/companies/openai/`,
        label: {zh: 'OpenAI 公司专题', en: 'OpenAI Study'},
        description: {zh: '从模型公司理解 AI 平台。', en: 'Understand AI platforms through a model company.'}
      },
      {
        href: (locale) => `/${locale}/books/recommendations/productivity-tools/`,
        label: {zh: '效率兵器书稿', en: 'Productivity Tools'},
        description: {zh: '把 AI 工具纳入个人生产系统。', en: 'Place AI tools inside personal production systems.'}
      }
    ],
    exercises: [
      {zh: '选一个重复任务，设计一个 AI 辅助流程。', en: 'Pick one repeated task and design an AI-assisted workflow.'},
      {zh: '写下 AI 能帮你做什么，不能替你判断什么。', en: 'Write what AI can help with and what it cannot judge for you.'},
      {zh: '用一个小作品验证工具是否真的提升输出质量。', en: 'Use one small artifact to test whether the tool improves output quality.'}
    ]
  }
};

export function getCategoryLearningPath(category: string, locale: Locale) {
  const seed = categoryPaths[category] ?? defaultPath;
  return {
    title: locale === 'zh' ? `${getCategoryLabel(category, locale)}学习路径` : `${getCategoryLabel(category, locale)} Learning Path`,
    summary: seed.summary[locale],
    stepsTitle: locale === 'zh' ? '推荐顺序' : 'Suggested Order',
    linksTitle: locale === 'zh' ? '继续阅读' : 'Continue Reading',
    practiceTitle: locale === 'zh' ? '静态练习' : 'Static Practice',
    steps: seed.steps.map((step) => step[locale]),
    links: [
      ...seed.destinations.map((destination) => ({
        href: destination.href(locale),
        label: destination.label[locale],
        description: destination.description[locale]
      })),
      ...seed.tags.map((tag) => ({
        href: getTagHref(tag, locale),
        label: getTagLabel(tag, locale),
        description:
          locale === 'zh'
            ? `围绕「${getTagLabel(tag, locale)}」继续查看文章和专题。`
            : `Continue through articles and topics related to ${getTagLabel(tag, locale)}.`
      }))
    ].slice(0, 6),
    exercises: seed.exercises.map((exercise) => exercise[locale])
  };
}

export function getTagLearningPath(tag: string, locale: Locale) {
  const label = getTagLabel(tag, locale);
  return {
    title: locale === 'zh' ? `${label}专题路径` : `${label} Topic Path`,
    summary:
      locale === 'zh'
        ? '先理解这个标签的含义，再通过文章、专题和相邻标签形成一个小型知识网络。'
        : 'Understand the meaning of this tag, then connect articles, topics, and neighboring tags into a small knowledge network.',
    stepsTitle: locale === 'zh' ? '怎么读' : 'How to Read',
    linksTitle: locale === 'zh' ? '站内跳转' : 'Site Links',
    practiceTitle: locale === 'zh' ? '静态练习' : 'Static Practice',
    steps: [
      locale === 'zh' ? `先读本页的文章，找到「${label}」出现的真实语境。` : `Read the articles on this page and notice where ${label} appears in real context.`,
      locale === 'zh' ? '再看相关专题，观察人物、公司或书稿中的具体案例。' : 'Then study related topics for concrete person, company, or book cases.',
      locale === 'zh' ? '最后选择一个相邻标签继续深挖，避免只停留在单点概念。' : 'Finally choose a neighboring tag to avoid staying with a single concept.'
    ],
    links: [
      {
        href: `/${locale}/tags/`,
        label: locale === 'zh' ? '全部标签' : 'All Tags',
        description: locale === 'zh' ? '回到完整标签目录，寻找相邻概念。' : 'Return to the full tag directory and find adjacent concepts.'
      },
      {
        href: `/${locale}/articles/`,
        label: locale === 'zh' ? '全部文章' : 'All Articles',
        description: locale === 'zh' ? '从文章列表继续系统阅读。' : 'Continue systematic reading from the article archive.'
      },
      {
        href: `/${locale}/books/`,
        label: locale === 'zh' ? '框架体系' : 'Framework System',
        description: locale === 'zh' ? '把标签放回 Life OS 总体框架里。' : 'Place the tag back into the Life OS framework.'
      }
    ],
    exercises: [
      locale === 'zh' ? `用一句话写下你对「${label}」的定义。` : `Write your one-sentence definition of ${label}.`,
      locale === 'zh' ? '找一个自己的真实问题，判断它和这个标签有什么关系。' : 'Pick one real problem and explain how it relates to this tag.',
      locale === 'zh' ? '写下下次遇到类似问题时要检查的 3 个点。' : 'Write three checks to use next time a similar problem appears.'
    ]
  };
}
