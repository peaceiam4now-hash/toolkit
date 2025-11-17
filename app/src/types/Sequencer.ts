// /workspaces/toolkit/app/src/types/Sequencer.ts

export type SequencerLaneId = "kick" | "snare" | "hihat" | string;

export interface SequencerLane {
  id: SequencerLaneId;
  label: string;
  // length should be `steps` on the pattern, but TS just cares it's a boolean[]
  steps: boolean[];
}

export interface SequencerPattern {
  id: string;
  name: string;
  steps: number;       // total steps in the pattern (e.g. 16)
  lanes: SequencerLane[];
}
