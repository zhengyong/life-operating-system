import fs from 'node:fs';
import path from 'node:path';

const WIDTH = 1600;
const HEIGHT = 900;
const outputRoot = path.join(process.cwd(), 'public', 'article-summaries');

const articles = [
  {
    slug: 'why-life-is-not-an-exam',
    date: '2026-06-12',
    zh: {
      title: '人生不是考试，而是持续运行的系统',
      subtitle: '一次输赢不是终局，关键是长期反馈、持续修正、避免不可逆错误。',
      category: '人生操作系统',
      badges: ['系统思维', '长期反馈', '低成本试错'],
      core: ['考试思维追求标准答案和一次评分。', '系统思维关注输入、结构、反馈和迭代。', '人生真正危险的不是输一局，而是在错误模型里赢了几局。'],
      flowTitle: '长期反馈闭环',
      nodes: ['输入', '结构', '反馈', '迭代'],
      compareTitle: '考试思维 vs 系统思维',
      compare: [
        ['看一次成绩', '看长期结构'],
        ['害怕试错', '设计低成本试错'],
        ['寻找标准答案', '读取现实反馈'],
        ['赢了就停止更新', '成功后继续校准']
      ],
      actionsTitle: '可执行练习',
      actions: ['把一个困扰你的问题改写成系统问题。', '记录本周的关键输入：时间、注意力、金钱、关系。', '找到一个低成本试错动作，并在 7 天内完成。', '每周复盘一次：现实反馈说明我的模型哪里要更新？'],
      risksTitle: '复盘问题',
      risks: ['我是不是把一时得失当成最终评价？', '这次选择有没有改善长期结构？', '我是否因为怕扣分而拒绝试错？', '哪一个旧判断已经不够用了？'],
      quote: '人生不是一次交卷，而是一套每天都在反馈的系统。'
    },
    en: {
      title: 'Life Is Not an Exam. It Is a Running System.',
      subtitle: 'One win or loss is not final. Feedback, correction, and avoiding irreversible mistakes matter more.',
      category: 'Life OS',
      badges: ['Systems Thinking', 'Feedback', 'Iteration'],
      core: ['Exam thinking looks for one standard answer.', 'Systems thinking manages inputs, structure, feedback, and iteration.', 'The danger is not losing once, but winning a few rounds with the wrong model.'],
      flowTitle: 'Long-Term Feedback Loop',
      nodes: ['Input', 'Structure', 'Feedback', 'Iteration'],
      compareTitle: 'Exam Model vs System Model',
      compare: [
        ['One score', 'Long-term structure'],
        ['Avoid mistakes', 'Design low-cost trials'],
        ['Standard answer', 'Reality feedback'],
        ['Stop after success', 'Keep calibrating']
      ],
      actionsTitle: 'Practice',
      actions: ['Rewrite one life problem as a system problem.', 'Track this week’s inputs: time, attention, money, relationships.', 'Choose one reversible trial and finish it within 7 days.', 'Review weekly: what does reality say my model should update?'],
      risksTitle: 'Review Questions',
      risks: ['Am I treating a temporary result as a final judgment?', 'Does this choice improve my long-term structure?', 'Am I avoiding trials because I fear losing points?', 'Which old judgment no longer fits reality?'],
      quote: 'Life is not one submission. It is a system that gives feedback every day.'
    }
  },
  {
    slug: 'build-life-dashboard-before-goals',
    date: '2026-06-11',
    zh: {
      title: '先搭建人生操作台，再写目标表',
      subtitle: '目标告诉你想去哪里，操作台告诉你今天如何推进、复盘和校准。',
      category: '人生操作系统',
      badges: ['目标管理', '每周复盘', '行动闭环'],
      core: ['目标表解决愿望问题，操作台解决日常运行问题。', '没有操作台，目标容易停留在情绪和口号里。', '真正改变命运的，往往是稳定流程，而不是年度豪言。'],
      flowTitle: '人生操作台四区',
      nodes: ['重点事项', '资源状态', '复盘记录', '下一步行动'],
      compareTitle: '目标表 vs 操作台',
      compare: [
        ['写下远方', '承接今天'],
        ['靠热情启动', '靠流程持续'],
        ['年底才发现偏航', '每周及时校准'],
        ['只记录结果', '同时观察资源']
      ],
      actionsTitle: '可执行练习',
      actions: ['用一页纸建立四区操作台：重点、资源、复盘、行动。', '每周只选择 1-3 个重点事项，不追求铺满。', '给精力、现金流、关系和学习各做一个健康标记。', '把每个目标改写成明天可以完成的一步。'],
      risksTitle: '操作台预警',
      risks: ['重点事项是否过多？', '资源状态是否长期透支？', '复盘是否只写感受不看反馈？', '行动清单是否具体到明天？'],
      quote: '目标让你抬头看远方，操作台让你每天不偏航。'
    },
    en: {
      title: 'Build a Life Dashboard Before Another Goal List',
      subtitle: 'Goals show where to go. A dashboard shows how to move, review, and stay oriented today.',
      category: 'Life OS',
      badges: ['Goals', 'Review', 'Action Loop'],
      core: ['A goal list captures desire; a dashboard manages operation.', 'Without an operating surface, goals stay as emotion and slogans.', 'Reliable change usually comes from process, not annual drama.'],
      flowTitle: 'Four Dashboard Areas',
      nodes: ['Priorities', 'Resources', 'Review Notes', 'Next Actions'],
      compareTitle: 'Goal List vs Dashboard',
      compare: [
        ['Names the distance', 'Manages today'],
        ['Runs on enthusiasm', 'Runs on process'],
        ['Finds drift late', 'Calibrates weekly'],
        ['Tracks outcomes', 'Tracks resources too']
      ],
      actionsTitle: 'Practice',
      actions: ['Create one page with priorities, resources, review, and next actions.', 'Choose only 1-3 weekly priorities.', 'Mark energy, cash flow, relationships, and learning health.', 'Turn each goal into one action that can be done tomorrow.'],
      risksTitle: 'Dashboard Warnings',
      risks: ['Are there too many priorities?', 'Are resources being overdrawn for too long?', 'Does review capture feedback, not only feelings?', 'Is the next action specific enough for tomorrow?'],
      quote: 'Goals help you look up. A dashboard keeps you from drifting.'
    }
  },
  {
    slug: 'wrong-direction-creates-system-debt',
    date: '2026-06-10',
    zh: {
      title: '方向错了，努力越多，系统负债越大',
      subtitle: '努力不是自动资产，只有进入健康方向和结构里，才会产生复利。',
      category: '人生操作系统',
      badges: ['方向判断', '系统负债', '复利结构'],
      core: ['勤奋值得尊重，但勤奋不是免死金牌。', '错误方向会把时间、情绪和机会成本变成系统负债。', '保护努力的最好方式，是先检查方向和结构。'],
      flowTitle: '系统负债形成路径',
      nodes: ['错误假设', '持续加码', '沉没成本', '难以转向'],
      compareTitle: '努力的两种结果',
      compare: [
        ['正确方向', '能力复利'],
        ['错误方向', '系统负债'],
        ['可迁移能力', '路径依赖'],
        ['增加选择权', '锁死选择权']
      ],
      actionsTitle: '方向健康检查',
      actions: ['问自己：这件事是否更接近长期价值？', '判断它是否提升可迁移能力，而不是只消耗年限。', '检查它是否增加选择权，而不是让你更难退出。', '先做可逆小实验，再逐步增加投入。'],
      risksTitle: '预警信号',
      risks: ['越努力越不敢承认方向错。', '短期回报很高，但风险没人愿意讨论。', '忙了很久，却没有形成可迁移能力。', '退出成本越来越高，选择权越来越少。'],
      quote: '勤奋不是护身符，方向才是努力的放大器。'
    },
    en: {
      title: 'Wrong Direction Turns Effort Into System Debt',
      subtitle: 'Effort compounds only inside a sound direction and structure.',
      category: 'Life OS',
      badges: ['Direction', 'System Debt', 'Compounding'],
      core: ['Diligence deserves respect, but it is not a guarantee.', 'A wrong direction turns time, emotion, and opportunity cost into system debt.', 'The best way to protect effort is to check direction before speed.'],
      flowTitle: 'How System Debt Forms',
      nodes: ['Wrong Assumption', 'More Effort', 'Sunk Cost', 'Harder Exit'],
      compareTitle: 'Two Outcomes of Effort',
      compare: [
        ['Right direction', 'Capability compounds'],
        ['Wrong direction', 'Debt compounds'],
        ['Transferable skill', 'Path dependence'],
        ['More optionality', 'Less optionality']
      ],
      actionsTitle: 'Direction Check',
      actions: ['Ask whether the work moves you closer to long-term value.', 'Check whether it builds transferable capability.', 'Notice whether it increases optionality or makes exit harder.', 'Start with reversible experiments before increasing commitment.'],
      risksTitle: 'Warning Signals',
      risks: ['More effort makes it harder to admit a wrong direction.', 'The reward looks high while risk is rarely discussed.', 'Years pass without transferable capability.', 'Exit cost rises while optionality falls.'],
      quote: 'Diligence is not protection. Direction is the multiplier of effort.'
    }
  },
  {
    slug: 'know-what-your-life-system-optimizes',
    date: '2026-06-09',
    zh: {
      title: '先知道自己在优化什么',
      subtitle: '慢不可怕，可怕的是每天都很忙，却不知道系统到底被什么奖励信号牵引。',
      category: '人生操作系统',
      badges: ['优化目标', '奖励信号', '自我复盘'],
      core: ['忙碌不等于进展，速度也不等于方向。', '如果不定义优化目标，外部指标会默认接管系统。', '有用的复盘，是看见注意力、时间和行动被什么牵引。'],
      flowTitle: '默认奖励信号',
      nodes: ['收入', '面子', '安全感', '焦虑缓解'],
      compareTitle: '坏指标 vs 好指标',
      compare: [
        ['消息处理量', '高质量输出'],
        ['收藏夹数量', '深度学习时间'],
        ['短期刺激', '长期现金流'],
        ['他人即时满意', '关键项目推进']
      ],
      actionsTitle: '可执行练习',
      actions: ['写下本周最占用注意力的 5 件事。', '标注每件事背后的奖励信号：收入、面子、安全感、成长。', '选择 3 个能回到长期价值的指标。', '每周问一次：我到底在优化什么？'],
      risksTitle: '复盘问题',
      risks: ['我是不是用忙碌逃避真正选择？', '这个指标是否会把我带向长期价值？', '我是在优化理解力，还是优化收藏数量？', '我是在优化成长，还是优化焦虑缓解？'],
      quote: '不知道自己在优化什么的人，越忙越容易被系统带走。'
    },
    en: {
      title: 'Know What Your Life System Optimizes',
      subtitle: 'Moving slowly is fine. Being busy without knowing the reward signal is the real risk.',
      category: 'Life OS',
      badges: ['Optimization', 'Reward Signals', 'Review'],
      core: ['Busyness is not progress, and speed is not direction.', 'If you do not define the target, external metrics take over.', 'Useful review shows what is shaping your attention, time, and action.'],
      flowTitle: 'Default Reward Signals',
      nodes: ['Income', 'Status', 'Safety', 'Anxiety Relief'],
      compareTitle: 'Weak Metrics vs Useful Metrics',
      compare: [
        ['Messages handled', 'Quality outputs'],
        ['Saved links', 'Deep learning hours'],
        ['Short-term stimulus', 'Cash-flow buffer'],
        ['Instant approval', 'Key project progress']
      ],
      actionsTitle: 'Practice',
      actions: ['List the five things that consumed most attention this week.', 'Label the reward signal behind each one.', 'Choose three metrics that reconnect you with long-term value.', 'Ask weekly: what exactly am I optimizing?'],
      risksTitle: 'Review Questions',
      risks: ['Am I using busyness to avoid a real choice?', 'Will this metric pull me toward long-term value?', 'Am I optimizing understanding or only collecting links?', 'Am I optimizing growth or only anxiety relief?'],
      quote: 'When you do not know what your system optimizes, busyness becomes drift.'
    }
  },
  {
    slug: 'maturity-means-stability',
    date: '2026-06-08',
    zh: {
      title: '成熟不是变强，而是变稳',
      subtitle: '真正的成熟，是在压力、诱惑和不确定中仍能稳定判断、稳定输出、稳定承担。',
      category: '人生操作系统',
      badges: ['稳定输出', '边界管理', '长期复利'],
      core: ['短期变强容易，长期变稳更难。', '稳定不是平庸，而是一种系统能力。', '复利喜欢稳定输入，不喜欢情绪化冲刺。'],
      flowTitle: '稳定输出模型',
      nodes: ['节奏', '边界', '余量', '复利'],
      compareTitle: '爆发 vs 稳定',
      compare: [
        ['一时强度', '长期节奏'],
        ['情绪接管', '情绪可恢复'],
        ['透支证明自己', '留余量持续建设'],
        ['偶尔漂亮', '跨周期可靠']
      ],
      actionsTitle: '可执行练习',
      actions: ['为睡眠、运动、阅读、输出各设一个最低可持续标准。', '给时间、精力、现金流和关系留下余量。', '减少用透支来证明自己的冲动。', '记录每次波动后，自己多久能回到节奏。'],
      risksTitle: '成熟度检查',
      risks: ['压力下是否容易失控？', '是否经常高估精力、低估恢复？', '是否把生活安排到没有余量？', '是否能在波动后回到正确节奏？'],
      quote: '成熟不是没有波动，而是波动之后还能回到正确节奏。'
    },
    en: {
      title: 'Maturity Is Not Strength. It Is Stability.',
      subtitle: 'Real maturity is stable judgment, stable output, and stable responsibility under pressure.',
      category: 'Life OS',
      badges: ['Stable Output', 'Boundaries', 'Compounding'],
      core: ['Short bursts of strength are easier than long-term stability.', 'Stability is not mediocrity; it is a systems capability.', 'Compounding prefers stable inputs over emotional sprints.'],
      flowTitle: 'Stable Output Model',
      nodes: ['Rhythm', 'Boundary', 'Margin', 'Compounding'],
      compareTitle: 'Burst vs Stability',
      compare: [
        ['Temporary intensity', 'Long-term rhythm'],
        ['Emotion takes over', 'Emotion recovers'],
        ['Prove through exhaustion', 'Build with margin'],
        ['Occasional shine', 'Reliable across cycles']
      ],
      actionsTitle: 'Practice',
      actions: ['Set a minimum sustainable standard for sleep, movement, reading, and output.', 'Leave margin in time, energy, cash flow, and relationships.', 'Reduce the impulse to prove yourself through overdrawn effort.', 'Track how fast you return to rhythm after fluctuation.'],
      risksTitle: 'Maturity Check',
      risks: ['Do I lose control under pressure?', 'Do I overestimate energy and underestimate recovery?', 'Do I run life with no margin?', 'Can I return to the right rhythm after volatility?'],
      quote: 'Maturity is not the absence of fluctuation. It is the ability to return to the right rhythm.'
    }
  }
];

