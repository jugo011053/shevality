import React, { createContext, useContext, useMemo, useState } from 'react';
import { Comment } from '../data/types';

interface AppStateValue {
  likes: Record<string, boolean>;
  saves: Record<string, boolean>;
  comments: Record<string, Comment[]>;
  toggleLike: (id: string) => void;
  toggleSave: (id: string) => void;
  addComment: (id: string, text: string) => void;
}

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [likes, setLikes] = useState<Record<string, boolean>>({});
  const [saves, setSaves] = useState<Record<string, boolean>>({});
  const [comments, setComments] = useState<Record<string, Comment[]>>({});

  const value = useMemo<AppStateValue>(
    () => ({
      likes,
      saves,
      comments,
      toggleLike: (id) => setLikes((s) => ({ ...s, [id]: !s[id] })),
      toggleSave: (id) => setSaves((s) => ({ ...s, [id]: !s[id] })),
      addComment: (id, text) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setComments((s) => {
          const list = s[id] ? s[id].slice() : [];
          list.unshift({ name: 'Du', text: trimmed, time: 'gerade eben', likes: 0, mine: true });
          return { ...s, [id]: list };
        });
      },
    }),
    [likes, saves, comments]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useAppState must be used within AppStateProvider');
  return ctx;
}
