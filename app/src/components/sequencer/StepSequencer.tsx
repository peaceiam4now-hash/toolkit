// src/components/sequencer/StepSequencer.tsx

import type {

  SequencerPattern,

  SequencerLaneId,

} from "../../types/Sequencer";

import { Fragment } from "react";



type Props = {

  pattern: SequencerPattern;

  onToggleStep: (laneId: SequencerLaneId, stepIndex: number) => void;

};



export function StepSequencer({ pattern, onToggleStep }: Props) {

  const steps = pattern.stepsPerBar;



  return (

    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 text-xs">

      <div

        className="grid gap-1"

        style={{

          gridTemplateColumns: `120px repeat(${steps}, minmax(0, 1fr))`,

        }}

      >

        {/* Top header (step numbers) */}

        <div />

        {Array.from({ length: steps }).map((_, i) => (

          <div

            key={`step-header-${i}`}

            className="text-[10px] text-center text-slate-500"

          >

            {i + 1}

          </div>

        ))}



        {/* Lanes */}

        {pattern.lanes.map((lane) => (

          <Fragment key={lane.id}>

            <div className="flex items-center text-slate-100">{lane.label}</div>

            {lane.steps.map((on, stepIndex) => (

              <button

                key={`${lane.id}-${stepIndex}`}

                onClick={() => onToggleStep(lane.id, stepIndex)}

                className={[

                  "h-6 w-6 rounded-sm border transition-colors",

                  on

                    ? "bg-indigo-500 border-indigo-300"

                    : "bg-slate-900 border-slate-700 hover:bg-slate-800",

                  stepIndex % 4 === 0 ? "opacity-100" : "opacity-80",

                ].join(" ")}

              />

            ))}

          </Fragment>

        ))}

      </div>

    </div>

  );

}