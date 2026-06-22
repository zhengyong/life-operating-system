const hiddenPersonSlugs = new Set(['warren-buffett', 'charlie-munger', 'duan-yongping']);
const hiddenCompanySlugs = new Set(['berkshire-hathaway']);

export function isPublicPersonSlug(slug: string) {
  return Boolean(slug) && !hiddenPersonSlugs.has(slug);
}

export function isPublicCompanySlug(slug: string) {
  return Boolean(slug) && !hiddenCompanySlugs.has(slug);
}

export function isPublicPersonLesson(personSlug: string) {
  return isPublicPersonSlug(personSlug);
}
