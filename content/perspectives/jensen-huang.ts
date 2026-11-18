import type {LocalizedText, PerspectiveEvent, TimelineEntry} from '@/lib/perspectives';

const label = (zh: string, en: string): LocalizedText => ({zh, en});
const speaker = {
  huang: label('黄仁勋', 'Jensen Huang'),
  nvidia: label('英伟达董事会', 'NVIDIA Board of Directors'),
  duan: label('段永平', 'Duan Yongping'),
  dan: label('但斌', 'Dan Bin'),
  reuters: label('路透社', 'Reuters')
};

const source = {
  apology: {
    label: label('英伟达新闻室刊载的员工信', 'Letter published by NVIDIA Newsroom'),
    href: 'https://nvidianews.nvidia.com/news/a-message-to-our-company'
  },
  boardReview: {
    label: label('英伟达董事会声明', 'NVIDIA board statement'),
    href: 'https://nvidianews.nvidia.com/news/statement-from-nvidia-board-of-directors'
  },
  independentDirectors: {
    label: label('英伟达独立董事声明', 'NVIDIA independent directors’ statement'),
    href: 'https://nvidianews.nvidia.com/news/statement-from-the-independent-members-of-the-nvidia-board'
  },
  succession: {
    label: label('英伟达卸任及交接公告', 'NVIDIA CEO transition announcement'),
    href: 'https://nvidianews.nvidia.com/news/nvidia-announces-ceo-transition'
  },
  filing: {
    label: label('英伟达提交的 8-K 文件', 'NVIDIA’s Form 8-K filing'),
    href: 'https://www.sec.gov/Archives/edgar/data/1045810/000104581026000082/nvda-20261111.htm'
  },
  boardCall: {
    label: label('路透社引述财报电话会', 'Reuters coverage of the earnings call'),
    href: 'https://www.reuters.com/business/nvidia-forecasts-quarterly-revenue-above-estimates-first-report-since-huangs-2026-11-17/'
  },
  huangReturn: {
    label: label('美联社刊载声明全文', 'Associated Press publication of the full statement'),
    href: 'https://apnews.com/article/0f6d83fc6d97a30fc54bd66b5ac42eda'
  },
  petition: {
    label: label('Stand with Jensen 联署公开信', 'Stand with Jensen open letter'),
    href: 'https://standwithjensen.com/'
  },
  petitionReport: {
    label: label('路透社对联署的报道', 'Reuters coverage of the petition'),
    href: 'https://www.reuters.com/legal/transactional/silicon-valley-leaders-back-call-jensen-huangs-return-nvidia-2026-11-16/'
  },
  trump: {
    label: label('路透社采访视频', 'Reuters video of Trump’s remarks'),
    href: 'https://www.breakingviews.com/video/watch/idRW878616112026RP1/'
  },
  trumpAndMusk: {
    label: label('美联社报道', 'Associated Press coverage'),
    href: 'https://apnews.com/article/nvidia-artificial-intelligence-ai-jensen-huang-202e72d0c05646479e96a4936620b983'
  },
  bessent: {
    label: label('路透社引述福克斯访谈', 'Reuters coverage of the Fox interview'),
    href: 'https://www.reuters.com/world/bessent-says-nvidia-must-go-outside-company-find-new-ceo-2026-11-15/'
  },
  congress: {
    label: label('美国众议院委员会联合声明', 'Joint U.S. House committee statement'),
    href: 'https://intelligence.house.gov/2026/11/17/jensen-huang-and-nvidia-agree-to-appear-before-congress/'
  },
  techLeaders: {
    label: label('美联社报道 Semafor 论坛发言', 'Associated Press coverage of the Semafor forum'),
    href: 'https://apnews.com/article/nvidia-jensen-huang-tech-ceo-reactions-063310aae44182e67e55c04c5b1e29e4'
  },
  bezos: {
    label: label('GeekWire 报道及论坛视频', 'GeekWire coverage and forum video'),
    href: 'https://www.geekwire.com/2026/jeff-bezos-has-some-advice-for-nvidias-board-on-its-ceo-search/'
  },
  gerstner: {
    label: label('CNBC 访谈摘录', 'CNBC interview excerpts'),
    href: 'https://pressroom.versantmedia.com/cnbc/press-releases/cnbc-exclusive-excerpts-altimeter-capital-founder-ceo-brad-gerstner-speaks'
  }
};

