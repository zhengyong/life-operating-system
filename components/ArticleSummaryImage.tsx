import fs from 'node:fs';
import path from 'node:path';
import {Locale, getDictionary} from '@/lib/i18n';

type SummaryImageManifest = Record<string, {src: string; width: number; height: number}>;

const manifestPath = path.join(process.cwd(), 'public', 'article-summaries', 'manifest.json');

function getManifest(): SummaryImageManifest {
  if (!fs.existsSync(manifestPath)) {
    return {};
  }

  return JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as SummaryImageManifest;
}

export function ArticleSummaryImage({locale, slug, title}: {locale: Locale; slug: string; title: string}) {
  const t = getDictionary(locale);
  const image = getManifest()[`${locale}/${slug}`];

  if (!image) {
    return (
      <figure className="mt-8 overflow-hidden rounded-lg border border-dashed border-line bg-white">
        <div
          aria-label={`${title} ${t.articles.summaryImage}`}
          className="flex aspect-[16/9] w-full items-center justify-center bg-soft"
        >
          <span className="text-sm font-medium text-muted">
            {locale === 'zh' ? '文章总结图待制作' : 'Summary image pending'}
          </span>
        </div>
        <figcaption className="border-t border-line bg-white px-4 py-3 text-sm font-medium text-muted">
          {t.articles.summaryImage}
        </figcaption>
      </figure>
    );
  }

  return (
    <figure className="mt-8 overflow-hidden rounded-lg border border-line bg-white shadow-soft">
      <img
        src={image.src}
        alt={`${title} ${t.articles.summaryImage}`}
        width={image.width}
        height={image.height}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        sizes="(max-width: 768px) 100vw, 768px"
        className="block aspect-[16/9] h-auto w-full object-cover"
      />
      <figcaption className="border-t border-line bg-soft px-4 py-3 text-sm font-medium text-muted">
        {t.articles.summaryImage}
      </figcaption>
    </figure>
  );
}
