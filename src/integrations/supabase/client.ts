
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dftrmjnlbmnadggavtxs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmdHJtam5sYm1uYWRnZ2F2dHhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNDMxNDMsImV4cCI6MjA1ODkxOTE0M30.Vq3a8gJjo4IP67texft7Sg4E0DTMpIiX-EefNwUyR3M";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage,
  }
});
