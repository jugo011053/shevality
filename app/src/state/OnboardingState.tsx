import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { QUESTIONNAIRE_VERSION } from '../data/questionnaire';

// Prototyp: alles lokal im Speicher (localStorage im Web), kein echtes Backend.
// Bewusst als ZWEI getrennte Datensätze modelliert, damit eine spätere
// Supabase-Anbindung 1:1 in zwei getrennte Tabellen übersetzt werden kann:
//   - "identity"  → Kontaktdaten, NICHT mit Meinungen verknüpfbar außer über
//                    den anonymen participantId (bewusste Entkopplung).
//   - "responses" → Fragebogen-Antworten, hängen nur am anonymen participantId.
export interface IdentityRecord {
  participantId: string;
  contact: string | null; // E-Mail oder Handynummer
  registeredAt: string | null;
}

export interface ResponseRecord {
  participantId: string;
  cohort: string;
  startDate: string; // ISO, gesetzt beim ersten Start des Fragebogens
  questionnaireVersion: string;
  consent: 'accepted' | 'declined' | null;
  answers: Record<string, string>;
  completedAt: string | null;
}

const IDENTITY_KEY = 'shevality.identity.v1';
const RESPONSE_KEY = 'shevality.response.v1';
const DONE_KEY = 'shevality.completedOnboarding.v1';
const DEFAULT_COHORT = 'pilot-ffm-2026';

function newParticipantId(): string {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  } catch {
    /* Fallback unten */
  }
  return 'p_' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function readCohortFromUrl(): string | null {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;
  try {
    return new URLSearchParams(window.location.search).get('cohort');
  } catch {
    return null;
  }
}

function storageGet<T>(key: string): T | null {
  if (Platform.OS !== 'web' || typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function storageSet(key: string, value: unknown) {
  if (Platform.OS !== 'web' || typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* egal, Prototyp */
  }
}

interface OnboardingValue {
  hydrated: boolean;
  identity: IdentityRecord;
  response: ResponseRecord;
  completedOnboarding: boolean;
  setConsent: (accepted: boolean) => void;
  setAnswer: (questionId: string, value: string) => void;
  markQuestionnaireComplete: () => void;
  register: (contact: string) => void;
  skipRegistration: () => void;
  enterApp: () => void;
}

const OnboardingContext = createContext<OnboardingValue | null>(null);

function emptyIdentity(): IdentityRecord {
  return { participantId: newParticipantId(), contact: null, registeredAt: null };
}
function emptyResponse(pid: string): ResponseRecord {
  return {
    participantId: pid,
    cohort: readCohortFromUrl() || DEFAULT_COHORT,
    startDate: new Date().toISOString(),
    questionnaireVersion: QUESTIONNAIRE_VERSION,
    consent: null,
    answers: {},
    completedAt: null,
  };
}

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [identity, setIdentity] = useState<IdentityRecord>(() => emptyIdentity());
  const [response, setResponse] = useState<ResponseRecord>(() => emptyResponse(identity.participantId));
  const [completedOnboarding, setCompletedOnboarding] = useState(false);

  useEffect(() => {
    const savedIdentity = storageGet<IdentityRecord>(IDENTITY_KEY);
    const savedResponse = storageGet<ResponseRecord>(RESPONSE_KEY);
    const savedDone = storageGet<boolean>(DONE_KEY);
    if (savedIdentity) setIdentity(savedIdentity);
    if (savedResponse && savedResponse.questionnaireVersion === QUESTIONNAIRE_VERSION) {
      setResponse(savedResponse);
    } else if (savedIdentity) {
      // Andere Fragebogen-Version oder noch nichts begonnen: an bestehenden participantId anhängen.
      setResponse(emptyResponse(savedIdentity.participantId));
    }
    if (savedDone) setCompletedOnboarding(true);
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hydrated) storageSet(IDENTITY_KEY, identity);
  }, [identity, hydrated]);
  useEffect(() => {
    if (hydrated) storageSet(RESPONSE_KEY, response);
  }, [response, hydrated]);
  useEffect(() => {
    if (hydrated) storageSet(DONE_KEY, completedOnboarding);
  }, [completedOnboarding, hydrated]);

  const value = useMemo<OnboardingValue>(
    () => ({
      hydrated,
      identity,
      response,
      completedOnboarding,
      setConsent: (accepted) => setResponse((r) => ({ ...r, consent: accepted ? 'accepted' : 'declined' })),
      setAnswer: (questionId, val) => setResponse((r) => ({ ...r, answers: { ...r.answers, [questionId]: val } })),
      markQuestionnaireComplete: () => setResponse((r) => ({ ...r, completedAt: new Date().toISOString() })),
      register: (contact) => setIdentity((i) => ({ ...i, contact, registeredAt: new Date().toISOString() })),
      skipRegistration: () => {},
      enterApp: () => setCompletedOnboarding(true),
    }),
    [hydrated, identity, response, completedOnboarding],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingProvider');
  return ctx;
}
