// /workspaces/toolkit/app/src/types/Sequencer.ts

// Minimal JSON-style contract for the step sequencer
export interface SequencerPattern {
  stepsPerBar: number;
  lanes: SequencerLane[];
}

export interface SequencerLane {
  trackId: string;      // maps directly to Track.id
  label: string;        // display label
  steps: boolean[];     // length = stepsPerBar
}

