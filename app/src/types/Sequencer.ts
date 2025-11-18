// src/types/Sequencer.ts
// Just treat lane IDs as strings, but export an alias so we can type them.

export type SequencerLaneId = string;
export interface SequencerLane {

  id: SequencerLaneId;   // e.g. "kick", "snare", "hihat", "bass"

  label: string;         // UI label

  trackId: string;       // tie lane to a Track.id if needed

  steps: boolean[];      // on/off steps, length = stepsPerBar

}



export interface SequencerPattern {

  id: string;

  name: string;

  stepsPerBar: number;   // e.g. 16

  lanes: SequencerLane[];

}


