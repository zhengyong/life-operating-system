import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const topicPath = path.join(root, 'content-planning', 'life-os-300-topic-candidates.md');
const outputRoot = path.join(root, 'content', 'articles');

const manualSlugs = new Map([
  ['001', 'why-life-is-not-an-exam'],
  ['002', 'build-life-dashboard-before-goals'],
  ['003', 'wrong-direction-creates-system-debt'],
  ['004', 'know-what-your-life-system-optimizes'],
  ['005', 'maturity-means-stability'],
  ['006', 'responsibility-is-control-not-blame'],
  ['007', 'values-decide-time-use'],
  ['008', 'life-problems-are-resource-allocation'],
  ['009', 'ability-to-keep-correcting-yourself'],
  ['010', 'local-optimum-can-ruin-life']
]);

const categoryConfig = {
  life: {
    match: '人生操作系统',
    siteCategory: 'Life OS',
    slugPrefix: 'life-os',
    zhName: '人生操作系统',
    enName: 'Life OS',
    tags: ['Life OS', 'Systems Thinking', 'Life Strategy', 'Long-Term Strategy', 'Decision Making'],
    zhLinks: [
      ['框架体系', '/zh/books/'],
      ['人生版块', '/zh/life/'],
      ['人生操作系统总引', '/zh/articles/life-os-introduction/']
    ],
    enLinks: [
      ['frameworks', '/en/books/'],
      ['life section', '/en/life/'],
      ['Life OS introduction', '/en/articles/life-os-introduction/']
    ],
    quoteZh: '真正的人生系统，不追求一次完美，而追求长期可修正。',
    quoteEn: 'A real life system does not seek one perfect move. It seeks long-term correction.'
  },
  principles: {
    match: '第一性原理',
    siteCategory: 'Methods and Judgment',
    slugPrefix: 'first-principles',
    zhName: '第一性原理',
    enName: 'First Principles',
    tags: ['First-Principles Thinking', 'Mental Models', 'Decision Making', 'Problem Decomposition', 'Reality Calibration'],
    zhLinks: [
      ['第一性原理文章', '/zh/articles/first-principles-thinking/'],
      ['认知心法框架', '/zh/books/recommendations/cognitive-mindset/'],
      ['方法与判断分类', '/zh/categories/methods-and-judgment/']
    ],
    enLinks: [
      ['first-principles article', '/en/articles/first-principles-thinking/'],
      ['cognitive mindset framework', '/en/books/recommendations/cognitive-mindset/'],
      ['methods and judgment category', '/en/categories/methods-and-judgment/']
    ],
    quoteZh: '看清问题的第一步，是先放下自己想要的答案。',
    quoteEn: 'The first step to seeing a problem clearly is letting go of the answer you prefer.'
  },
  career: {
    match: '职场成长',
    siteCategory: 'Career',
    slugPrefix: 'career',
    zhName: '职场成长',
    enName: 'Career Growth',
    tags: ['Career Growth', 'Career Planning', 'Professional Capability', 'Career Operating System', 'Long-Term Strategy'],
    zhLinks: [
      ['职场版块', '/zh/career/'],
      ['职场成长标签', '/zh/tags/career-growth/'],
      ['人物专题', '/zh/people/']
    ],
    enLinks: [
      ['career section', '/en/career/'],
      ['career growth tag', '/en/tags/career-growth/'],
      ['people studies', '/en/people/']
    ],
    quoteZh: '职业成长不是证明自己很忙，而是持续进入更有价值的问题。',
    quoteEn: 'Career growth is not proving you are busy. It is entering more valuable problems.'
  },
  investing: {
    match: '财富与投资',
    siteCategory: 'Investing',
    slugPrefix: 'investing',
    zhName: '财富与投资',
    enName: 'Wealth and Investing',
    tags: ['Investment Framework', 'Long-Term Investing', 'Risk Management', 'Capital Allocation', 'Business Model'],
    zhLinks: [
      ['投资版块', '/zh/investment/'],
      ['投资框架标签', '/zh/tags/investment-framework/'],
      ['公司研究', '/zh/companies/']
    ],
    enLinks: [
      ['investment section', '/en/investment/'],
      ['investment framework tag', '/en/tags/investment-framework/'],
      ['company research', '/en/companies/']
    ],
    quoteZh: '投资的难处不在知道道理，而在长期按道理行动。',
    quoteEn: 'The hard part of investing is not knowing the principle. It is acting on it for long enough.'
  },
  ai: {
    match: 'AI与科技',
    siteCategory: 'AI and Technology',
    slugPrefix: 'ai-technology',
    zhName: 'AI与科技',
    enName: 'AI and Technology',
    tags: ['AI', 'Technology Trend', 'AI Tools', 'Lifelong Learning', 'Systems Thinking'],
    zhLinks: [
      ['效率兵器框架', '/zh/books/recommendations/productivity-tools/'],
      ['AI 标签', '/zh/tags/ai/'],
      ['公司研究', '/zh/companies/']
    ],
    enLinks: [
      ['productivity tools framework', '/en/books/recommendations/productivity-tools/'],
      ['AI tag', '/en/tags/ai/'],
      ['company research', '/en/companies/']
    ],
    quoteZh: 'AI会放大一个人的系统，而不是替他建立系统。',
    quoteEn: 'AI amplifies a person’s system. It does not build the system for him.'
  },
  education: {
    match: '教育与成长',
    siteCategory: 'Education',
    slugPrefix: 'education-growth',
    zhName: '教育与成长',
    enName: 'Education and Growth',
    tags: ['Education', 'Lifelong Learning', 'Learning Ability', 'Curiosity', 'Family Education'],
    zhLinks: [
      ['教育版块', '/zh/education/'],
      ['知识底座框架', '/zh/books/recommendations/knowledge-foundation/'],
      ['学习与成长分类', '/zh/categories/learning-and-growth/']
    ],
    enLinks: [
      ['education section', '/en/education/'],
      ['knowledge foundation framework', '/en/books/recommendations/knowledge-foundation/'],
      ['learning and growth category', '/en/categories/learning-and-growth/']
    ],
    quoteZh: '好的教育，不是替孩子走路，而是让他学会自己校准方向。',
    quoteEn: 'Good education does not walk for the child. It helps the child learn to calibrate.'
  }
};

