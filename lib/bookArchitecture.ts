import {Locale} from '@/lib/i18n';

type LocalizedText = {
  zh: string;
  en: string;
};

export type BookArchitectureNode = {
  slug: string;
  label: LocalizedText;
  summary: LocalizedText;
  recommendations: Array<{
    title: LocalizedText;
    author: LocalizedText;
    note: LocalizedText;
  }>;
};

export const architectureTop: BookArchitectureNode = {
  slug: 'life-operating-system',
  label: {zh: '人生操作系统', en: 'Life OS'},
  summary: {zh: '价值、责任、文明', en: 'Values, responsibility, civilization'},
  recommendations: [
    {
      title: {zh: '《原则》', en: 'Principles'},
      author: {zh: '瑞·达利欧', en: 'Ray Dalio'},
      note: {zh: '学习如何把价值观、决策和组织实践做成可复用系统。', en: 'A reference for turning values, decisions, and practice into a reusable system.'}
    },
    {
      title: {zh: '《高效能人士的七个习惯》', en: 'The 7 Habits of Highly Effective People'},
      author: {zh: '史蒂芬·柯维', en: 'Stephen R. Covey'},
      note: {zh: '适合作为个人责任、长期成长和自我管理的基础读物。', en: 'A foundation for responsibility, long-term growth, and self-management.'}
    },
    {
      title: {zh: '《人类简史》', en: 'Sapiens'},
      author: {zh: '尤瓦尔·赫拉利', en: 'Yuval Noah Harari'},
      note: {zh: '从文明尺度理解个人选择所在的更大结构。', en: 'Places individual choice inside a broader civilizational frame.'}
    }
  ]
};

