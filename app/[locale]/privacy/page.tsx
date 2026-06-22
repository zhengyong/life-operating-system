import type {Metadata} from 'next';
import Link from 'next/link';
import {ShieldCheck} from 'lucide-react';
import {PageShell} from '@/components/PageShell';
import {isLocale, Locale} from '@/lib/i18n';
import {localizedPageMetadata} from '@/lib/seo';

const updatedDate = '2026-06-20';

const content = {
  en: {
    eyebrow: 'Privacy',
    title: 'Privacy Policy',
    description:
      'How this website collects, uses, and protects information, including analytics, cookies, and future Google advertising services.',
    updated: 'Last updated',
    intro:
      "Yong Zheng's Life Operating System is a bilingual personal knowledge website. This policy explains what information may be collected when you visit the site, how it is used, and what choices you have.",
    sections: [
      {
        title: 'Information We Collect',
        body: [
          'The site may collect limited technical information that browsers normally send, such as page URL, referrer, device type, browser type, approximate location, language, and interaction events.',
          'If you contact me by email or WeChat, the information you choose to send may be used to reply to you and manage that conversation.'
        ]
      },
      {
        title: 'Analytics',
        body: [
          'This site uses Google Analytics to understand site traffic, popular pages, referral sources, country or city-level audience distribution, and general usage patterns.',
          'Google Analytics may use cookies or similar technologies to measure visits and interactions. Analytics data is used to improve the site and is not used to identify individual visitors personally.'
        ]
      },
      {
        title: 'Cookies and Advertising',
        body: [
          'This site may use cookies, local storage, pixels, or similar technologies for analytics, security, site operation, and advertising.',
          'If Google advertising products such as Google AdSense or Google Ad Manager are added in the future, third-party vendors, including Google, may use cookies to serve ads based on a user’s prior visits to this website or other websites.',
          'Google’s use of advertising cookies enables Google and its partners to serve ads based on visits to this site and/or other sites on the Internet.',
          'Other third-party ad vendors or ad networks may also use cookies or similar technologies to serve ads, measure ad performance, prevent fraud, and manage ad frequency.'
        ]
      },
      {
        title: 'Your Choices',
        body: [
          'You can control or delete cookies through your browser settings. Blocking cookies may affect some measurement or advertising features.',
          'You can opt out of personalized advertising from Google by visiting Google Ads Settings.',
          'You can also opt out of some third-party vendors’ use of cookies for personalized advertising through industry opt-out tools such as aboutads.info, where available.'
        ],
        links: [
          {label: 'Google Ads Settings', href: 'https://adssettings.google.com/'},
          {label: 'AboutAds opt-out', href: 'https://www.aboutads.info/choices/'},
          {label: 'How Google uses information from sites or apps', href: 'https://policies.google.com/technologies/partner-sites'}
        ]
      },
      {
        title: 'Third-Party Services',
        body: [
          'The site may link to third-party websites, tools, social platforms, analytics services or advertising services. Their privacy practices are governed by their own policies.',
          'This site is not responsible for the content or privacy practices of external websites.'
        ]
      },
      {
        title: 'Data Retention and Security',
        body: [
          'Analytics data and communication records are kept only as long as reasonably useful for site operation, improvement, security, communication, or legal compliance.',
          'Reasonable safeguards are used to protect information, but no website or Internet transmission can be guaranteed to be completely secure.'
        ]
      },
      {
        title: 'Children',
        body: [
          'This site is intended for a general audience and is not directed to children under 13. If you believe a child has provided personal information, please contact me so that I can review and delete it when appropriate.'
        ]
      },
      {
        title: 'Updates to This Policy',
        body: [
          'This privacy policy may be updated as the website changes or as analytics, advertising, consent, or legal requirements evolve. The updated date above shows when the policy was last changed.'
        ]
      },
      {
        title: 'Contact',
        body: ['For privacy questions or requests, please contact: zhengyong8797@gmail.com.']
      }
    ]
  },
  zh: {
    eyebrow: '隐私',
    title: '隐私政策',
    description: '说明本站如何收集、使用和保护信息，包括分析工具、Cookie 以及未来接入 Google 广告服务时的相关说明。',
    updated: '最后更新',
    intro:
      '郑勇的人生操作系统是一个双语个人知识网站。本政策说明你访问本站时可能收集的信息、使用方式，以及你可以做出的隐私选择。',
    sections: [
      {
        title: '我们收集的信息',
        body: [
          '本站可能收集浏览器通常会发送的有限技术信息，例如页面 URL、来源页面、设备类型、浏览器类型、大致位置、语言和交互事件。',
          '如果你通过邮箱或微信联系我，你主动提供的信息可能会被用于回复你并管理相关沟通。'
        ]
      },
      {
        title: '网站分析',
        body: [
          '本站使用 Google Analytics 了解网站访问量、热门页面、来源渠道、国家或城市层面的受众分布，以及整体使用情况。',
          'Google Analytics 可能使用 Cookie 或类似技术来衡量访问和交互。分析数据用于改进网站，不用于主动识别单个访问者的真实身份。'
        ]
      },
      {
        title: 'Cookie 与广告',
        body: [
          '本站可能使用 Cookie、本地存储、像素或类似技术，用于网站分析、安全、站点运行和广告相关功能。',
          '如果本站未来接入 Google AdSense、Google Ad Manager 等 Google 广告产品，第三方供应商（包括 Google）可能会使用 Cookie，根据用户此前访问本站或其他网站的记录来投放广告。',
          'Google 使用广告 Cookie，可以让 Google 及其合作伙伴基于用户访问本站和/或互联网上其他网站的情况投放广告。',
          '其他第三方广告供应商或广告网络也可能使用 Cookie 或类似技术来投放广告、衡量广告效果、防范欺诈，以及管理广告展示频率。'
        ]
      },
      {
        title: '你的选择',
        body: [
          '你可以通过浏览器设置控制或删除 Cookie。禁用 Cookie 可能会影响部分统计、广告或网站功能。',
          '你可以访问 Google 广告设置，选择退出 Google 个性化广告。',
          '在可用地区，你也可以通过 aboutads.info 等行业退出工具，选择退出部分第三方供应商基于 Cookie 的个性化广告。'
        ],
        links: [
          {label: 'Google 广告设置', href: 'https://adssettings.google.com/'},
          {label: 'AboutAds 退出工具', href: 'https://www.aboutads.info/choices/'},
          {label: 'Google 如何使用来自网站或应用的信息', href: 'https://policies.google.com/technologies/partner-sites'}
        ]
      },
      {
        title: '第三方服务',
        body: [
          '本站可能链接到第三方网站、工具、社交平台、服务服务、分析服务或广告服务。这些服务的隐私实践由其各自的隐私政策约束。',
          '本站不对外部网站的内容或隐私实践负责。'
        ]
      },
      {
        title: '数据保留与安全',
        body: [
          '分析数据和沟通记录仅在网站运行、改进、安全、沟通或法律合规所合理需要的期间内保留。',
          '本站会采取合理措施保护信息安全，但任何网站或互联网传输都无法保证绝对安全。'
        ]
      },
      {
        title: '儿童隐私',
        body: [
          '本站面向一般受众，不以 13 岁以下儿童为目标用户。如果你认为儿童向本站提供了个人信息，请联系我，我会在适当情况下进行核查和删除。'
        ]
      },
      {
        title: '政策更新',
        body: [
          '随着网站功能、分析工具、广告服务、同意管理或法律要求变化，本隐私政策可能会更新。页面顶部的更新日期表示本政策最近一次修改时间。'
        ]
      },
      {
        title: '联系方式',
        body: ['如有隐私相关问题或请求，请联系：zhengyong8797@gmail.com。']
      }
    ]
  }
} satisfies Record<
  Locale,
  {
    eyebrow: string;
    title: string;
    description: string;
    updated: string;
    intro: string;
    sections: Array<{title: string; body: string[]; links?: Array<{label: string; href: string}>}>;
  }