function esc(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function charUnits(char) {
  if (/[\u3400-\u9fff]/.test(char)) {
    return 1;
  }

  if (/[A-Z]/.test(char)) {
    return 0.68;
  }

  if (/[a-z0-9]/.test(char)) {
    return 0.55;
  }

  return 0.42;
}

function textUnits(text) {
  return Array.from(text).reduce((total, char) => total + charUnits(char), 0);
}

function trimToUnits(text, maxUnits) {
  let output = '';
  let total = 0;
  for (const char of Array.from(text)) {
    const next = total + charUnits(char);
    if (next > maxUnits - 1) {
      return `${output}...`;
    }
    output += char;
    total = next;
  }
  return output;
}

function wrapText(text, maxUnits, maxLines = 3) {
  const raw = String(text);
  const hasLatinWords = /[A-Za-z]/.test(raw) && raw.includes(' ');
  const tokens = hasLatinWords ? raw.split(/(\s+)/) : Array.from(raw);
  const lines = [];
  let line = '';

  for (const token of tokens) {
    if (!token) {
      continue;
    }

    const candidate = hasLatinWords && !/^\s+$/.test(token) && line && !line.endsWith(' ')
      ? `${line}${token}`
      : `${line}${token}`;

    if (textUnits(candidate.trim()) <= maxUnits || !line.trim()) {
      line = candidate;
      continue;
    }

    lines.push(line.trim());
    line = token.trimStart();
    if (lines.length === maxLines) {
      break;
    }
  }

  if (line.trim() && lines.length < maxLines) {
    lines.push(line.trim());
  }

  if (lines.length === maxLines && textUnits(raw) > lines.reduce((total, item) => total + textUnits(item), 0)) {
    lines[lines.length - 1] = trimToUnits(lines[lines.length - 1], maxUnits);
  }

  return lines;
}

function textBlock({x, y, text, maxWidth, fontSize = 24, lineHeight = 32, color = '#16335c', weight = 500, maxLines = 3}) {
  const maxUnits = maxWidth / fontSize;
  const lines = Array.isArray(text) ? text : wrapText(text, maxUnits, maxLines);
  const tspans = lines
    .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : lineHeight}">${esc(line)}</tspan>`)
    .join('');
  return {
    svg: `<text x="${x}" y="${y}" font-size="${fontSize}" font-weight="${weight}" fill="${color}">${tspans}</text>`,
    height: lines.length * lineHeight
  };
}