export const architectureMiddle: BookArchitectureNode[] = [
  {
    slug: 'cognitive-mindset',
    label: {zh: '认知心法', en: 'Cognition'},
    summary: {zh: '模型、方法、工具', en: 'Models, methods, tools'},
    recommendations: [
      {
        title: {zh: '《穷查理宝典》', en: 'Poor Charlie’s Almanack'},
        author: {zh: '查理·芒格', en: 'Charlie Munger'},
        note: {zh: '学习多元思维模型和跨学科判断。', en: 'A classic source for multidisciplinary mental models.'}
      },
      {
        title: {zh: '《思考，快与慢》', en: 'Thinking, Fast and Slow'},
        author: {zh: '丹尼尔·卡尼曼', en: 'Daniel Kahneman'},
        note: {zh: '理解直觉、偏误和慢思考的边界。', en: 'Useful for understanding intuition, bias, and slow thinking.'}
      },
      {
        title: {zh: '《Super Thinking》', en: 'Super Thinking'},
        author: {zh: 'Gabriel Weinberg / Lauren McCann', en: 'Gabriel Weinberg / Lauren McCann'},
        note: {zh: '把常用思维模型整理成可检索的工具箱。', en: 'A practical catalog of mental models.'}
      }
    ]
  },
  {
    slug: 'world-models',
    label: {zh: '世界模型', en: 'World Models'},
    summary: {zh: '结构、规律、常识', en: 'Structure, laws, common sense'},
    recommendations: [
      {
        title: {zh: '《现实不似你所见》', en: 'Reality Is Not What It Seems'},
        author: {zh: '卡洛·罗韦利', en: 'Carlo Rovelli'},
        note: {zh: '用物理学视角理解现实结构。', en: 'A physics lens for understanding the structure of reality.'}
      },
      {
        title: {zh: '《How the World Really Works》', en: 'How the World Really Works'},
        author: {zh: 'Vaclav Smil', en: 'Vaclav Smil'},
        note: {zh: '用能源、材料、食物和风险理解现代世界。', en: 'Explains the modern world through energy, materials, food, and risk.'}
      },
      {
        title: {zh: '《枪炮、病菌与钢铁》', en: 'Guns, Germs, and Steel'},
        author: {zh: '贾雷德·戴蒙德', en: 'Jared Diamond'},
        note: {zh: '从地理、技术和制度理解历史差异。', en: 'Connects geography, technology, and institutions to historical divergence.'}
      }
    ]
  },
  {
    slug: 'breakthrough-methods',
    label: {zh: '破局方法', en: 'Methods'},
    summary: {zh: '分析、判断、行动', en: 'Analysis, judgment, action'},
    recommendations: [
      {
        title: {zh: '《好战略，坏战略》', en: 'Good Strategy Bad Strategy'},
        author: {zh: '理查德·鲁梅尔特', en: 'Richard Rumelt'},
        note: {zh: '学习如何识别关键问题并形成行动抓手。', en: 'A clear guide to diagnosis, guiding policy, and coherent action.'}
      },
      {
        title: {zh: '《麦肯锡问题分析与解决技巧》', en: 'Bulletproof Problem Solving'},
        author: {zh: 'Charles Conn / Robert McLean', en: 'Charles Conn / Robert McLean'},
        note: {zh: '训练结构化拆解和假设驱动的问题解决。', en: 'A practical method for structured, hypothesis-driven problem solving.'}
      },
      {
        title: {zh: '《决断》', en: 'Decisive'},
        author: {zh: 'Chip Heath / Dan Heath', en: 'Chip Heath / Dan Heath'},
        note: {zh: '帮助把判断转化成更可靠的决策流程。', en: 'Helps turn judgment into a more reliable decision process.'}
      }
    ]
  },
  {
    slug: 'productivity-tools',
    label: {zh: '效率兵器', en: 'Tools'},
    summary: {zh: '工具、流程、AI', en: 'Tools, workflows, AI'},
    recommendations: [
      {
        title: {zh: '《搞定》', en: 'Getting Things Done'},
        author: {zh: '戴维·艾伦', en: 'David Allen'},
        note: {zh: '建立任务、项目和行动闭环。', en: 'A foundation for task, project, and action loops.'}
      },
      {
        title: {zh: '《打造第二大脑》', en: 'Building a Second Brain'},
        author: {zh: 'Tiago Forte', en: 'Tiago Forte'},
        note: {zh: '把知识管理变成可复用的个人生产系统。', en: 'Turns knowledge management into a reusable personal production system.'}
      },
      {
        title: {zh: '《深度工作》', en: 'Deep Work'},
        author: {zh: '卡尔·纽波特', en: 'Cal Newport'},
        note: {zh: '保护高质量注意力，提升复杂产出能力。', en: 'Protects attention for complex, high-quality output.'}
      }
    ]
  },
  {
    slug: 'problem-decomposition',
    label: {zh: '拆解', en: 'Framing'},
    summary: {zh: '表达、案例、判断', en: 'Expression, cases, judgment'},
    recommendations: [
      {
        title: {zh: '《金字塔原理》', en: 'The Pyramid Principle'},
        author: {zh: '芭芭拉·明托', en: 'Barbara Minto'},
        note: {zh: '训练结构化表达和问题呈现。', en: 'A classic for structured communication and problem framing.'}
      },
      {
        title: {zh: '《让创意更有黏性》', en: 'Made to Stick'},
        author: {zh: 'Chip Heath / Dan Heath', en: 'Chip Heath / Dan Heath'},
        note: {zh: '学习如何把复杂观点讲得清楚、有记忆点。', en: 'Helps make complex ideas clear and memorable.'}
      },
      {
        title: {zh: '《Case Interview Secrets》', en: 'Case Interview Secrets'},
        author: {zh: 'Victor Cheng', en: 'Victor Cheng'},
        note: {zh: '用案例训练问题拆解、假设和沟通。', en: 'Uses cases to train decomposition, hypotheses, and communication.'}
      }
    ]
  }
];

