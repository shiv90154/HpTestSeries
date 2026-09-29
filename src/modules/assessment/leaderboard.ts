// Leaderboard presentation rules — pure, so they can be unit tested.

import { PLACEHOLDER_NAME } from "@/modules/identity/permissions";

/** Public name on a leaderboard: first name plus last-name initial ("Rahul Sharma" → "Rahul S."). */
export function publicName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return PLACEHOLDER_NAME;
  if (parts.length === 1) return parts[0];
  return `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
}

/** Competition ranking ("1, 2, 2, 4") for rows already sorted by score, highest first. */
export function competitionRanks(scoresDesc: number[]): number[] {
  return scoresDesc.map((score, i) => (i > 0 && score === scoresDesc[i - 1] ? -1 : i + 1)).reduce<number[]>((ranks, r, i) => {
    ranks.push(r === -1 ? ranks[i - 1] : r);
    return ranks;
  }, []);
}
