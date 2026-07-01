import { Comment } from '../data/types';

export function likeCountFor(item: { id: string; likes0: number }, likes: Record<string, boolean>) {
  return (item.likes0 || 0) + (likes[item.id] ? 1 : 0);
}

export function commentCountFor(item: { id: string; comments0: number }, comments: Record<string, Comment[]>) {
  return (item.comments0 || 0) + (comments[item.id]?.length || 0);
}
