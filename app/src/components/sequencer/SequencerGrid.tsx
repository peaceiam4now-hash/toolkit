// /workspaces/toolkit/app/src/components/sequencer/SequencerGrid.tsx
import type { SequencerPattern } from "../../types/SequencerPattern";

type Props = {
  pattern: SequencerPattern;
  onToggleStep: (laneId: string, stepIndex: number) => void;
};

export function SequencerGrid({ pattern, onToggleStep }: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-wide text-slate-400">
          Sequencer Grid
        </h2>
        <span className="text-[11px] text-slate-500">
          {pattern.stepsPerBar * pattern.bars} steps •{" "}
          {pattern.lanes.length} lanes
        </span>
      </div>

      <div className="space-y-2">
        {pattern.lanes.map((lane) => (
          <div key={lane.id} className="flex items-center gap-2">
            {/* Lane label */}
            <div className="w-24 flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: lane.color }}
              />
              <span className="text-xs text-slate-100 truncate">
                {lane.name}
              </span>
            </div>

            {/* Step buttons */}
            <div className="flex-1 grid grid-cols-16 gap-[2px]">
              {lane.steps.map((step) => {
                const isActive = step.active;
                const isAccent = step.index % 4 === 0;

                return (
                  <button
                    key={step.index}
                    type="button"
                    onClick={() => onToggleStep(lane.id, step.index)}
                    className={[
                      "aspect-square rounded-md border transition-colors",
                      isActive
                        ? "bg-indigo-500/90 border-indigo-400 shadow-sm shadow-indigo-500/40"
                        : "bg-slate-900/60 border-slate-700 hover:border-indigo-500/50 hover:bg-slate-800",
                      !isActive && isAccent ? "border-slate-600/80" : "",
                    ].join(" ")}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
