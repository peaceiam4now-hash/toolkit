export type Track = {
  id: string;
  name: string;
  mute?: boolean;
  solo?: boolean;
  color?: string;
  // allow extra metadata from upstream DAWs without type errors
  [key: string]: unknown;
};
