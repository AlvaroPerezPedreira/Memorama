export const getShuffledPairs = (emojis: string[]): string[] => {
  const pairs = [...emojis, ...emojis];
  return pairs.sort(() => Math.random() - 0.5);
};
