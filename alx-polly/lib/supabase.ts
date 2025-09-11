import { createClient } from '@supabase/supabase-js';

/**
 * Initializes and exports the Supabase client for the app.
 * Uses environment variables for project URL and anon key.
 * Never expose secrets in client-side code.
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
