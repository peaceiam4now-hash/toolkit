// /workspaces/toolkit/app/src/state/initialPattern.ts
import type { SequencerPattern } from "../types/Sequencer";

// Simple 1-bar, 16-step pattern
export const initialPattern: SequencerPattern = {
  id: "pattern-1",
  name: "Four on the Floor",
  stepsPerBar: 16,
  bars: 1,
  lanes: [
    {
      id: "kick",
      trackId: "track-1", // Drums group
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
      trackId: "track-1",
      label: "Snare",
      steps: [
        false, false, false, false,
        true,  false, false, false,
        false, false, false, false,
        true,  false, false, false,
      ],
    },
    {
      id: "hihat",
      trackId: "track-1",
      label: "Hi-Hat",
      steps: [
        true,  false, true,  false,
        true,  false, true,  false,
        true,  false, true,  false,
        true,  false, true,  false,
      ],
    },
  ],
};