const translationPhrases = [
  ['ChatGPT真正改变了什么', 'what ChatGPT really changed'],
  ['AI会替代哪些人，不会替代哪些人', 'who AI will replace and who it will not replace'],
  ['提示词不是魔法，本质是问题定义能力', 'prompts are problem definition, not magic'],
  ['什么时候该用AI，什么时候必须自己想', 'when to use AI and when to think for yourself'],
  ['AI会让强者更强', 'why AI makes strong people stronger'],
  ['个人知识库会被AI重新定义吗', 'will AI redefine personal knowledge bases'],
  ['AI如何改变写作，但不会取消写作', 'how AI changes writing without replacing writing'],
  ['为什么理解技术趋势，是现代人的基本素养', 'why understanding technology trends is basic literacy'],
  ['AI会让知识工作更像工程吗', 'will AI make knowledge work more like engineering'],
  ['未来个人品牌会被AI怎样改变', 'how AI will change personal branding'],
  ['AI时代，什么内容更容易被搜索和引用', 'what content gets searched and cited in the AI era'],
  ['技术趋势不是热点，而是生产力迁移', 'technology trends are productivity migration, not hot topics'],
  ['AI会不会让学历贬值', 'will AI reduce the value of degrees'],
  ['AI时代的职业护城河在哪里', 'where career moats exist in the AI era'],
  ['未来每个人都需要一个“AI助理团队”吗', 'does everyone need an AI assistant team'],
  ['为什么AI越普及，原创观点越值钱', 'why original judgment becomes more valuable as AI spreads'],
  ['技术乐观不能替代风险意识', 'technology optimism cannot replace risk awareness'],
  ['AI会让组织更扁平，还是更集中', 'will AI make organizations flatter or more centralized'],
  ['技术趋势中的泡沫和真实价值如何区分', 'how to distinguish bubbles from real value in technology trends'],
  ['能力强，为什么未必晋升快', 'why strong ability does not always lead to fast promotion'],
  ['为什么会表达的人更容易被看见', 'why people who express value clearly are easier to notice'],
  ['为什么只埋头干活很危险', 'why only working hard quietly is risky'],
  ['职业护城河不是一项技能，而是一组组合能力', 'career moat is a portfolio of capabilities, not one skill'],
  ['真正的高手，先定义问题再开始做事', 'real experts define the problem before doing the work'],
  ['如何把一个混乱任务变成结构化推进', 'how to turn a messy task into structured progress'],
  ['职场中最稀缺的是“让事情往前走”的人', 'the rarest people at work move things forward'],
  ['为什么很多人工作多年，能力没有复利', 'why many people work for years without capability compounding'],
  ['别只问薪资，要问这份工作会把你训练成什么人', 'do not ask only about salary; ask what the job trains you to become'],
  ['什么时候该跳槽，什么时候该留下', 'when to change jobs and when to stay'],
  ['为什么老板更信任能闭环的人', 'why leaders trust people who close loops'],
  ['职场里的主动性，不是抢活干', 'initiative at work is not grabbing more tasks'],
  ['如何建立自己的职场案例库', 'how to build your own career case library'],
  ['为什么专业能力要和行业理解结合', 'why professional capability must combine with industry understanding'],
  ['为什么很多职业焦虑来自坐标系错误', 'why much career anxiety comes from the wrong coordinate system'],
  ['职场中的“可替代性”到底来自哪里', 'where replaceability at work really comes from'],
  ['为什么越往上走，越要懂人和组织', 'why higher-level work requires understanding people and organizations'],
  ['职场沟通的本质，是降低协作成本', 'the essence of workplace communication is lowering collaboration cost'],
  ['什么样的年轻人值得长期培养', 'what kind of young people deserve long-term cultivation'],
  ['职业成长中的“中台能力”是什么', 'what middle-platform capabilities mean in career growth'],
  ['职场里最容易被低估的能力：按时交付', 'the most underrated career capability is reliable delivery'],
  ['为什么有些公司会让人越干越值钱', 'why some companies make people more valuable over time'],
  ['从执行者到负责人，中间差了什么', 'what changes from executor to owner'],
  ['为什么做事要留下痕迹', 'why work should leave reusable traces'],
  ['职场中的战略感从哪里来', 'where strategic sense at work comes from'],
  ['为什么职业规划不能只看兴趣', 'why career planning cannot rely only on interest'],
  ['为什么越优秀的人越重视基本功', 'why excellent people value fundamentals'],
  ['职业上的长期复利，来自可迁移能力', 'career compounding comes from transferable capability'],
  ['知识底座为什么比知识点更重要', 'why a knowledge foundation matters more than isolated facts'],
  ['为什么搜索不能替代理解', 'why search cannot replace understanding'],
  ['数学教育真正训练的是什么', 'what mathematics education really trains'],
  ['阅读的高回报来自哪里', 'where the high return of reading comes from'],
  ['为什么通识教育决定一个人的上限', 'why general education shapes a person’s ceiling'],
  ['专业教育不能只停留在考试', 'professional education cannot stop at exams'],
  ['跨学科不是东学一点西学一点', 'interdisciplinary learning is not learning a little of everything'],
  ['学习最怕的是只有输入没有加工', 'learning fails when there is input without processing'],
  ['如何把阅读变成能力，而不是收藏', 'how to turn reading into capability, not collection'],
  ['为什么教育不能只看短期排名', 'why education cannot focus only on short-term ranking'],
  ['孩子的学习动力从哪里来', 'where children’s learning motivation comes from'],
  ['家长如何帮助孩子建立知识地图', 'how parents can help children build a knowledge map'],
  ['教育中的复利，发生在习惯和底层能力上', 'compounding in education happens through habits and foundational capability'],
  ['如何培养孩子的现实感', 'how to cultivate a child’s sense of reality'],
  ['学习一门学科，先问它解决什么问题', 'before learning a discipline, ask what problem it solves'],
  ['为什么逻辑和统计是现代人的必修课', 'why logic and statistics are required modern literacy'],
  ['文学教育的价值不只是语文分数', 'literary education is worth more than language scores'],
  ['经济学为什么适合早点学', 'why economics is worth learning early'],
  ['法治意识也是一种成长底座', 'legal awareness is also a foundation for growth'],
  ['心理学教育不是贴标签', 'psychology education is not labeling people'],
  ['如何防止孩子被信息流吞没', 'how to keep children from being swallowed by information feeds'],
  ['为什么运动也是教育', 'why sports are also education'],
  ['为什么家长要管理自己的焦虑', 'why parents need to manage their own anxiety'],
  ['孩子的长期竞争力，来自哪些慢变量', 'which slow variables shape children’s long-term competitiveness'],
  ['AI时代老师和家长的新角色是什么', 'the new role of teachers and parents in the AI era'],
  ['为什么经验会骗人', 'why experience can deceive'],
  ['看透复杂问题，先区分事实、观点、立场和叙事', 'to understand complex problems, separate facts, opinions, positions, and narratives'],
  ['为什么大多数人无法升级认知', 'why most people cannot upgrade cognition'],
  ['科学精神首先是一种诚实', 'scientific spirit begins with honesty'],
  ['别急着找答案，先问问题是否成立', 'before finding answers, ask whether the question is valid'],
  ['为什么看机制，比看态度更可靠', 'why mechanisms are more reliable than attitudes'],
  ['激励决定行为：不要只听他说什么', 'incentives shape behavior; do not only listen to words'],
  ['认知偏差不是知识点，而是每天都在发生的错误', 'cognitive bias is a daily error, not just a concept'],
  ['人生操作系统', 'life operating system'],
  ['第一性原理', 'first principles'],
  ['长期主义', 'long termism'],
  ['长期投资', 'long term investing'],
  ['长期增长', 'long term growth'],
  ['长期价值', 'long term value'],
  ['独立思考', 'independent thinking'],
  ['系统思维', 'systems thinking'],
  ['世界模型', 'world models'],
  ['认知升级', 'cognitive upgrade'],
  ['认知复利', 'cognitive compounding'],
  ['复利', 'compounding'],
  ['现金流', 'cash flow'],
  ['安全边际', 'margin of safety'],
  ['能力圈', 'circle of competence'],
  ['平台红利', 'platform advantage'],
  ['大公司', 'big company'],
  ['年轻人', 'young people'],
  ['普通人', 'ordinary people'],
  ['职业成长', 'career growth'],
  ['职场成熟', 'career maturity'],
  ['职场', 'career'],
  ['财富自由', 'financial freedom'],
  ['财富', 'wealth'],
  ['投资', 'investing'],
  ['科技公司', 'technology company'],
  ['科技革命', 'technology revolution'],
  ['科技', 'technology'],
  ['人工智能', 'artificial intelligence'],
  ['AI时代', 'AI era'],
  ['AI', 'AI'],
  ['教育', 'education'],
  ['终身学习', 'lifelong learning'],
  ['学习能力', 'learning ability'],
  ['好奇心', 'curiosity'],
  ['孩子', 'children'],
  ['家庭', 'family'],
  ['旅行', 'travel'],
  ['成绩', 'grades'],
  ['人生', 'life'],
  ['系统', 'system'],
  ['模型', 'model'],
  ['方法', 'method'],
  ['工具', 'tool'],
  ['结构', 'structure'],
  ['规律', 'law'],
  ['常识', 'common sense'],
  ['经验', 'experience'],
  ['复杂问题', 'complex problem'],
  ['复杂', 'complex'],
  ['问题', 'problem'],
  ['判断', 'judgment'],
  ['行动', 'action'],
  ['选择', 'choice'],
  ['方向', 'direction'],
  ['努力', 'effort'],
  ['责任', 'responsibility'],
  ['自责', 'self blame'],
  ['控制权', 'control'],
  ['价值中心', 'value center'],
  ['价值', 'value'],
  ['时间', 'time'],
  ['注意力', 'attention'],
  ['资源配置', 'resource allocation'],
  ['局部最优', 'local optimum'],
  ['整体', 'whole system'],
  ['完美人格', 'perfect personality'],
  ['可运行', 'operable'],
  ['流程', 'process'],
  ['边界', 'boundary'],
  ['反馈', 'feedback'],
  ['复盘', 'review'],
  ['成熟', 'maturity'],
  ['变强', 'stronger'],
  ['变稳', 'stable'],
  ['目标', 'goal'],
  ['效率', 'efficiency'],
  ['工具', 'tools'],
  ['风险', 'risk'],
  ['机会', 'opportunity'],
  ['竞争', 'competition'],
  ['文明', 'civilization'],
  ['责任', 'responsibility'],
  ['自由', 'freedom'],
  ['增长', 'growth'],
  ['成长', 'growth'],
  ['如何', 'how'],
  ['为什么', 'why'],
  ['什么', 'what'],
  ['哪些', 'which'],
  ['哪里', 'where'],
  ['什么时候', 'when'],
  ['改变', 'change'],
  ['替代', 'replace'],
  ['提示词', 'prompts'],
  ['魔法', 'magic'],
  ['本质', 'essence'],
  ['定义', 'define'],
  ['必须', 'must'],
  ['自己想', 'think for yourself'],
  ['强者', 'strong people'],
  ['知识库', 'knowledge base'],
  ['重新定义', 'redefine'],
  ['写作', 'writing'],
  ['取消', 'cancel'],
  ['理解', 'understand'],
  ['现代人', 'modern people'],
  ['素养', 'literacy'],
  ['未来', 'future'],
  ['品牌', 'brand'],
  ['搜索', 'search'],
  ['引用', 'citation'],
  ['热点', 'hot topic'],
  ['生产力迁移', 'productivity migration'],
  ['学历', 'degree'],
  ['贬值', 'lose value'],
  ['护城河', 'moat'],
  ['原创观点', 'original judgment'],
  ['值钱', 'valuable'],
  ['乐观', 'optimism'],
  ['组织', 'organization'],
  ['扁平', 'flat'],
  ['集中', 'centralized'],
  ['区分', 'distinguish'],
  ['泡沫', 'bubble'],
  ['晋升', 'promotion'],
  ['表达', 'expression'],
  ['看见', 'seen'],
  ['埋头干活', 'quiet hard work'],
  ['危险', 'risky'],
  ['技能', 'skill'],
  ['组合能力', 'capability portfolio'],
  ['高手', 'expert'],
  ['混乱任务', 'messy task'],
  ['结构化推进', 'structured progress'],
  ['稀缺', 'scarce'],
  ['工作多年', 'many years of work'],
  ['没有', 'without'],
  ['薪资', 'salary'],
  ['训练', 'train'],
  ['跳槽', 'change jobs'],
  ['留下', 'stay'],
  ['老板', 'leader'],
  ['信任', 'trust'],
  ['闭环', 'closed loop'],
  ['主动性', 'initiative'],
  ['抢活干', 'grab tasks'],
  ['案例库', 'case library'],
  ['专业能力', 'professional capability'],
  ['行业理解', 'industry understanding'],
  ['职业焦虑', 'career anxiety'],
  ['坐标系', 'coordinate system'],
  ['可替代性', 'replaceability'],
  ['往上走', 'move upward'],
  ['协作成本', 'collaboration cost'],
  ['长期培养', 'long-term cultivation'],
  ['中台能力', 'middle-platform capability'],
  ['按时交付', 'reliable delivery'],
  ['越干越值钱', 'become more valuable over time'],
  ['执行者', 'executor'],
  ['负责人', 'owner'],
  ['留下痕迹', 'leave traces'],
  ['战略感', 'strategic sense'],
  ['兴趣', 'interest'],
  ['基本功', 'fundamentals'],
  ['可迁移能力', 'transferable capability'],
  ['知识底座', 'knowledge foundation'],
  ['知识点', 'isolated facts'],
  ['搜索', 'search'],
  ['数学教育', 'mathematics education'],
  ['阅读', 'reading'],
  ['通识教育', 'general education'],
  ['上限', 'ceiling'],
  ['专业教育', 'professional education'],
  ['考试', 'exams'],
  ['跨学科', 'interdisciplinary learning'],
  ['加工', 'processing'],
  ['收藏', 'collection'],
  ['短期排名', 'short-term ranking'],
  ['学习动力', 'learning motivation'],
  ['知识地图', 'knowledge map'],
  ['习惯', 'habits'],
  ['底层能力', 'foundational capability'],
  ['现实感', 'sense of reality'],
  ['学科', 'discipline'],
  ['逻辑', 'logic'],
  ['统计', 'statistics'],
  ['必修课', 'required course'],
  ['文学教育', 'literary education'],
  ['语文分数', 'language scores'],
  ['经济学', 'economics'],
  ['早点学', 'learn early'],
  ['法治意识', 'legal awareness'],
  ['心理学教育', 'psychology education'],
  ['贴标签', 'labeling'],
  ['信息流', 'information feed'],
  ['运动', 'sports'],
  ['家长', 'parents'],
  ['管理自己的焦虑', 'manage their own anxiety'],
  ['慢变量', 'slow variables'],
  ['老师', 'teachers'],
  ['新角色', 'new role'],
  ['会', 'will'],
  ['人', 'people'],
  ['真正', 'true'],
  ['不是', 'not'],
  ['而是', 'but'],
  ['不要', 'do not'],
  ['要', 'should'],
  ['最', 'most']
].sort((a, b) => b[0].length - a[0].length);

