import type {Locale} from '@/lib/i18n';
import {slugify} from '@/lib/utils';

const categoryLabels: Record<string, {en: string; zh: string}> = {
  'Life OS': {en: 'Life OS', zh: '人生操作系统'},
  'World Models': {en: 'World Models', zh: '世界模型'},
  'Methods and Judgment': {en: 'Methods and Judgment', zh: '方法与判断'},
  'Learning and Growth': {en: 'Learning and Growth', zh: '学习与成长'},
  'People and Leadership': {en: 'People and Leadership', zh: '人物与领导力'},
  'Company Research': {en: 'Company Research', zh: '公司研究'},
  Education: {en: 'Education', zh: '教育'},
  Investing: {en: 'Investing', zh: '投资'},
  'AI and Technology': {en: 'AI and Technology', zh: 'AI 与技术'},
  Civilization: {en: 'Civilization', zh: '文明'}
};

const tagLabels: Record<string, {en: string; zh: string}> = {
  AI: {en: 'AI', zh: '人工智能'},
  Analysis: {en: 'Analysis', zh: '分析'},
  'AI Tools': {en: 'AI Tools', zh: 'AI 工具'},
  Artifacts: {en: 'Artifacts', zh: '作品'},
  Assessment: {en: 'Assessment', zh: '评价'},
  'Business Model': {en: 'Business Model', zh: '商业模式'},
  'Capital Allocation': {en: 'Capital Allocation', zh: '资本配置'},
  'Career Development': {en: 'Career Development', zh: '职场成长'},
  Civilization: {en: 'Civilization', zh: '文明'},
  'Company Culture': {en: 'Company Culture', zh: '企业文化'},
  'Competitive Moat': {en: 'Competitive Moat', zh: '竞争壁垒'},
  'Cognitive Compound Interest': {en: 'Cognitive Compound Interest', zh: '认知复利'},
  'Cognitive Models': {en: 'Cognitive Models', zh: '认知模型'},
  'Compound Interest': {en: 'Compound Interest', zh: '复利效应'},
  Compounding: {en: 'Compounding', zh: '复利'},
  Creativity: {en: 'Creativity', zh: '创造力'},
  Curiosity: {en: 'Curiosity', zh: '好奇心'},
  Curriculum: {en: 'Curriculum', zh: '课程'},
  'Decision Making': {en: 'Decision Making', zh: '决策思维'},
  'Depth vs Breadth': {en: 'Depth vs. Breadth', zh: '深度与广度'},
  'Developer Ecosystem': {en: 'Developer Ecosystem', zh: '开发者生态'},
  'Education Case Studies': {en: 'Education Case Studies', zh: '教育案例库'},
  'Education Philosophy': {en: 'Education Philosophy', zh: '教育哲学'},
  'Education Practice': {en: 'Education Practice', zh: '教育实践'},
  'Education Resources': {en: 'Education Resources', zh: '教育资源'},
  'Education Stages': {en: 'Education Stages', zh: '教育阶段'},
  'Education Trends': {en: 'Education Trends', zh: '教育趋势'},
  Essence: {en: 'Essence', zh: '本质'},
  Environment: {en: 'Environment', zh: '环境'},
  'Family Education': {en: 'Family Education', zh: '家庭教育'},
  'First-Principles Thinking': {en: 'First-Principles Thinking', zh: '第一性原理'},
  'First Principles': {en: 'First Principles', zh: '第一性原理'},
  'Great Companies': {en: 'Great Companies', zh: '伟大公司'},
  'Great People': {en: 'Great People', zh: '关键人物'},
  Growth: {en: 'Growth', zh: '成长'},
  'Growth Path': {en: 'Growth Path', zh: '成长路径'},
  Habits: {en: 'Habits', zh: '习惯'},
  'Investment Framework': {en: 'Investment Framework', zh: '投资框架'},
  'Individual Difference': {en: 'Individual Difference', zh: '个体差异'},
  'Inversion Thinking': {en: 'Inversion Thinking', zh: '逆向思维'},
  Iteration: {en: 'Iteration', zh: '迭代'},
  'Knowledge Compound Interest': {en: 'Knowledge Compound Interest', zh: '知识复利'},
  'Knowledge Foundation': {en: 'Knowledge Foundation', zh: '知识底座'},
  Leadership: {en: 'Leadership', zh: '领导力'},
  'Learning Framework': {en: 'Learning Framework', zh: '学习成长框架'},
  'Life OS': {en: 'Life OS', zh: '人生操作系统'},
  'Life Positioning': {en: 'Life Positioning', zh: '人生定位'},
  'Life Strategy': {en: 'Life Strategy', zh: '人生策略'},
  'Lifelong Learning': {en: 'Lifelong Learning', zh: '终身学习'},
  'Long-Term Strategy': {en: 'Long-Term Strategy', zh: '长期战略'},
  'Mental Models': {en: 'Mental Models', zh: '思维模型'},
  'AI Learning': {en: 'AI Learning', zh: 'AI 学习'},
  'Independent Thinking': {en: 'Independent Thinking', zh: '独立思考'},
  'Organizational Learning': {en: 'Organizational Learning', zh: '组织学习'},
  'Operating System': {en: 'Operating System', zh: '操作系统'},
  'Parent-Child Communication': {en: 'Parent-Child Communication', zh: '亲子沟通'},
  'Path Design': {en: 'Path Design', zh: '路径设计'},
  'Personal Growth': {en: 'Personal Growth', zh: '个人成长'},
  'Personalized Education': {en: 'Personalized Education', zh: '因材施教'},
  'Personalized Learning': {en: 'Personalized Learning', zh: '个性化学习'},
  'Platform Strategy': {en: 'Platform Strategy', zh: '平台战略'},
  Practice: {en: 'Practice', zh: '实践'},
  'Problem Decomposition': {en: 'Problem Decomposition', zh: '问题拆解'},
  'Product Strategy': {en: 'Product Strategy', zh: '产品战略'},
  'Project-Based Learning': {en: 'Project-Based Learning', zh: '项目制学习'},
  'Public Narrative': {en: 'Public Narrative', zh: '公共叙事'},
  Responsibility: {en: 'Responsibility', zh: '责任'},
  'Role Models': {en: 'Role Models', zh: '榜样'},
  'Self Discipline': {en: 'Self Discipline', zh: '自律'},
  'Social Environment': {en: 'Social Environment', zh: '社会环境'},
  'Systems Thinking': {en: 'Systems Thinking', zh: '系统思维'},
  'T-Shaped Talent': {en: 'T-Shaped Talent', zh: 'T 型人才'},
  'Talent Development': {en: 'Talent Development', zh: '人才培养'},
  'Technology Trend': {en: 'Technology Trend', zh: '技术趋势'},
  'Value Exchange': {en: 'Value Exchange', zh: '价值交换'},
  Value: {en: 'Value', zh: '价值'},
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
