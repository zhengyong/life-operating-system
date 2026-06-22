'use client';

import Link from 'next/link';
import {Search, X} from 'lucide-react';
import {useMemo, useState} from 'react';
import type {Locale} from '@/lib/i18n';
import type {TagCloudItem} from '@/components/TagCloudPlayground';

type GroupDefinition = {
  id: string;
  label: Record<Locale, string>;
  names: string[];
  keywords: string[];
};

const groupDefinitions: GroupDefinition[] = [
  {
    id: 'life-os',
    label: {en: 'Life OS & Mental Models', zh: 'Life OS 与认知框架'},
    names: [
      'Life OS',
      'Operating System',
      'Systems Thinking',
      'First-Principles Thinking',
      'First Principles',
      'Mental Models',
      'Cognitive Models',
      'World Models',
      'Decision Making',
      'Judgment',
      'Analysis',
      'Problem Decomposition',
      'Inversion Thinking',
      'Reality Calibration',
      'Trade-Offs'
    ],
    keywords: ['model', 'thinking', 'decision', 'judgment', 'analysis', 'system', 'principle']
  },
  {
    id: 'learning',
    label: {en: 'Learning & Education', zh: '学习与教育'},
    names: [
      'Learning and Growth',
      'Lifelong Learning',
      'Knowledge Foundation',
      'Knowledge Compound Interest',
      'Cognitive Compound Interest',
      'Education',
      'Education Philosophy',
      'Education Practice',
      'Education Case Studies',
      'Education Resources',
      'Education Stages',
      'Education Trends',
      'Curriculum',
      'Project-Based Learning',
      'Personalized Education',
      'Personalized Learning',
      'Learning Framework',
      'Learning Ability',
      'Practice',
      'Feedback'
    ],
    keywords: ['learning', 'education', 'knowledge', 'curriculum', 'practice', 'compound']
  },
  {
    id: 'career',
    label: {en: 'Career & Work', zh: '职业与工作'},
    names: [
      'Career',
      'Career Development',
      'Career Growth',
      'Career Operating System',
      'Career Path',
      'Career Philosophy',
      'Career Planning',
      'Career Review',
      'Career Case Studies',
      'Career Decision',
      'Professional Capability',
      'Professional Depth',
      'Skill Development',
      'High-Value Roles',
      'Interview Review',
      'Project Experience',
      'Project Review',
      'Promotion Review',
      'Talent',
      'Talent Development',
      'T-Shaped Talent',
      'Management',
      'Management Thinking',
      'Collaboration',
      'Communication'
    ],
    keywords: ['career', 'professional', 'skill', 'talent', 'project', 'management', 'interview']
  },
  {
    id: 'business',
    label: {en: 'Business & Company Studies', zh: '商业与公司研究'},
    names: [
      'Business',
      'Business Model',
      'Business Ownership',
      'Great Companies',
      'Company Cases',
      'Company Culture',
      'Competitive Moat',
      'Platform Strategy',
      'Product Strategy',
      'Capital Allocation',
      'Cash Flow',
      'Margin of Safety',
      'Risk',
      'Risk Management',
      'Value',
      'Value Creation',
      'Value Exchange',
      'Wealth',
      'Family Wealth',
      'Real Estate'
    ],
    keywords: ['business', 'company', 'capital', 'asset', 'risk', 'value', 'wealth']
  },
  {
    id: 'ai-technology',
    label: {en: 'AI, Technology & Civilization', zh: 'AI、技术与文明'},
    names: [
      'AI',
      'AI Tools',
      'AI Learning',
      'Technology Trend',
      'Developer Ecosystem',
      'Infrastructure',
      'Civilization',
      'Artifacts',
      'Public Narrative',
      'Creativity'
    ],
    keywords: ['ai', 'technology', 'developer', 'ecosystem', 'infrastructure', 'civilization']
  },
  {
    id: 'life',
    label: {en: 'Life, Health & Relationships', zh: '人生、健康与关系'},
    names: [
      'Life',
      'Life Philosophy',
      'Life Case Studies',
      'Life Positioning',
      'Life Review',
      'Life Strategy',
      'Life Turning Point',
      'Personal Growth',
      'Self Awareness',
      'Self Knowledge',
      'Self Discipline',
      'Strengths',
      'Weaknesses',
      'Health',
      'Health and Growth',
      'Sleep',
      'Exercise',
      'Habits',
      'Happiness',
      'Meaning',
      'Motivation',
      'Patience',
      'Relationships',
      'Marriage',
      'Marriage and Family',
      'Family',
      'Family Education',
      'Family Cases',
      'Family Affection',
      'Friendship',
      'Love',
      'Parent-Child Relationship',
      'Parent-Child Communication',
      'Emotional Management',
      'Psychological Resilience',
      'Social Environment',
      'Social Network'
    ],
    keywords: ['life', 'self', 'health', 'family', 'relationship', 'marriage', 'social', 'happiness']
  },
  {
    id: 'people-growth',
    label: {en: 'People & Long-Term Growth', zh: '人物与长期成长'},
    names: [
      'Great People',
      'People Cases',
      'Role Models',
      'Leadership',
      'Long-Term Strategy',
      'Long-Term Capability',
      'Long-Term Trust',
      'Long-Termism',
      'Responsibility',
      'Independence',
      'Independent Thinking',
      'Optionality',
      'Freedom',
      'Growth',
      'Growth Environment',
      'Growth Path',
      'Positive Loop',
      'Iteration',
      'Assessment',
      'Focus',
      'Curiosity'
    ],
    keywords: ['people', 'leadership', 'long-term', 'growth', 'responsibility', 'focus']
  }
];

