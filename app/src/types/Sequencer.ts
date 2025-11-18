export interface SequencerLane {
  id: string;          // "kick", "snare", etc.
  trackId: string;     // ties to a Track.id if you want
  label: string;       // UI label
  steps: boolean[];    // e.g. length 16
}

export interface SequencerPattern {
  id: string;
  name: string;
  bars: number;
  stepsPerBar: number; // e.g. 16
  lanes: SequencerLane[];
}