const dynamicTags = [
  ['复利', 'Compound Interest'],
  ['反馈', 'Feedback'],
  ['复盘', 'Review'],
  ['责任', 'Responsibility'],
  ['价值', 'Value'],
  ['时间', 'Focus'],
  ['注意力', 'Focus'],
  ['风险', 'Risk Management'],
  ['现金流', 'Cash Flow'],
  ['模型', 'Mental Models'],
  ['系统', 'Systems Thinking'],
  ['选择', 'Decision Making'],
  ['判断', 'Judgment'],
  ['问题', 'Problem Decomposition'],
  ['好奇心', 'Curiosity'],
  ['家庭', 'Family Education'],
  ['学习', 'Lifelong Learning']
];

const zhExamples = {
  life: [
    '一个人做年度规划时，如果只写愿望，很快就会被日常打散；如果把睡眠、现金流、学习和关系都放进系统，很多选择会变得更清楚。',
    '转行、买房、育儿、健康管理这些事，看似彼此独立，实际都在争夺同一组稀缺资源：时间、注意力、体力和风险承受力。',
    '很多人不是输在某一次选择，而是长期没有反馈机制，直到身体、关系或职业给出很重的提醒。'
  ],
  principles: [
    '比如一次会议里，大家争论方案好不好，第一步不是站队，而是拆清楚约束：目标是什么，资源是什么，风险由谁承担。',
    '很多经验在熟悉环境里有用，一旦行业、技术或人群变化，就可能从捷径变成误导。',
    '第一性原理不是故意反对别人，而是先把事实、因果和边界摆出来，再决定相信什么。'
  ],
  career: [
    '一个年轻工程师如果只优化眼前绩效，可能会错过更重要的东西：复杂项目、强同事、好流程和可迁移经验。',
    '职场里的很多差距，不是从加班时长拉开的，而是从进入什么问题、跟谁共事、能否复盘项目开始拉开的。',
    '平台、行业和角色会放大个人努力，也会限制个人努力，所以职业选择本质上是把自己放进怎样的系统。'
  ],
  investing: [
    '一个家庭做资产配置时，最重要的往往不是找到最高收益，而是现金流、风险承受、理解范围和长期持有能力是否匹配。',
    '投资里最贵的错误，常常不是少赚一点，而是在自己不理解的地方重仓，等波动来临时被迫出局。',
    '真正的投资框架，会把公司、价格、现金流、周期和人性放在一起看，而不是只看一段行情。'
  ],
  ai: [
    '同样使用 AI，有人只是让它生成更多信息，有人却用它整理流程、校准判断、复盘项目，差距来自人的系统，而不是按钮。',
    'AI 像一台放大器：问题定义清楚，它放大效率；问题定义混乱，它放大噪音。',
    '科技革命真正改变普通人的地方，不只是出现新工具，而是让学习、表达、协作和创造的成本重新下降。'
  ],
  education: [
    '一个孩子做项目时，真正重要的不只是完成作业，而是学会提出问题、查资料、做验证、表达结果。',
    '教育如果只盯成绩，很容易把孩子训练成答题机器；如果重视好奇心和方法，孩子会慢慢形成自己的学习系统。',
    '家庭教育最难的不是给答案，而是在保护兴趣的同时，让孩子逐步承担选择和后果。'
  ]
};

