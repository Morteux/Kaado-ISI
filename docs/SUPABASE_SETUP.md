# Kaado ISI: free account and cloud-sync setup

This guide explains how to finish configuring the account system and sync study progress between devices. The app is a static website intended for deployment on Vercel, with GitHub remaining the source-code repository. Supabase provides email/password authentication and PostgreSQL storage.

## Chosen stack

- **Hosting:** Vercel Hobby for personal, non-commercial use; connect it to this GitHub repository for automatic deployments.
- **Authentication + database:** [Supabase Free](https://supabase.com/pricing).
- **Browser SDK:** `@supabase/supabase-js` v2 loaded from jsDelivr.
- **Database table:** `public.user_data`, one JSONB record per authenticated user, protected by Row Level Security (RLS).

Supabase Free currently includes a 500 MB database and up to 50,000 monthly active users. Free projects can be paused after one week of inactivity and do not include automatic database backups. Check the current [pricing page](https://supabase.com/pricing) before relying on those quotas. This setup should cost ¥0 while usage remains within the free limits and no paid add-ons are enabled.

## Files prepared in this repository

- `supabase-config.js`: client-side project configuration. You must replace the two placeholders.
- `supabase/schema.sql`: table, grants and RLS policies. Run this once in Supabase.
- `app.js` and `index.html`: account UI, sign-up, login, password-reset email request, logout and cloud sync.
- `docs/SUPABASE_SETUP.md`: this guide.

## Setup steps

### 1. Create a Supabase project

1. Open [Supabase](https://supabase.com/) and create a free account.
2. Create a new project in the Free plan. Save the database password somewhere safe; it is not used in the website.
3. Wait until the project finishes provisioning.
4. In **Project Settings / API Keys** (the dashboard wording may change), copy:
   - **Project URL**
   - **Publishable key** (or the legacy `anon` public key)

   A publishable/anon key is expected to be visible in a static website. The database's RLS policies are the security boundary. **Never put a `service_role` key or any secret key in `supabase-config.js`.**

### 2. Create the database table

1. Open **SQL Editor** in the Supabase dashboard.
2. Open `supabase/schema.sql` from this repository and copy all of its SQL.
3. Paste it into the SQL Editor and run it.
4. Confirm that `public.user_data` appears in **Table Editor** and that RLS is enabled.

The policy limits select/insert/update to the row whose `user_id` equals the authenticated user's ID. Do not disable RLS or add public/anonymous access.

### 3. Configure the browser client

Edit `supabase-config.js` and replace:

- `https://YOUR_PROJECT_REF.supabase.co` with the Project URL.
- `YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY` with the publishable key (or anon public key).

Commit and push the change to GitHub. If Vercel is connected to the repository, it should deploy the update automatically. These are public browser configuration values, not server secrets. Do not add the database password or service-role key.

### 4. Deploy to Vercel and configure authentication URLs

1. Open [Vercel](https://vercel.com/) and sign in with GitHub.
2. Choose **Add New / Project** and import `Morteux/Kaado-ISI`.
3. This is a plain static HTML/CSS/JavaScript app. Leave the framework preset as **Other** (or no framework) and do not add a build command. Set the output directory to the repository root if Vercel asks for one. Deploy the project.
4. Copy the production URL Vercel assigns to the project, such as `https://your-project.vercel.app/`. The exact URL depends on the project name and account.
5. In Supabase, open **Authentication / URL Configuration**:
   - Set **Site URL** to your exact Vercel production URL, including `https://` and the trailing slash.
   - Add that same production URL to the allowed redirect URLs.
   - For local testing, add the exact local URL separately, for example `http://127.0.0.1:5500/`.
   - If you want to test Vercel Preview deployments, you can also add the appropriate Vercel preview URL pattern; keep the production Site URL set to the stable production URL.
6. If you previously configured GitHub Pages as the Site URL, replace it with the Vercel production URL. You can keep the GitHub Pages URL in the allowlist temporarily if you still want to test the old deployment.

Email confirmation is controlled in Supabase's authentication settings. If confirmation is enabled, create an account, open the confirmation email, and then log in. The default email service has sending limits; a custom SMTP provider may be needed if you later want reliable email delivery. Do not enable paid email services for this free setup.

### 5. Test the account and sync

1. Open the production URL from Vercel and hard-refresh after deployment finishes.
2. In **Account & cloud sync**, create an account with your email and a strong password.
3. Confirm the email if Supabase asks you to.
4. Log in. The account panel should show the signed-in email and cloud-sync status.
5. Make a review or adjust a card's stage, then wait a moment for the sync status to update.
6. Open Kaado ISI on another browser/device, log in with the same account and verify that progress appears.

## Data behavior and cautions

- Progress, local synonyms and recent answer history are stored together in the user's cloud record. Local browser storage remains in use as a cache/offline copy.
- **First login to an account with no cloud record:** the current device's local data is uploaded.
- **Login to an account that already has cloud data:** the cloud snapshot replaces the current browser's progress, synonyms and answer history. Before testing with an account that already has progress, export or otherwise back up any local-only progress you cannot afford to lose. There is no automatic merge between two conflicting device histories yet.
- Updates are sent after changes with a short debounce. If the browser closes immediately after a review, wait for the sync status to confirm the save before leaving.
- If cloud sync fails, local progress is retained and an error is shown in the account panel.
- The Free plan may pause an inactive project, and it has no automatic database backups. Keep the repository and occasional manual backups; do not treat a free hobby service as an archival system.
- This version uses one JSONB snapshot per user for simplicity. If the project grows, it can be migrated to normalized tables without changing the authentication provider.

## Password reset

The account panel can request a reset email. Configure the redirect URLs above so Supabase can return to the app. After the reset link is delivered, the password-change flow should be tested against the Supabase project's email template and redirect settings before treating it as production-ready.

## Security checklist

- [ ] RLS enabled on `public.user_data`.
- [ ] Only authenticated users have table access.
- [ ] No `service_role` or secret key committed to the repository.
- [ ] Site URL and redirect allowlist match the Vercel production URL.
- [ ] Sign-up, confirmation, login, sync, logout and password reset tested.
- [ ] A second device successfully loads the same account's progress.
