import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Diese zwei Werte kommen später von deinem echten Supabase-Projekt
// (Project URL + anon key). Solange sie leer sind, nutzt die App die
// eingebauten Beispieldaten als Rückfall.
const url = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const key = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const hasSupabase = url.length > 0 && key.length > 0;

export const supabase: SupabaseClient | null = hasSupabase ? createClient(url, key) : null;
