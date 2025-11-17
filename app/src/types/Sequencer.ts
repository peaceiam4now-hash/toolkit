// /workspaces/toolkit/app/src/types/Sequencer.ts

export type StepState = {
  stepIndex: number; // 0..15
  active: boolean;
};

export type SequencerLane = {
  id: string;
  trackId: string;
  label: string;
  steps: StepState[];
};

export type SequencerPattern = {
  id: string;
  name: string;
  stepsPerBar: number; // e.g. 16
  lanes: SequencerLane[];
};
