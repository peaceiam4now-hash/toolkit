// /workspaces/toolkit/app/src/types/Sequencer.ts

export type SequencerLaneId = "kick" | "snare" | "hihat" | "perc";

export interface SequencerLane {
  id: SequencerLaneId;
  label: string;
  color: string;
}

export interface SequencerPattern {
  id: string;
  stepsPerBar: number; // e.g. 16 steps per bar
  bars: number;        // for now 1 bar
  lanes: SequencerLane[];
  // grid[laneId][stepIndex] -> boolean (active or not)
  grid: Record<SequencerLaneId, boolean[]>;
}
