// /src/state/initialPattern.ts

import type { SequencerPattern } from "../types/Sequencer";

export const initialPattern: SequencerPattern = {
  stepsPerBar: 16,
  lanes: [
    {
      id: "kick",
      trackId: "track-1",
      label: "Kick",
      steps: Array(16).fill(false)
    },
    {
      id: "snare",
      trackId: "track-1",
      label: "Snare",
      steps: Array(16).fill(false)
    },
    {
      id: "hihat",
      trackId: "track-1",
      label: "Hi-Hat",
      steps: Array(16).fill(false)
    },
    {
      id: "bass",
      trackId: "track-2",
      label: "Bass",
      steps: Array(16).fill(false)
    }
  ]
};
