// /workspaces/toolkit/app/src/components/sequencer/SequencerGrid.tsx

import type { Track } from "../../types/Track";



type Props = {

  tracks: Track[];

  stepsPerBar: number;

  patternByTrack: Record<string, boolean[]>;

  onToggleStep: (trackId: string, stepIndex: number) => void;

};



export function SequencerGrid({

  tracks,

  stepsPerBar,

  patternByTrack,

  onToggleStep,

}: Props) {

  // Only show non-group tracks as lanes

  const playableTracks = tracks.filter((t) => !t.isGroup);



  if (!playableTracks.length) {

    return (

      <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-4 text-sm text-slate-400">

        No instrument/audio tracks yet. This is where your Lunar Studios

        step patterns will live.

      </div>

    );

  }



  const stepIndices = Array.from({ length: stepsPerBar }, (_, i) => i);



  return (

    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 overflow-x-auto">

      <div className="min-w-[640px] space-y-2">

        {/* Column headers: 1..stepsPerBar */}

        <div

          className="pl-32 grid"

          style={{

            gridTemplateColumns: `repeat(${stepsPerBar}, minmax(0, 1fr))`,

          }}

        >

          {stepIndices.map((step) => (

            <div

              key={step}

              className="text-[10px] text-center text-slate-500"

            >

              {step + 1}

            </div>

          ))}

        </div>



        {playableTracks.map((track) => {

          const row = patternByTrack[track.id] ?? [];



          return (

            <div key={track.id} className="flex items-center gap-2">

              {/* Lane label */}

              <div className="w-32 flex items-center gap-2 pr-2">

                <span

                  className="h-3 w-3 rounded-full shadow-sm"

                  style={{ backgroundColor: track.color }}

                />

                <span className="text-xs text-slate-100 truncate">

                  {track.name}

                </span>

              </div>



              {/* Step buttons */}

              <div

                className="flex-1 grid gap-[3px]"

                style={{

                  gridTemplateColumns: `repeat(${stepsPerBar}, minmax(0, 1fr))`,

                }}

              >

                {stepIndices.map((step) => {

                  const isActive = !!row[step];



                  return (

                    <button

                      key={step}

                      type="button"

                      onClick={() => onToggleStep(track.id, step)}

                      className={[

                        "h-7 rounded-md border text-[10px] flex items-center justify-center transition-all",

                        isActive

                          ? "border-indigo-400 bg-indigo-500/80 text-slate-50 shadow-[0_0_10px_rgba(129,140,248,0.7)]"

                          : "border-slate-800 bg-slate-900/70 text-slate-500 hover:border-slate-600 hover:bg-slate-800",

                      ].join(" ")}

                    >

                      ●

                    </button>

                  );

                })}

              </div>

            </div>

          );

        })}

      </div>

    </div>

  );

}
