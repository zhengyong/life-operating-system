import type {Locale} from '@/lib/i18n';

export type LocalizedText = Record<Locale, string>;

export type TaggedEducationItem = {
  title: LocalizedText;
  summary: LocalizedText;
  category: LocalizedText;
  tags: LocalizedText[];
};

export type EducationStage = {
  age: string;
  title: LocalizedText;
  goal: LocalizedText;
  abilities: LocalizedText[];
  methods: LocalizedText[];
  books: LocalizedText[];
  cases: LocalizedText[];
};

export type EducationResource = {
  type: LocalizedText;
  summary: LocalizedText;
  items: LocalizedText[];
};

export function et(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export const educationContent = {
  hero: {
    title: {
      zh: 'Education 教育',
      en: 'Education'
    },
    subtitle: {
      zh: '教育的本质不是知识传递，而是培养持续学习、独立思考和终身成长能力。',
      en: 'Education is not primarily the transfer of knowledge. It is the cultivation of lifelong learning, independent thinking, and long-term growth.'
    },
    thesis: {
      zh: '把教育看作一个可迭代的成长系统：孩子、家庭、学校、工具和社会环境共同形成反馈回路。',
      en: 'See education as an iterative growth system where the learner, family, school, tools, and social environment form a feedback loop.'
    },
    categories: [
      {
        zh: '学习与成长',
        en: 'Learning and Growth'
      },
      {
        zh: '人生操作系统',
        en: 'Life OS'
      },
      {
        zh: '教育',
        en: 'Education'
      }
    ],
    tags: [
      {
        zh: '终身学习',
        en: 'Lifelong Learning'
      },
      {
        zh: '独立思考',
        en: 'Independent Thinking'
      },
      {
        zh: '因材施教',
        en: 'Personalized Education'
      },
      {
        zh: 'AI 学习',
        en: 'AI Learning'
      }
    ]
  },
  sections: {
    philosophy: {
      zh: '教育哲学',
      en: 'Education Philosophy'
    },
    framework: {
      zh: '学习成长框架',
      en: 'Learning Framework'
    },
    stages: {
      zh: '教育阶段',
      en: 'Education Stages'
    },
    practice: {
      zh: '教育实践',
      en: 'Education Practice'
    },
    cases: {
      zh: '教育案例库',
      en: 'Education Case Studies'
    },
    resources: {
      zh: '教育资源',
      en: 'Resources'
    }
  },
  sectionIntros: {
    philosophy: {
      zh: '从目的、能力和环境理解教育，而不是只看分数、证书或短期竞争。',
      en: 'Understand education through purpose, capability, and environment, not only scores, credentials, or short-term competition.'
    },
    framework: {
      zh: '把 Life Operating System 映射到学习过程，让每一次学习都有输入、理解、选择、行动、反馈和升级。',
      en: 'Map Life OS onto learning so every cycle has input, understanding, choice, action, feedback, and upgrade.'
    },
    stages: {
      zh: '不同年龄阶段的重点不同，但底层目标一致：保护好奇心，训练能力，形成自我驱动。',
      en: 'Each age has a different emphasis, but the core goal is consistent: protect curiosity, train capability, and build self-direction.'
    },
    practice: {
      zh: '教育实践用于沉淀真实观察、家庭案例、项目制学习和 AI 学习方法。',
      en: 'Education practice collects field observations, family cases, project-based learning, and AI-assisted learning methods.'
    },
    cases: {
      zh: '通过人物、学校和企业案例，观察教育系统如何塑造能力、文化和长期结果。',
      en: 'Use people, school, and company cases to study how education systems shape capability, culture, and long-term outcomes.'
    },
    resources: {
      zh: '教育资源作为框架体系的一部分，长期整理可复用的书单、课程、工具和网站。',
      en: 'Education resources live inside the framework system as reusable booklists, courses, tools, and websites.'
    }
  },
  philosophy: [
    {
      title: {
        zh: '教育的本质',
        en: 'The Nature of Education'
      },
      summary: {
        zh: '教育不是把答案灌输给学生，而是帮助学习者形成理解世界、提出问题、持续成长的能力。',
        en: 'Education is not pouring answers into students. It helps learners understand the world, ask better questions, and keep growing.'
      },
      category: {
        zh: '教育哲学',
        en: 'Education Philosophy'
      },
      tags: [
        {
          zh: '本质',
          en: 'Essence'
        },
        {
          zh: '成长',
          en: 'Growth'
        }
      ]
    },
    {
      title: {
        zh: '什么是好的教育',
        en: 'What Good Education Means'
      },
      summary: {
        zh: '好的教育让人更清醒、更自由、更有责任感，也更有能力创造真实价值。',
        en: 'Good education makes people clearer, freer, more responsible, and more capable of creating real value.'
      },
      category: {
        zh: '教育哲学',
        en: 'Education Philosophy'
      },
      tags: [
        {
          zh: '价值',
          en: 'Value'
        },
        {
          zh: '责任',
          en: 'Responsibility'
        }
      ]
    },
    {
      title: {
        zh: '智商、环境与成长',
        en: 'IQ, Environment, and Growth'
      },
      summary: {
        zh: '天赋影响起点，环境影响路径，长期反馈和训练决定能力能否持续放大。',
        en: 'Talent affects the starting point, environment shapes the path, and long-term feedback determines whether capability compounds.'
      },
      category: {
        zh: '成长模型',
        en: 'Growth Model'
      },
      tags: [
        {
          zh: '环境',
          en: 'Environment'
        },
        {
          zh: '复利',
          en: 'Compounding'
        }
      ]
    },
    {
      title: {
        zh: '因材施教',
        en: 'Personalized Education'
      },
      summary: {
        zh: '识别兴趣、节奏、优势和短板，用不同路径达成共同的底层能力目标。',
        en: 'Recognize interest, pace, strengths, and gaps, then use different paths toward shared foundational capabilities.'
      },
      category: {
        zh: '教育方法',
        en: 'Education Method'
      },
      tags: [
        {
          zh: '个体差异',
          en: 'Individual Difference'
        },
        {
          zh: '路径设计',
          en: 'Path Design'
        }
      ]
    },
    {
      title: {
        zh: '好奇心与创造力',
        en: 'Curiosity and Creativity'
      },
      summary: {
        zh: '好奇心提供学习燃料，创造力让知识从记忆变成作品、实验和解决方案。',
        en: 'Curiosity fuels learning. Creativity turns knowledge from memory into work, experiments, and solutions.'
      },
      category: {
        zh: '核心能力',
        en: 'Core Capability'
      },
      tags: [
        {
          zh: '好奇心',
          en: 'Curiosity'
        },
        {
          zh: '创造力',
          en: 'Creativity'
        }
      ]
    },
    {
      title: {
        zh: '终身学习',
        en: 'Lifelong Learning'
      },
      summary: {
        zh: '真正的教育不在毕业时结束，而是在生活、工作和社会变化中不断升级认知系统。',
        en: 'Real education does not end at graduation. It keeps upgrading the cognitive system through life, work, and social change.'
      },
      category: {
        zh: '长期成长',
        en: 'Long-Term Growth'
      },
      tags: [
        {
          zh: '终身学习',
          en: 'Lifelong Learning'
        },
        {
          zh: '迭代',
          en: 'Iteration'
        }
      ]
    }
  ] satisfies TaggedEducationItem[],
  framework: [
    {
      key: 'perception',
      title: {
        zh: '感知',
        en: 'Perception'
      },
      summary: {
        zh: '观察现实、兴趣、问题和环境，收集高质量输入。',
        en: 'Observe reality, interest, problems, and environment; collect high-quality input.'
      }
    },
    {
      key: 'cognition',
      title: {
        zh: '认知',
        en: 'Cognition'
      },
      summary: {
        zh: '建立概念、模型和因果理解，把信息变成结构。',
        en: 'Build concepts, models, and causal understanding; turn information into structure.'
      }
    },
    {
      key: 'decision',
      title: {
        zh: '决策',
        en: 'Decision'
      },
      summary: {
        zh: '选择目标、路径和资源，明确优先级与约束。',
        en: 'Choose goals, paths, and resources; clarify priorities and constraints.'
      }
    },
    {
      key: 'execution',
      title: {
        zh: '执行',
        en: 'Execution'
      },
      summary: {
        zh: '通过阅读、练习、项目、表达和协作完成真实行动。',
        en: 'Act through reading, practice, projects, expression, and collaboration.'
      }
    },
    {
      key: 'feedback',
      title: {
        zh: '反馈',
        en: 'Feedback'
      },
      summary: {
        zh: '用结果、作品、讨论和测试校准理解与方法。',
        en: 'Calibrate understanding and method through results, work, discussion, and tests.'
      }
    },
    {
      key: 'evolution',
      title: {
        zh: '迭代',
        en: 'Evolution'
      },
      summary: {
        zh: '沉淀模型、调整系统，把一次学习升级为长期能力。',
        en: 'Distill models, adjust the system, and convert one learning cycle into long-term capability.'
      }
    }
  ],
  capabilities: [
    {
      title: {
        zh: '学习能力',
        en: 'Learning'
      },
      summary: {
        zh: '提问、检索、阅读、记忆、迁移。',
        en: 'Questioning, searching, reading, memory, and transfer.'
      }
    },
    {
      title: {
        zh: '思考能力',
        en: 'Thinking'
      },
      summary: {
        zh: '概念、逻辑、模型、判断、反思。',
        en: 'Concepts, logic, models, judgment, and reflection.'
      }
    },
    {
      title: {
        zh: '创造能力',
        en: 'Creation'
      },
      summary: {
        zh: '写作、项目、实验、表达、作品。',
        en: 'Writing, projects, experiments, expression, and artifacts.'
      }
    },
    {
      title: {
        zh: '自我管理',
        en: 'Self-Management'
      },
      summary: {
        zh: '目标、习惯、情绪、时间、反馈。',
        en: 'Goals, habits, emotions, time, and feedback.'
      }
    }
  ],
  stages: [
    {
      age: '0-6',
      title: {
        zh: '幼儿园',
        en: 'Kindergarten'
      },
      goal: {
        zh: '保护安全感、好奇心和语言表达，建立基本生活习惯。',
        en: 'Protect security, curiosity, and language expression while forming basic habits.'
      },
      abilities: [
        {
          zh: '感官探索',
          en: 'Sensory exploration'
        },
        {
          zh: '语言表达',
          en: 'Language expression'
        },
        {
          zh: '情绪识别',
          en: 'Emotion recognition'
        }
      ],
      methods: [
        {
          zh: '亲子阅读',
          en: 'Shared reading'
        },
        {
          zh: '自然观察',
          en: 'Nature observation'
        },
        {
          zh: '游戏化学习',
          en: 'Play-based learning'
        }
      ],
      books: [
        {
          zh: '绘本、自然百科、童诗',
          en: 'Picture books, nature encyclopedias, children poetry'
        }
      ],
      cases: [
        {
          zh: '用一周时间观察一种植物，从画画、提问到讲述变化。',
          en: 'Observe one plant for a week, then draw, ask questions, and explain changes.'
        }
      ]
    },
    {
      age: '6-12',
      title: {
        zh: '小学',
        en: 'Primary School'
      },
      goal: {
        zh: '建立阅读、数学、表达和习惯系统，开始形成学习自信。',
        en: 'Build reading, math, expression, and habit systems; begin forming learning confidence.'
      },
      abilities: [
        {
          zh: '基础阅读',
          en: 'Foundational reading'
        },
        {
          zh: '数理直觉',
          en: 'Mathematical intuition'
        },
        {
          zh: '清楚表达',
          en: 'Clear expression'
        }
      ],
      methods: [
        {
          zh: '阅读日志',
          en: 'Reading journal'
        },
        {
          zh: '错题复盘',
          en: 'Mistake review'
        },
        {
          zh: '小项目展示',
          en: 'Small project demos'
        }
      ],
      books: [
        {
          zh: '桥梁书、科普读物、历史故事',
          en: 'Early chapter books, science readers, history stories'
        }
      ],
      cases: [
        {
          zh: '围绕“水从哪里来”做一次家庭研究，输出手绘流程图。',
          en: 'Research where water comes from at home and produce a hand-drawn flow chart.'
        }
      ]
    },
    {
      age: '12-15',
      title: {
        zh: '初中',
        en: 'Middle School'
      },
      goal: {
        zh: '完成从被动学习到主动学习的转换，训练逻辑、复盘和抗挫能力。',
        en: 'Move from passive to active learning while training logic, review, and resilience.'
      },
      abilities: [
        {
          zh: '抽象理解',
          en: 'Abstract understanding'
        },
        {
          zh: '问题拆解',
          en: 'Problem decomposition'
        },
        {
          zh: '自我复盘',
          en: 'Self-review'
        }
      ],
      methods: [
        {
          zh: '概念卡片',
          en: 'Concept cards'
        },
        {
          zh: '费曼讲解',
          en: 'Feynman explanation'
        },
        {
          zh: '阶段复盘',
          en: 'Periodic review'
        }
      ],
      books: [
        {
          zh: '通识入门、科学史、人物传记',
          en: 'General introductions, history of science, biographies'
        }
      ],
      cases: [
        {
          zh: '把一次考试失误拆成知识、方法、时间和心态四类原因。',
          en: 'Break one exam failure into knowledge, method, time, and mindset causes.'
        }
      ]
    },
    {
      age: '15-18',
      title: {
        zh: '高中',
        en: 'High School'
      },
      goal: {
        zh: '在学科深度、目标选择和压力管理之间建立稳定系统。',
        en: 'Build a stable system across academic depth, goal choice, and pressure management.'
      },
      abilities: [
        {
          zh: '系统化学习',
          en: 'Systematic learning'
        },
        {
          zh: '长期规划',
          en: 'Long-term planning'
        },
        {
          zh: '压力管理',
          en: 'Pressure management'
        }
      ],
      methods: [
        {
          zh: '知识地图',
          en: 'Knowledge maps'
        },
        {
          zh: '专题突破',
          en: 'Focused breakthroughs'
        },
        {
          zh: '目标-行动表',
          en: 'Goal-action sheets'
        }
      ],
      books: [
        {
          zh: '学科经典、写作训练、思维模型',
          en: 'Subject classics, writing practice, mental models'
        }
      ],
      cases: [
        {
          zh: '用季度目标管理一次薄弱学科，从诊断到练习再到反馈。',
          en: 'Use quarterly goals to improve one weak subject from diagnosis to practice and feedback.'
        }
      ]
    },
    {
      age: '18+',
      title: {
        zh: '大学',
        en: 'University'
      },
      goal: {
        zh: '形成专业能力、跨学科视野和面向真实世界的作品集。',
        en: 'Form expertise, interdisciplinary perspective, and a real-world portfolio.'
      },
      abilities: [
        {
          zh: '专业深度',
          en: 'Professional depth'
        },
        {
          zh: '跨学科连接',
          en: 'Interdisciplinary connection'
        },
        {
          zh: '作品集建设',
          en: 'Portfolio building'
        }
      ],
      methods: [
        {
          zh: '研究型学习',
          en: 'Research-based learning'
        },
        {
          zh: '实习与项目',
          en: 'Internships and projects'
        },
        {
          zh: '公开写作',
          en: 'Public writing'
        }
      ],
      books: [
        {
          zh: '专业教材、论文、商业与技术案例',
          en: 'Textbooks, papers, business and technology cases'
        }
      ],
      cases: [
        {
          zh: '围绕一个真实问题做 8 周项目，输出论文、代码或产品原型。',
          en: 'Run an eight-week project around a real problem and ship a paper, codebase, or prototype.'
        }
      ]
    }
  ] satisfies EducationStage[],
  practice: [
    {
      title: {
        zh: '教育观察',
        en: 'Education Observations'
      },
      summary: {
        zh: '记录课堂、家庭、社会变化和学习行为中的长期信号。',
        en: 'Record long-term signals from classrooms, families, social change, and learning behavior.'
      },
      category: {
        zh: '观察',
        en: 'Observation'
      },
      tags: [
        {
          zh: '教育趋势',
          en: 'Education Trends'
        },
        {
          zh: '社会环境',
          en: 'Social Environment'
        }
      ]
    },
    {
      title: {
        zh: '家庭教育案例',
        en: 'Family Education Cases'
      },
      summary: {
        zh: '沉淀亲子沟通、习惯培养、阅读系统和成长反馈案例。',
        en: 'Collect cases about parent-child communication, habits, reading systems, and growth feedback.'
      },
      category: {
        zh: '家庭教育',
        en: 'Family Education'
      },
      tags: [
        {
          zh: '亲子沟通',
          en: 'Parent-Child Communication'
        },
        {
          zh: '习惯',
          en: 'Habits'
        }
      ]
    },
    {
      title: {
        zh: '项目制学习案例',
        en: 'Project-Based Learning'
      },
      summary: {
        zh: '把真实问题变成可展示的项目，用作品倒逼知识整合。',
        en: 'Turn real problems into demonstrable projects and use artifacts to drive knowledge integration.'
      },
      category: {
        zh: '项目制学习',
        en: 'Project-Based Learning'
      },
      tags: [
        {
          zh: '作品',
          en: 'Artifacts'
        },
        {
          zh: '实践',
          en: 'Practice'
        }
      ]
    },
    {
      title: {
        zh: 'AI 学习实践',
        en: 'AI Learning Practice'
      },
      summary: {
        zh: '探索 AI 作为导师、陪练、反馈器和知识整理工具的边界。',
        en: 'Explore AI as tutor, practice partner, feedback system, and knowledge organization tool.'
      },
      category: {
        zh: 'AI 学习',
        en: 'AI Learning'
      },
      tags: [
        {
          zh: 'AI 工具',
          en: 'AI Tools'
        },
        {
          zh: '个性化学习',
          en: 'Personalized Learning'
        }
      ]
    }
  ] satisfies TaggedEducationItem[],
  caseStudies: [
    {
      title: {
        zh: '人物案例',
        en: 'People Cases'
      },
      summary: {
        zh: '进入人物版块，研究长期学习者、科学家、企业家和教育者如何形成能力结构。',
        en: 'Go to people studies to learn how lifelong learners, scientists, entrepreneurs, and educators form capability structures.'
      },
      category: {
        zh: '人物',
        en: 'People'
      },
      tags: [
        {
          zh: '成长路径',
          en: 'Growth Path'
        },
        {
          zh: '榜样',
          en: 'Role Models'
        }
      ]
    },
    {
      title: {
        zh: '学校案例',
        en: 'School Cases'
      },
      summary: {
        zh: '观察学校如何组织课程、评价、项目、社群和文化。',
        en: 'Observe how schools organize curriculum, assessment, projects, community, and culture.'
      },
      category: {
        zh: '学校',
        en: 'Schools'
      },
      tags: [
        {
          zh: '课程',
          en: 'Curriculum'
        },
        {
          zh: '评价',
          en: 'Assessment'
        }
      ]
    },
    {
      title: {
        zh: '企业案例',
        en: 'Company Cases'
      },
      summary: {
        zh: '进入企业版块，研究企业大学、人才培养、学习型组织和技术训练体系。',
        en: 'Go to company studies to learn corporate universities, talent development, learning organizations, and technical training systems.'
      },
      category: {
        zh: '企业',
        en: 'Companies'
      },
      tags: [
        {
          zh: '组织学习',
          en: 'Organizational Learning'
        },
        {
          zh: '人才培养',
          en: 'Talent Development'
        }
      ]
    }
  ] satisfies TaggedEducationItem[],
  resources: [
    {
      type: {
        zh: '书单',
        en: 'Booklists'
      },
      summary: {
        zh: '教育哲学、认知科学、学习方法、儿童成长与通识教育。',
        en: 'Education philosophy, cognitive science, learning methods, child development, and liberal education.'
      },
      items: [
        {
          zh: '教育哲学',
          en: 'Education philosophy'
        },
        {
          zh: '认知科学',
          en: 'Cognitive science'
        },
        {
          zh: '学习方法',
          en: 'Learning methods'
        }
      ]
    },
    {
      type: {
        zh: '课程',
        en: 'Courses'
      },
      summary: {
        zh: '面向学科基础、写作表达、科学素养、AI 素养和项目实践。',
        en: 'Courses for foundations, writing, scientific literacy, AI literacy, and project practice.'
      },
      items: [
        {
          zh: '基础学科',
          en: 'Foundational subjects'
        },
        {
          zh: '写作表达',
          en: 'Writing and expression'
        },
        {
          zh: 'AI 素养',
          en: 'AI literacy'
        }
      ]
    },
    {
      type: {
        zh: '工具',
        en: 'Tools'
      },
      summary: {
        zh: '阅读、笔记、检索、复盘、项目管理和 AI 辅助学习工具。',
        en: 'Tools for reading, notes, search, review, project management, and AI-assisted learning.'
      },
      items: [
        {
          zh: '知识库',
          en: 'Knowledge base'
        },
        {
          zh: 'AI 导师',
          en: 'AI tutor'
        },
        {
          zh: '项目看板',
          en: 'Project board'
        }
      ]
    },
    {
      type: {
        zh: '网站',
        en: 'Websites'
      },
      summary: {
        zh: '开放课程、数字图书馆、科学学习资源和教育研究机构。',
        en: 'Open courses, digital libraries, science learning resources, and education research organizations.'
      },
      items: [
        {
          zh: '开放课程',
          en: 'Open courses'
        },
        {
          zh: '数字图书馆',
          en: 'Digital libraries'
        },
        {
          zh: '研究机构',
          en: 'Research organizations'
        }
      ]
    }
  ] satisfies EducationResource[],
  graph: {
    nodes: [
      'education',
      'philosophy',
      'learning-framework',
      'education-stages',
      'practice',
      'case-studies',
      'resources',
      'life-os'
    ],
    edges: [
      ['education', 'philosophy'],
      ['education', 'learning-framework'],
      ['learning-framework', 'life-os'],
      ['learning-framework', 'education-stages'],
      ['education-stages', 'practice'],
      ['practice', 'case-studies'],
      ['resources', 'practice']
    ]
  }
};

export const educationTaxonomy = [
  {
    title: educationContent.sections.philosophy,
    summary: educationContent.sectionIntros.philosophy,
    href: '#philosophy',
    categories: ['Education', 'Learning and Growth', 'Life OS'],
    tags: ['Education Philosophy', 'Lifelong Learning', 'Independent Thinking']
  },
  {
    title: educationContent.sections.framework,
    summary: educationContent.sectionIntros.framework,
    href: '#framework',
    categories: ['Education', 'Learning and Growth', 'Life OS'],
    tags: ['Learning Framework', 'Life OS', 'Systems Thinking']
  },
  {
    title: educationContent.sections.stages,
    summary: educationContent.sectionIntros.stages,
    href: '#stages',
    categories: ['Education', 'Learning and Growth'],
    tags: ['Education Stages', 'Personalized Education', 'Long-Term Strategy']
  },
  {
    title: educationContent.sections.practice,
    summary: educationContent.sectionIntros.practice,
    href: '#practice',
    categories: ['Education', 'Learning and Growth', 'AI and Technology'],
    tags: ['Education Practice', 'Family Education', 'Project-Based Learning', 'AI Learning']
  },
  {
    title: educationContent.sections.cases,
    summary: educationContent.sectionIntros.cases,
    href: '#case-studies',
    categories: ['Education', 'People and Leadership', 'Company Research'],
    tags: ['Education Case Studies', 'Organizational Learning', 'Talent Development']
  },
  {
    title: educationContent.sections.resources,
    summary: educationContent.sectionIntros.resources,
    href: '#resources',
    categories: ['Education', 'Learning and Growth'],
    tags: ['Education Resources', 'Knowledge Foundation', 'AI Tools']
  }
] as const;
