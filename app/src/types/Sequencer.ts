// src/types/Sequencer.ts

export type SequencerLaneId = string;

export interface SequencerLane {
  id: SequencerLaneId;
  name: string;
  color: string;
  steps: boolean[]; // length = bars * stepsPerBar
}

export interface SequencerPattern {
  id: string;
  name: string;
  bars: number;
  stepsPerBar: number;
  lanes: SequencerLane[];
}
