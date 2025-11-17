// /workspaces/toolkit/app/src/types/SequencerPattern.ts

export interface SequencerStep {
  index: number;      // 0..N-1
  active: boolean;    // is this step on
  velocity: number;   // 0..1 for future dynamics
}

export interface SequencerLane {
  id: string;         // "lane-kick"
  name: string;       // "Kick"
  color: string;      // hex for UI
  trackId: string;    // which Track this lane logically maps to
  steps: SequencerStep[];
}

export interface SequencerPattern {
  id: string;         // "pattern-1"
  name: string;       // "Main Pattern"
  stepsPerBar: number;
  bars: number;
  lanes: SequencerLane[];
}
