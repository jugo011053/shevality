// Shevality – Feature-Flags.
// Einfach hier auf true stellen, dann neu bauen & deployen (app/scripts/pwa.mjs
// beachten). Kein Laufzeit-Schalter für Nutzerinnen – bewusst build-seitig,
// damit der Straßen-Prototyp keine unfertigen Bereiche zeigt.
export const FLAGS = {
  // Karte/Verzeichnis frauengeführter Orte (Tab "Entdecken").
  SHOW_MAP: false,
  // Frauennetzwerke Frankfurt (eigener Tab).
  SHOW_NETWORKS: false,
};
