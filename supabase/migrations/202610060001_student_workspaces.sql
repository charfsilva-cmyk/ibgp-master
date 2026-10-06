-- Applied to the PCMG Master Supabase project.
create table if not exists public.student_workspaces (
 user_id uuid primary key references auth.users(id) on delete cascade,
 data jsonb not null default '{}'::jsonb,
 updated_at timestamptz not null default now()
);
alter table public.student_workspaces enable row level security;
revoke all on public.student_workspaces from anon;
grant select, insert, update on public.student_workspaces to authenticated;
create policy own_workspace_read on public.student_workspaces for select to authenticated using ((select auth.uid()) = user_id);
create policy own_workspace_create on public.student_workspaces for insert to authenticated with check ((select auth.uid()) = user_id);
create policy own_workspace_update on public.student_workspaces for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