function header(title, subtitle, item, locale) {
  const label = locale === 'zh' ? '文章总结图' : 'Article Summary Map';
  const brand = locale === 'zh' ? 'Life Operating System' : 'Life Operating System';
  const badgeY = 92;
  const badgeWidth = locale === 'zh' ? 132 : 150;
  const badgeStep = locale === 'zh' ? 148 : 158;
  const badgeStart = locale === 'zh' ? 1044 : 1028;
  const badges = item.badges
    .map((badge, index) => {
      const x = badgeStart + index * badgeStep;
      return `<rect x="${x}" y="${badgeY}" width="${badgeWidth}" height="32" rx="16" fill="#e7f1ff" opacity="0.92"/>
        <text x="${x + badgeWidth / 2}" y="${badgeY + 22}" text-anchor="middle" font-size="${locale === 'zh' ? 18 : 17}" font-weight="700" fill="#06489a">${esc(badge)}</text>`;
    })
    .join('');

  const titleBlock = textBlock({
    x: 52,
    y: 60,
    text: title,
    maxWidth: 940,
    fontSize: locale === 'zh' ? 48 : 34,
    lineHeight: 52,
    color: '#ffffff',
    weight: 800,
    maxLines: 1
  });
  const subtitleBlock = textBlock({
    x: 54,
    y: 105,
    text: subtitle,
    maxWidth: 900,
    fontSize: locale === 'zh' ? 24 : 22,
    lineHeight: 30,
    color: '#dcecff',
    weight: 600,
    maxLines: 1
  });

  return `
    <rect x="0" y="0" width="${WIDTH}" height="132" fill="url(#headerGradient)"/>
    <path d="M960 94 C1100 30 1260 162 1580 30" fill="none" stroke="#74b8ff" stroke-width="5" opacity="0.55"/>
    <path d="M970 108 C1130 52 1300 170 1585 62" fill="none" stroke="#d8eeff" stroke-width="2" opacity="0.72"/>
    <circle cx="1435" cy="32" r="6" fill="#ffffff" opacity="0.65"/>
    <circle cx="1505" cy="70" r="4" fill="#ffffff" opacity="0.55"/>
    <text x="54" y="28" font-size="18" font-weight="800" fill="#a8d1ff" letter-spacing="2">${esc(label)}</text>
    ${titleBlock.svg}
    ${subtitleBlock.svg}
    <text x="1044" y="58" font-size="22" font-weight="800" fill="#ffffff">${esc(brand)}</text>
    <text x="1044" y="82" font-size="18" font-weight="600" fill="#cfe4ff">${esc(item.category)} | ${esc(item.date)}</text>
    ${badges}`;
}

