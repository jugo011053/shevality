export function initialsOf(name: string) {
  if (name === 'Du') return 'Du';
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function avatarColorFor(name: string, palette: string[]) {
  let sum = 0;
  for (const ch of name) sum += ch.charCodeAt(0);
  return palette[Math.abs(sum) % palette.length];
}