const otherGroup = {
  id: 'other',
  label: {en: 'Other Tags', zh: '其他标签'}
};

function getGroupId(name: string) {
  const normalized = name.toLowerCase();

  for (const group of groupDefinitions) {
    if (group.names.some((groupName) => groupName.toLowerCase() === normalized)) {
      return group.id;
    }

    if (group.keywords.some((keyword) => normalized.includes(keyword))) {
      return group.id;
    }
  }

  return otherGroup.id;
}

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

function sortTags(a: TagCloudItem, b: TagCloudItem) {
  if (b.count !== a.count) {
    return b.count - a.count;
  }

  return a.label.localeCompare(b.label);
}

export function TagDirectory({items, locale}: {items: TagCloudItem[]; locale: Locale}) {
  const [query, setQuery] = useState('');
  const normalizedQuery = normalizeText(query);

  const filteredItems = useMemo(() => {
    const sorted = [...items].sort(sortTags);

    if (!normalizedQuery) {
      return sorted;
    }

    return sorted.filter((item) => {
      const haystack = `${item.name} ${item.label}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [items, normalizedQuery]);

  const groupedItems = useMemo(() => {
    const groups = new Map<string, TagCloudItem[]>();

    filteredItems.forEach((item) => {
      const groupId = normalizedQuery ? 'results' : getGroupId(item.name);
      groups.set(groupId, [...(groups.get(groupId) ?? []), item]);
    });

    if (normalizedQuery) {
      return [
        {
          id: 'results',
          label: locale === 'zh' ? '搜索结果' : 'Search Results',
          items: groups.get('results') ?? []
        }
      ];
    }

    return [...groupDefinitions, otherGroup]
      .map((group) => ({
        id: group.id,
        label: group.label[locale],
        items: groups.get(group.id) ?? []
      }))
      .filter((group) => group.items.length > 0);
  }, [filteredItems, locale, normalizedQuery]);

  const totalArticleRefs = items.reduce((sum, item) => sum + (item.articleCount ?? 0), 0);

  return (
    <section id="all-tags" className="mt-14 scroll-mt-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-normal text-ink">
            {locale === 'zh' ? '全部标签' : 'All Tags'}
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            {locale === 'zh'
              ? `${items.length} 个标签 / ${totalArticleRefs} 篇文章引用`
              : `${items.length} tags / ${totalArticleRefs} article references`}
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={locale === 'zh' ? '搜索标签' : 'Search tags'}
            aria-label={locale === 'zh' ? '搜索标签' : 'Search tags'}
            className="h-11 w-full rounded-md border border-line bg-white pl-9 pr-10 text-sm outline-none transition focus:border-accent"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted transition hover:bg-soft hover:text-accent"
              aria-label={locale === 'zh' ? '清除搜索' : 'Clear search'}
            >
              <X className="h-4 w-4" />
            </button>
          ) : null}
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-line bg-white">
        {groupedItems.map((group, index) => (
          <section key={group.id} className={index > 0 ? 'border-t border-line' : undefined}>
            <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-4 sm:px-5">
              <h3 className="text-base font-semibold tracking-normal text-ink">{group.label}</h3>
              <span className="text-xs font-medium text-muted">
                {locale === 'zh' ? `${group.items.length} 个` : `${group.items.length} tags`}
              </span>
            </div>
            {group.items.length > 0 ? (
              <div className="flex flex-wrap gap-2 px-4 pb-5 sm:px-5">
                {group.items.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="inline-flex min-h-9 items-center gap-2 rounded-md border border-line bg-soft px-3 py-1.5 text-sm font-medium text-ink transition hover:border-accent hover:bg-white hover:text-accent"
                  >
                    <span>{item.label}</span>
                    <span className="rounded bg-white px-1.5 py-0.5 text-[11px] font-semibold text-muted">
                      {item.count}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="px-5 pb-5 text-sm text-muted">{locale === 'zh' ? '没有匹配的标签。' : 'No matching tags.'}</p>
            )}
          </section>
        ))}
      </div>
    </section>
  );
}
