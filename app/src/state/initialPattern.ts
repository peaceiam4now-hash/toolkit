// /workspaces/toolkit/app/src/state/initialPattern.ts
import type { SequencerPattern } from "../types/Sequencer";

export const initialPattern: SequencerPattern = {
  id: "p1",
  name: "Default Pattern",
  stepsPerBar: 16,
  lanes: [
    {
      id: "kick-lane",
      label: "Kick",
      trackId: "kick",
      steps: [
        true, false, false, false,
        true, false, false, false,
        true, false, false, false,
        true, false, false, false,
      ],
    },
    {
      id: "snare-lane",
      label: "Snare",
      trackId: "snare",
      steps: [
        false, false, true, false,
        false, false, true, false,
        false, false, true, false,
        false, false, true, false,
      ],
    },
    {
      id: "hihat-lane",
      label: "Hi-Hat",
      trackId: "hat",
      steps: new Array(16).fill(true),
    },
  ],
};