const boardPosition: TimelineEntry = {
  id: 'nvidia-no-return', participant: 'nvidia', speaker: speaker.nvidia,
  date: '2026-11-17', kind: label('财报电话会', 'Earnings call'),
  title: label('董事会无意让黄仁勋回任 CEO', 'Board does not intend to reinstate Huang as CEO'),
  summary: label(
    '董事会主席哈维·琼斯在财报电话会上表示，董事会一致接受黄仁勋的辞呈，无意让他复任 CEO，将继续寻找正式继任者。',
    'On the earnings call, chair Harvey Jones said the board unanimously accepted Huang’s resignation, does not intend to reinstate him as CEO and will continue the search for a permanent successor.'
  ),
  sources: [source.boardCall, source.succession]
};

export const jensenHuangPerspective: PerspectiveEvent = {
  shortTitle: label('黄仁勋事件', 'Jensen Huang'),
  title: label('黄仁勋道歉与卸任', 'Jensen Huang’s apology and resignation'),
  description: label(
    '从致信员工道歉到 CEO 交接，沿时间轴查看各方表态和公开来源。',
    'Follow the public record from Huang’s letter to employees through the CEO transition and responses that followed.'
  ),
  question: label('黄仁勋现在是否应回任英伟达 CEO？', 'Should Jensen Huang return as NVIDIA CEO now?'),
  participants: [
    {id: 'huang', label: speaker.huang, role: 'subject', profilePath: 'people/jensen-huang/'},
    {id: 'nvidia', label: label('英伟达', 'NVIDIA'), role: 'company', profilePath: 'companies/nvidia/'},
    {id: 'media', label: label('媒体', 'Media'), role: 'media'},
    {id: 'duan', label: speaker.duan, role: 'investor'},
    {id: 'dan', label: speaker.dan, role: 'investor'}
  ],
  milestones: [
    {timelineId: 'huang-apology', label: label('致信道歉', 'Apology letter')},
    {timelineId: 'nvidia-transition', label: label('卸任公告', 'CEO exit')},
    {timelineId: 'huang-return', label: label('回任表态', 'Return statement')}
  ],
  weekLabels: {
    '2026-11-02': label('道歉与董事会回应', 'Apology and board response'),
    '2026-11-09': label('独立调查与卸任', 'Independent review and resignation'),
    '2026-11-16': label('卸任后的表态', 'Statements after the resignation')
  },
  timeline: [
    boardPosition,
    {
      id: 'huang-return', participant: 'huang', speaker: speaker.huang,
      date: '2026-11-17', kind: label('本人声明', 'Personal statement'),
      title: label('如果董事会认可，愿意回任', 'Willing to return if the board agrees'),
      summary: label(
        '黄仁勋表示会配合董事会的独立调查。如果董事会认为回任符合股东、员工、公司及美国的利益，他愿意重新担任 CEO。',
        'Huang said he would cooperate with the board’s independent investigation and would return as CEO if the board considered it in the interests of shareholders, employees, the company and the United States.'
      ),
      sources: [source.huangReturn]
    },
    {
      id: 'duan-later-view', participant: 'duan', speaker: speaker.duan,
      date: '2026-11-16', kind: label('雪球回复', 'Xueqiu reply'),
      title: label('回任仍有可能', 'A return is still possible'),
      summary: label(
        '段永平在雪球回复称，他不确定黄仁勋能否复任，但认为这个可能性并非为零，董事会需要为决定承担最终责任。',
        'Duan said on Xueqiu that he was unsure whether Huang would return, but considered it possible and said the board would ultimately answer for the decision.'
      ),
      timelineId: 'duan-first-view',
      sources: [{label: label('雪球原帖', 'Original Xueqiu reply'), href: 'https://www.xueqiu.com/1247347556/416998377'}]
    },
    {
      id: 'petition-report', participant: 'media', speaker: speaker.reuters,
      date: '2026-11-16', kind: label('媒体报道', 'News report'),
      title: label('硅谷人士联署呼吁回任', 'Silicon Valley figures sign a petition for Huang’s return'),
      summary: label(
        '路透社报道，马斯克等科技界人士被列为联署人，联署信呼吁在独立调查进行期间恢复黄仁勋的 CEO 职务。',
        'Reuters reported that Elon Musk and other technology figures were listed as signatories of a letter calling for Huang’s reinstatement while an independent investigation proceeds.'
      ),
      sources: [source.petitionReport, source.petition]
    },
    {
      id: 'dan-competition', participant: 'dan', speaker: speaker.dan,
      date: '2026-11-13', kind: label('投资人观点', 'Investor commentary'),
      title: label('短期护城河仍在，交接给对手窗口期', 'The moat remains, but the transition gives rivals an opening'),
      summary: label(
        '东方港湾董事长但斌认为，管理层交接和战略磨合需要时间，对手可能趁机追赶。CUDA 生态和算力产业链壁垒短期内仍在，AI 需求也会继续发展。',
        'Oriental Harbor chair Dan Bin said a leadership transition gives competitors time to catch up. He expects CUDA and supply-chain advantages to persist in the near term and AI demand to keep growing.'
      ),
      sources: [
        {label: label('新浪财经引述但斌观点', 'Sina Finance coverage of Dan’s remarks'), href: 'https://finance.sina.com.cn/roll/2026-11-13/doc-iniypvhm1318501.shtml'},
        {label: label('红星资本局报道', 'Red Star Capital Bureau coverage'), href: 'https://static.cdsb.com/micropub/Articles/202611/25a02cbb69e34a3c78640f3370e70ec6.html'}
      ]
    },
    {
      id: 'nvidia-transition', participant: 'nvidia', speaker: speaker.nvidia,
      date: '2026-11-12', kind: label('公司公告', 'Company announcement'),
      title: label('公布卸任及临时接任安排', 'NVIDIA announces the resignation and interim appointment'),
      summary: label(
        '英伟达宣布黄仁勋辞去总裁、CEO 及董事职务，首席财务官科莱特·克雷斯出任临时 CEO。董事会启动正式继任者遴选。',
        'NVIDIA announced that Huang had resigned as president, CEO and director. CFO Colette Kress became interim CEO, and the board began its search for a permanent successor.'
      ),
      note: label('11 月 12 日是公开披露日。8-K 记载董事会于 11 月 11 日接受辞呈，即刻生效。', 'The announcement was published November 12. NVIDIA’s Form 8-K records board acceptance on November 11, effective immediately.'),
      sources: [source.succession, source.filing]
    },
    {
      id: 'duan-first-view', participant: 'duan', speaker: speaker.duan,
      date: '2026-11-12', kind: label('雪球回复', 'Xueqiu reply'),
      title: label('早期判断回任机会有限', 'Initially saw little chance of a return'),
      summary: label(
        '段永平在回复中倾向于认为黄仁勋不会再任 CEO，也提到公司或可请他担任顾问。',
        'In his reply, Duan leaned toward Huang not returning as CEO and raised the possibility of the company asking him to serve as an adviser.'
      ),
      note: label('原帖发布于 11 月 12 日，现行版本于 11 月 13 日修改。', 'The reply was posted on November 12 and edited on November 13.'),
      sources: [{label: label('雪球原帖', 'Original Xueqiu reply'), href: 'https://www.xueqiu.com/1247347556/416655949'}]
    },
    {
      id: 'duan-business', participant: 'duan', speaker: speaker.duan,
      date: '2026-11-12', kind: label('雪球回复', 'Xueqiu reply'),
      title: label('短期影响有限，长期取决于继任者', 'Limited near-term impact, with the long term up to the successor'),
      summary: label(
        '段永平判断英伟达的业务短期受影响有限。几年后的发展取决于能否找到合适的 CEO，他认为黄仁勋的技术远见和工作投入难以替代。',
        'Duan expected little immediate impact on NVIDIA’s business. Over several years, he said, performance would depend on finding a capable CEO who could match Huang’s vision and dedication.'
      ),
      sources: [{label: label('雪球原帖', 'Original Xueqiu reply'), href: 'https://www.xueqiu.com/1247347556/416654452'}]
    },
    {
      id: 'zaobao-coverage', participant: 'media', speaker: label('联合早报', 'Lianhe Zaobao'),
      date: '2026-11-11', kind: label('媒体解读', 'Media analysis'),
      title: label('讨论风波中的报道与待核实说法', 'Discusses what has been reported and what remains uncertain'),
      summary: label(
        '《联合早报》节目讨论了公开报道、英伟达启动的独立调查，以及仍有待查证的说法。',
        'A Lianhe Zaobao discussion reviewed public reporting, NVIDIA’s independent review and claims that still needed verification.'
      ),
      sources: [{label: label('联合早报节目', 'Lianhe Zaobao discussion'), href: 'https://www.zaobao.com.sg/news/story20261111-9978451'}]
    },
    {
      id: 'independent-counsel', participant: 'nvidia', speaker: label('英伟达独立董事', 'NVIDIA independent directors'),
      date: '2026-11-10', kind: label('独立董事声明', 'Independent directors’ statement'),
      title: label('委托外部律师开展调查', 'Independent directors retain outside counsel'),
      summary: label(
        '英伟达独立董事宣布，已聘请金俊（Joon H. Kim）及其所在的 Wachtell 律师事务所开展独立调查。',
        'NVIDIA’s independent directors said they had retained Joon H. Kim and the firm Wachtell, Lipton, Rosen & Katz to conduct the independent investigation.'
      ),
      sources: [source.independentDirectors]
    },
    {
      id: 'huang-apology', participant: 'huang', speaker: speaker.huang,
      date: '2026-11-08', kind: label('员工信', 'Letter to employees'),
      title: label('致信员工道歉，承诺配合调查', 'Apologizes in a letter to employees and pledges to cooperate'),
      summary: label(
        '黄仁勋在英伟达公开的员工信中向家人和同事道歉，并表示会配合董事会的独立调查。',
        'In a letter to employees published by NVIDIA, Huang apologized to his family and colleagues and said he would cooperate with the board’s independent investigation.'
      ),
      sources: [source.apology]
    },
    {
      id: 'board-investigation', participant: 'nvidia', speaker: speaker.nvidia,
      date: '2026-11-08', kind: label('董事会声明', 'Board statement'),
      title: label('启动独立调查', 'Board opens an independent investigation'),
      summary: label(
        '英伟达董事会宣布就相关报道启动独立调查，由独立董事委员会在外部法律顾问协助下监督。',
        'The board announced an independent investigation into the reports, overseen by a committee of independent directors with the help of outside counsel.'
      ),
      sources: [source.boardReview]
    }
  ],
  debate: [
    {
      id: 'board-debate', speaker: boardPosition.speaker, date: boardPosition.date,
      role: 'company', side: 'handoff', priority: 10, kind: boardPosition.kind,
      title: boardPosition.title, summary: boardPosition.summary, sources: boardPosition.sources,
      timelineId: boardPosition.id, profilePath: 'companies/nvidia/'
    },
    {
      id: 'bessent-debate', speaker: label('斯科特·贝森特', 'Scott Bessent'),
      role: 'official', side: 'handoff', priority: 20,
      date: '2026-11-15', kind: label('美国财政部长 · 电视访谈', 'U.S. Treasury secretary · TV interview'),
      title: label('建议从英伟达外部物色新 CEO', 'Calls for a CEO search outside NVIDIA'),
      summary: label(
        '贝森特在福克斯新闻访谈中认为，英伟达需要较大的管理层调整，建议董事会从公司外部寻找新负责人。',
        'In a Fox News interview, Bessent argued for a substantial leadership shake-up and urged the board to look outside the company for a new CEO.'
      ),
      sources: [source.bessent]
    },
    {
      id: 'trump-debate', speaker: label('特朗普', 'Donald Trump'),
      role: 'official', side: 'return', priority: 10,
      date: '2026-11-16', kind: label('美国总统 · 答记者问', 'U.S. president · Press remarks'),
      title: label('表示不介意黄仁勋回任', 'Says he would not mind Huang returning'),
      summary: label(
        '特朗普在白宫启程前接受记者提问时说，他不介意黄仁勋恢复 CEO 职务，并认为黄仁勋已经从此事中吸取教训。',
        'Asked by reporters before leaving the White House, Trump said he would not mind Huang being reinstated and believed Huang had learned a lesson.'
      ),
      sources: [source.trump, source.trumpAndMusk]
    },
    {
      id: 'musk-debate', speaker: label('马斯克等联署人', 'Elon Musk and co-signers'),
      role: 'entrepreneur', side: 'return', priority: 20,
      date: '2026-11-16', kind: label('科技界人士 · 联署经媒体报道', 'Technology leaders · Petition reported by the press'),
      title: label('联署呼吁调查期间恢复职务', 'Petition calls for reinstatement during the investigation'),
      summary: label(
        'Stand with Jensen 公开信呼吁董事会在独立调查期间恢复黄仁勋的 CEO 职务。美联社报道，马斯克和 Epic Games CEO 蒂姆·斯威尼在联署人之列。',
        'The Stand with Jensen letter called on the board to reinstate Huang while an independent investigation proceeds. The Associated Press reported that Musk and Epic Games CEO Tim Sweeney were among the signatories.'
      ),
      sources: [source.petition, source.trumpAndMusk],
      timelineId: 'petition-report', profilePath: 'people/elon-musk/'
    },
    {
      id: 'congress-context', speaker: label('美国众议院三个委员会', 'Three U.S. House committees'),
      role: 'institution', side: 'context', priority: 10,
      date: '2026-11-17', kind: label('国会监督 · 联合声明', 'Congressional oversight · Joint statement'),
      title: label('宣布安排有记录的问询', 'Announces dates for transcribed interviews'),
      summary: label(
        '众议院情报、外交及对华特别委员会的主席宣布，黄仁勋与英伟达总法律顾问蒂姆·泰特同意于 12 月 1 日和 2 日分别接受有记录的问询。',
        'The chairs of the House intelligence, foreign affairs and select China committees said Huang and NVIDIA general counsel Tim Teter had agreed to transcribed interviews on December 1 and 2, respectively.'
      ),
      sources: [source.congress]
    },
    {
      id: 'commerce-context', speaker: label('美国商务部工业与安全局', 'U.S. Bureau of Industry and Security'),
      role: 'institution', side: 'context', priority: 15,
      date: '2026-11-16', kind: label('美国商务部 · 政策背景', 'U.S. Commerce Department · Policy context'),
      title: label('发布先进算力远程访问规则', 'Publishes rules on remote access to advanced computing'),
      summary: label(
        '美国商务部工业与安全局发布临时最终规则，旨在防止通过第三国数据中心远程访问先进芯片和服务器来规避现有出口限制。',
        'The bureau issued an interim final rule aimed at preventing remote access to advanced chips and servers through third-country data centers from circumventing existing export restrictions.'
      ),
      sources: [{
        label: label('美国商务部工业与安全局公告', 'Bureau of Industry and Security announcement'),
        href: 'https://www.bis.gov/press-release/bis-issues-rule-addressing-remote-access-american-super-intelligence-technology'
      }]
    },
    {
      id: 'bezos-context', speaker: label('杰夫·贝索斯', 'Jeff Bezos'),
      role: 'entrepreneur', side: 'context', priority: 20,
      date: '2026-11-17', kind: label('亚马逊创始人 · 论坛发言', 'Amazon founder · Forum remarks'),
      title: label('若另选继任者，优先考虑内部人选', 'Would favor an insider if a successor is needed'),
      summary: label(
        '贝索斯说，自己掌握的信息不足以判断黄仁勋是否应该复任。若董事会另选 CEO，他建议优先看内部人选，因为英伟达业务复杂。',
        'Bezos said he did not know enough to judge whether Huang should return. If the board chooses a successor, he favors an internal candidate because of NVIDIA’s complexity.'
      ),
      sources: [source.techLeaders, source.bezos]
    },
    {
      id: 'altman-context', speaker: label('萨姆·奥尔特曼', 'Sam Altman'),
      role: 'entrepreneur', side: 'context', priority: 30,
      date: '2026-11-16', kind: label('OpenAI CEO · 论坛发言', 'OpenAI CEO · Forum remarks'),
      title: label('肯定黄仁勋的贡献，暂不判断回任', 'Credits Huang’s contribution and reserves judgment on a return'),
      summary: label(
        '奥尔特曼在 Semafor 论坛上表示理解黄仁勋的处境，也感谢英伟达早期对 OpenAI 的支持。他认为自己掌握的信息不足以判断黄仁勋是否应该回任。',
        'At the Semafor forum, Altman expressed empathy and credited NVIDIA’s early support of OpenAI. He said he did not know enough to judge whether Huang should return.'
      ),
      sources: [source.techLeaders]
    },
    {
      id: 'gerstner-context', speaker: label('布拉德·格斯特纳', 'Brad Gerstner'),
      role: 'investor', side: 'context', priority: 40,
      date: '2026-11-16', kind: label('Altimeter Capital 创始人 · 电视访谈', 'Altimeter Capital founder · TV interview'),
      title: label('建议董事会充分听取黄仁勋陈述', 'Urges the board to give Huang a full hearing'),
      summary: label(
        '格斯特纳在 CNBC 表示，董事会应充分听取黄仁勋的陈述，再向股东说明结果。他认为克雷斯及现有团队有能力维持过渡期运营。',
        'Gerstner told CNBC that the board should hear Huang out and explain the outcome to shareholders. He expressed confidence in Kress and the team’s ability to operate during the transition.'
      ),
      sources: [source.gerstner]
    }
  ],
  articleSeries: {
    handoff: [
      'nvidia-jensen-debate-05-platform-continuity',
      'nvidia-jensen-debate-06-governance-succession',
      'nvidia-jensen-debate-07-partnership-continuity',
      'nvidia-jensen-debate-08-ai-industrial-system'
    ],
    return: [
      'nvidia-jensen-debate-01-platform-leadership',
      'nvidia-jensen-debate-02-founder-succession',
      'nvidia-jensen-debate-03-industry-network',
      'nvidia-jensen-debate-04-us-ai-competitiveness'
    ]
  },
  author: {
    zh: {articleSlug: 'nvidia-jensen-debate-09-handover-timing'},
    en: {articleSlug: 'nvidia-jensen-debate-09-handover-timing'}
  }
};
