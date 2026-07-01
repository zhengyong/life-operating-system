import type {MetadataRoute} from 'next';
import {siteUrl} from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  const host = new URL(siteUrl).host;

  return {
    rules: [
      {
        userAgent: ['Baiduspider', 'Baiduspider-image', 'Baiduspider-render'],
        allow: '/'
      },
      {
        userAgent: '*',
        allow: '/'
      }
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host
  };
}
