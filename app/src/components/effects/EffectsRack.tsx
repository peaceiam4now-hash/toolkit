// /workspaces/toolkit/app/src/components/effects/EffectsRack.tsx

type EffectCardProps = {
  name: string;
};

function EffectCard({ name }: EffectCardProps) {
  return (
    <div className="rounded-lg bg-slate-950/70 border border-slate-800 px-3 py-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-100">{name}</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border border-indigo-400 bg-indigo-500/20 text-indigo-100">
          On
        </span>
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <div className="text-[10px] text-slate-400 mb-0.5">Mix</div>
          <input
            type="range"
            min={0}
            max={100}
            defaultValue={30}
            className="w-full accent-indigo-400"
          />
        </div>
        <div className="flex-1">
          <div className="text-[10px] text-slate-400 mb-0.5">Tone</div>
          <input
            type="range"
            min={0}
            max={100}
            defaultValue={60}
            className="w-full accent-emerald-400"
          />
        </div>
      </div>
    </div>
  );
}

export function EffectsRack() {
  const effects = ["Reverb", "Delay", "Chorus", "Distortion"];

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-900/40 p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-wide text-slate-400">
          Effects Rack
        </h2>
        <span className="text-[10px] text-slate-500">
          Global send effects (UI only for now)
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {effects.map((name) => (
          <EffectCard key={name} name={name} />
        ))}
      </div>
    </section>
  );
}