>;

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'zh'}];
}

export async function generateMetadata({params}: {params: {locale: string}}): Promise<Metadata> {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const page = content[locale];

  return localizedPageMetadata({
    locale,
    path: 'privacy',
    title: page.title,
    description: page.description
  });
}

export default async function PrivacyPage({params}: {params: {locale: string}}) {
  const locale: Locale = isLocale(params.locale) ? params.locale : 'en';
  const page = content[locale];

  return (
    <PageShell locale={locale}>
      <main className="mx-auto max-w-4xl px-5 py-14 md:py-20">
        <div className="border-b border-line pb-10">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-md bg-soft text-accent">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">{page.eyebrow}</p>
          </div>
          <h1 className="mt-5 text-4xl font-semibold tracking-normal text-ink md:text-5xl">{page.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{page.description}</p>
          <p className="mt-4 text-sm text-muted">
            {page.updated}: <time dateTime={updatedDate}>{updatedDate}</time>
          </p>
        </div>

        <section className="border-b border-line py-8">
          <p className="text-base leading-8 text-ink">{page.intro}</p>
        </section>

        <div className="divide-y divide-line">
          {page.sections.map((section) => (
            <section key={section.title} className="py-8">
              <h2 className="text-2xl font-semibold tracking-normal text-ink">{section.title}</h2>
              <div className="mt-4 space-y-4 text-base leading-8 text-muted">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.links ? (
                <div className="mt-5 flex flex-wrap gap-3">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md border border-line px-3 py-2 text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </section>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
