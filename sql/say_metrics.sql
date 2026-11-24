-- 说说浏览量 / 点赞计数表
-- 在 Supabase 控制台 → SQL Editor → New query，粘贴本文件全部内容并执行。

-- 1. 计数表：say_id 对应说说 Markdown 的文件 id（不含扩展名）
create table if not exists say_metrics (
  say_id text primary key,
  views  int4 not null default 0,
  likes  int4 not null default 0
);

-- 2. 原子自增函数：前端通过 RPC 调用，避免“读出来 +1 再写回”的并发竞态
create or replace function bump_say(p_say_id text, p_col text)
returns void
language plpgsql
security definer
as $$
begin
  insert into say_metrics (say_id, views, likes)
  values (p_say_id, 0, 0)
  on conflict (say_id) do nothing;

  if p_col = 'views' then
    update say_metrics set views = views + 1 where say_id = p_say_id;
  elsif p_col = 'likes' then
    update say_metrics set likes = likes + 1 where say_id = p_say_id;
  end if;
end;
$$;

-- 3. 匿名访问策略：访客无需登录即可读计数、浏览/点赞时写入
alter table say_metrics enable row level security;

drop policy if exists "anon read"   on say_metrics;
drop policy if exists "anon insert" on say_metrics;
drop policy if exists "anon update" on say_metrics;

create policy "anon read"   on say_metrics for select to anon using (true);
create policy "anon insert" on say_metrics for insert to anon with check (true);
create policy "anon update" on say_metrics for update to anon
  using (true) with check (true);

-- 4. 允许匿名角色调用自增函数
grant execute on function bump_say(text, text) to anon;
