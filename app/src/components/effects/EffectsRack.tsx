// /workspaces/toolkit/app/src/components/effects/EffectsRack.tsx
import { useState } from "react";

export function EffectsRack() {
  const [reverbSend, setReverbSend] = useState(0.3);
  const [delaySend, setDelaySend] = useState(0.2);
  const [chorusDepth, setChorusDepth] = useState(0.15);
  const [distortionDrive, setDistortionDrive] = useState(0.1);

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 grid grid-cols-4 gap-4 text-xs">
      {/* Reverb */}
      <div className="flex flex-col items-center">
        <span className="uppercase tracking-wide text-slate-400 mb-1">
          Reverb
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={reverbSend}
          onChange={(e) => setReverbSend(Number(e.target.value))}
          className="w-full"
        />
        <span className="mt-1 text-slate-300">
          {(reverbSend * 100).toFixed(0)}%
        </span>
      </div>

      {/* Delay */}
      <div className="flex flex-col items-center">
        <span className="uppercase tracking-wide text-slate-400 mb-1">
          Delay
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={delaySend}
          onChange={(e) => setDelaySend(Number(e.target.value))}
          className="w-full"
        />
        <span className="mt-1 text-slate-300">
          {(delaySend * 100).toFixed(0)}%
        </span>
      </div>

      {/* Chorus */}
      <div className="flex flex-col items-center">
        <span className="uppercase tracking-wide text-slate-400 mb-1">
          Chorus
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={chorusDepth}
          onChange={(e) => setChorusDepth(Number(e.target.value))}
          className="w-full"
        />
        <span className="mt-1 text-slate-300">
          {(chorusDepth * 100).toFixed(0)}%
        </span>
      </div>

      {/* Distortion */}
      <div className="flex flex-col items-center">
        <span className="uppercase tracking-wide text-slate-400 mb-1">
          Drive
        </span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={distortionDrive}
          onChange={(e) => setDistortionDrive(Number(e.target.value))}
          className="w-full"
        />
        <span className="mt-1 text-slate-300">
          {(distortionDrive * 100).toFixed(0)}%
        </span>
      </div>
    </div>
  );
}
