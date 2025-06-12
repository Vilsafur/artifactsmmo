interface Drop {
  code: string;
  rate: 1;
  min_quantity: 1;
  max_quantity: 1;
}

export interface Resource {
  name: string;
  code: string;
  skill: 'mining' | 'woodcutting' | 'fishing' | 'alchemy';
  level: number;
  drops: Drop[]
}
