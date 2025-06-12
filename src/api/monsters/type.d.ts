interface Effect {
  code: string;
  value: number;
}

interface Drop {
  code: string;
  rate: number;
  min_quantity: number;
  max_quantity: number;
}

export interface Monster {
  name: string;
  code: string;
  level: number;
  hp: number;
  attack_fire: number;
  attack_earth: number;
  attack_water: number;
  attack_air: number;
  res_fire: number;
  res_earth: number;
  res_water: number;
  res_air: number;
  critical_strike: number;
  effects: Effect[];
  min_gold: number;
  max_gold: number;
  drops: Drop[];
}
