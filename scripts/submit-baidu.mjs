const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zhengyong.world').replace(/\/$/, '');
const baiduSite = (process.env.BAIDU_SITE ?? siteUrl).replace(/\/$/, '');
const baiduToken = process.env.BAIDU_PUSH_TOKEN;

const defaultPaths = [
  '/',
  '/zh/',
  '/zh/about/',
  '/zh/articles/',
  '/zh/books/',
  '/zh/life/',
  '/zh/career/',
  '/zh/education/',
  '/zh/topics/',
  '/zh/topics/life-operating-system/',
  '/zh/topics/first-principles/',
  '/zh/topics/lifelong-learning/',
  '/zh/topics/company-culture/',
  '/zh/topics/family-education/'
];

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function normalizeUrl(value) {
  const url = new URL(value, `${siteUrl}/`);
  const baiduOrigin = new URL(baiduSite);
  url.protocol = baiduOrigin.protocol;
  url.host = baiduOrigin.host;
  return url.toString();
}

function parseArgs(argv) {
  const options = {
    all: false,
    urls: [],
    limit: null
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--all') {
      options.all = true;
    } else if (arg === '--url') {
      options.urls.push(argv[index + 1]);
      index += 1;
    } else if (arg === '--limit') {
      options.limit = Number(argv[index + 1]);
      index += 1;
    }
  }

  return options;
}

async function readUrlsFromSitemap() {
  const response = await fetch(`${siteUrl}/sitemap.xml`, {
    headers: {
      'User-Agent': 'life-os-baidu-submit/1.0'
    }
  });

  if (!response.ok) {
    throw new Error(`Unable to read sitemap: HTTP ${response.status}`);
  }

  const xml = await response.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

async function main() {
  if (!baiduToken) {
    throw new Error('Set BAIDU_PUSH_TOKEN from Baidu Search Resource Platform before running npm run seo:baidu.');
  }

  const options = parseArgs(process.argv.slice(2));
  const sitemapUrls = options.all ? await readUrlsFromSitemap() : [];
  const selectedUrls = unique([...defaultPaths, ...options.urls, ...sitemapUrls].map(normalizeUrl));
  const urlList = options.limit ? selectedUrls.slice(0, options.limit) : selectedUrls;

  if (urlList.length === 0) {
    throw new Error('No URLs selected for Baidu submission.');
  }

  const endpoint = `http://data.zz.baidu.com/urls?site=${baiduSite}&token=${encodeURIComponent(baiduToken)}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain'
    },
    body: urlList.join('\n')
  });
  const body = await response.text();

  if (!response.ok) {
    throw new Error(`Baidu submission failed: HTTP ${response.status} ${body}`);
  }

  console.log(`Submitted ${urlList.length} URL(s) to Baidu for ${baiduSite}.`);
  console.log(body);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
