export interface Item {
  name: string;
  code: string;
  craft: {
    skill: 'weaponcrafting' | 'gearcrafting' | 'jewelrycrafting' | 'cooking' | 'woodcutting' | 'mining' | 'alchemy';
    level: number;
  }
}