function card({x, y, w, h, title, children, accent = '#06489a'}) {
  return `
    <g filter="url(#softShadow)">
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="#ffffff" stroke="#bcd3ee" stroke-width="1.5"/>
      <rect x="${x}" y="${y}" width="${w}" height="48" rx="16" fill="${accent}"/>
      <rect x="${x}" y="${y + 32}" width="${w}" height="16" fill="${accent}"/>
      <text x="${x + 22}" y="${y + 32}" font-size="23" font-weight="800" fill="#ffffff">${esc(title)}</text>
      ${children}
    </g>`;
}

function bulletGroup(items, x, y, maxWidth, options = {}) {
  const fontSize = options.fontSize ?? 23;
  const lineHeight = options.lineHeight ?? 30;
  const maxLines = options.maxLines ?? 2;
  const color = options.color ?? '#19375f';
  let cursor = y;
  let svg = '';

  for (const item of items) {
    const lines = wrapText(item, maxWidth / fontSize, maxLines);
    svg += `<circle cx="${x}" cy="${cursor - 8}" r="8" fill="${options.dot ?? '#0b66c3'}"/>
      <path d="M${x - 4} ${cursor - 8} l3.2 3.6 l6.2 -7.1" fill="none" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`;
    svg += textBlock({
      x: x + 22,
      y: cursor,
      text: lines,
      maxWidth,
      fontSize,
      lineHeight,
      color,
      weight: 600,
      maxLines
    }).svg;
    cursor += lines.length * lineHeight + 12;
  }

  return svg;
}

