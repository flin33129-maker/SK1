export interface HudExtra {
  label: string;
  value: string;
  tone?: "default" | "warn" | "good";
}

export interface RadarBlip {
  /** Relative offset from player in meters (x = world X - player X, z = world Z - player Z) */
  dx: number;
  dz: number;
  kind: "enemy" | "loot" | "goal" | "boss";
}

export interface RadarState {
  range: number;
  yaw: number;
  blips: RadarBlip[];
  /** Optional safe-zone circle relative to player */
  zone?: { dx: number; dz: number; radius: number };
}

export interface DamagePopup {
  id: number;
  x: number; // 0..100 viewport %
  y: number; // 0..100 viewport %
  amount: number;
  crit?: boolean;
  label?: string;
}

export interface AbilitySlot {
  key: string;
  name: string;
  cooldown: number; // seconds remaining (0 = ready)
  maxCooldown: number;
  active?: boolean;
}

export interface BossHud {
  name: string;
  health: number;
  maxHealth: number;
}

export interface HudState {
  objective?: string;
  health?: number;
  maxHealth?: number;
  armor?: number;
  maxArmor?: number;
  ammo?: number;
  maxAmmo?: number;
  reloading?: boolean;
  stamina?: number;
  weapon?: string;
  score?: number;
  kills?: number;
  combo?: number;
  timeLeft?: number;
  wave?: number;
  extra?: HudExtra[];
  hitKey?: number;
  hurtKey?: number;
  pickupKey?: number;
  message?: string;
  banner?: string;
  radar?: RadarState;
  popups?: DamagePopup[];
  abilities?: AbilitySlot[];
  boss?: BossHud | null;
}

export interface GameResult {
  outcome: "win" | "lose";
  score: number;
  kills: number;
  wave?: number;
  durationSec: number;
  title: string;
  summary: string;
  stats?: { label: string; value: string }[];
}

export interface GameCallbacks {
  setHud: (hud: HudState) => void;
  onEnd: (result: GameResult) => void;
  onLockChange: (locked: boolean, fallback?: boolean) => void;
}

export interface GameMountOptions {
  container: HTMLDivElement;
  callbacks: GameCallbacks;
}

export interface GameHandle {
  dispose: () => void;
  requestStart: () => void;
}

export type GameFactory = (options: GameMountOptions) => GameHandle;
