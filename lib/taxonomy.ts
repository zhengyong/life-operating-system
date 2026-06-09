import type {Locale} from '@/lib/i18n';
import {slugify} from '@/lib/utils';

const categoryLabels: Record<string, {en: string; zh: string}> = {
  'Life OS': {en: 'Life OS', zh: '人生操作系统'},
  'World Models': {en: 'World Models', zh: '世界模型'},
  'Methods and Judgment': {en: 'Methods and Judgment', zh: '方法与判断'},
  'Learning and Growth': {en: 'Learning and Growth', zh: '学习与成长'},
  'People and Leadership': {en: 'People and Leadership', zh: '人物与领导力'},
  'Company Research': {en: 'Company Research', zh: '公司研究'},
  Investing: {en: 'Investing', zh: '投资'},
  'AI and Technology': {en: 'AI and Technology', zh: 'AI 与技术'},
  Civilization: {en: 'Civilization', zh: '文明'}
};

const tagLabels: Record<string, {en: string; zh: string}> = {
  AI: {en: 'AI', zh: '人工智能'},
  Analysis: {en: 'Analysis', zh: '分析'},
  'AI Tools': {en: 'AI Tools', zh: 'AI 工具'},
  'Business Model': {en: 'Business Model', zh: '商业模式'},
  'Capital Allocation': {en: 'Capital Allocation', zh: '资本配置'},
  'Career Development': {en: 'Career Development', zh: '职场成长'},
  Civilization: {en: 'Civilization', zh: '文明'},
  'Company Culture': {en: 'Company Culture', zh: '企业文化'},
  'Competitive Moat': {en: 'Competitive Moat', zh: '竞争壁垒'},
  'Cognitive Compound Interest': {en: 'Cognitive Compound Interest', zh: '认知复利'},
  'Cognitive Models': {en: 'Cognitive Models', zh: '认知模型'},
  'Compound Interest': {en: 'Compound Interest', zh: '复利效应'},
  'Decision Making': {en: 'Decision Making', zh: '决策思维'},
  'Depth vs Breadth': {en: 'Depth vs. Breadth', zh: '深度与广度'},
  'Developer Ecosystem': {en: 'Developer Ecosystem', zh: '开发者生态'},
  'First-Principles Thinking': {en: 'First-Principles Thinking', zh: '第一性原理'},
  'First Principles': {en: 'First Principles', zh: '第一性原理'},
  'Great Companies': {en: 'Great Companies', zh: '伟大公司'},
  'Great People': {en: 'Great People', zh: '关键人物'},
  'Investment Framework': {en: 'Investment Framework', zh: '投资框架'},
  'Inversion Thinking': {en: 'Inversion Thinking', zh: '逆向思维'},
  'Knowledge Compound Interest': {en: 'Knowledge Compound Interest', zh: '知识复利'},
  'Knowledge Foundation': {en: 'Knowledge Foundation', zh: '知识底座'},
  Leadership: {en: 'Leadership', zh: '领导力'},
  'Life OS': {en: 'Life OS', zh: '人生操作系统'},
  'Life Positioning': {en: 'Life Positioning', zh: '人生定位'},
  'Life Strategy': {en: 'Life Strategy', zh: '人生策略'},
  'Lifelong Learning': {en: 'Lifelong Learning', zh: '终身学习'},
  'Long-Term Strategy': {en: 'Long-Term Strategy', zh: '长期战略'},
  'Mental Models': {en: 'Mental Models', zh: '思维模型'},
  'Operating System': {en: 'Operating System', zh: '操作系统'},
  'Personal Growth': {en: 'Personal Growth', zh: '个人成长'},
  'Platform Strategy': {en: 'Platform Strategy', zh: '平台战略'},
  'Problem Decomposition': {en: 'Problem Decomposition', zh: '问题拆解'},
  'Product Strategy': {en: 'Product Strategy', zh: '产品战略'},
  'Public Narrative': {en: 'Public Narrative', zh: '公共叙事'},
  'Self Discipline': {en: 'Self Discipline', zh: '自律'},
  'Systems Thinking': {en: 'Systems Thinking', zh: '系统思维'},
  'T-Shaped Talent': {en: 'T-Shaped Talent', zh: 'T 型人才'},
  'Technology Trend': {en: 'Technology Trend', zh: '技术趋势'},
  'Value Exchange': {en: 'Value Exchange', zh: '价值交换'},
  'World Models': {en: 'World Models', zh: '世界模型'}
};

function labelFromFallback(value: string, locale: Locale) {
  if (locale === 'en') {
    return value;
  }

  return value;
}

export function getCategoryLabel(category: string, locale: Locale) {
  return categoryLabels[category]?.[locale] ?? labelFromFallback(category, locale);
}

export function getTagLabel(tag: string, locale: Locale) {
  return tagLabels[tag]?.[locale] ?? labelFromFallback(tag, locale);
}

export function getCategoryHref(category: string, locale: Locale) {
  return `/${locale}/categories/${slugify(category)}/`;
}

export function getTagHref(tag: string, locale: Locale) {
  return `/${locale}/tags/${slugify(tag)}/`;
}
