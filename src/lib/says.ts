import { getCollection, type CollectionEntry } from 'astro:content';

export type Say = CollectionEntry<'says'>;

/** 已发布说说，按日期新到旧 */
export async function getPublishedSays(): Promise<Say[]> {
  const says = await getCollection('says', ({ data }) => !data.draft);
  return says.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
