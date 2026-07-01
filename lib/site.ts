export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zhengyong.world').replace(/\/$/, '');

export function pageUrl(pathname = '') {
  const normalizedPath = pathname ? `/${pathname.replace(/^\/+|\/+$/g, '')}/` : '';
  return `${siteUrl}${normalizedPath}`;
}
