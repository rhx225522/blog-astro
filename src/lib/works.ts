import { getCollection, type CollectionEntry } from 'astro:content';

export type Work = CollectionEntry<'works'>;

/** 已发布作品，按自定义 order 升序，再按年份降序 */
export async function getPublishedWorks(): Promise<Work[]> {
  const works = await getCollection('works', ({ data }) => !data.draft);
  return works.sort(
    (a, b) => a.data.order - b.data.order || (b.data.year ?? '').localeCompare(a.data.year ?? '')
  );
}
