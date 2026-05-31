import type {Locale} from '@/lib/i18n';
import {slugify} from '@/lib/utils';

const categoryLabels: Record<string, {en: string; zh: string}> = {
  'Life OS': {en: 'Life OS', zh: '人生操作系统'},
  'First Principles': {en: 'First Principles', zh: '第一性原理'},
  'Mental Models': {en: 'Mental Models', zh: '心智模型'},
  Career: {en: 'Career', zh: '职场成长'},
  Investing: {en: 'Investing', zh: '投资'},
  Education: {en: 'Education', zh: '教育'},
  Technology: {en: 'Technology', zh: '技术'},
  Society: {en: 'Society', zh: '社会'},
  Civilization: {en: 'Civilization', zh: '文明'}
};

const tagLabels: Record<string, {en: string; zh: string}> = {
  AI: {en: 'AI', zh: '人工智能'},
  Analysis: {en: 'Analysis', zh: '分析'},
  'Career Development': {en: 'Career Development', zh: '职场成长'},
  'Cognitive Compound Interest': {en: 'Cognitive Compound Interest', zh: '认知复利'},
  'Cognitive Models': {en: 'Cognitive Models', zh: '认知模型'},
  'Compound Interest': {en: 'Compound Interest', zh: '复利效应'},
  'Decision Making': {en: 'Decision Making', zh: '决策思维'},
  'Depth vs Breadth': {en: 'Depth vs. Breadth', zh: '深度与广度'},
  'First Principles': {en: 'First Principles', zh: '第一性原理'},
  'Inversion Thinking': {en: 'Inversion Thinking', zh: '逆向思维'},
  'Knowledge Compound Interest': {en: 'Knowledge Compound Interest', zh: '知识复利'},
  'Life OS': {en: 'Life OS', zh: '人生操作系统'},
  'Life Positioning': {en: 'Life Positioning', zh: '人生定位'},
  'Life Strategy': {en: 'Life Strategy', zh: '人生策略'},
  'Lifelong Learning': {en: 'Lifelong Learning', zh: '终身学习'},
  'Mental Models': {en: 'Mental Models', zh: '思维模型'},
  'Personal Growth': {en: 'Personal Growth', zh: '个人成长'},
  'Self Discipline': {en: 'Self Discipline', zh: '自律'},
  'Systems Thinking': {en: 'Systems Thinking', zh: '系统思维'},
  'T-Shaped Talent': {en: 'T-Shaped Talent', zh: 'T 型人才'},
  'Value Exchange': {en: 'Value Exchange', zh: '价值交换'}
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
