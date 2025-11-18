// Canonical sequencer types. Do NOT import this file inside itself.
export type SequencerLane = {
  id: string;
  label: string;
  trackId: string; // e.g., "kick" | "snare" | "hat" | "bass"
  steps: boolean[];
};

export type SequencerPattern = {
  id: string;
  name: string;
  lanes: SequencerLane[];
  stepsPerBar: number;
};
