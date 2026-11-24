const BASE = import.meta.env.BASE_URL;

/**
 * 给站内路径补上 base 前缀。
 * 项目站点部署在 /<repo>/ 下，任何内部链接都必须经过这里，否则会 404。
 */
export function withBase(path = '/'): string {
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

export function postUrl(slug: string): string {
  return withBase(`/posts/${slug}/`);
}
