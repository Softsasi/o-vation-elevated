
-- Roles enum and table
create type public.app_role as enum ('admin', 'user');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
alter table public.user_roles enable row level security;

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role)
$$;

create policy "user_roles self read" on public.user_roles for select to authenticated using (user_id = auth.uid() or public.has_role(auth.uid(),'admin'));
create policy "user_roles admin write" on public.user_roles for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "profiles self read" on public.profiles for select to authenticated using (id = auth.uid() or public.has_role(auth.uid(),'admin'));
create policy "profiles self update" on public.profiles for update to authenticated using (id = auth.uid());
create policy "profiles self insert" on public.profiles for insert to authenticated with check (id = auth.uid());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name'), new.raw_user_meta_data->>'avatar_url')
  on conflict (id) do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Generic updated_at trigger
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

-- Services
create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  deliverables jsonb not null default '[]'::jsonb,
  image_url text,
  order_index int not null default 0,
  translations jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.services enable row level security;
create trigger services_updated_at before update on public.services for each row execute function public.set_updated_at();
create policy "services public read" on public.services for select using (published or public.has_role(auth.uid(),'admin'));
create policy "services admin write" on public.services for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Experiences
create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  description text,
  image_url text,
  featured boolean not null default false,
  order_index int not null default 0,
  translations jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.experiences enable row level security;
create trigger experiences_updated_at before update on public.experiences for each row execute function public.set_updated_at();
create policy "experiences public read" on public.experiences for select using (published or public.has_role(auth.uid(),'admin'));
create policy "experiences admin write" on public.experiences for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Team
create table public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  bio text,
  photo_url text,
  order_index int not null default 0,
  translations jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.team_members enable row level security;
create trigger team_updated_at before update on public.team_members for each row execute function public.set_updated_at();
create policy "team public read" on public.team_members for select using (published or public.has_role(auth.uid(),'admin'));
create policy "team admin write" on public.team_members for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Testimonials
create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  author text not null,
  author_role text,
  order_index int not null default 0,
  translations jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.testimonials enable row level security;
create trigger testimonials_updated_at before update on public.testimonials for each row execute function public.set_updated_at();
create policy "testimonials public read" on public.testimonials for select using (published or public.has_role(auth.uid(),'admin'));
create policy "testimonials admin write" on public.testimonials for all to authenticated using (public.has_role(auth.uid(),'admin')) with check (public.has_role(auth.uid(),'admin'));

-- Contact requests
create table public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  service_interest text,
  locale text default 'en',
  status text not null default 'new',
  created_at timestamptz not null default now()
);
alter table public.contact_requests enable row level security;
create policy "contact public insert" on public.contact_requests for insert with check (true);
create policy "contact admin read" on public.contact_requests for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "contact admin update" on public.contact_requests for update to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "contact admin delete" on public.contact_requests for delete to authenticated using (public.has_role(auth.uid(),'admin'));

-- Newsletter
create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  locale text default 'en',
  confirmed boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.newsletter_subscribers enable row level security;
create policy "newsletter public insert" on public.newsletter_subscribers for insert with check (true);
create policy "newsletter admin read" on public.newsletter_subscribers for select to authenticated using (public.has_role(auth.uid(),'admin'));
create policy "newsletter admin delete" on public.newsletter_subscribers for delete to authenticated using (public.has_role(auth.uid(),'admin'));

-- Seed services
insert into public.services (slug, title, description, deliverables, order_index) values
('luxury-concierge', 'Luxury Concierge', 'Anticipating needs before they are spoken. From private travel arrangements to last-minute reservations at the world''s most coveted tables — a single point of contact for a life well-lived.', '["Private travel & jet coordination","Restaurant & venue access","Personal shopping & sourcing","24/7 dedicated support"]', 1),
('business-development', 'Business Development', 'Connections that move things forward. Strategic introductions, partnership architecture, and a network cultivated over years of trust.', '["Strategic partnerships","Investor introductions","Market entry consulting","Executive networking"]', 2),
('curated-experiences', 'Curated Experiences', 'Memorable moments designed with intention. Private dinners with Michelin-starred chefs, after-hours museum tours, bespoke wellness retreats — each one shaped to the individual.', '["Private dining experiences","Cultural & art access","Wellness & retreat design","Travel itineraries"]', 3),
('high-end-events', 'High-End Events', 'Events that tell a story. From intimate gatherings to corporate launches, every detail considered, every guest cared for.', '["Corporate events & launches","Private celebrations","Brand activations","Venue & vendor curation"]', 4);

-- Seed experiences
insert into public.experiences (title, category, description, featured, order_index, image_url) values
('Private Chef Series — Provence', 'Curated Experiences', 'A three-day immersion with a Michelin-starred chef in a private estate.', true, 1, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80'),
('After-Hours at the MMFA', 'Cultural', 'A private after-hours tour of the Montreal Museum of Fine Arts.', true, 2, 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1200&q=80'),
('Founders Forum — Cap Ferrat', 'Business Development', 'An intimate gathering of founders and investors on the French Riviera.', true, 3, 'https://images.unsplash.com/photo-1542317854-29df57f95184?w=1200&q=80'),
('Yacht Launch — Monaco', 'High-End Events', 'A discreet yacht launch event during the Grand Prix weekend.', false, 4, 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1200&q=80'),
('Wellness Retreat — Tulum', 'Curated Experiences', 'A bespoke five-day wellness retreat for a private client circle.', false, 5, 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1200&q=80'),
('Atelier Visit — Paris', 'Cultural', 'A private atelier visit and personal fitting with a couture house.', false, 6, 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80');

-- Seed team
insert into public.team_members (name, role, bio, order_index, photo_url) values
('Audrey', 'Founder & President', 'Audrey founded O-Vation on a single belief: that genuine relationships and uncompromising taste create experiences money alone cannot buy.', 1, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80');

-- Seed testimonials
insert into public.testimonials (quote, author, author_role, order_index) values
('Working with O-Vation felt like having a trusted friend in every city. They anticipated needs we didn''t know we had.', 'M. Laurent', 'Private Client, Geneva', 1),
('Audrey doesn''t just organize events — she composes them. Every detail felt intentional, every guest felt seen.', 'Sophie K.', 'Founder, Tech Startup', 2),
('The introductions alone changed the trajectory of our company. This is what real network is.', 'James R.', 'Managing Partner', 3);

-- Storage bucket
insert into storage.buckets (id, name, public) values ('media', 'media', true) on conflict (id) do nothing;
create policy "media public read" on storage.objects for select using (bucket_id = 'media');
create policy "media admin write" on storage.objects for insert to authenticated with check (bucket_id = 'media' and public.has_role(auth.uid(),'admin'));
create policy "media admin update" on storage.objects for update to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(),'admin'));
create policy "media admin delete" on storage.objects for delete to authenticated using (bucket_id = 'media' and public.has_role(auth.uid(),'admin'));