function flowDiagram(item, x, y, w, h, locale) {
  const nodeW = 128;
  const nodeH = 70;
  const gap = (w - nodeW * item.nodes.length) / (item.nodes.length - 1);
  const nodeY = y + 104;
  const nodes = item.nodes
    .map((node, index) => {
      const nodeX = x + index * (nodeW + gap);
      const titleLines = wrapText(node, nodeW / 21, 2);
      const label = textBlock({
        x: nodeX + nodeW / 2,
        y: nodeY + 43 - (titleLines.length - 1) * 11,
        text: titleLines,
        maxWidth: nodeW - 18,
        fontSize: locale === 'zh' ? 22 : 20,
        lineHeight: 24,
        color: '#07407f',
        weight: 800,
        maxLines: 2
      }).svg.replace('<text ', '<text text-anchor="middle" ');
      const arrow = index < item.nodes.length - 1
        ? `<path d="M${nodeX + nodeW + 14} ${nodeY + 35} H${nodeX + nodeW + gap - 18}" stroke="#1e8fe6" stroke-width="4" stroke-linecap="round"/>
           <path d="M${nodeX + nodeW + gap - 20} ${nodeY + 35} l-10 -7 v14 z" fill="#1e8fe6"/>`
        : '';
      return `${arrow}<rect x="${nodeX}" y="${nodeY}" width="${nodeW}" height="${nodeH}" rx="14" fill="#eaf4ff" stroke="#79b8ed" stroke-width="2"/>
        <circle cx="${nodeX + nodeW / 2}" cy="${nodeY - 18}" r="18" fill="#075bb4"/>
        <text x="${nodeX + nodeW / 2}" y="${nodeY - 10}" text-anchor="middle" font-size="19" font-weight="800" fill="#ffffff">${index + 1}</text>
        ${label}`;
    })
    .join('');

  return `
    <text x="${x}" y="${y + 34}" font-size="24" font-weight="800" fill="#073a78">${esc(item.flowTitle)}</text>
    <rect x="${x}" y="${y + 54}" width="${w}" height="${h - 72}" rx="18" fill="#f4f9ff" stroke="#c9ddf2"/>
    <path d="M${x + 30} ${y + h - 54} C${x + 190} ${y + 22}, ${x + w - 180} ${y + h + 5}, ${x + w - 24} ${y + 58}" fill="none" stroke="#c8dff5" stroke-width="3" stroke-dasharray="10 12"/>
    ${nodes}`;
}

