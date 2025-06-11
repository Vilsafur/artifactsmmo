import type { SkillName, Skin } from "../api/characters/type";

export interface CharacterToCreate {
  name: string;
  skin: Skin;
}

interface SkillDefinition {
  level: number;
  xp: number;
  max_xp: number;
}
type Status = 'Waiting' | 'Working';

export interface TeamCharacter {
  name: string;
  skin: Skin;
  status: Status;
  skills: {
    mining: SkillDefinition;
    woodcutting: SkillDefinition;
    fishing: SkillDefinition;
    weaponcrafting: SkillDefinition;
    gearcrafting: SkillDefinition;
    jewelrycrafting: SkillDefinition;
    cooking: SkillDefinition;
    alchemy: SkillDefinition;
  };
}
