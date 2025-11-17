// /workspaces/toolkit/app/src/components/mixer/MixerChannel.tsx

import type { Track } from "../../types/Track";

type Props = {
  track: Track;
  onChangeVolume: (id: string, volumeDb: number) => void;
  onChangePan: (id: string, pan: number) => void;
};

export function MixerChannel({ track, onChangeVolume, onChangePan }: Props) {
  const panLabel =
    track.pan < 0
      ? `${Math.abs(track.pan * 100).toFixed(0)}% L`
      : track.pan > 0
      ? `${(track.pan * 100).toFixed(0)}% R`
      : "C";

  return (
    <div className="mixer-channel">
      <div
        className="mixer-channel__header"
        style={{ borderBottom: `2px solid ${track.color}` }}
      >
        <span className="mixer-channel__name">{track.name}</span>
      </div>

      <div className="mixer-channel__fader">
        <input
          type="range"
          min={-60}
          max={6}
          step={0.5}
          value={track.volumeDb}
          onChange={(e) =>
            onChangeVolume(track.id, Number(e.target.value || 0))
          }
          className="mixer-channel__fader-input"
        />
        <div className="mixer-channel__volume-label">
          {track.volumeDb.toFixed(1)} dB
        </div>
      </div>

      <div className="mixer-channel__pan">
        <input
          type="range"
          min={-1}
          max={1}
          step={0.01}
          value={track.pan}
          onChange={(e) => onChangePan(track.id, Number(e.target.value || 0))}
          className="mixer-channel__pan-input"
        />
        <div className="mixer-channel__pan-label">{panLabel}</div>
      </div>
    </div>
  );
}
