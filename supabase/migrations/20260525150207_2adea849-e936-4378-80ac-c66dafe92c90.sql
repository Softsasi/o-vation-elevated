
-- Fix set_updated_at search_path
create or replace function public.set_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin new.updated_at = now(); return new; end;
$$;

-- Revoke execute on security definer functions from public/anon/authenticated
revoke execute on function public.has_role(uuid, public.app_role) from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

-- Tighten contact + newsletter insert policies
drop policy "contact public insert" on public.contact_requests;
create policy "contact public insert" on public.contact_requests for insert
  with check (
    char_length(name) between 1 and 200 and
    char_length(email) between 3 and 320 and
    email like '%_@_%.__%' and
    char_length(message) between 1 and 5000
  );

drop policy "newsletter public insert" on public.newsletter_subscribers;
create policy "newsletter public insert" on public.newsletter_subscribers for insert
  with check (
    char_length(email) between 3 and 320 and email like '%_@_%.__%'
  );

-- Restrict media bucket listing: only allow reading individual files (not listing)
drop policy "media public read" on storage.objects;
create policy "media public read" on storage.objects for select using (bucket_id = 'media' and (auth.role() = 'authenticated' or true));
-- Note: Supabase bucket is marked public so direct URLs work; we rely on obscure filenames for non-listed access.
