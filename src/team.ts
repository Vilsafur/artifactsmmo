import { client } from "./api";
import { ItemSchema } from "./ApiArtifacts";
import { Character } from "./character";
import { logCharacter, logTeam } from "./logger";
import { farm, Task } from "./tasks";
import { CharacterRole, Skill, Skin } from "./types";
import { playerColors, roleBySkill } from "./utils";

const team: {
  [key in CharacterRole]?: Character
} = {}

/**
 * Initialisation de l'équipe
 */
export const initialisation = async () => {
  const persos: { name: string, role: CharacterRole, skin: Skin }[] = [
    {
      name: 'Nendar',
      role: 'farmer',
      skin: 'men1'
    },
    {
      name: 'Vilsafur',
      role: 'weaponcrafter',
      skin: 'men2'
    },
    {
      name: 'Merida',
      role: 'cooker',
      skin: 'women1'
    },
    {
      name: 'Amada',
      role: 'jewelrycrafter',
      skin: 'women2'
    },
    {
      name: 'Nyama',
      role: 'gearcrafter',
      skin: 'men3'
    },
  ]

  for (const index in persos) {
    if (Object.prototype.hasOwnProperty.call(persos, index)) {
      const p = persos[index];
      const perso = new Character(p.name, playerColors[index])
      logCharacter(perso, `Initialisation du personnage`)

      try {
        await client.characters.getCharacterCharactersNameGet(p.name)
      } catch (error) {
        logCharacter(perso, `Création du personnage dans l'api`)
        await client.characters.createCharacterCharactersCreatePost({
          name: p.name,
          skin: p.skin
        })
      }
      team[p.role] = perso
    }
  }
}

export const getPersoWithRole = (role: CharacterRole): Character => {
  if (!team[role]) {
    throw new Error(`L'équipe n'est pas initialisée`)
  }
  return team[role]
}

export const getPersoWithSkill = (skill: Skill) => getPersoWithRole(roleBySkill(skill))

export const addRetriveItemTask = async (item: ItemSchema, quantity: number, requestor: Character) => {
  const persoToCraft = item.craft?.skill ? getPersoWithSkill(item.craft.skill) : undefined
  if (!persoToCraft) {
    throw new Error(`Impossible de trouver de personnage pour récupérer l'objet ${item.name}`)
  }

  persoToCraft.addTask(() => farm(persoToCraft, item, quantity, true))
}
