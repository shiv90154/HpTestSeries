// Builder for IIT JAM questions. JAM is set in English only, so one block serves both language views.

import { q, type Diff, type LangBlock, type Opts, type PatwariQuestion } from "../patwari/types";

export function j(subject: string, topic: string, d: Diff, a: PatwariQuestion["a"], stem: string, options: Opts, why: string, chk?: string): PatwariQuestion {
  const block: LangBlock = [stem, options, why];
  return q(0, subject, topic, d, a, block, block, chk);
}
