
# Complete O-Vation — Backend, Admin CMS, Trilingual & Forms

Building out the remaining brief items: easy-to-manage backend, working contact form, newsletter capture, and full English / French / Bangla support.

## 1. Enable Lovable Cloud
Provision database, auth, storage, edge functions. All content currently hard-coded will move to managed tables so Audrey can edit without touching code.

## 2. Database schema (with RLS)
- `services` — title, slug, description, deliverables (jsonb), order_index, image_url, translations (jsonb: en/fr/bn)
- `experiences` — title, category, description, image_url, featured, order_index, translations
- `team_members` — name, role, bio, photo_url, order_index, translations
- `testimonials` — quote, author, role, order_index, translations
- `contact_requests` — name, email, phone, message, service_interest, created_at, status
- `newsletter_subscribers` — email, locale, created_at, confirmed
- `user_roles` (separate table) with `app_role` enum (`admin`, `user`) + `has_role()` SECURITY DEFINER function
- `profiles` — id (FK auth.users), full_name, avatar_url

RLS:
- Public SELECT on services / experiences / team_members / testimonials
- Admin-only INSERT/UPDATE/DELETE on content tables (via `has_role(auth.uid(),'admin')`)
- Public INSERT on contact_requests + newsletter_subscribers; admin-only SELECT
- Storage bucket `media` — public read, admin write

## 3. Authentication
- Email/password + Google sign-in (Lovable Cloud managed)
- Auto-create profile via trigger on signup
- First user is seeded as admin manually; subsequent admin promotion done from admin panel
- `/auth` page (sign in / sign up) — branded, not in main nav
- `/reset-password` page for recovery flow

## 4. Admin Panel (`/admin/*`)
Protected by `RequireAdmin` wrapper (checks `has_role`). Sidebar layout (shadcn sidebar, collapsible) with sections:
- **Dashboard** — counts, recent contact requests, recent subscribers
- **Services** — table + edit drawer (title/description/image/order, per-locale fields)
- **Experiences** — table + edit drawer, image upload, category, featured toggle
- **Team** — table + edit drawer, photo upload
- **Testimonials** — table + edit drawer
- **Contact Requests** — read-only inbox, mark status (new / replied / archived), CSV export
- **Newsletter** — list subscribers, CSV export
- **Media Library** — uploads to `media` bucket
- **Settings** — manage admin users (promote/demote via `user_roles`)

All forms use react-hook-form + zod. Tables use TanStack Query for fetch + invalidation.

## 5. Contact form backend
- Edge function `submit-contact` — zod-validates payload, inserts into `contact_requests`, sends Audrey a notification email via Lovable transactional email (after email domain setup) and an acknowledgment to the visitor
- Hook up `Contact.tsx` form to invoke it; keep toast feedback

## 6. Newsletter
- Footer email input (already styled) → edge function `subscribe-newsletter` inserts into `newsletter_subscribers` with current locale
- Toast confirmation; duplicate-email handled gracefully

## 7. Trilingual (EN / FR / BN)
- Install `i18next` + `react-i18next` + `i18next-browser-languagedetector`
- Locale files: `src/locales/en.json`, `src/locales/fr.json`, `src/locales/bn.json` covering all static UI strings (nav, hero, services, about, testimonials, contact, footer, admin labels)
- Language switcher inside the full-screen overlay menu (3 minimal labels: EN · FR · বাংলা)
- Persist choice in localStorage; default to browser locale
- `<html lang>` updated on change; SEO meta strings also translated per page
- Dynamic content (services, experiences, team, testimonials) reads `translations[locale]` with fallback to base English fields
- Bangla typography: add `Noto Serif Bengali` (display) + `Noto Sans Bengali` (body) Google Fonts, applied via a CSS variable swap when `lang="bn"` so Playfair/Inter are replaced gracefully

## 8. Frontend page updates
- All current pages (`Index`, `About`, `Services`, `Experiences`, `Team`, `Testimonials`, `Contact`) refactored to read dynamic content from Cloud via TanStack Query, falling back to bundled seed copy while data loads
- Seed migration populates current placeholder copy in EN (FR + BN left empty for Audrey to fill — UI falls back to EN)

## 9. Routes added
- `/auth`, `/reset-password`
- `/admin` (dashboard), `/admin/services`, `/admin/experiences`, `/admin/team`, `/admin/testimonials`, `/admin/inbox`, `/admin/newsletter`, `/admin/media`, `/admin/settings`
- `404` already exists

## 10. Out of scope (will note to user)
- Custom email domain setup dialog — needs Audrey's domain; surfaced as a follow-up suggestion
- Real photography / team bios / client list — content seats waiting in CMS
- DNS/GoDaddy migration — separate operational task, not code

## Technical notes
- Roles are stored in a separate `user_roles` table (never on profiles) with a `has_role()` SECURITY DEFINER function used by all RLS policies — avoids recursion and privilege-escalation risk
- All edge functions: CORS headers, zod validation, no raw SQL
- Admin panel uses shadcn `Sidebar` with `collapsible="icon"`, NavLink active states — separate layout from the public marketing site so it doesn't break the floating-hamburger rule on the public pages
- i18n keys grouped by page; helper `useLocalizedField(record, 'title')` for dynamic content
- Bangla font swap implemented via `[lang="bn"] :root { --font-display: 'Noto Serif Bengali'; --font-body: 'Noto Sans Bengali'; }`

