import {CheckCircle2, ClipboardList, Compass} from 'lucide-react';
import type {Locale} from '@/lib/i18n';

type PracticeBlockProps = {
  locale: Locale;
  variant?: 'chapter' | 'topic';
};

const copy = {
  zh: {
    chapterTitle: '本章静态练习',
    topicTitle: '专题练习',
    intro: '不用登录，也不需要提交。把下面问题写到自己的笔记里，重点是把框架变成个人样本、真实选择和下一步行动。',
    reflect: '自我盘点',
    analyze: '结构分析',
    act: '一周行动',
    chapterItems: [
      '写下本章最触动你的一个判断，并说明它对应你生活里的哪个真实问题。',
      '把这个问题拆成事实、假设、约束、目标和可选方案。',
      '选择一个最小行动，在 7 天内验证一次，并记录结果。'
    ],
    topicItems: [
      '用这个专题解释你最近一个选择：你当时看见了什么，又忽略了什么？',
      '找一个相关人物、公司或文章，对照它们的判断逻辑。',
      '写下下次遇到类似问题时，你会优先检查的 3 件事。'
    ]
  },
  en: {
    chapterTitle: 'Chapter Practice',
    topicTitle: 'Topic Practice',
    intro:
      'No login or submission is required. Write these prompts in your own notes and turn the framework into personal evidence, real choices, and a next action.',
    reflect: 'Self audit',
    analyze: 'Structure',
    act: 'Next action',
    chapterItems: [
      'Write down the one judgment from this chapter that matters most to a real problem in your life.',
      'Break that problem into facts, assumptions, constraints, goals, and options.',
      'Choose one small action to test within seven days, then record what changed.'
    ],
    topicItems: [
      'Use this topic to explain one recent choice: what did you see, and what did you miss?',
      'Compare your reasoning with one related person, company, or article.',
      'Write three checks you will run next time a similar problem appears.'
    ]
  }
};

export function StaticPracticeBlock({locale, variant = 'chapter'}: PracticeBlockProps) {
  const t = copy[locale];
  const items = variant === 'chapter' ? t.chapterItems : t.topicItems;
  const labels = [t.reflect, t.analyze, t.act];
  const icons = [
    <Compass key="reflect" className="h-4 w-4" />,
    <ClipboardList key="analyze" className="h-4 w-4" />,
    <CheckCircle2 key="act" className="h-4 w-4" />
  ];

  return (
    <section className="mt-8 rounded-lg border border-line bg-white p-5 md:p-6">
      <h2 className="text-2xl font-semibold tracking-normal text-ink">
        {variant === 'chapter' ? t.chapterTitle : t.topicTitle}
      </h2>
      <p className="mt-3 text-sm leading-7 text-muted">{t.intro}</p>
      <div className="mt-5 grid gap-3 md:grid-cols-3">
        {items.map((item, index) => (
          <article key={item} className="rounded-md bg-soft p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-accent">
                {icons[index]}
              </span>
              {labels[index]}
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
