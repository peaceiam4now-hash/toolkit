// /workspaces/toolkit/app/src/types/Sequencer.ts

// String alias for lane ids
export type SequencerLaneId = string;

export interface SequencerLane {
  id: SequencerLaneId; // e.g. "kick", "snare"
  trackId: string;     // tie this lane back to a Track.id (e.g. "track-1")
  label: string;       // UI label
  steps: boolean[];    // 1D step array, length = stepsPerBar * bars
}

export interface SequencerPattern {
  id: string;
  name: string;
  stepsPerBar: number; // e.g. 16
  bars: number;        // e.g. 1 or 4
  lanes: SequencerLane[];
}
