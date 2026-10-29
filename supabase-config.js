/* Supabase browser configuration.
 * Replace both placeholders with your project's Project URL and publishable/anon key.
 * These values are intended for browser use. NEVER put a service_role/secret key here.
 */
(function () {
  const SUPABASE_URL = "https://ddxhayyinaskillzmtgw.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_mCB5kAgZpswDauyFwCiPrA_9QaEeXkN";

  if (!window.supabase || SUPABASE_URL.includes("YOUR_PROJECT_REF") ||
      SUPABASE_PUBLISHABLE_KEY.includes("YOUR_SUPABASE_")) {
    window.KAADO_SUPABASE = null;
    return;
  }

  window.KAADO_SUPABASE = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    }
  );
})();