const enExamples = {
  life: [
    'When a person makes an annual plan, a wish list is quickly broken by daily life. A system that tracks sleep, cash flow, learning, and relationships makes choices clearer.',
    'Career change, housing, parenting, and health management look separate, but they compete for the same scarce resources: time, attention, energy, and risk capacity.',
    'Many people are not defeated by one decision. They drift because there is no feedback mechanism until the body, a relationship, or a career gives a heavy signal.'
  ],
  principles: [
    'In a meeting, the first step is not choosing a side. It is clarifying the target, constraints, resources, and who bears the risk.',
    'Experience can be useful in a familiar environment, but once the industry, technology, or people change, it may turn from shortcut into distortion.',
    'First-principles thinking is not opposing others on purpose. It is putting facts, causality, and boundaries on the table before deciding what to believe.'
  ],
  career: [
    'A young engineer who only optimizes the next performance review may miss the more important assets: complex projects, strong colleagues, good processes, and transferable experience.',
    'Career gaps are not created only by working hours. They are created by the quality of problems, the people around you, and whether projects are reviewed honestly.',
    'Platforms, industries, and roles can amplify effort or trap it. Career choice is partly the choice of the system you put yourself inside.'
  ],
  investing: [
    'For a household portfolio, the key is often not the highest return. It is whether cash flow, risk tolerance, understanding, and holding capacity fit together.',
    'The expensive investing mistake is often not earning less. It is taking a large position in something you do not understand and being forced out by volatility.',
    'A real investing framework looks at companies, price, cash flow, cycles, and human nature together, not only a short price movement.'
  ],
  ai: [
    'With the same AI tool, one person creates more noise while another improves workflow, judgment, and review. The difference comes from the human system, not the button.',
    'AI is an amplifier. Clear problem definition brings efficiency. Confused problem definition brings more noise.',
    'The real change of a technology revolution is not only new tools. It lowers the cost of learning, expression, collaboration, and creation.'
  ],
  education: [
    'When a child works on a project, the important thing is not only finishing the assignment. It is learning to ask questions, search, test, and explain results.',
    'Education that watches only grades can train children into answer machines. Education that protects curiosity and method helps them build their own learning system.',
    'The hardest part of family education is not giving answers. It is protecting interest while letting children gradually carry choices and consequences.'
  ]
};

