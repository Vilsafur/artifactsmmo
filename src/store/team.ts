import create from "../api/characters/create";
import list from "../api/characters/list";
import { Character } from "../api/characters/type";
import config from "../config";
import type { CharacterToCreate, TeamCharacter } from "../types/team";

export const team: Map<string, TeamCharacter> = new Map();

export const loadTeams = async (characters: CharacterToCreate[]) => {
  const existing = await list();
  const existingName = existing.map(c => c.name)

  for (const character of characters) {
    if (existingName.includes(character.name)) {
      if (config.debug) {
        console.log(`✅ ${character.name} existe déjà.`);
      }
      const char = existing.find(c => c.name === character.name)
      if (char === undefined) {
        console.log(`❌ Erreur lors de la récupération des informations de ${character.name}`)
        continue;
      }
      team.set(
        char.name,
        createTeamCharacter(char)
      )
      continue;
    }

    try {
      const created = await create(character);
      team.set(
        created.name,
        createTeamCharacter(created)
      )
      console.log(`🆕 Créé : ${created.name}`);
    } catch (err: any) {
      console.error(`❌ Erreur création ${character.name} :`, err.response?.data || err.message);
    }
  }

  console.log(`ℹ️ Chargement de l'équipe terminé`)
  if (config.debug) {
    for (const [key, char] of team) {
      debugCharacter(key)
    }
  }
}

const createTeamCharacter = (char: Character): TeamCharacter => {
  return {
    name: char.name,
    status: 'Waiting',
    skin: char.skin,
    skills: {
      alchemy: {
        level: char.alchemy_level,
        max_xp: char.alchemy_max_xp,
        xp: char.alchemy_xp
      },
      cooking: {
        level: char.cooking_level,
        max_xp: char.cooking_max_xp,
        xp: char.cooking_xp
      },
      fishing: {
        level: char.fishing_level,
        max_xp: char.fishing_max_xp,
        xp: char.fishing_xp
      },
      gearcrafting: {
        level: char.gearcrafting_level,
        max_xp: char.gearcrafting_max_xp,
        xp: char.gearcrafting_xp
      },
      jewelrycrafting: {
        level: char.jewelrycrafting_level,
        max_xp: char.jewelrycrafting_max_xp,
        xp: char.jewelrycrafting_xp
      },
      mining: {
        level: char.mining_level,
        max_xp: char.mining_max_xp,
        xp: char.mining_xp
      },
      weaponcrafting: {
        level: char.weaponcrafting_level,
        max_xp: char.weaponcrafting_max_xp,
        xp: char.weaponcrafting_xp
      },
      woodcutting: {
        level: char.woodcutting_level,
        max_xp: char.woodcutting_max_xp,
        xp: char.woodcutting_xp
      },
    }
  }
}

const debugCharacter = (name: string) => {
  const char = team.get(name)
  if (char === undefined) {
    console.log(`❌ Erreur lors de la récupération des informations de ${name}`)
    return
  }

  console.log("══════════════════════════════════════════════════════");
  console.log(`                    👤  ${char.name}                  `);
  console.log("══════════════════════════════════════════════════════");
  console.log(`🎨 Skin      : ${char.skin}`); // à adapter selon type de `Skin`
  console.log(`📌 Statut    : ${char.status}`);
  console.log("📚 Compétences :");

  const skillTable = Object.entries(char.skills).reduce((acc, [skillName, data]) => {
    acc[skillName] = {
      Niveau: data.level,
      XP: `${data.xp} / ${data.max_xp}`,
      Progression: `${Math.round((data.xp / data.max_xp) * 100)}%`,
    };
    return acc;
  }, {} as Record<string, { Niveau: number; XP: string; Progression: string }>);

  console.table(skillTable);
}
