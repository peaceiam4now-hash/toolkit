// src/state/initialPattern.ts

import type { SequencerPattern } from "../types/Sequencer";



export const initialPattern: SequencerPattern = {

  id: "pattern-1",

  name: "Starter Groove",

  stepsPerBar: 16,

  lanes: [

    {

      id: "kick",

      label: "Kick",

      trackId: "track-1",

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

      trackId: "track-1",

      steps: [

        false, false, true,  false,

        false, false, true,  false,

        false, false, true,  false,

        false, false, true,  false,

      ],

    },

    {

      id: "hihat",

      label: "Hat",

      trackId: "track-1",

      steps: [

        true, true,  true,  true,

        true, true,  true,  true,

        true, true,  true,  true,

        true, true,  true,  true,

      ],

    },

    {

      id: "bass",

      label: "Bass",

      trackId: "track-2",

      steps: [

        true,  false, false, false,

        false, true,  false, false,

        true,  false, false, false,

        false, true,  false, false,

      ],

    },

  ],

};