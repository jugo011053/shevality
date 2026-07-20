import React, { createContext, useContext, useMemo, useState } from 'react';
import { Lang } from '../data/feed';

interface LangValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangValue | null>(null);

// Ein Umschalter (auf der Feed-Seite) steuert die Sprache der gesamten App.
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('de');
  const value = useMemo<LangValue>(() => ({ lang, setLang }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
