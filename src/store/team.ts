import create from "../api/characters/create";
import list from "../api/characters/list";
import { Character, SkillDataSchema } from "../api/characters/type";
import config from "../config";
import type { CharacterToCreate, TeamCharacter } from "../types/team";
import taskBus from "./taskBus";
import { get as getItem } from "./item";
import { get as getResource, getResourceWhoDrop } from "./resource";
import { getResourceTile } from "./map";
import move, { moveToBank } from "../api/characters/move";
import gathering from "../api/characters/gathering";
import crafting from "../api/characters/crafting";
import { add as addToBank, has as hasInBank, retrive as retriveInBank } from "./bank";
import { Task } from "../entity/task";

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
    position: {
      x: char.x,
      y: char.y,
    },
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
    },
    inventory: char.inventory.map(item => ({
      code: item.code,
      quantity: item.quantity
    }))
  }
}

export const execTask = async () => {
  const task = taskBus.getNextReadyTask()
  if (!task) {
    return;
  }
  if (config.debug) {
    console.log(`🔄 Exécution de la tâche : ${task.name} (type : ${task.type})`);
  }

  // Récupération du personnage ayant la compétence requise la plus élevée et qui est disponible
  const obj = task.type === 'craft' ? getItem(task.code) : getResourceWhoDrop(task.code);
  if (undefined === obj) {
    console.log(`❌ L'objet ou la ressource ${task.code} n'existe pas.`);
    return;
  }
  const skillName = task.type == 'craft' ? getItem(task.code)?.craft?.skill : getResourceWhoDrop(task.code)?.skill;
  if (config.debug) {
    console.log(`🔍 Compétence requise pour la tâche ${task.name} : ${skillName}`);
  }
  if (!skillName) {
    console.log(`❌ La tâche ${task.name} n'a pas de compétence associée.`);
    return;
  }
  const charactersWithSkill = Array.from(team.values()).filter(char => {
    const skill = char.skills[skillName as keyof TeamCharacter['skills']];
    return skill && skill.level > 0 && char.status === 'Waiting';
  });
  if (config.debug) {
    console.log(`👥 Personnages disponibles avec la compétence ${skillName} : ${charactersWithSkill.map(c => c.name).join(', ')}`);
  }
  
  if (charactersWithSkill.length === 0) {
    console.log(`❌ Aucun personnage n'a la compétence requise (${skillName}) pour la tâche : ${task.name}`);
    return;
  }

  const bestCharacter = charactersWithSkill.reduce((prev, curr) => {
    const prevSkill = prev.skills[skillName as keyof TeamCharacter['skills']];
    const currSkill = curr.skills[skillName as keyof TeamCharacter['skills']];
    return (prevSkill.level > currSkill.level) ? prev : curr;
  });

  // Mise à jour du statut du personnage
  bestCharacter.status = 'Working';
  if (config.debug) {
    console.log(`👤 Personnage sélectionné : ${bestCharacter.name} (Niveau ${bestCharacter.skills[skillName as keyof TeamCharacter['skills']].level})`);
  }

  // Exécution de la tâche en fonction du type
  try {
    task.status = 'in-progress';
    if (task.type === 'craft') {
      const res = await craft(bestCharacter.name, obj.code, task.quantity, task);
    } else if (task.type === 'gather') {
      const res = await gather(bestCharacter.name, obj.code, task.quantity);
      bestCharacter.skills[skillName as keyof TeamCharacter['skills']].xp = res.character[`${skillName}_xp`];
      bestCharacter.skills[skillName as keyof TeamCharacter['skills']].level = res.character[`${skillName}_level`];
      bestCharacter.skills[skillName as keyof TeamCharacter['skills']].max_xp = res.character[`${skillName}_max_xp`];
      if (config.debug) {
        console.log(`ℹ️ Compétences mises à jour pour ${bestCharacter.name}`);  
        debugCharacter(bestCharacter.name);
      }
  
      // Déplacement du personnage vers la banque
      if (config.debug) {
        console.log(`🚶‍♂️ Déplacement de ${bestCharacter.name} vers la banque pour déposer les ressources...`);
      }
      addToBank(bestCharacter.name, task.code, task.quantity);
    }

    // Marquer la tâche comme terminée
    taskBus.remove(task.id);
    console.log(`✅ Tâche ${task.name} terminée par ${bestCharacter.name}`);
  }
  catch (error) {
    console.error(`❌ Erreur lors de l'exécution de la tâche ${task.name} :`, error);
  }
  finally {
    bestCharacter.status = 'Waiting'; // Remettre le personnage en attente
  }
}

