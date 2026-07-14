import { supabase, hasSupabase } from '../lib/supabase';
import { BUSINESSES } from './constants';
import { Business } from './types';

// Wandelt eine Datenbank-Zeile (flache Spalten) in die Form um,
// die die App erwartet (mit verschachteltem crit-Objekt).
function rowToBusiness(r: any): Business {
  return {
    id: r.id,
    name: r.name,
    category: r.category,
    neighborhood: r.neighborhood,
    image: r.image ?? '',
    address: r.address ?? '',
    hours: r.hours ?? '',
    crit: {
      founded: !!r.founded,
      ownership: !!r.ownership,
      leadership: !!r.leadership,
    },
    lat: r.lat ?? undefined,
    lng: r.lng ?? undefined,
    owner: r.owner ?? undefined,
    rechtsform: r.rechtsform ?? undefined,
    website: r.website ?? undefined,
    description: r.description ?? undefined,
    source: r.source ?? undefined,
    verified: r.verified ?? undefined,
  };
}

// Lädt die Geschäfte. Mit Supabase-Zugangsdaten aus der Datenbank,
// sonst aus den eingebauten Beispieldaten (damit die App immer läuft).
export async function fetchBusinesses(): Promise<Business[]> {
  if (!hasSupabase || !supabase) return BUSINESSES;
  const { data, error } = await supabase.from('businesses').select('*');
  if (error || !data) {
    console.warn('Konnte Geschäfte nicht aus Supabase laden, nutze Beispieldaten:', error?.message);
    return BUSINESSES;
  }
  return data.map(rowToBusiness);
}
