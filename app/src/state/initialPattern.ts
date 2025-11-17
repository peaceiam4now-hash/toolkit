// /workspaces/toolkit/app/src/state/initialPattern.ts
import type { SequencerPattern } from "../types/Sequencer";

export const initialPattern: SequencerPattern = {
  id: "pattern-1",
  name: "Basic 4x4",
  steps: 16,
  lanes: [
    {
      id: "kick",
      label: "Kick",
      steps: [
        true, false, false, false,
        true, false, false, false,
        true, false, false, false,
        true, false, false, false,
      ],
    },
    {
      id: "snare",
      label: "Snare",
      steps: [
        false, false, true, false,
        false, false, true, false,
        false, false, true, false,
        false, false, true, false,
      ],
    },
    {
      id: "hihat",
      label: "Hi-Hat",
      steps: [
        true, true, true, true,
        true, true, true, true,
        true, true, true, true,
        true, true, true, true,
      ],
    },
  ],
};