export const architectureFoundation: BookArchitectureNode = {
  slug: 'knowledge-foundation',
  label: {zh: '知识底座', en: 'Knowledge Foundation'},
  summary: {zh: '学科结构、跨学科理解、科学素养', en: 'Disciplines, interdisciplinary understanding, scientific literacy'},
  recommendations: [
    {
      title: {zh: '《万物简史》', en: 'A Short History of Nearly Everything'},
      author: {zh: '比尔·布莱森', en: 'Bill Bryson'},
      note: {zh: '建立科学通识和现代知识地图。', en: 'A broad map of scientific literacy and modern knowledge.'}
    },
    {
      title: {zh: '《费曼物理学讲义》', en: 'The Feynman Lectures on Physics'},
      author: {zh: '理查德·费曼', en: 'Richard Feynman'},
      note: {zh: '训练从基础学科理解世界的能力。', en: 'Trains understanding from foundational disciplines.'}
    },
    {
      title: {zh: '《历史的教训》', en: 'The Lessons of History'},
      author: {zh: '威尔·杜兰特 / 阿里尔·杜兰特', en: 'Will Durant / Ariel Durant'},
      note: {zh: '用简洁框架理解历史、社会和人性。', en: 'A compact frame for history, society, and human nature.'}
    }
  ]
};

export const architectureCapabilities: BookArchitectureNode[] = [
  {
    slug: 'cognition-system',
    label: {zh: '认识', en: 'Cognition'},
    summary: {zh: '如何看见问题', en: 'How to see problems'},
    recommendations: [
      {
        title: {zh: '《如何阅读一本书》', en: 'How to Read a Book'},
        author: {zh: '莫提默·艾德勒 / 查尔斯·范多伦', en: 'Mortimer Adler / Charles Van Doren'},
        note: {zh: '训练主动阅读和知识吸收。', en: 'Builds active reading and knowledge absorption.'}
      },
      {
        title: {zh: '《侦察兵思维》', en: 'The Scout Mindset'},
        author: {zh: 'Julia Galef', en: 'Julia Galef'},
        note: {zh: '训练求真、校准和更新判断。', en: 'Trains truth-seeking, calibration, and belief updating.'}
      }
    ]
  },
  {
    slug: 'method-system',
    label: {zh: '方法', en: 'Method'},
    summary: {zh: '如何解决问题', en: 'How to solve problems'},
    recommendations: [
      {
        title: {zh: '《系统之美》', en: 'Thinking in Systems'},
        author: {zh: '德内拉·梅多斯', en: 'Donella Meadows'},
        note: {zh: '理解系统结构、反馈和杠杆点。', en: 'Explains structure, feedback, and leverage points.'}
      },
      {
        title: {zh: '《Problem Solving 101》', en: 'Problem Solving 101'},
        author: {zh: 'Ken Watanabe', en: 'Ken Watanabe'},
        note: {zh: '适合建立清晰、简单的问题解决步骤。', en: 'A simple, clear process for problem solving.'}
      }
    ]
  },
  {
    slug: 'practice-system',
    label: {zh: '实践', en: 'Practice'},
    summary: {zh: '如何持续落地', en: 'How to keep executing'},
    recommendations: [
      {
        title: {zh: '《掌控习惯》', en: 'Atomic Habits'},
        author: {zh: 'James Clear', en: 'James Clear'},
        note: {zh: '把成长拆成可持续的小行为系统。', en: 'Turns growth into sustainable behavior systems.'}
      },
      {
        title: {zh: '《认知天性》', en: 'Make It Stick'},
        author: {zh: 'Peter Brown / Henry Roediger / Mark McDaniel', en: 'Peter Brown / Henry Roediger / Mark McDaniel'},
        note: {zh: '把学习实践转化为长期记忆和能力。', en: 'Turns learning practice into durable memory and skill.'}
      }
    ]
  }
];

export const bookArchitectureNodes = [architectureTop, ...architectureMiddle, architectureFoundation, ...architectureCapabilities];

export function getBookArchitectureNode(slug: string) {
  return bookArchitectureNodes.find((node) => node.slug === slug) ?? null;
}

export function t(value: LocalizedText, locale: Locale) {
  return value[locale];
}