function compareTable(item, x, y, w, h, locale) {
  const leftTitle = locale === 'zh' ? '旧模型' : 'Old Model';
  const rightTitle = locale === 'zh' ? '新模型' : 'New Model';
  const rowH = 36;
  const headerH = 44;
  const colW = (w - 28) / 2;
  const rows = item.compare
    .map((row, index) => {
      const rowY = y + headerH + 12 + index * rowH;
      return `<rect x="${x}" y="${rowY - 25}" width="${w}" height="${rowH - 4}" rx="8" fill="${index % 2 === 0 ? '#f5f9fd' : '#ffffff'}"/>
        <text x="${x + 16}" y="${rowY}" font-size="${locale === 'zh' ? 21 : 18}" font-weight="700" fill="#65758d">${esc(row[0])}</text>
        <text x="${x + colW + 34}" y="${rowY}" font-size="${locale === 'zh' ? 21 : 18}" font-weight="800" fill="#075bb4">${esc(row[1])}</text>`;
    })
    .join('');

  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="#f7fbff" stroke="#c9ddf2"/>
    <rect x="${x + 10}" y="${y + 12}" width="${colW}" height="32" rx="16" fill="#e8eef6"/>
    <rect x="${x + colW + 18}" y="${y + 12}" width="${colW}" height="32" rx="16" fill="#d8ecff"/>
    <text x="${x + 10 + colW / 2}" y="${y + 35}" text-anchor="middle" font-size="18" font-weight="800" fill="#61718a">${esc(leftTitle)}</text>
    <text x="${x + colW + 18 + colW / 2}" y="${y + 35}" text-anchor="middle" font-size="18" font-weight="800" fill="#075bb4">${esc(rightTitle)}</text>
    <line x1="${x + colW + 14}" y1="${y + 56}" x2="${x + colW + 14}" y2="${y + h - 14}" stroke="#c8d7e8" stroke-width="2" stroke-dasharray="6 8"/>
    ${rows}`;
}

function renderArticleSvg(article, locale) {
  const item = article[locale];
  const core = bulletGroup(item.core, 68, 232, 420, {fontSize: locale === 'zh' ? 24 : 21, lineHeight: 31, maxLines: 2});
  const actions = bulletGroup(item.actions, 72, 550, 655, {fontSize: locale === 'zh' ? 23 : 20, lineHeight: 30, maxLines: 2, dot: '#0d8e78'});
  const risks = bulletGroup(item.risks, 824, 550, 675, {fontSize: locale === 'zh' ? 23 : 20, lineHeight: 30, maxLines: 2, dot: '#e07a1f'});
  const flow = flowDiagram(item, 560, 206, 456, 204, locale);
  const compare = compareTable(item, 1100, 226, 396, 176, locale);
  const quoteLines = wrapText(item.quote, locale === 'zh' ? 58 : 86, 2);
  const quote = textBlock({
    x: 236,
    y: 812,
    text: quoteLines,
    maxWidth: 1260,
    fontSize: locale === 'zh' ? 30 : 28,
    lineHeight: 38,
    color: '#ffffff',
    weight: 800,
    maxLines: 2
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-labelledby="title desc">
  <title id="title">${esc(item.title)}</title>
  <desc id="desc">${esc(item.subtitle)}</desc>
  <defs>
    <linearGradient id="headerGradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#061b56"/>
      <stop offset="0.52" stop-color="#06489a"/>
      <stop offset="1" stop-color="#0a66bd"/>
    </linearGradient>
    <linearGradient id="footerGradient" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#053a82"/>
      <stop offset="1" stop-color="#075fbd"/>
    </linearGradient>
    <linearGradient id="barGradient" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#0a66bd"/>
      <stop offset="1" stop-color="#39a7f5"/>
    </linearGradient>
    <filter id="softShadow" x="-8%" y="-8%" width="116%" height="116%">
      <feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="#16335c" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="#edf5fb"/>
  <path d="M0 160 H1600 M0 440 H1600 M0 742 H1600" stroke="#dce9f6" stroke-width="1"/>
  <path d="M110 132 V760 M520 132 V760 M1046 132 V760 M1536 132 V760" stroke="#e4eef7" stroke-width="1"/>
  ${header(item.title, item.subtitle, {...article, ...item}, locale)}
  ${card({
    x: 36,
    y: 160,
    w: 488,
    h: 272,
    title: locale === 'zh' ? '1. 核心判断' : '1. Core Thesis',
    children: core
  })}
  ${card({
    x: 544,
    y: 160,
    w: 512,
    h: 272,
    title: locale === 'zh' ? '2. 模型结构' : '2. System Model',
    children: flow
  })}
  ${card({
    x: 1076,
    y: 160,
    w: 488,
    h: 272,
    title: locale === 'zh' ? '3. 对照与变量' : '3. Comparison',
    children: compare
  })}
  ${card({
    x: 36,
    y: 462,
    w: 730,
    h: 282,
    title: locale === 'zh' ? `4. ${item.actionsTitle}` : `4. ${item.actionsTitle}`,
    children: actions,
    accent: '#075f8d'
  })}
  ${card({
    x: 786,
    y: 462,
    w: 778,
    h: 282,
    title: locale === 'zh' ? `5. ${item.risksTitle}` : `5. ${item.risksTitle}`,
    children: risks,
    accent: '#075f8d'
  })}
  <rect x="36" y="770" width="1528" height="96" rx="18" fill="url(#footerGradient)" filter="url(#softShadow)"/>
  <circle cx="98" cy="818" r="34" fill="#ffffff" opacity="0.16"/>
  <path d="M82 820 h32 M98 804 v32 M87 807 l22 22 M109 807 l-22 22" stroke="#ffffff" stroke-width="5" stroke-linecap="round" opacity="0.9"/>
  <text x="150" y="800" font-size="19" font-weight="800" fill="#b9dbff">${locale === 'zh' ? '金句' : 'Quote'}</text>
  <line x1="212" y1="792" x2="212" y2="842" stroke="#82bff4" stroke-width="2" opacity="0.7"/>
  ${quote.svg}
</svg>
`;
}

for (const locale of ['zh', 'en']) {
  fs.mkdirSync(path.join(outputRoot, locale), {recursive: true});
}

for (const article of articles) {
  for (const locale of ['zh', 'en']) {
    const svg = renderArticleSvg(article, locale);
    const filePath = path.join(outputRoot, locale, `${article.slug}.svg`);
    fs.writeFileSync(filePath, svg, 'utf8');
    console.log(`Wrote ${path.relative(process.cwd(), filePath)}`);
  }
}
