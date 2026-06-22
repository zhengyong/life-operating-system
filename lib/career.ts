import type {Locale} from '@/lib/i18n';

export type LocalizedText = Record<Locale, string>;

export type TaggedCareerItem = {
  title: LocalizedText;
  summary: LocalizedText;
  category: LocalizedText;
  tags: LocalizedText[];
};

export type CareerPathStage = {
  period: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  focus: LocalizedText[];
  outputs: LocalizedText[];
};

export type CareerCapability = {
  key: string;
  title: LocalizedText;
  summary: LocalizedText;
  practices: LocalizedText[];
  tags: LocalizedText[];
};

export type CareerDecision = {
  title: LocalizedText;
  context: LocalizedText;
  questions: LocalizedText[];
  recommendation: LocalizedText;
};

export type CareerCaseStudy = {
  type: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  examples: LocalizedText[];
  lens: LocalizedText[];
  tags: LocalizedText[];
};

export type CareerReviewItem = {
  moment: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  checkpoints: LocalizedText[];
};

export function ct(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export const careerContent = {
  hero: {
    title: {
      zh: 'Career 职场',
      en: 'Career'
    },
    subtitle: {
      zh: '职场版块研究如何找到适合自己的职业方向，构建长期竞争力，实现职业成长与财富增长。',
      en: 'Career studies how to find a suitable direction, build long-term competitiveness, and convert professional growth into wealth growth.'
    },
    thesis: {
      zh: '职业发展是一场长期复利游戏。职场的本质不是职位、头衔或忙碌，而是持续创造价值。',
      en: 'Career development is a long-term compounding game. The essence of work is not title, position, or busyness, but sustained value creation.'
    },
    categories: [
      {
        zh: '职场',
        en: 'Career'
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
        zh: '职业发展',
        en: 'Career Development'
      },
      {
        zh: '职业规划',
        en: 'Career Planning'
      },
      {
        zh: '价值创造',
        en: 'Value Creation'
      },
      {
        zh: '创业',
        en: 'Entrepreneurship'
      },
      {
        zh: '管理',
        en: 'Management'
      }
    ]
  },
  sections: {
    philosophy: {
      zh: '职业认知',
      en: 'Career Philosophy'
    },
    path: {
      zh: '职业选择',
      en: 'Career Path'
    },
    growth: {
      zh: '职业成长',
      en: 'Career Growth'
    },
    company: {
      zh: '大公司与小公司',
      en: 'Big Company vs Startup'
    },
    entrepreneurship: {
      zh: '创业与管理',
      en: 'Entrepreneurship'
    },
    model: {
      zh: '职场能力模型',
      en: 'Career Operating System'
    },
    cases: {
      zh: '职场案例库',
      en: 'Career Case Studies'
    },
    review: {
      zh: '职场复盘',
      en: 'Career Review'
    }
  },
  sectionIntros: {
    philosophy: {
      zh: '先理解为什么工作、职场如何运行、职业发展有什么规律，再谈跳槽、晋升和创业。',
      en: 'Understand why we work, how workplaces operate, and what career growth laws exist before discussing job changes, promotion, or entrepreneurship.'
    },
    path: {
      zh: '职业选择不是一次押注，而是阶段性试错、深耕和能力复利的组合。',
      en: 'Career choice is not a single bet. It is a staged combination of exploration, depth, and capability compounding.'
    },
    growth: {
      zh: '长期成长来自专业能力、学习能力、项目经验、沟通能力和管理能力的持续叠加。',
      en: 'Long-term growth comes from the compounding of professional skill, learning ability, project experience, communication, and management.'
    },
    company: {
      zh: '大公司和小公司各有价值，但早期优先进入优秀大公司，通常更容易获得视野、流程和训练密度。',
      en: 'Big companies and startups both have value, but entering an excellent big company early often provides stronger perspective, process, and training density.'
    },
    entrepreneurship: {
      zh: '创业是高杠杆路径，也有高失败率。不是所有人都适合创业，管理能力也需要长期训练。',
      en: 'Entrepreneurship is a high-leverage path with a high failure rate. Not everyone is suited for it, and management also requires long training.'
    },
    model: {
      zh: '把人生操作系统映射到职业成长，用感知、认知、决策、执行、反馈和迭代解释职场能力升级。',
      en: 'Map Life OS to career growth: perception, cognition, decision, execution, feedback, and evolution explain professional capability upgrades.'
    },
    cases: {
      zh: '通过人物与企业案例研究成长路径、职业决策和管理思想，而不是只看成功结果。',
      en: 'Use people and company cases to study growth paths, career decisions, and management thinking, not only successful outcomes.'
    },
    review: {
      zh: '复盘让项目、晋升、面试和跳槽不只是经历，而是下一轮职业选择的输入。',
      en: 'Review turns projects, promotions, interviews, and job changes into inputs for the next career decision.'
    }
  },
  philosophy: [
    {
      title: {
        zh: '为什么工作',
        en: 'Why We Work'
      },
      summary: {
        zh: '工作不仅是收入来源，也是训练能力、理解社会、创造价值和积累长期信用的场域。',
        en: 'Work is not only income. It is a field for capability training, understanding society, creating value, and building long-term trust.'
      },
      category: {
        zh: '职业认知',
        en: 'Career Philosophy'
      },
      tags: [
        {
          zh: '职业发展',
          en: 'Career Development'
        },
        {
          zh: '价值创造',
          en: 'Value Creation'
        }
      ]
    },
    {
      title: {
        zh: '职场本质',
        en: 'The Nature of Work'
      },
      summary: {
        zh: '职场的本质是创造价值、解决问题、承担责任，并在组织协作中放大个人能力。',
        en: 'The essence of work is creating value, solving problems, taking responsibility, and amplifying individual capability through organizations.'
      },
      category: {
        zh: '价值创造',
        en: 'Value Creation'
      },
      tags: [
        {
          zh: '责任',
          en: 'Responsibility'
        },
        {
          zh: '协作',
          en: 'Collaboration'
        }
      ]
    },
    {
      title: {
        zh: '职业发展规律',
        en: 'Career Growth Laws'
      },
      summary: {
        zh: '早期看学习速度，中期看可迁移能力，长期看价值创造、信用、判断和资源整合。',
        en: 'Early career depends on learning speed, mid-career on transferable capability, and long-term career on value creation, trust, judgment, and resource integration.'
      },
      category: {
        zh: '成长规律',
        en: 'Growth Laws'
      },
      tags: [
        {
          zh: '能力复利',
          en: 'Capability Compounding'
        },
        {
          zh: '长期主义',
          en: 'Long-Termism'
        }
      ]
    },
    {
      title: {
        zh: '长期主义',
        en: 'Long-Termism'
      },
      summary: {
        zh: '职业不能只看下一份薪水，要看行业趋势、能力积累、作品沉淀和未来选择权。',
        en: 'Career should not optimize only for the next salary. It should consider industry trend, capability accumulation, work artifacts, and future optionality.'
      },
      category: {
        zh: '职业策略',
        en: 'Career Strategy'
      },
      tags: [
        {
          zh: '长期战略',
          en: 'Long-Term Strategy'
        },
        {
          zh: '选择权',
          en: 'Optionality'
        }
      ]
    }
  ] satisfies TaggedCareerItem[],
  pathStages: [
    {
      period: {
        zh: '1-2 年',
        en: '1-2 years'
      },
      title: {
        zh: '第一份工作',
        en: 'First Job'
      },
      summary: {
        zh: '第一份工作重点不是马上定义一生，而是快速试错、发现兴趣、理解行业和建立基本职业习惯。',
        en: 'The first job should not define your entire life. It should help you test quickly, discover interest, understand industries, and build professional habits.'
      },
      focus: [
        {
          zh: '快速试错',
          en: 'Fast exploration'
        },
        {
          zh: '发现兴趣',
          en: 'Discover interest'
        },
        {
          zh: '了解行业',
          en: 'Understand industries'
        }
      ],
      outputs: [
        {
          zh: '知道自己喜欢什么和不适合什么',
          en: 'Know what fits and what does not'
        },
        {
          zh: '建立基本工作纪律和交付意识',
          en: 'Build work discipline and delivery awareness'
        }
      ]
    },
    {
      period: {
        zh: '3-5 年',
        en: '3-5 years'
      },
      title: {
        zh: '第二份工作',
        en: 'Second Job'
      },
      summary: {
        zh: '第二份工作开始进入深耕阶段，重点是专业能力、项目经验、核心竞争力和稳定输出。',
        en: 'The second job should enter the depth-building stage, focused on expertise, project experience, core competitiveness, and stable output.'
      },
      focus: [
        {
          zh: '深耕专业',
          en: 'Deepen expertise'
        },
        {
          zh: '积累经验',
          en: 'Accumulate experience'
        },
        {
          zh: '构建核心竞争力',
          en: 'Build core competitiveness'
        }
      ],
      outputs: [
        {
          zh: '形成可迁移能力与代表性项目',
          en: 'Form transferable capability and representative projects'
        },
        {
          zh: '开始建立行业信用和职业议价能力',
          en: 'Build industry trust and career bargaining power'
        }
      ]
    }
  ] satisfies CareerPathStage[],
  talentPaths: [
    {
      title: {
        zh: '优秀人才路径',
        en: 'Exceptional Talent Path'
      },
      summary: {
        zh: '适合承担高不确定性、高责任和高杠杆任务的人，可以逐步进入创业、管理或高价值岗位。',
        en: 'People who can handle uncertainty, responsibility, and leverage may gradually move into entrepreneurship, management, or high-value roles.'
      },
      category: {
        zh: '高杠杆路径',
        en: 'High-Leverage Path'
      },
      tags: [
        {
          zh: '创业',
          en: 'Entrepreneurship'
        },
        {
          zh: '管理',
          en: 'Management'
        },
        {
          zh: '高价值岗位',
          en: 'High-Value Roles'
        }
      ]
    },
    {
      title: {
        zh: '普通人成长路径',
        en: 'Ordinary Person Path'
      },
      summary: {
        zh: '多数人更适合先深耕专业、提升技能、稳定现金流，再通过长期作品和行业理解放大职业成果。',
        en: 'Most people are better served by deepening expertise, improving skills, stabilizing cash flow, and amplifying career results through long-term work and industry understanding.'
      },
      category: {
        zh: '稳健路径',
        en: 'Steady Path'
      },
      tags: [
        {
          zh: '专业深耕',
          en: 'Professional Depth'
        },
        {
          zh: '技能提升',
          en: 'Skill Development'
        },
        {
          zh: '长期作品',
          en: 'Long-Term Work'
        }
      ]
    }
  ] satisfies TaggedCareerItem[],
  growth: [
    {
      key: 'professional',
      title: {
        zh: '专业能力',
        en: 'Professional Capability'
      },
      summary: {
        zh: '专业能力决定你能否稳定解决关键问题，是职业竞争力的底层资产。',
        en: 'Professional capability determines whether you can reliably solve important problems. It is a core career asset.'
      },
      practices: [
        {
          zh: '建立专业知识地图',
          en: 'Build a professional knowledge map'
        },
        {
          zh: '做可展示的高质量项目',
          en: 'Ship demonstrable high-quality projects'
        }
      ],
      tags: [
        {
          zh: '专业能力',
          en: 'Professional Capability'
        },
        {
          zh: '深度',
          en: 'Depth'
        }
      ]
    },
    {
      key: 'learning',
      title: {
        zh: '学习能力',
        en: 'Learning Ability'
      },
      summary: {
        zh: '行业变化越快，学习能力越重要。真正的学习是把新知识转化为可迁移能力。',
        en: 'The faster an industry changes, the more learning ability matters. Real learning turns new knowledge into transferable capability.'
      },
      practices: [
        {
          zh: '定期复盘知识缺口',
          en: 'Review knowledge gaps regularly'
        },
        {
          zh: '用项目倒逼学习',
          en: 'Use projects to force learning'
        }
      ],
      tags: [
        {
          zh: '学习能力',
          en: 'Learning Ability'
        },
        {
          zh: '终身学习',
          en: 'Lifelong Learning'
        }
      ]
    },
    {
      key: 'project',
      title: {
        zh: '项目经验',
        en: 'Project Experience'
      },
      summary: {
        zh: '项目经验是能力的证据。优秀项目能展示判断、协作、执行和结果。',
        en: 'Project experience is evidence of capability. Strong projects demonstrate judgment, collaboration, execution, and outcomes.'
      },
      practices: [
        {
          zh: '记录项目背景、角色、动作和结果',
          en: 'Record context, role, actions, and results'
        },
        {
          zh: '沉淀可复用方法',
          en: 'Distill reusable methods'
        }
      ],
      tags: [
        {
          zh: '项目经验',
          en: 'Project Experience'
        },
        {
          zh: '作品',
          en: 'Artifacts'
        }
      ]
    },
    {
      key: 'communication',
      title: {
        zh: '沟通能力',
        en: 'Communication'
      },
      summary: {
        zh: '沟通能力不是会说话，而是能让目标、问题、事实、风险和下一步行动变清楚。',
        en: 'Communication is not talkativeness. It makes goals, problems, facts, risks, and next actions clear.'
      },
      practices: [
        {
          zh: '用结构化表达汇报问题',
          en: 'Report problems with structure'
        },
        {
          zh: '提前同步风险和依赖',
          en: 'Surface risks and dependencies early'
        }
      ],
      tags: [
        {
          zh: '沟通能力',
          en: 'Communication'
        },
        {
          zh: '协作',
          en: 'Collaboration'
        }
      ]
    },
    {
      key: 'management',
      title: {
        zh: '管理能力',
        en: 'Management'
      },
      summary: {
        zh: '管理不是控制别人，而是设定目标、配置资源、建立机制并帮助团队交付结果。',
        en: 'Management is not controlling others. It sets goals, allocates resources, builds mechanisms, and helps teams deliver outcomes.'
      },
      practices: [
        {
          zh: '拆解目标与责任',
          en: 'Break down goals and responsibility'
        },
        {
          zh: '建立反馈与复盘节奏',
          en: 'Build feedback and review cadence'
        }
      ],
      tags: [
        {
          zh: '管理',
          en: 'Management'
        },
        {
          zh: '领导力',
          en: 'Leadership'
        }
      ]
    }
  ] satisfies CareerCapability[],
  companyChoices: [
    {
      title: {
        zh: '大公司优势',
        en: 'Big Company Advantages'
      },
      context: {
        zh: '优秀大公司提供更大的视野、更成熟的流程、更丰富的资源和更系统的管理训练。',
        en: 'Excellent big companies provide broader perspective, mature processes, richer resources, and more systematic management training.'
      },
      questions: [
        {
          zh: '这家公司是否有优秀业务和高密度人才？',
          en: 'Does this company have strong business and dense talent?'
        },
        {
          zh: '岗位是否能接触核心流程和真实问题？',
          en: 'Can the role access core processes and real problems?'
        }
      ],
      recommendation: {
        zh: '早期优先进入优秀大公司，先学习标准、流程和职业基本功。',
        en: 'Early career should prioritize excellent big companies to learn standards, processes, and professional fundamentals.'
      }
    },
    {
      title: {
        zh: '小公司优势',
        en: 'Startup Advantages'
      },
      context: {
        zh: '小公司提供更大的职责广度、灵活性和决策速度，但也更依赖个人判断和抗风险能力。',
        en: 'Startups provide broader responsibility, flexibility, and decision speed, but depend more on personal judgment and risk tolerance.'
      },
      questions: [
        {
          zh: '创始团队是否可靠？',
          en: 'Is the founding team reliable?'
        },
        {
          zh: '业务是否有真实客户和增长逻辑？',
          en: 'Does the business have real customers and a growth logic?'
        }
      ],
      recommendation: {
        zh: '积累经验后再考虑小公司或创业。求同存异，这只是个人观点。',
        en: 'Consider startups or entrepreneurship after accumulating experience. This is a personal view, offered with room for disagreement.'
      }
    }
  ] satisfies CareerDecision[],
  entrepreneurship: [
    {
      title: {
        zh: '创业前提',
        en: 'Entrepreneurship Prerequisites'
      },
      summary: {
        zh: '创业前需要验证需求、能力圈、现金流、安全边际、团队和家庭支持。',
        en: 'Before entrepreneurship, validate demand, circle of competence, cash flow, margin of safety, team, and family support.'
      },
      category: {
        zh: '创业',
        en: 'Entrepreneurship'
      },
      tags: [
        {
          zh: '创业前提',
          en: 'Entrepreneurship Prerequisites'
        },
        {
          zh: '风险',
          en: 'Risk'
        }
      ]
    },
    {
      title: {
        zh: '创业风险',
        en: 'Entrepreneurship Risk'
      },
      summary: {
        zh: '创业失败率高，最大风险往往不是想法不好，而是现金流、团队、执行和市场节奏错配。',
        en: 'Entrepreneurship has a high failure rate. The main risk is often not the idea, but mismatch among cash flow, team, execution, and market timing.'
      },
      category: {
        zh: '风险管理',
        en: 'Risk Management'
      },
      tags: [
        {
          zh: '风险',
          en: 'Risk'
        },
        {
          zh: '现金流',
          en: 'Cash Flow'
        }
      ]
    },
    {
      title: {
        zh: '创业能力要求',
        en: 'Entrepreneurial Capability'
      },
      summary: {
        zh: '创业要求产品、销售、组织、融资、财务、心理韧性和持续学习能力的组合。',
        en: 'Entrepreneurship requires a combination of product, sales, organization, financing, finance, resilience, and continuous learning.'
      },
      category: {
        zh: '能力要求',
        en: 'Capability Requirement'
      },
      tags: [
        {
          zh: '创业能力',
          en: 'Entrepreneurial Capability'
        },
        {
          zh: '心理韧性',
          en: 'Psychological Resilience'
        }
      ]
    },
    {
      title: {
        zh: '管理能力',
        en: 'Management Capability'
      },
      summary: {
        zh: '创业后最大的变化，是从个人贡献者变成组织系统设计者。',
        en: 'After starting a company, the biggest shift is from individual contributor to organizational system designer.'
      },
      category: {
        zh: '管理',
        en: 'Management'
      },
      tags: [
        {
          zh: '管理',
          en: 'Management'
        },
        {
          zh: '组织能力',
          en: 'Organizational Capability'
        }
      ]
    }
  ] satisfies TaggedCareerItem[],
  operatingModel: [
    {
      key: 'perception',
      title: {
        zh: '感知',
        en: 'Perception'
      },
      summary: {
        zh: '观察行业、岗位、组织、上级、客户、机会和风险。',
        en: 'Observe industry, role, organization, manager, customers, opportunities, and risks.'
      }
    },
    {
      key: 'cognition',
      title: {
        zh: '认知',
        en: 'Cognition'
      },
      summary: {
        zh: '理解商业模式、组织逻辑、岗位价值和能力缺口。',
        en: 'Understand business model, organizational logic, role value, and capability gaps.'
      }
    },
    {
      key: 'decision',
      title: {
        zh: '决策',
        en: 'Decision'
      },
      summary: {
        zh: '选择行业、公司、岗位、项目、学习路径和职业节奏。',
        en: 'Choose industry, company, role, projects, learning path, and career rhythm.'
      }
    },
    {
      key: 'execution',
      title: {
        zh: '执行',
        en: 'Execution'
      },
      summary: {
        zh: '通过项目交付、专业训练、沟通协作和结果负责证明能力。',
        en: 'Prove capability through project delivery, professional training, communication, collaboration, and ownership.'
      }
    },
    {
      key: 'feedback',
      title: {
        zh: '反馈',
        en: 'Feedback'
      },
      summary: {
        zh: '用结果、评价、收入、机会、关系和成长速度校准路径。',
        en: 'Use outcomes, feedback, income, opportunities, relationships, and growth speed to calibrate the path.'
      }
    },
    {
      key: 'evolution',
      title: {
        zh: '迭代',
        en: 'Evolution'
      },
      summary: {
        zh: '升级能力模型，调整职业定位，形成下一阶段竞争力。',
        en: 'Upgrade the capability model, adjust career positioning, and form competitiveness for the next stage.'
      }
    }
  ],
  caseStudies: [
    {
      type: {
        zh: '人物案例',
        en: 'People Cases'
      },
      title: {
        zh: '职业成长人物样本',
        en: 'Career Growth People Samples'
      },
      summary: {
        zh: '研究黄仁勋、任正非、马斯克、贝索斯等人的成长路径、职业决策和管理思想。',
        en: 'Study the growth paths, career decisions, and management thinking of Jensen Huang, Ren Zhengfei, Elon Musk, Jeff Bezos, and others.'
      },
      examples: [
        {
          zh: '黄仁勋',
          en: 'Jensen Huang'
        },
        {
          zh: '任正非',
          en: 'Ren Zhengfei'
        },
        {
          zh: '马斯克',
          en: 'Elon Musk'
        },
        {
          zh: '贝索斯',
          en: 'Jeff Bezos'
        }
      ],
      lens: [
        {
          zh: '成长路径',
          en: 'Growth path'
        },
        {
          zh: '职业决策',
          en: 'Career decisions'
        },
        {
          zh: '管理思想',
          en: 'Management thinking'
        }
      ],
      tags: [
        {
          zh: '人物案例',
          en: 'People Cases'
        },
        {
          zh: '管理',
          en: 'Management'
        }
      ]
    },
    {
      type: {
        zh: '企业案例',
        en: 'Company Cases'
      },
      title: {
        zh: '组织与人才系统样本',
        en: 'Organization and Talent System Samples'
      },
      summary: {
        zh: '研究华为、英伟达、丰田、亚马逊如何通过组织机制、人才密度和管理系统形成长期竞争力。',
        en: 'Study how Huawei, NVIDIA, Toyota, and Amazon build long-term competitiveness through mechanisms, talent density, and management systems.'
      },
      examples: [
        {
          zh: '华为',
          en: 'Huawei'
        },
        {
          zh: '英伟达',
          en: 'NVIDIA'
        },
        {
          zh: '丰田',
          en: 'Toyota'
        },
        {
          zh: '亚马逊',
          en: 'Amazon'
        }
      ],
      lens: [
        {
          zh: '组织机制',
          en: 'Organization mechanisms'
        },
        {
          zh: '人才培养',
          en: 'Talent development'
        },
        {
          zh: '管理系统',
          en: 'Management system'
        }
      ],
      tags: [
        {
          zh: '企业案例',
          en: 'Company Cases'
        },
        {
          zh: '组织能力',
          en: 'Organizational Capability'
        }
      ]
    }
  ] satisfies CareerCaseStudy[],
  reviewTimeline: [
    {
      moment: {
        zh: '项目结束',
        en: 'After Project'
      },
      title: {
        zh: '项目复盘',
        en: 'Project Review'
      },
      summary: {
        zh: '复盘目标、角色、关键动作、协作问题、结果和可复用方法。',
        en: 'Review goals, role, key actions, collaboration issues, outcomes, and reusable methods.'
      },
      checkpoints: [
        {
          zh: '真正创造的价值是什么？',
          en: 'What value was actually created?'
        },
        {
          zh: '下次如何更快更稳地交付？',
          en: 'How can delivery become faster and more reliable next time?'
        }
      ]
    },
    {
      moment: {
        zh: '晋升前后',
        en: 'Around Promotion'
      },
      title: {
        zh: '晋升复盘',
        en: 'Promotion Review'
      },
      summary: {
        zh: '复盘能力是否匹配新职责，是否从个人贡献转向更高层级价值创造。',
        en: 'Review whether capability matches new responsibility and whether value creation has moved to a higher level.'
      },
      checkpoints: [
        {
          zh: '晋升依赖的是能力、关系还是机会？',
          en: 'Was promotion driven by capability, relationships, or opportunity?'
        },
        {
          zh: '新岗位需要补什么能力？',
          en: 'What capability must be added for the new role?'
        }
      ]
    },
    {
      moment: {
        zh: '面试之后',
        en: 'After Interview'
      },
      title: {
        zh: '面试复盘',
        en: 'Interview Review'
      },
      summary: {
        zh: '复盘岗位匹配度、表达质量、项目证据、薪酬预期和对公司的判断。',
        en: 'Review role fit, communication quality, project evidence, compensation expectation, and company judgment.'
      },
      checkpoints: [
        {
          zh: '哪些问题没有讲清楚？',
          en: 'Which questions were not answered clearly?'
        },
        {
          zh: '这家公司是否值得长期投入？',
          en: 'Is this company worth long-term commitment?'
        }
      ]
    },
    {
      moment: {
        zh: '跳槽决策',
        en: 'Job Change'
      },
      title: {
        zh: '跳槽复盘',
        en: 'Job Change Review'
      },
      summary: {
        zh: '复盘跳槽动机、行业方向、公司质量、岗位价值、薪酬结构和长期选择权。',
        en: 'Review motivation, industry direction, company quality, role value, compensation structure, and long-term optionality.'
      },
      checkpoints: [
        {
          zh: '这是逃避问题还是进入更好机会？',
          en: 'Is this escaping a problem or entering a better opportunity?'
        },
        {
          zh: '新选择是否增强长期竞争力？',
          en: 'Does the new choice strengthen long-term competitiveness?'
        }
      ]
    }
  ] satisfies CareerReviewItem[],
  graph: {
    nodes: [
      'career',
      'career-philosophy',
      'career-path',
      'career-growth',
      'company-choice',
      'entrepreneurship',
      'career-operating-system',
      'case-studies',
      'career-review',
      'life-os'
    ],
    edges: [
      ['career', 'life-os'],
      ['career-philosophy', 'career-path'],
      ['career-path', 'career-growth'],
      ['career-growth', 'company-choice'],
      ['company-choice', 'entrepreneurship'],
      ['career-operating-system', 'career-growth'],
      ['case-studies', 'career-review'],
      ['career-review', 'career-operating-system']
    ]
  }
};

export const careerTaxonomy = [
  {
    title: careerContent.sections.philosophy,
    summary: careerContent.sectionIntros.philosophy,
    href: '#career-philosophy',
    categories: ['Career', 'Life OS', 'Learning and Growth'],
    tags: ['Career Philosophy', 'Career Development', 'Value Creation', 'Long-Term Strategy']
  },
  {
    title: careerContent.sections.path,
    summary: careerContent.sectionIntros.path,
    href: '#career-path',
    categories: ['Career', 'Methods and Judgment', 'Learning and Growth'],
    tags: ['Career Path', 'Career Planning', 'Capability Compounding', 'Career Decision']
  },
  {
    title: careerContent.sections.growth,
    summary: careerContent.sectionIntros.growth,
    href: '#career-growth',
    categories: ['Career', 'Learning and Growth'],
    tags: ['Career Growth', 'Professional Capability', 'Learning Ability', 'Project Experience']
  },
  {
    title: careerContent.sections.company,
    summary: careerContent.sectionIntros.company,
    href: '#company-choice',
    categories: ['Career', 'Company Research'],
    tags: ['Big Company', 'Startup', 'Career Decision', 'Company Culture']
  },
  {
    title: careerContent.sections.entrepreneurship,
    summary: careerContent.sectionIntros.entrepreneurship,
    href: '#entrepreneurship',
    categories: ['Career', 'Company Research'],
    tags: ['Entrepreneurship', 'Management', 'Risk Management', 'Cash Flow']
  },
  {
    title: careerContent.sections.model,
    summary: careerContent.sectionIntros.model,
    href: '#career-operating-system',
    categories: ['Career', 'Life OS'],
    tags: ['Career Operating System', 'Systems Thinking', 'Feedback', 'Iteration']
  },
  {
    title: careerContent.sections.cases,
    summary: careerContent.sectionIntros.cases,
    href: '#career-case-studies',
    categories: ['Career', 'People and Leadership', 'Company Research'],
    tags: ['Career Case Studies', 'People Cases', 'Company Cases', 'Management Thinking']
  },
  {
    title: careerContent.sections.review,
    summary: careerContent.sectionIntros.review,
    href: '#career-review',
    categories: ['Career', 'Life OS', 'Learning and Growth'],
    tags: ['Career Review', 'Project Review', 'Promotion Review', 'Interview Review']
  }
] as const;
