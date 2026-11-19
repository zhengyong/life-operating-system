# Perspective Atlas source audit

Audit date: **2026-11-19** (Asia/Shanghai). Scope: the Jensen Huang event in `content/perspectives/jensen-huang.ts`, during local development of the interactive prototype. This audit checks whether linked material supports the recorded statement; it does not endorse a speaker's view or resolve an investigation's underlying allegations.

The published timeline and the author's nine analysis essays are separate kinds of content: an essay's argument must not be presented as an outside person's statement. Pending sources should remain visibly pending until the actual material can be reviewed.

## Sources whose substantive content was reviewed

Each page below returned HTTP 200 **and contained the relevant material**. A successful response alone was not treated as verification.

| Linked source | Observed content and scope |
| --- | --- |
| [NVIDIA: A Message to Our Company](https://nvidianews.nvidia.com/news/a-message-to-our-company) | Letter dated November 8, 2026. Huang apologizes to his family and colleagues and says he will cooperate with the board's independent investigation. |
| [NVIDIA board statement](https://nvidianews.nvidia.com/news/statement-from-nvidia-board-of-directors) | Statement dated November 8, 2026. Announces an independent investigation following reporting of a foreign intelligence effort, with oversight by independent directors and outside counsel. It also says the board had no reason at that point to believe national security or NVIDIA secrets were compromised. |
| [NVIDIA independent directors' statement](https://nvidianews.nvidia.com/news/statement-from-the-independent-members-of-the-nvidia-board) | Statement dated November 10, 2026. Identifies Joon H. Kim and Wachtell, Lipton, Rosen & Katz as retained outside investigators. |
| [NVIDIA CEO transition announcement](https://nvidianews.nvidia.com/news/nvidia-announces-ceo-transition) | Announcement dated November 12, 2026. States that Huang resigned as president, CEO and director, effective immediately; Colette Kress became interim CEO; Harvey C. Jones became board chair; the successor search includes internal and external candidates. This page does **not** substantiate the later “no reinstatement” quote. |
| [NVIDIA Q3 FY2027 financial results](https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-third-quarter-fiscal-2027) | Additional official cross-check dated November 17, 2026. Identifies Kress as interim CEO and CFO. Its body did not contain the board's later “no reinstatement” quote. |
| [U.S. House Intelligence committee statement](https://intelligence.house.gov/2026/11/17/jensen-huang-and-nvidia-agree-to-appear-before-congress/) | Actual November 17, 2026 statement says Huang and general counsel Tim Teter agreed to transcribed interviews on December 1 and 2 respectively. This verifies the announced schedule, not any allegation quoted by the committee. |
| [BIS remote-access rule release](https://www.bis.gov/press-release/bis-issues-rule-addressing-remote-access-american-super-intelligence-technology) | Actual November 16, 2026 release describes an interim final rule addressing remote access to advanced chips and servers through third-country data centers. This is policy context, not a position on CEO reinstatement. |
| [Sina Finance reporting of Dan Bin's comments](https://finance.sina.com.cn/roll/2026-11-13/doc-iniypvhm1318501.shtml) | Actual November 13, 2026 article reports Dan Bin's view that transition gives competitors a window while CUDA and supply-chain barriers remain difficult to overturn quickly. This is secondary reporting of his comments. |
| [Red Star Capital Bureau reporting](https://static.cdsb.com/micropub/Articles/202611/25a02cbb69e34a3c78640f3370e70ec6.html) | Actual November 13, 2026 article reports Dan Bin's comments and quotes Duan Yongping on limited short-term business impact, difficulty finding a long-term successor and a possible adviser role. It provides secondary corroboration for Duan's earlier position; it does not verify the later November 16 Xueqiu reply. |

## Sources not verified in this audit

| Linked source | Exact observed result | Consequence |
| --- | --- | --- |
| [SEC 8-K link](https://www.sec.gov/Archives/edgar/data/1045810/000104581026000082/nvda-20261111.htm) | HTTP 403, “Your Request Originates from an Undeclared Automated Tool.” | The filing's specific November 11 effective-date detail was not independently verified. |
| [Reuters earnings-call report](https://www.reuters.com/business/nvidia-forecasts-quarterly-revenue-above-estimates-first-report-since-huangs-2026-11-17/) | Connection timed out after 25 seconds. | The board's “no reinstatement” quote remains pending. The transition announcement is not a substitute source for that later quote. |
| [AP publication of Huang's return statement](https://apnews.com/article/0f6d83fc6d97a30fc54bd66b5ac42eda) | HTTP 403, Cloudflare “Just a moment...” challenge. | The November 17 return statement was not independently reviewed. |
| [Stand with Jensen letter](https://standwithjensen.com/) | Connection timed out after 25 seconds. | Letter content and signatories were not independently reviewed. |
| [Reuters petition report](https://www.reuters.com/legal/transactional/silicon-valley-leaders-back-call-jensen-huangs-return-nvidia-2026-11-16/) | Connection timed out after 25 seconds. | Reported petition and signatory details remain pending. |
| [Reuters/Breakingviews Trump video](https://www.breakingviews.com/video/watch/idRW878616112026RP1/) | Connection timed out after 25 seconds. | The recorded Trump quote was not independently reviewed. |
| [AP Trump and Musk report](https://apnews.com/article/nvidia-artificial-intelligence-ai-jensen-huang-202e72d0c05646479e96a4936620b983) | HTTP 403, Cloudflare challenge. | The Trump and Musk statements attributed to this report remain pending. |
| [Reuters Bessent interview report](https://www.reuters.com/world/bessent-says-nvidia-must-go-outside-company-find-new-ceo-2026-11-15/) | Connection timed out after 25 seconds. | The recorded Bessent quote remains pending. |
| [AP Semafor forum report](https://apnews.com/article/nvidia-jensen-huang-tech-ceo-reactions-063310aae44182e67e55c04c5b1e29e4) | HTTP 403, Cloudflare challenge. | Altman/Bezos forum comments attributed to this article remain pending. |
| [GeekWire Bezos report](https://www.geekwire.com/2026/jeff-bezos-has-some-advice-for-nvidias-board-on-its-ceo-search/) | HTTP 403, Cloudflare challenge. | Bezos's recorded view remains pending. |
| [CNBC Gerstner excerpt](https://pressroom.versantmedia.com/cnbc/press-releases/cnbc-exclusive-excerpts-altimeter-capital-founder-ceo-brad-gerstner-speaks) | DNS lookup failed for `pressroom.versantmedia.com`. | Source currently unavailable; find a working primary excerpt or reliable report before marking verified. |
| [Duan November 16 Xueqiu reply](https://www.xueqiu.com/1247347556/416998377) | HTTP 567, security-policy block page. | The later changed assessment remains pending. |
| [Duan earlier Xueqiu reply](https://www.xueqiu.com/1247347556/416655949) | HTTP 567, security-policy block page. | Original reply and edit date not reviewed; earlier position has separate secondary reporting. |
| [Duan business-impact Xueqiu reply](https://www.xueqiu.com/1247347556/416654452) | HTTP 567, security-policy block page. | Original reply not reviewed; secondary Red Star reporting is available. |
| [Zaobao discussion](https://www.zaobao.com.sg/news/story20261111-9978451) | Redirected to `zaobao.com`, then HTTP 404 with an actual “Page Not Found” page. | Confirmed unavailable link in this audit; the discussion claim needs a replacement source. |

## How to interpret the audit

“Verified” means the linked page's actual content was inspected and supports the stated material at the scope described above. It is not a conclusion about guilt, an endorsement of an opinion or permission to combine unrelated claims under one verified badge.

An access challenge, rate/security block, DNS failure or timeout is not proof that a statement is false. Likewise, a reachable home page, a generic error page or a search snippet does not corroborate a statement. Recheck pending material using a working original source or reliable full report before publication; retain the source and audit date when verification changes.

The build-time `scripts/validate-perspectives.ts` checks data structure, references, dates, URLs and bilingual article availability. It deliberately makes no network requests and does not promote pending sources to verified merely because an HTTP request succeeds.