function parseTopics() {
  const text = fs.readFileSync(topicPath, 'utf8');
  const topics = [];
  let section = '';

  for (const line of text.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+)/);
    if (heading) {
      section = heading[1];
      continue;
    }

    const row = line.match(/^\|\s*(\d{3})\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|/);
    if (!row) {
      continue;
    }

    topics.push({
      id: row[1],
      title: row[2].trim(),
      angle: row[3].trim(),
      group: getGroup(section)
    });
  }

  return topics;
}

function getGroup(section) {
  for (const [group, config] of Object.entries(categoryConfig)) {
    if (section.includes(config.match)) {
      return group;
    }
  }

  return 'life';
}

function translateText(value) {
  let translated = value;
  for (const [zh, en] of translationPhrases) {
    translated = translated.split(zh).join(` ${en} `);
  }

  return translated
    .replace(/[，。！？：；、（）《》“”‘’]/g, ' ')
    .replace(/[\u3400-\u9fff]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function toTitleCase(value) {
  const lowerWords = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on', 'or', 'the', 'to', 'with']);
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && lowerWords.has(lower)) {
        return lower;
      }
      if (lower === 'ai') return 'AI';
      if (lower === 'chatgpt') return 'ChatGPT';
      if (lower === 'gpt') return 'GPT';
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

function cleanEnglishText(value) {
  return translateText(value).replace(/[^a-zA-Z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function makeEnglishTitle(topic) {
  const clean = cleanEnglishText(topic.title);

  if (clean.split(/\s+/).filter(Boolean).length >= 3) {
    return toTitleCase(clean);
  }

  const config = categoryConfig[topic.group];
  const angle = cleanEnglishText(topic.angle);
  const angleWords = angle.split(/\s+/).filter(Boolean);

  if (angleWords.length >= 5) {
    return toTitleCase(angleWords.slice(0, 12).join(' '));
  }

  return `${config.enName}: ${toTitleCase(clean || 'Long-Term Thinking')}`;
}

function makeEnglishAngle(topic) {
  const translated = cleanEnglishText(topic.angle);
  if (translated.split(/\s+/).filter(Boolean).length >= 5) {
    return translated.charAt(0).toUpperCase() + translated.slice(1).replace(/\.$/, '') + '.';
  }

  const title = cleanEnglishText(topic.title) || categoryConfig[topic.group].enName;
  return `A practical note on ${title.toLowerCase()} from a first-principles and long-term perspective.`;
}

function makeSlug(topic) {
  if (manualSlugs.has(topic.id)) {
    return manualSlugs.get(topic.id);
  }

  const config = categoryConfig[topic.group];
  const translated = cleanEnglishText(topic.title).toLowerCase();
  const tokens = translated.match(/[a-z0-9]+/g) ?? [];
  const stopwords = new Set(['a', 'an', 'and', 'as', 'but', 'by', 'for', 'in', 'is', 'of', 'on', 'or', 'the', 'to', 'with', 'should']);
  const useful = tokens.filter((token) => token.length > 1 && !stopwords.has(token));
  const suffix = useful.length >= 3 ? useful.slice(0, 9).join('-') : 'long-term-thinking';
  return `${config.slugPrefix}-${topic.id}-${suffix}`;
}

function makeDate(topic) {
  if (Number(topic.id) <= 10) {
    const day = 13 - Number(topic.id);
    return `2026-06-${String(day).padStart(2, '0')}`;
  }

  const base = Date.UTC(2026, 5, 2);
  const offset = Math.max(0, Number(topic.id) - 11);
  const date = new Date(base - offset * 24 * 60 * 60 * 1000);
  return date.toISOString().slice(0, 10);
}

function makeSummaryZh(topic) {
  const config = categoryConfig[topic.group];
  return `${topic.angle} 这篇文章从${config.zhName}视角讨论这个问题，并给出可执行的长期判断框架。`;
}

function makeSummaryEn(topic) {
  return makeEnglishAngle(topic).replace(/\s+/g, ' ').slice(0, 150);
}

function makeTags(topic) {
  const config = categoryConfig[topic.group];
  const tags = new Set(config.tags);
  for (const [keyword, tag] of dynamicTags) {
    if (topic.title.includes(keyword) || topic.angle.includes(keyword)) {
      tags.add(tag);
    }
  }

  return [...tags].slice(0, 7);
}

function quote(value) {
  return JSON.stringify(value);
}

function yamlList(values) {
  return values.map((value) => `  - ${quote(value)}`).join('\n');
}

function frontmatter(topic, locale, slug) {
  const enTitle = makeEnglishTitle(topic);
  const zhSummary = makeSummaryZh(topic);
  const enSummary = makeSummaryEn(topic);
  const title = locale === 'zh' ? topic.title : topic.title;
  const seoTitle = locale === 'zh' ? `${topic.title} | Life OS` : `${enTitle} | Life OS`;
  const seoDescription = locale === 'zh' ? zhSummary.slice(0, 150) : enSummary.slice(0, 150);

  return `---\n` +
    `title: ${quote(title)}\n` +
    `title_en: ${quote(enTitle)}\n` +
    `seoTitle: ${quote(seoTitle)}\n` +
    `seoDescription: ${quote(seoDescription)}\n` +
    `slug: ${quote(slug)}\n` +
    `date: ${quote(makeDate(topic))}\n` +
    `summary: ${quote(zhSummary)}\n` +
    `summary_en: ${quote(enSummary)}\n` +
    `category: ${quote(categoryConfig[topic.group].siteCategory)}\n` +
    `tags:\n${yamlList(makeTags(topic))}\n` +
    `keywords:\n${yamlList(makeKeywords(topic, locale))}\n` +
    `language: ${quote(locale)}\n` +
    `draft: false\n` +
    `---\n`;
}

function makeKeywords(topic, locale) {
  if (locale === 'zh') {
    return [
      topic.title,
      categoryConfig[topic.group].zhName,
      '人生操作系统',
      '第一性原理',
      '长期主义',
      '个人成长',
      '系统思维',
      '决策框架'
    ];
  }

  return [
    makeEnglishTitle(topic),
    categoryConfig[topic.group].enName,
    'Life OS',
    'first-principles thinking',
    'long-termism',
    'personal growth',
    'systems thinking',
    'decision framework'
  ];
}

function pick(list, topic) {
  return list[Number(topic.id) % list.length];
}

function makeConclusionZh(topic) {
  const stem = topic.title.replace(/^为什么/, '').replace(/[？?]$/, '');
  const endings = [
    `${stem}，关键不在口号，而在能否落到稳定的判断和行动。`,
    `${stem}，本质上是在复杂现实里重新设计自己的系统。`,
    `${stem}，真正重要的是长期结构，而不是一时情绪。`
  ];
  return pick(endings, topic);
}

function makeConclusionEn(topic) {
  const title = makeEnglishTitle(topic).replace(/[?？]$/, '');
  const endings = [
    `${title} is not a slogan. It becomes useful only when it changes judgment and action.`,
    `${title} is ultimately about redesigning the system behind repeated choices.`,
    `${title} matters because long-term structure is more important than short-term emotion.`
  ];
  return pick(endings, topic);
}

function linkSentenceZh(topic) {
  const config = categoryConfig[topic.group];
  const [a, b, c] = config.zhLinks;
  return `这个主题可以继续和 [${a[0]}](${a[1]})、[${b[0]}](${b[1]}) 以及 [${c[0]}](${c[1]}) 放在一起看。这样阅读路径不会散，文章、框架、分类和标签之间也能互相跳转。`;
}

function linkSentenceEn(topic) {
  const config = categoryConfig[topic.group];
  const [a, b, c] = config.enLinks;
  return `This topic connects naturally with the [${a[0]}](${a[1]}), the [${b[0]}](${b[1]}), and the [${c[0]}](${c[1]}). The point is to keep articles, frameworks, categories, and tags connected rather than scattered.`;
}

function zhArticle(topic) {
  const config = categoryConfig[topic.group];
  const example = pick(zhExamples[topic.group], topic);
  const conclusion = makeConclusionZh(topic);
  const quoteLine = topic.id === '300' ? '真正好的教育，是让孩子越来越能自己学习。' : config.quoteZh;

  return `${frontmatter(topic, 'zh', makeSlug(topic))}\n` +
    `**一句话结论：${conclusion}**\n\n` +
    `${topic.title}，表面看是一个具体问题，底层其实是${config.zhName}里反复出现的结构问题。${topic.angle} 如果只停留在概念层，它很快会变成一句正确但无用的话；只有把它放回现实约束里，才能变成可以执行的判断。\n\n` +
    `从第一性原理看，很多困境不是因为人不懂道理，而是没有把道理拆成输入、结构、反馈和行动。输入决定你每天接收什么，结构决定资源如何分配，反馈决定你是否看见偏差，行动决定系统是否继续进化。${topic.title}真正要提醒我们的，是不要只看表面的输赢，而要看这个选择会不会改善长期结构。\n\n` +
    `${example} 这个例子不复杂，但它说明了一个朴素事实：现实世界不会因为我们想得很用力就自动变好。一个人需要把想法变成流程，把流程变成习惯，把习惯放进可复盘的系统。否则，很多正确认知都会停在笔记里，无法进入生活。\n\n` +
    `落实到个人，可以先做三件事。第一，写下这个问题背后的真实约束，而不是只写愿望。第二，找出一个最小行动，让自己在一周内能得到反馈。第三，定期复盘这个行动是否带来了更好的结构，而不是只看短期情绪是否舒服。这样做看似慢，但它能减少反复推倒重来的成本。\n\n` +
    `${linkSentenceZh(topic)} 网站的价值不只是多放文章，而是让每篇文章都能回到一套更大的知识体系：人生、职场、投资、AI、教育和第一性原理之间，本来就不是割裂的。\n\n` +
    `真正可靠的成长，往往不是一次顿悟，而是多次小修正之后形成的新系统。${topic.title}这个选题值得被写出来，也值得被反复使用，因为它最终指向的不是知识收藏，而是更清醒、更稳定、更长期的生活方式。\n\n` +
    `## 总结\n\n` +
    `${topic.title}不是一个孤立观点，而是一个可以放进人生操作系统里的判断工具。先看清约束，再设计行动，再用反馈修正，普通人才能把认知变成长期复利。\n\n` +
    `## 金句\n\n` +
    `> ${quoteLine}\n`;
}

function enArticle(topic) {
  const config = categoryConfig[topic.group];
  const example = pick(enExamples[topic.group], topic);
  const conclusion = makeConclusionEn(topic);
  const quoteLine = config.quoteEn;
  const enTitle = makeEnglishTitle(topic);
  const enAngle = makeEnglishAngle(topic);

  return `${frontmatter(topic, 'en', makeSlug(topic))}\n` +
    `**One-sentence conclusion: ${conclusion}**\n\n` +
    `${enTitle} looks like a specific topic, but underneath it is a recurring structure inside ${config.enName}. ${enAngle} If the idea stays at the concept level, it becomes correct but not useful. It becomes useful only when it is put back into real constraints and daily decisions.\n\n` +
    `From a first-principles view, many difficulties do not come from a lack of slogans. They come from the absence of a working system. Inputs decide what you receive every day. Structure decides how resources are allocated. Feedback decides whether you can see deviation. Action decides whether the system keeps evolving. The point of this topic is not to win an argument, but to improve the long-term structure behind repeated choices.\n\n` +
    `${example} The example is simple, but it points to a basic truth: reality does not improve just because we think intensely. A person needs to turn ideas into processes, processes into habits, and habits into a system that can be reviewed. Otherwise, even good ideas remain in notes and never enter life.\n\n` +
    `A practical way to use this idea is to do three things. First, write down the real constraints behind the problem, not only the wish. Second, choose one small action that can produce feedback within a week. Third, review whether the action improves the structure, instead of asking only whether it feels comfortable in the short term. This looks slower, but it reduces the cost of restarting again and again.\n\n` +
    `${linkSentenceEn(topic)} The value of the site is not simply to publish more articles. It is to connect each article back to a larger knowledge architecture, because life, career, investing, AI, education, and first principles are not separate subjects in practice.\n\n` +
    `Reliable growth rarely comes from one dramatic insight. It comes from many small corrections that eventually become a better system. ${enTitle} deserves attention because it points beyond collecting knowledge. It points toward a calmer, more stable, more long-term way to live and decide.\n\n` +
    `## Summary\n\n` +
    `${enTitle} is not an isolated idea. It is a judgment tool that can be placed inside a personal operating system. See the constraints, design the action, and use feedback to correct the system. That is how cognition becomes long-term compounding.\n\n` +
    `## Quote\n\n` +
    `> ${quoteLine}\n`;
}

function ensureDirectory(directory) {
  fs.mkdirSync(directory, {recursive: true});
}

function cleanGeneratedArticles() {
  const generatedPattern = /^(life-os|first-principles|career|investing|ai-technology|education-growth)-\d{3}-.*\.md$/;

  for (const locale of ['zh', 'en']) {
    const directory = path.join(outputRoot, locale);
    if (!fs.existsSync(directory)) {
      continue;
    }

    for (const filename of fs.readdirSync(directory)) {
      if (generatedPattern.test(filename)) {
        fs.rmSync(path.join(directory, filename), {force: true});
      }
    }
  }
}

function writeArticle(locale, slug, content) {
  const directory = path.join(outputRoot, locale);
  ensureDirectory(directory);
  fs.writeFileSync(path.join(directory, `${slug}.md`), content);
}

function main() {
  if (!fs.existsSync(topicPath)) {
    throw new Error(`Missing topic file: ${topicPath}`);
  }

  const topics = parseTopics();
  let written = 0;
  let skippedManual = 0;

  cleanGeneratedArticles();

  for (const topic of topics) {
    const slug = makeSlug(topic);

    if (manualSlugs.has(topic.id)) {
      const zhPath = path.join(outputRoot, 'zh', `${slug}.md`);
      const enPath = path.join(outputRoot, 'en', `${slug}.md`);
      if (fs.existsSync(zhPath) && fs.existsSync(enPath)) {
        skippedManual += 1;
        continue;
      }
    }

    writeArticle('zh', slug, zhArticle(topic));
    writeArticle('en', slug, enArticle(topic));
    written += 2;
  }

  console.log(`Parsed ${topics.length} topic(s). Wrote ${written} article file(s). Kept ${skippedManual} manual pair(s).`);
}

main();
