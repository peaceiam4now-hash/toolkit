// /workspaces/toolkit/app/src/types/Project.ts

import type { Track } from "./Track";
import type { SequencerPattern } from "./Sequencer";

export interface LunarProject {
  id: string;
  name: string;

  bpm: number;      // 40–240
  swing?: number;   // 0–1

  createdAt?: string;  // ISO string
  updatedAt?: string;  // ISO string

  tracks: Track[];
  pattern: SequencerPattern;

  metadata?: Record<string, string | number | boolean | null>;
}
