import type {Locale} from '@/lib/i18n';

export type LocalizedText = Record<Locale, string>;

export type InvestmentItem = {
  title: LocalizedText;
  summary: LocalizedText;
  items: LocalizedText[];
  tags: LocalizedText[];
};

export function it(value: LocalizedText, locale: Locale) {
  return value[locale];
}

export const investmentContent = {
  hero: {
    title: {
      zh: 'Investment 投资',
      en: 'Investment'
    },
    subtitle: {
      zh: '投资不仅包含股票，也包括 ETF、房地产、企业、自我投资以及长期资产配置。',
      en: 'Investment includes not only stocks, but also ETFs, real estate, businesses, self-investment, and long-term asset allocation.'
    },
    thesis: {
      zh: '投资是把职业现金流、认知能力和长期判断转化为资产的系统。',
      en: 'Investment converts career cash flow, cognitive ability, and long-term judgment into assets.'
    }
  },
  sections: {
    architecture: {
      zh: '投资体系',
      en: 'Investment System'
    },
    assets: {
      zh: '资产类别',
      en: 'Asset Classes'
    },
    career: {
      zh: '职业联动',
      en: 'Career Link'
    }
  },
  assets: [
    {
      title: {
        zh: '股票',
        en: 'Stocks'
      },
      summary: {
        zh: '股票是企业所有权的一部分，核心是理解公司、商业模式、估值和风险。',
        en: 'Stocks are fractional business ownership. The core is understanding companies, business models, valuation, and risk.'
      },
      items: [
        {
          zh: '公司研究',
          en: 'Company research'
        },
        {
          zh: '商业模式',
          en: 'Business model'
        },
        {
          zh: '财报与估值',
          en: 'Financials and valuation'
        }
      ],
      tags: [
        {
          zh: '股票',
          en: 'Stocks'
        },
        {
          zh: '企业所有权',
          en: 'Business Ownership'
        }
      ]
    },
    {
      title: {
        zh: 'ETF',
        en: 'ETFs'
      },
      summary: {
        zh: 'ETF 适合用低成本、分散化方式参与长期经济增长。',
        en: 'ETFs are a low-cost, diversified way to participate in long-term economic growth.'
      },
      items: [
        {
          zh: '指数化',
          en: 'Indexing'
        },
        {
          zh: '分散风险',
          en: 'Diversification'
        },
        {
          zh: '长期持有',
          en: 'Long-term holding'
        }
      ],
      tags: [
        {
          zh: 'ETF',
          en: 'ETF'
        },
        {
          zh: '长期投资',
          en: 'Long-Term Investing'
        }
      ]
    },
    {
      title: {
        zh: '房地产',
        en: 'Real Estate'
      },
      summary: {
        zh: '房地产要同时看居住价值、现金流、杠杆、城市结构和人口变化。',
        en: 'Real estate requires judging living value, cash flow, leverage, city structure, and demographic change.'
      },
      items: [
        {
          zh: '居住价值',
          en: 'Living value'
        },
        {
          zh: '现金流',
          en: 'Cash flow'
        },
        {
          zh: '杠杆风险',
          en: 'Leverage risk'
        }
      ],
      tags: [
        {
          zh: '房地产',
          en: 'Real Estate'
        },
        {
          zh: '现金流',
          en: 'Cash Flow'
        }
      ]
    },
    {
      title: {
        zh: '企业',
        en: 'Businesses'
      },
      summary: {
        zh: '投资企业本质上是投资现金流、团队、商业模式、护城河和资本配置能力。',
        en: 'Investing in businesses means investing in cash flow, team, business model, moat, and capital allocation.'
      },
      items: [
        {
          zh: '商业模式',
          en: 'Business model'
        },
        {
          zh: '竞争壁垒',
          en: 'Competitive moat'
        },
        {
          zh: '资本配置',
          en: 'Capital allocation'
        }
      ],
      tags: [
        {
          zh: '企业',
          en: 'Business'
        },
        {
          zh: '资本配置',
          en: 'Capital Allocation'
        }
      ]
    },
    {
      title: {
        zh: '自我投资',
        en: 'Self-Investment'
      },
      summary: {
        zh: '普通人最重要的早期投资，往往是提升能力、健康、认知、作品和职业现金流。',
        en: 'For most people, the most important early investment is capability, health, cognition, artifacts, and career cash flow.'
      },
      items: [
        {
          zh: '能力升级',
          en: 'Capability upgrade'
        },
        {
          zh: '健康基础',
          en: 'Health foundation'
        },
        {
          zh: '职业现金流',
          en: 'Career cash flow'
        }
      ],
      tags: [
        {
          zh: '自我投资',
          en: 'Self-Investment'
        },
        {
          zh: '职业发展',
          en: 'Career Development'
        }
      ]
    }
  ] satisfies InvestmentItem[],
  graph: {
    nodes: ['investment', 'stocks', 'etf', 'real-estate', 'businesses', 'self-investment', 'career', 'life-os'],
    edges: [
      ['investment', 'stocks'],
      ['investment', 'etf'],
      ['investment', 'real-estate'],
      ['investment', 'businesses'],
      ['investment', 'self-investment'],
      ['career', 'self-investment'],
      ['career', 'investment'],
      ['investment', 'life-os']
    ]
  }
};

export const investmentTaxonomy = [
  {
    title: investmentContent.sections.architecture,
    summary: investmentContent.hero.subtitle,
    href: '#investment-system',
    categories: ['Investing', 'Life OS'],
    tags: ['Investment Framework', 'Asset Allocation', 'Long-Term Investing']
  },
  {
    title: investmentContent.sections.assets,
    summary: investmentContent.hero.thesis,
    href: '#asset-classes',
    categories: ['Investing', 'Career'],
    tags: ['Stocks', 'ETF', 'Real Estate', 'Self-Investment']
  },
  {
    title: investmentContent.sections.career,
    summary: {
      zh: '职业创造现金流，投资负责让现金流和认知长期复利。',
      en: 'Career creates cash flow; investing compounds cash flow and judgment over time.'
    },
    href: '#career-link',
    categories: ['Investing', 'Career', 'Life OS'],
    tags: ['Career Development', 'Cash Flow', 'Long-Term Investing']
  }
] as const;
