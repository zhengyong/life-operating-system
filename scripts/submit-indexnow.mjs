const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.zhengyong.world').replace(/\/$/, '');
const indexNowKey = process.env.INDEXNOW_KEY ?? '8f2c9d4b7a1e4f6c9b0d3e5a7c8f1b2d';
const keyLocation = `${siteUrl}/${indexNowKey}.txt`;

const defaultUrls = [
  '/',
  '/en/',
  '/zh/',
  '/en/articles/',
  '/zh/articles/',
  '/en/books/',
  '/zh/books/',
  '/en/people/',
  '/zh/people/',
  '/en/companies/',
  '/zh/companies/',
  '/en/topics/',
  '/zh/topics/',
  '/en/topics/life-operating-system/',
  '/zh/topics/life-operating-system/',
  '/en/topics/first-principles/',
  '/zh/topics/first-principles/',
  '/en/topics/lifelong-learning/',
  '/zh/topics/lifelong-learning/',
  '/en/topics/company-culture/',
  '/zh/topics/company-culture/',
  '/en/topics/family-education/',
  '/zh/topics/family-education/'
].map((path) => new URL(path, siteUrl).toString());

function parseArgs(argv) {
  const options = {
    all: false,
    dryRun: false,
    urls: [],
    file: undefined,
    limit: undefined
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--all') options.all = true;
    else if (arg === '--dry-run') options.dryRun = true;
    else if (arg === '--url') options.urls.push(argv[++index]);
    else if (arg === '--file') options.file = argv[++index];
    else if (arg === '--limit') options.limit = Number(argv[++index]);
    else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return options;
}

async function readUrlsFromFile(filePath) {
  const {readFile} = await import('node:fs/promises');
  const text = await readFile(filePath, 'utf8');
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

async function readUrlsFromSitemap() {
  const response = await fetch(`${siteUrl}/sitemap.xml`);
  if (!response.ok) {
    throw new Error(`Unable to read sitemap: HTTP ${response.status}`);
  }

  const xml = await response.text();
  return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
}

async function verifyKeyFile() {
  const response = await fetch(keyLocation, {cache: 'no-store'});
  if (!response.ok) {
    throw new Error(`IndexNow key file is not deployed yet: ${keyLocation} returned HTTP ${response.status}`);
  }

  const text = (await response.text()).trim();
  if (text !== indexNowKey) {
    throw new Error(`IndexNow key file content does not match ${indexNowKey}`);
  }
}

function normalizeUrl(url) {
  return new URL(url, siteUrl).toString();
}

function unique(values) {
  return [...new Set(values)];
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const fileUrls = options.file ? await readUrlsFromFile(options.file) : [];
  const sitemapUrls = options.all ? await readUrlsFromSitemap() : [];
  const selectedUrls = unique([...defaultUrls, ...fileUrls, ...options.urls, ...sitemapUrls].map(normalizeUrl));
  const urlList = Number.isFinite(options.limit) ? selectedUrls.slice(0, options.limit) : selectedUrls;

  if (!urlList.length) {
    throw new Error('No URLs selected for IndexNow submission.');
  }

  const payload = {
    host: new URL(siteUrl).host,
    key: indexNowKey,
    keyLocation,
    urlList
  };

  if (options.dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  await verifyKeyFile();

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: {'Content-Type': 'application/json; charset=utf-8'},
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`IndexNow submission failed: HTTP ${response.status} ${body}`);
  }

  console.log(`Submitted ${urlList.length} URL(s) to IndexNow.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
