import type {Locale} from '@/lib/i18n';

export type LocalizedText = Record<Locale, string>;

export type TaggedLifeItem = {
  title: LocalizedText;
  summary: LocalizedText;
  category: LocalizedText;
  tags: LocalizedText[];
};

export type LifeModule = {
  key: string;
  title: LocalizedText;
  summary: LocalizedText;
  items: LocalizedText[];
  tags: LocalizedText[];
};

export type LifeDecision = {
  title: LocalizedText;
  context: LocalizedText;
  questions: LocalizedText[];
  cases: LocalizedText[];
  tags: LocalizedText[];
};

export type LifeCaseStudy = {
  type: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  examples: LocalizedText[];
  lens: LocalizedText[];
  tags: LocalizedText[];
};

export type LifeReviewItem = {
  period: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  checkpoints: LocalizedText[];
};

export function lt(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export const lifeContent = {
  hero: {
    title: {
      zh: 'Life 人生',
      en: 'Life'
    },
    subtitle: {
      zh: '人生版块不是心灵鸡汤，也不是情感故事。它研究如何构建一个长期幸福、持续成长、财富稳步积累的人生系统。',
      en: 'Life is not motivational writing or emotional storytelling. It studies how to build a life system for long-term happiness, continuous growth, and steady wealth accumulation.'
    },
    thesis: {
      zh: '人生是一项长期系统工程。亲情、友情、爱情、婚姻、亲子关系、财富、健康与成长共同组成一个需要持续校准的动态系统。',
      en: 'Life is a long-term systems engineering project. Family affection, friendship, love, marriage, parenting, wealth, health, and growth form a dynamic system that must be calibrated over time.'
    },
    categories: [
      {
        zh: '人生',
        en: 'Life'
      },
      {
        zh: '人生操作系统',
        en: 'Life OS'
      },
      {
        zh: '学习与成长',
        en: 'Learning and Growth'
      }
    ],
    tags: [
      {
        zh: '幸福',
        en: 'Happiness'
      },
      {
        zh: '成长',
        en: 'Growth'
      },
      {
        zh: '婚姻与家庭',
        en: 'Marriage and Family'
      },
      {
        zh: '财富与自由',
        en: 'Wealth and Freedom'
      },
      {
        zh: '终身学习',
        en: 'Lifelong Learning'
      }
    ]
  },
  sections: {
    philosophy: {
      zh: '人生哲学',
      en: 'Life Philosophy'
    },
    awareness: {
      zh: '自我认知',
      en: 'Self Awareness'
    },
    relationships: {
      zh: '关系经营',
      en: 'Relationships'
    },
    family: {
      zh: '婚姻与家庭',
      en: 'Marriage & Family'
    },
    wealth: {
      zh: '财富与幸福',
      en: 'Wealth & Happiness'
    },
    health: {
      zh: '健康与成长',
      en: 'Health & Growth'
    },
    decisions: {
      zh: '人生重大决策',
      en: 'Major Life Decisions'
    },
    cases: {
      zh: '人生案例库',
      en: 'Life Case Studies'
    },
    review: {
      zh: '人生复盘',
      en: 'Life Review'
    }
  },
  sectionIntros: {
    philosophy: {
      zh: '从长期主义、复利思维和第一性原理出发，研究人为什么而活，以及如何让选择服务于长期人生质量。',
      en: 'Use long-termism, compounding, and first principles to study why we live and how choices serve long-term life quality.'
    },
    awareness: {
      zh: '人生定位不是一次性答案，而是对能力、兴趣、性格、资源和环境的持续迭代。',
      en: 'Life positioning is not a one-time answer. It is an ongoing iteration of capability, interest, personality, resources, and environment.'
    },
    relationships: {
      zh: '关系不是情绪消耗品，而是长期信任、价值交换、共同成长和责任边界的系统。',
      en: 'Relationships are not emotional consumables. They are systems of long-term trust, value exchange, shared growth, and responsibility boundaries.'
    },
    family: {
      zh: '家庭是人生最重要的长期合作项目之一，需要用价值观、责任、沟通和财富传承来经营。',
      en: 'Family is one of life’s most important long-term partnerships, managed through values, responsibility, communication, and wealth stewardship.'
    },
    wealth: {
      zh: '这里不重复投资内容，而是讨论财富如何影响自由、选择、幸福感、责任和人生结构。',
      en: 'This section does not repeat investing content. It studies how wealth shapes freedom, choices, happiness, responsibility, and life structure.'
    },
    health: {
      zh: '健康是所有人生目标的基础设施。身体、睡眠、饮食、运动、情绪和韧性决定长期可持续性。',
      en: 'Health is the infrastructure beneath every life goal. Body, sleep, food, movement, emotion, and resilience determine long-term sustainability.'
    },
    decisions: {
      zh: '教育、职业、婚姻、生育、创业、投资和国际化选择，都应放进长期人生系统里做案例分析。',
      en: 'Education, career, marriage, parenting, entrepreneurship, investing, and international choices should be analyzed inside the long-term life system.'
    },
    cases: {
      zh: '通过人物、家庭和人生转折案例，研究不同选择如何形成长期结果，而不是崇拜单个成功故事。',
      en: 'Use people, family, and turning-point cases to study how choices produce long-term results, instead of worshiping isolated success stories.'
    },
    review: {
      zh: '复盘让人生从经历变成经验，从经验变成模型，再从模型变成更好的下一轮行动。',
      en: 'Review converts experience into lessons, lessons into models, and models into better action in the next cycle.'
    }
  },
  operatingModel: [
    {
      key: 'perception',
      title: {
        zh: '感知',
        en: 'Perception'
      },
      summary: {
        zh: '观察现实处境、身体状态、关系温度、机会窗口和长期风险。',
        en: 'Observe reality, body state, relationship temperature, opportunity windows, and long-term risk.'
      }
    },
    {
      key: 'cognition',
      title: {
        zh: '认知',
        en: 'Cognition'
      },
      summary: {
        zh: '把零散经历转化为因果理解、人生模型和价值排序。',
        en: 'Turn scattered experience into causal understanding, life models, and value priorities.'
      }
    },
    {
      key: 'decision',
      title: {
        zh: '决策',
        en: 'Decision'
      },
      summary: {
        zh: '在约束、机会、责任和长期代价之间做可解释选择。',
        en: 'Make explainable choices across constraints, opportunities, responsibilities, and long-term costs.'
      }
    },
    {
      key: 'execution',
      title: {
        zh: '执行',
        en: 'Execution'
      },
      summary: {
        zh: '通过习惯、项目、关系行动和资产配置把判断落到现实。',
        en: 'Turn judgment into reality through habits, projects, relationship actions, and asset allocation.'
      }
    },
    {
      key: 'feedback',
      title: {
        zh: '反馈',
        en: 'Feedback'
      },
      summary: {
        zh: '用结果、情绪、关系质量、健康指标和现金流校准系统。',
        en: 'Calibrate the system through outcomes, emotions, relationship quality, health signals, and cash flow.'
      }
    },
    {
      key: 'evolution',
      title: {
        zh: '迭代',
        en: 'Evolution'
      },
      summary: {
        zh: '修正目标、边界、节奏和模型，让人生系统持续升级。',
        en: 'Revise goals, boundaries, rhythm, and models so the life system keeps upgrading.'
      }
    }
  ],
  balanceModel: [
    {
      title: {
        zh: '物质财富',
        en: 'Material Wealth'
      },
      summary: {
        zh: '收入、资产、现金流、安全边际与选择自由。',
        en: 'Income, assets, cash flow, margin of safety, and freedom of choice.'
      }
    },
    {
      title: {
        zh: '精神财富',
        en: 'Spiritual Wealth'
      },
      summary: {
        zh: '意义感、价值观、审美、阅读、信念和内在秩序。',
        en: 'Meaning, values, taste, reading, beliefs, and inner order.'
      }
    },
    {
      title: {
        zh: '家庭关系',
        en: 'Family Relationships'
      },
      summary: {
        zh: '亲密关系、亲子关系、代际责任与家庭合作质量。',
        en: 'Intimacy, parenting, intergenerational responsibility, and family cooperation quality.'
      }
    },
    {
      title: {
        zh: '个人成长',
        en: 'Personal Growth'
      },
      summary: {
        zh: '学习、能力、健康、见识、职业与长期作品。',
        en: 'Learning, capability, health, perspective, career, and long-term work.'
      }
    }
  ],
  philosophy: [
    {
      title: {
        zh: '人生的意义',
        en: 'The Meaning of Life'
      },
      summary: {
        zh: '意义不是外部授予的标准答案，而是在责任、创造、关系和成长中持续生成的方向感。',
        en: 'Meaning is not an externally granted answer. It is a direction that emerges through responsibility, creation, relationships, and growth.'
      },
      category: {
        zh: '人生哲学',
        en: 'Life Philosophy'
      },
      tags: [
        {
          zh: '意义',
          en: 'Meaning'
        },
        {
          zh: '责任',
          en: 'Responsibility'
        }
      ]
    },
    {
      title: {
        zh: '长期主义',
        en: 'Long-Termism'
      },
      summary: {
        zh: '把人生放进十年、二十年甚至更长周期，减少短期冲动对关键选择的扭曲。',
        en: 'Place life inside ten-year, twenty-year, and longer cycles to reduce the distortion of short-term impulses.'
      },
      category: {
        zh: '时间尺度',
        en: 'Time Horizon'
      },
      tags: [
        {
          zh: '长期战略',
          en: 'Long-Term Strategy'
        },
        {
          zh: '耐心',
          en: 'Patience'
        }
      ]
    },
    {
      title: {
        zh: '做加法与做减法',
        en: 'Addition and Subtraction'
      },
      summary: {
        zh: '年轻时积累能力、经验和资源，成熟后减少噪音、错误关系和低价值承诺。',
        en: 'Accumulate capabilities, experience, and resources early; later reduce noise, wrong relationships, and low-value commitments.'
      },
      category: {
        zh: '人生策略',
        en: 'Life Strategy'
      },
      tags: [
        {
          zh: '取舍',
          en: 'Trade-Offs'
        },
        {
          zh: '专注',
          en: 'Focus'
        }
      ]
    },
    {
      title: {
        zh: '复利思维',
        en: 'Compounding'
      },
      summary: {
        zh: '知识、信用、健康、关系和财富都具有复利属性，真正的差距来自长期正循环。',
        en: 'Knowledge, trust, health, relationships, and wealth all compound. Real gaps come from long-running positive loops.'
      },
      category: {
        zh: '增长模型',
        en: 'Growth Model'
      },
      tags: [
        {
          zh: '复利',
          en: 'Compounding'
        },
        {
          zh: '正循环',
          en: 'Positive Loop'
        }
      ]
    },
    {
      title: {
        zh: '第一性原理看人生',
        en: 'First Principles for Life'
      },
      summary: {
        zh: '把人生问题拆回健康、关系、现金流、能力、时间和价值，而不是被社会叙事推着走。',
        en: 'Decompose life questions into health, relationships, cash flow, capability, time, and values instead of being pushed by social narratives.'
      },
      category: {
        zh: '思维方法',
        en: 'Thinking Method'
      },
      tags: [
        {
          zh: '第一性原理',
          en: 'First-Principles Thinking'
        },
        {
          zh: '判断',
          en: 'Judgment'
        }
      ]
    },
    {
      title: {
        zh: '如何找到人生定位',
        en: 'Finding Life Positioning'
      },
      summary: {
        zh: '定位来自自我认知、环境机会、长期责任和可持续行动的交集，并会随着人生阶段持续变化。',
        en: 'Positioning emerges from self-knowledge, opportunity, responsibility, and sustainable action, then changes across life stages.'
      },
      category: {
        zh: '人生定位',
        en: 'Life Positioning'
      },
      tags: [
        {
          zh: '自我认知',
          en: 'Self Awareness'
        },
        {
          zh: '迭代',
          en: 'Iteration'
        }
      ]
    }
  ] satisfies TaggedLifeItem[],
  awareness: [
    {
      title: {
        zh: '认识自己',
        en: 'Know Yourself'
      },
      summary: {
        zh: '持续观察自己的能量来源、压力反应、价值排序、学习方式和真实动机。',
        en: 'Observe your energy sources, stress reactions, value priorities, learning style, and real motivations over time.'
      },
      category: {
        zh: '自我认知',
        en: 'Self Awareness'
      },
      tags: [
        {
          zh: '自知',
          en: 'Self Knowledge'
        },
        {
          zh: '动机',
          en: 'Motivation'
        }
      ]
    },
    {
      title: {
        zh: '能力边界',
        en: 'Capability Boundaries'
      },
      summary: {
        zh: '区分当下能力、可训练能力和不值得硬扛的限制，避免把愿望误判为能力。',
        en: 'Distinguish current capability, trainable capability, and constraints not worth forcing, so desire is not mistaken for ability.'
      },
      category: {
        zh: '能力模型',
        en: 'Capability Model'
      },
      tags: [
        {
          zh: '能力边界',
          en: 'Capability Boundary'
        },
        {
          zh: '现实校准',
          en: 'Reality Calibration'
        }
      ]
    },
    {
      title: {
        zh: '优势与劣势分析',
        en: 'Strengths and Weaknesses'
      },
      summary: {
        zh: '优势要进入长期作品和价值创造，劣势要通过系统、合作或边界管理降低代价。',
        en: 'Strengths should enter long-term work and value creation; weaknesses should be managed through systems, collaboration, or boundaries.'
      },
      category: {
        zh: '个人策略',
        en: 'Personal Strategy'
      },
      tags: [
        {
          zh: '优势',
          en: 'Strengths'
        },
        {
          zh: '短板',
          en: 'Weaknesses'
        }
      ]
    },
    {
      title: {
        zh: '兴趣与天赋',
        en: 'Interest and Talent'
      },
      summary: {
        zh: '兴趣提供启动能量，天赋影响学习斜率，长期成就还需要训练、环境和复盘。',
        en: 'Interest provides ignition, talent affects learning slope, and long-term achievement still requires training, environment, and review.'
      },
      category: {
        zh: '成长路径',
        en: 'Growth Path'
      },
      tags: [
        {
          zh: '兴趣',
          en: 'Interest'
        },
        {
          zh: '天赋',
          en: 'Talent'
        }
      ]
    }
  ] satisfies TaggedLifeItem[],
  relationships: [
    {
      key: 'family-affection',
      title: {
        zh: '亲情',
        en: 'Family Affection'
      },
      summary: {
        zh: '处理代际责任、情感连接、边界和照护，让亲情既有温度也有秩序。',
        en: 'Handle intergenerational responsibility, emotional connection, boundaries, and care with both warmth and order.'
      },
      items: [
        {
          zh: '代际沟通',
          en: 'Intergenerational communication'
        },
        {
          zh: '责任边界',
          en: 'Responsibility boundaries'
        },
        {
          zh: '长期照护',
          en: 'Long-term care'
        }
      ],
      tags: [
        {
          zh: '亲情',
          en: 'Family Affection'
        },
        {
          zh: '责任',
          en: 'Responsibility'
        }
      ]
    },
    {
      key: 'friendship',
      title: {
        zh: '友情',
        en: 'Friendship'
      },
      summary: {
        zh: '真正的友情来自长期互信、共同成长和关键时刻的可靠性。',
        en: 'True friendship comes from long-term trust, shared growth, and reliability in important moments.'
      },
      items: [
        {
          zh: '信任积累',
          en: 'Trust building'
        },
        {
          zh: '共同成长',
          en: 'Shared growth'
        },
        {
          zh: '关键支持',
          en: 'Critical support'
        }
      ],
      tags: [
        {
          zh: '友情',
          en: 'Friendship'
        },
        {
          zh: '长期信任',
          en: 'Long-Term Trust'
        }
      ]
    },
    {
      key: 'social',
      title: {
        zh: '社交关系',
        en: 'Social Relationships'
      },
      summary: {
        zh: '社交不是扩大联系人数量，而是建立互相理解、互相成就的价值网络。',
        en: 'Social life is not about maximizing contacts. It is about building a value network that enables mutual understanding and contribution.'
      },
      items: [
        {
          zh: '价值交换',
          en: 'Value exchange'
        },
        {
          zh: '声誉信用',
          en: 'Reputation and trust'
        },
        {
          zh: '弱连接',
          en: 'Weak ties'
        }
      ],
      tags: [
        {
          zh: '社交',
          en: 'Social Network'
        },
        {
          zh: '价值交换',
          en: 'Value Exchange'
        }
      ]
    },
    {
      key: 'community',
      title: {
        zh: '社区关系',
        en: 'Community'
      },
      summary: {
        zh: '社区让个人生活连接到更大的共同体，形成归属、协作和公共责任。',
        en: 'Community connects personal life to a larger whole, creating belonging, cooperation, and public responsibility.'
      },
      items: [
        {
          zh: '共同体',
          en: 'Belonging'
        },
        {
          zh: '协作',
          en: 'Cooperation'
        },
        {
          zh: '公共责任',
          en: 'Public responsibility'
        }
      ],
      tags: [
        {
          zh: '社区',
          en: 'Community'
        },
        {
          zh: '责任',
          en: 'Responsibility'
        }
      ]
    }
  ] satisfies LifeModule[],
  family: [
    {
      title: {
        zh: '爱情',
        en: 'Love'
      },
      summary: {
        zh: '爱情需要激情，也需要价值观、责任能力、现实协作和长期兼容性。',
        en: 'Love needs passion, but also values, responsibility, practical cooperation, and long-term compatibility.'
      },
      category: {
        zh: '亲密关系',
        en: 'Intimacy'
      },
      tags: [
        {
          zh: '爱情',
          en: 'Love'
        },
        {
          zh: '兼容性',
          en: 'Compatibility'
        }
      ]
    },
    {
      title: {
        zh: '婚姻',
        en: 'Marriage'
      },
      summary: {
        zh: '婚姻是长期合作项目，需要共同目标、财务透明、冲突处理和家庭责任分工。',
        en: 'Marriage is a long-term partnership requiring shared goals, financial transparency, conflict handling, and family responsibility design.'
      },
      category: {
        zh: '长期合作',
        en: 'Long-Term Partnership'
      },
      tags: [
        {
          zh: '婚姻',
          en: 'Marriage'
        },
        {
          zh: '家庭',
          en: 'Family'
        }
      ]
    },
    {
      title: {
        zh: '亲子关系',
        en: 'Parent-Child Relationship'
      },
      summary: {
        zh: '亲子关系不是控制系统，而是安全感、边界、习惯、价值观和成长环境的共同建设。',
        en: 'Parenting is not a control system. It co-builds security, boundaries, habits, values, and a growth environment.'
      },
      category: {
        zh: '亲子关系',
        en: 'Parenting'
      },
      tags: [
        {
          zh: '亲子关系',
          en: 'Parent-Child Relationship'
        },
        {
          zh: '成长环境',
          en: 'Growth Environment'
        }
      ]
    },
    {
      title: {
        zh: '家庭财富传承',
        en: 'Family Wealth Stewardship'
      },
      summary: {
        zh: '财富传承不只是资产转移，更是价值观、能力、责任和风险意识的传承。',
        en: 'Wealth stewardship is not only asset transfer. It passes on values, capability, responsibility, and risk awareness.'
      },
      category: {
        zh: '家庭财富',
        en: 'Family Wealth'
      },
      tags: [
        {
          zh: '财富传承',
          en: 'Family Wealth'
        },
        {
          zh: '责任',
          en: 'Responsibility'
        }
      ]
    }
  ] satisfies TaggedLifeItem[],
  wealth: [
    {
      title: {
        zh: '物质财富',
        en: 'Material Wealth'
      },
      summary: {
        zh: '物质财富提供安全边际和选择空间，但不能自动等于幸福。',
        en: 'Material wealth provides safety and optionality, but it does not automatically equal happiness.'
      },
      category: {
        zh: '财富',
        en: 'Wealth'
      },
      tags: [
        {
          zh: '财富',
          en: 'Wealth'
        },
        {
          zh: '安全边际',
          en: 'Margin of Safety'
        }
      ]
    },
    {
      title: {
        zh: '精神财富',
        en: 'Spiritual Wealth'
      },
      summary: {
        zh: '精神财富决定一个人如何理解成功、自由、责任、消费和内心秩序。',
        en: 'Spiritual wealth shapes how a person understands success, freedom, responsibility, consumption, and inner order.'
      },
      category: {
        zh: '幸福',
        en: 'Happiness'
      },
      tags: [
        {
          zh: '精神财富',
          en: 'Spiritual Wealth'
        },
        {
          zh: '幸福',
          en: 'Happiness'
        }
      ]
    },
    {
      title: {
        zh: '消费观',
        en: 'Consumption Philosophy'
      },
      summary: {
        zh: '好的消费观不是压抑需求，而是让花出去的钱服务于健康、关系、学习和长期价值。',
        en: 'A good consumption philosophy does not suppress needs. It lets spending serve health, relationships, learning, and long-term value.'
      },
      category: {
        zh: '生活方式',
        en: 'Lifestyle'
      },
      tags: [
        {
          zh: '消费观',
          en: 'Consumption'
        },
        {
          zh: '价值',
          en: 'Value'
        }
      ]
    },
    {
      title: {
        zh: '幸福感来源',
        en: 'Sources of Happiness'
      },
      summary: {
        zh: '幸福来自安全感、意义感、关系质量、身体状态、自主性和成长感的组合。',
        en: 'Happiness comes from a combination of security, meaning, relationship quality, body state, autonomy, and growth.'
      },
      category: {
        zh: '幸福模型',
        en: 'Happiness Model'
      },
      tags: [
        {
          zh: '幸福',
          en: 'Happiness'
        },
        {
          zh: '自由',
          en: 'Freedom'
        }
      ]
    }
  ] satisfies TaggedLifeItem[],
  health: [
    {
      title: {
        zh: '身体健康',
        en: 'Physical Health'
      },
      summary: {
        zh: '健康不是可选模块，而是支撑事业、家庭、学习和财富的底层基础设施。',
        en: 'Health is not optional. It is the infrastructure beneath career, family, learning, and wealth.'
      },
      category: {
        zh: '健康',
        en: 'Health'
      },
      tags: [
        {
          zh: '健康',
          en: 'Health'
        },
        {
          zh: '基础设施',
          en: 'Infrastructure'
        }
      ]
    },
    {
      title: {
        zh: '运动、睡眠与饮食',
        en: 'Movement, Sleep, and Food'
      },
      summary: {
        zh: '运动、睡眠和饮食是最容易被低估的长期生产力系统。',
        en: 'Movement, sleep, and food are among the most underestimated long-term productivity systems.'
      },
      category: {
        zh: '生活系统',
        en: 'Life System'
      },
      tags: [
        {
          zh: '睡眠',
          en: 'Sleep'
        },
        {
          zh: '运动',
          en: 'Exercise'
        }
      ]
    },
    {
      title: {
        zh: '情绪管理',
        en: 'Emotional Management'
      },
      summary: {
        zh: '情绪不是敌人，而是反馈信号。关键是识别、表达、调节和转化。',
        en: 'Emotion is not the enemy. It is feedback to be recognized, expressed, regulated, and transformed.'
      },
      category: {
        zh: '心理系统',
        en: 'Psychological System'
      },
      tags: [
        {
          zh: '情绪管理',
          en: 'Emotional Management'
        },
        {
          zh: '反馈',
          en: 'Feedback'
        }
      ]
    },
    {
      title: {
        zh: '心理韧性',
        en: 'Psychological Resilience'
      },
      summary: {
        zh: '韧性不是硬扛，而是在压力、失败和变化中保持恢复、学习和重新行动的能力。',
        en: 'Resilience is not brute endurance. It is the ability to recover, learn, and act again under stress, failure, and change.'
      },
      category: {
        zh: '成长能力',
        en: 'Growth Capability'
      },
      tags: [
        {
          zh: '心理韧性',
          en: 'Psychological Resilience'
        },
        {
          zh: '成长',
          en: 'Growth'
        }
      ]
    }
  ] satisfies TaggedLifeItem[],
  decisions: [
    {
      title: {
        zh: '教育选择',
        en: 'Education Choice'
      },
      context: {
        zh: '教育选择影响认知结构、社交环境、学习习惯和未来机会。',
        en: 'Education choices shape cognitive structure, social environment, learning habits, and future opportunities.'
      },
      questions: [
        {
          zh: '这个选择训练什么长期能力？',
          en: 'What long-term capability does this choice train?'
        },
        {
          zh: '环境是否保护好奇心和自驱力？',
          en: 'Does the environment protect curiosity and self-direction?'
        }
      ],
      cases: [
        {
          zh: '普通学校与国际学校选择',
          en: 'Local school versus international school'
        },
        {
          zh: '应试路径与项目制学习平衡',
          en: 'Balancing exams and project-based learning'
        }
      ],
      tags: [
        {
          zh: '教育',
          en: 'Education'
        },
        {
          zh: '长期能力',
          en: 'Long-Term Capability'
        }
      ]
    },
    {
      title: {
        zh: '职业选择',
        en: 'Career Choice'
      },
      context: {
        zh: '职业不是单次就业，而是能力、行业、现金流、作品和身份的长期组合。',
        en: 'Career is not a single job. It is a long-term combination of capability, industry, cash flow, work, and identity.'
      },
      questions: [
        {
          zh: '行业是否处在长期上升趋势？',
          en: 'Is the industry on a long-term upward trend?'
        },
        {
          zh: '这份工作能否沉淀可迁移能力？',
          en: 'Can this work build transferable capability?'
        }
      ],
      cases: [
        {
          zh: '大公司平台与创业公司机会',
          en: 'Big-company platform versus startup opportunity'
        },
        {
          zh: '稳定收入与长期成长空间',
          en: 'Stable income versus long-term growth space'
        }
      ],
      tags: [
        {
          zh: '职业',
          en: 'Career'
        },
        {
          zh: '能力复利',
          en: 'Capability Compounding'
        }
      ]
    },
    {
      title: {
        zh: '婚姻与生育选择',
        en: 'Marriage and Parenting Choice'
      },
      context: {
        zh: '婚姻与生育会重构时间、财富、关系、责任和人生优先级。',
        en: 'Marriage and parenting reshape time, wealth, relationships, responsibility, and life priorities.'
      },
      questions: [
        {
          zh: '双方价值观和责任能力是否匹配？',
          en: 'Do both people match in values and responsibility?'
        },
        {
          zh: '家庭系统是否能承载新的长期责任？',
          en: 'Can the family system carry the new long-term responsibility?'
        }
      ],
      cases: [
        {
          zh: '双职工家庭的分工与支持系统',
          en: 'Division of labor and support system in a dual-career family'
        },
        {
          zh: '生育时机与职业节奏协调',
          en: 'Coordinating parenting timing and career rhythm'
        }
      ],
      tags: [
        {
          zh: '婚姻',
          en: 'Marriage'
        },
        {
          zh: '家庭',
          en: 'Family'
        }
      ]
    },
    {
      title: {
        zh: '创业、投资与国际化选择',
        en: 'Entrepreneurship, Investing, and International Choice'
      },
      context: {
        zh: '高杠杆选择需要同时评估能力圈、风险承受力、家庭支持、现金流和长期身份。',
        en: 'High-leverage choices require assessment of circle of competence, risk capacity, family support, cash flow, and long-term identity.'
      },
      questions: [
        {
          zh: '最坏情况是否可承受？',
          en: 'Is the downside survivable?'
        },
        {
          zh: '这个选择是否扩展长期选择权？',
          en: 'Does this choice expand long-term optionality?'
        }
      ],
      cases: [
        {
          zh: '全职创业与兼职验证',
          en: 'Full-time entrepreneurship versus part-time validation'
        },
        {
          zh: '本地深耕与国际化迁移',
          en: 'Local depth versus international relocation'
        }
      ],
      tags: [
        {
          zh: '创业',
          en: 'Entrepreneurship'
        },
        {
          zh: '投资选择',
          en: 'Investment Choice'
        }
      ]
    }
  ] satisfies LifeDecision[],
  caseStudies: [
    {
      type: {
        zh: '人物案例',
        en: 'People Cases'
      },
      title: {
        zh: '长期主义人物样本',
        en: 'Long-Term People Samples'
      },
      summary: {
        zh: '研究芒格、巴菲特、黄仁勋、马斯克等人的人生选择、能力结构、关系处理和长期代价。',
        en: 'Study the life choices, capability structures, relationship handling, and long-term costs of Munger, Buffett, Jensen Huang, Musk, and others.'
      },
      examples: [
        {
          zh: '芒格',
          en: 'Charlie Munger'
        },
        {
          zh: '巴菲特',
          en: 'Warren Buffett'
        },
        {
          zh: '黄仁勋',
          en: 'Jensen Huang'
        },
        {
          zh: '马斯克',
          en: 'Elon Musk'
        }
      ],
      lens: [
        {
          zh: '关键选择',
          en: 'Key choices'
        },
        {
          zh: '能力结构',
          en: 'Capability structure'
        },
        {
          zh: '长期代价',
          en: 'Long-term costs'
        }
      ],
      tags: [
        {
          zh: '人物案例',
          en: 'People Cases'
        },
        {
          zh: '长期主义',
          en: 'Long-Termism'
        }
      ]
    },
    {
      type: {
        zh: '家庭案例',
        en: 'Family Cases'
      },
      title: {
        zh: '优秀家庭与失败案例',
        en: 'Strong Families and Failure Cases'
      },
      summary: {
        zh: '观察家庭如何通过沟通、边界、财富、教育和责任分工形成长期结果。',
        en: 'Observe how families create long-term outcomes through communication, boundaries, wealth, education, and responsibility design.'
      },
      examples: [
        {
          zh: '优秀家庭',
          en: 'Strong families'
        },
        {
          zh: '失败案例',
          en: 'Failure cases'
        }
      ],
      lens: [
        {
          zh: '沟通机制',
          en: 'Communication mechanism'
        },
        {
          zh: '责任边界',
          en: 'Responsibility boundaries'
        },
        {
          zh: '财富与教育',
          en: 'Wealth and education'
        }
      ],
      tags: [
        {
          zh: '家庭',
          en: 'Family'
        },
        {
          zh: '案例分析',
          en: 'Case Analysis'
        }
      ]
    },
    {
      type: {
        zh: '人生转折案例',
        en: 'Turning-Point Cases'
      },
      title: {
        zh: '成功经验与失败经验',
        en: 'Success and Failure Lessons'
      },
      summary: {
        zh: '把人生转折放回当时的约束、资源、判断和行动中复盘，提炼可迁移模型。',
        en: 'Review turning points inside their constraints, resources, judgment, and actions to distill transferable models.'
      },
      examples: [
        {
          zh: '职业转型',
          en: 'Career transition'
        },
        {
          zh: '家庭危机',
          en: 'Family crisis'
        },
        {
          zh: '财富跃迁',
          en: 'Wealth transition'
        }
      ],
      lens: [
        {
          zh: '背景约束',
          en: 'Context constraints'
        },
        {
          zh: '关键判断',
          en: 'Key judgment'
        },
        {
          zh: '复盘结论',
          en: 'Review conclusion'
        }
      ],
      tags: [
        {
          zh: '人生转折',
          en: 'Life Turning Point'
        },
        {
          zh: '复盘',
          en: 'Review'
        }
      ]
    }
  ] satisfies LifeCaseStudy[],
  reviewTimeline: [
    {
      period: {
        zh: '每周',
        en: 'Weekly'
      },
      title: {
        zh: '生活节奏复盘',
        en: 'Rhythm Review'
      },
      summary: {
        zh: '检查时间、精力、运动、睡眠、关系沟通和本周关键行动。',
        en: 'Check time, energy, movement, sleep, relationship communication, and key actions of the week.'
      },
      checkpoints: [
        {
          zh: '本周最重要的一个行动是什么？',
          en: 'What was the most important action this week?'
        },
        {
          zh: '哪里出现了明显消耗？',
          en: 'Where did obvious depletion occur?'
        }
      ]
    },
    {
      period: {
        zh: '季度',
        en: 'Quarterly'
      },
      title: {
        zh: '阶段性复盘',
        en: 'Stage Review'
      },
      summary: {
        zh: '评估健康、家庭、成长、财富和职业目标是否仍在同一个方向上。',
        en: 'Evaluate whether health, family, growth, wealth, and career goals still point in the same direction.'
      },
      checkpoints: [
        {
          zh: '目标是否需要减少或重排？',
          en: 'Should goals be reduced or reordered?'
        },
        {
          zh: '哪个系统需要升级？',
          en: 'Which system needs an upgrade?'
        }
      ]
    },
    {
      period: {
        zh: '年度',
        en: 'Yearly'
      },
      title: {
        zh: '年度复盘',
        en: 'Annual Review'
      },
      summary: {
        zh: '沉淀年度经验、重大决策、关系变化、资产变化和下一年度主线。',
        en: 'Distill annual lessons, major decisions, relationship changes, asset changes, and next year’s main line.'
      },
      checkpoints: [
        {
          zh: '今年真正复利的是什么？',
          en: 'What truly compounded this year?'
        },
        {
          zh: '明年最重要的系统瓶颈是什么？',
          en: 'What is next year’s most important system bottleneck?'
        }
      ]
    },
    {
      period: {
        zh: '关键节点',
        en: 'Major Moment'
      },
      title: {
        zh: '人生决策复盘',
        en: 'Life Decision Review'
      },
      summary: {
        zh: '重大选择之后复盘判断依据、情绪噪音、外部约束和长期影响。',
        en: 'After major choices, review judgment basis, emotional noise, external constraints, and long-term impact.'
      },
      checkpoints: [
        {
          zh: '当时哪些信息被高估或低估？',
          en: 'What information was overestimated or underestimated?'
        },
        {
          zh: '下一次如何改进决策流程？',
          en: 'How should the decision process improve next time?'
        }
      ]
    }
  ] satisfies LifeReviewItem[],
  graph: {
    nodes: [
      'life',
      'self-awareness',
      'relationships',
      'marriage-family',
      'wealth-happiness',
      'health-growth',
      'major-decisions',
      'case-studies',
      'review',
      'life-os'
    ],
    edges: [
      ['life', 'life-os'],
      ['life-os', 'self-awareness'],
      ['life-os', 'relationships'],
      ['relationships', 'marriage-family'],
      ['wealth-happiness', 'major-decisions'],
      ['health-growth', 'major-decisions'],
      ['major-decisions', 'case-studies'],
      ['case-studies', 'review'],
      ['review', 'life-os']
    ]
  }
};

export const lifeTaxonomy = [
  {
    title: lifeContent.sections.philosophy,
    summary: lifeContent.sectionIntros.philosophy,
    href: '#philosophy',
    categories: ['Life', 'Life OS', 'Learning and Growth'],
    tags: ['Life Philosophy', 'Long-Term Strategy', 'Lifelong Learning', 'Compounding']
  },
  {
    title: lifeContent.sections.awareness,
    summary: lifeContent.sectionIntros.awareness,
    href: '#self-awareness',
    categories: ['Life', 'Life OS', 'Learning and Growth'],
    tags: ['Self Awareness', 'Life Positioning', 'Personal Growth', 'Iteration']
  },
  {
    title: lifeContent.sections.relationships,
    summary: lifeContent.sectionIntros.relationships,
    href: '#relationships',
    categories: ['Life', 'People and Leadership'],
    tags: ['Relationships', 'Family Affection', 'Friendship', 'Long-Term Trust']
  },
  {
    title: lifeContent.sections.family,
    summary: lifeContent.sectionIntros.family,
    href: '#marriage-family',
    categories: ['Life', 'Education', 'Learning and Growth'],
    tags: ['Marriage and Family', 'Marriage', 'Family', 'Parent-Child Relationship', 'Family Wealth']
  },
  {
    title: lifeContent.sections.wealth,
    summary: lifeContent.sectionIntros.wealth,
    href: '#wealth-happiness',
    categories: ['Life', 'Investing', 'Life OS'],
    tags: ['Wealth and Happiness', 'Wealth', 'Happiness', 'Freedom']
  },
  {
    title: lifeContent.sections.health,
    summary: lifeContent.sectionIntros.health,
    href: '#health-growth',
    categories: ['Life', 'Learning and Growth'],
    tags: ['Health and Growth', 'Health', 'Emotional Management', 'Psychological Resilience']
  },
  {
    title: lifeContent.sections.decisions,
    summary: lifeContent.sectionIntros.decisions,
    href: '#major-decisions',
    categories: ['Life', 'Methods and Judgment', 'Investing'],
    tags: ['Major Life Decisions', 'Decision Making', 'Career Development', 'Education']
  },
  {
    title: lifeContent.sections.cases,
    summary: lifeContent.sectionIntros.cases,
    href: '#life-case-studies',
    categories: ['Life', 'People and Leadership'],
    tags: ['Life Case Studies', 'People Cases', 'Family Cases', 'Case Analysis']
  },
  {
    title: lifeContent.sections.review,
    summary: lifeContent.sectionIntros.review,
    href: '#life-review',
    categories: ['Life', 'Life OS', 'Learning and Growth'],
    tags: ['Life Review', 'Review', 'Iteration', 'Systems Thinking']
  }
] as const;
