// /workspaces/toolkit/app/src/components/sequencer/SequencerGrid.tsx

import type { Track } from "../../types/Track";
import type { SequencerPattern } from "../../types/Sequencer";

type Props = {
  tracks: Track[];
  pattern: SequencerPattern;
  currentStep: number;
  onToggleStep: (trackId: string, stepIndex: number) => void;
};

export function SequencerGrid({
  tracks,
  pattern,
  currentStep,
  onToggleStep,
}: Props) {
  if (!tracks.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-4 text-sm text-slate-400">
        No tracks yet. Add tracks to sequence patterns in Lunar Studios.
      </div>
    );
  }

  const { stepsPerBar } = pattern;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
      <header className="flex items-center justify-between mb-1">
        <div>
          <h2 className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Step Sequencer
          </h2>
          <p className="text-[11px] text-slate-500">
            16-step grid per track. Click to toggle steps.
          </p>
        </div>
        <div className="text-[11px] text-slate-500">
          Steps per bar:{" "}
          <span className="text-indigo-400 font-mono">{stepsPerBar}</span>
        </div>
      </header>

      <div className="space-y-2">
        {tracks.map((track) => {
          const lane = pattern.lanes.find((l) => l.trackId === track.id);
          const steps = lane?.steps ?? new Array(stepsPerBar).fill(false);

          return (
            <div
              key={track.id}
              className="flex items-center gap-3 text-xs text-slate-200"
            >
              {/* Track label */}
              <div className="w-32 flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full shadow-sm"
                  style={{ backgroundColor: track.color }}
                />
                <span className="truncate">{track.name}</span>
              </div>

              {/* Steps grid */}
              <div className="flex-1 grid grid-cols-16 gap-[4px]">
                {steps.map((active, idx) => {
                  const isCurrent = idx === currentStep;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onToggleStep(track.id, idx)}
                      className={[
                        "h-7 rounded-md border transition-all duration-150",
                        "focus:outline-none focus:ring-1 focus:ring-indigo-400",
                        active
                          ? "bg-indigo-500/90 border-indigo-300 shadow-[0_0_0_1px_rgba(129,140,248,0.9)]"
                          : "bg-slate-900/60 border-slate-700/80 hover:bg-slate-800",
                        isCurrent
                          ? "ring-1 ring-cyan-400/80 shadow-[0_0_12px_rgba(34,211,238,0.75)]"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      <span className="sr-only">
                        Step {idx + 1} {active ? "on" : "off"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