const gather = async (characterName: string, resourceCode: string, quantity: number): Promise<SkillDataSchema> => {
  const character = team.get(characterName);
  if (!character) {
    throw new Error(`❌ Le personnage ${characterName} n'existe pas dans l'équipe.`);
  }
  const resource = getResource(resourceCode);
  if (!resource) {
    throw new Error(`❌ La ressource ${resourceCode} n'existe pas.`);
  }

  console.log(`🌿 Collecte de ressources pour ${resource.name} par ${characterName}`);
  // Récupération de l'emplacement de la ressource
  const tile = getResourceTile(resourceCode)
  if (!tile) {
    console.log();
    throw new Error(`❌ Aucune tuile trouvée pour la ressource ${resourceCode}`);
  }
  if (config.debug) {
    console.log(`📍 Emplacement de la ressource : (${tile.x}, ${tile.y})`);
  }
  // Déplacement du personnage vers la ressource
  if (character.position.x === tile.x && character.position.y === tile.y) {
    if (config.debug) {
      console.log(`✅ ${characterName} est déjà sur la tuile de la ressource.`);
    }
  } else {
    if (config.debug) {
      console.log(`🚶‍♂️ Déplacement de ${characterName} vers la tuile de la ressource...`);
    }
    await move(characterName, tile);
  }
  // Récupération de la ressource
  if (config.debug) {
    console.log(`🔄 Démarrage de la collecte de ${resource.name}...`);
  }
  let needed = quantity;
  // récupération de la ressource tant que la quantité n'est pas atteinte
  let res: SkillDataSchema
  do {
    if (config.debug) {
      console.log(`🔄 Collecte de ${resource.name} en cours... (${needed} restant)`);
    }
    res = await gathering(characterName);
    needed--;
  } while (needed > 0)

  return res;
}

const craft = async (characterName: string, itemCode: string, quantity: number, task: Task): Promise<SkillDataSchema> => {
  const character = team.get(characterName);
  if (!character) {
    throw new Error(`❌ Le personnage ${characterName} n'existe pas dans l'équipe.`);
  }
  const item = getItem(itemCode);
  if (!item) {
    throw new Error(`❌ L'item' ${itemCode} n'existe pas.`);
  }

  // Vérification de la possession des ressources nécessaires
  if (item.craft.items.length > 0)  {
    for (const itemNeeded of item.craft.items) {
      const obj = getItem(itemNeeded.code) ?? getResource(itemNeeded.code);
      if (undefined === obj) {
        console.log(`❌ L'objet ou la ressource ${itemNeeded.code} n'existe pas.`);
        continue;
      }
      const characterResource = character.inventory.find(i => i.code === itemNeeded.code);
      if (!characterResource || characterResource.quantity < itemNeeded.quantity * quantity) {
        // Vérification de la disponibilité de la ressource à la banque
        if (config.debug) {
          console.log(`🔍 Vérification de la disponibilité de ${obj.name} dans la banque...`);
        }
        const availableInBank = hasInBank(itemNeeded.code, itemNeeded.quantity * quantity);
        if (availableInBank) {
          if (config.debug) {
            console.log(`✅ ${obj.name} est disponible dans la banque.`);
          }
          await retriveInBank(characterName, itemNeeded.code, quantity);
        } else {
          const newTask = new Task({
            name: `Collecte de ${obj.name} pour ${characterName}`,
            type: 'gather',
            code: itemNeeded.code,
            quantity: itemNeeded.quantity * quantity,
            isDependencyFor: task.id,
          });
          task.dependencies.add(newTask.id);
          taskBus.add(newTask);
          if (config.debug) {
            console.log(`❌ ${characterName} n'a pas assez de ${obj.name} (${characterResource?.quantity ?? 0}/${itemNeeded.quantity * quantity})`);
            console.log(`📝 Tâche ajoutée pour collecter ${itemNeeded.quantity * quantity} ${obj.name}`);
          }
          task.status = 'blocked';
          continue;
        }
      }
    }
  }
  if (task.status === 'blocked') {
    throw new Error(`❌ La tâche ${task.name} est bloquée, car les ressources nécessaires ne sont pas disponibles.`);
  }

  if (config.debug) {
    console.log(`✅ Toutes les ressources nécessaires pour fabriquer ${item.name} sont disponibles.`);
    console.log(`🔄 Démarrage de la fabrication de ${item.name}...`);
  }
  const res = await crafting(characterName, item.code, quantity);
  return res;
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
