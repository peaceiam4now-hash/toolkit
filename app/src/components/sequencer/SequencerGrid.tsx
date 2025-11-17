// /workspaces/toolkit/app/src/components/sequencer/SequencerGrid.tsx
import type {
  SequencerPattern,
  SequencerLaneId,
} from "../../types/Sequencer";

type Props = {
  pattern: SequencerPattern;
  onToggleStep: (laneId: SequencerLaneId, stepIndex: number) => void;
};

export function SequencerGrid({ pattern, onToggleStep }: Props) {
  if (!pattern.lanes.length) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-4 text-sm text-slate-400">
        No lanes configured yet. The Lunar Studios step sequencer will render
        here.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3 space-y-2">
      {pattern.lanes.map((lane) => (
        <div
          key={lane.id}
          className="flex items-center gap-3 py-1.5 border-b border-slate-800/60 last:border-b-0"
        >
          <div className="w-20 text-xs text-slate-300">{lane.label}</div>

          <div className="flex gap-1 flex-1">
            {lane.steps.map((on: boolean, stepIndex: number) => (
              <button
                key={stepIndex}
                onClick={() => onToggleStep(lane.id, stepIndex)}
                className={[
                  "h-6 w-6 rounded-md border text-[10px] flex items-center justify-center",
                  on
                    ? "bg-indigo-500 border-indigo-400 text-slate-50 shadow-sm"
                    : "bg-slate-900 border-slate-700 text-slate-500 hover:border-indigo-400/60",
                ].join(" ")}
              >
                {stepIndex + 1}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
