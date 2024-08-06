import { client } from "./api";
import { ItemSchema } from "./ApiArtifacts";
import { Character } from "./character";
import { logCharacter, logTeam } from "./logger";
import { farm } from "./tasks";
import { CharacterRole, Skill, Skin } from "./types";
import { delay, playerColors, roleBySkill } from "./utils";

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

  let cooldown = 0
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

      const persoCooldown = (await perso.getInfos()).cooldown
      if (persoCooldown > cooldown) {
        cooldown = persoCooldown
      }
    }
  }

  await delay(cooldown * 1000)

  logTeam(`Fin de l'initialisation des personnages`, 'info')
}

/**
 * Récupère un personnage suivant un rôle
 *
 * @param role Le rôle à chercher
 * @returns Le personnage possédant le rôle
 */
export const getPersoWithRole = (role: CharacterRole): Character => {
  if (!team[role]) {
    throw new Error(`L'équipe n'est pas initialisée`)
  }
  return team[role]
}

/**
 * Récupère un personnage suivant une compétence
 *
 * @param skill La compétence à chercher
 * @returns Le personnage avec la compétence
 */
export const getPersoWithSkill = (skill: Skill) => getPersoWithRole(roleBySkill(skill))

/**
 * Ajoute une tache de récupération d'objet au bon personnage
 *
 * @param item L'objet à fabriquer
 * @param quantity La quantité nécessaire
 */
export const addRetriveItemTask = async (item: ItemSchema, quantity: number) => {
  const persoToCraft = item.craft?.skill ? getPersoWithSkill(item.craft.skill) : undefined
  if (!persoToCraft) {
    throw new Error(`Impossible de trouver de personnage pour récupérer l'objet ${item.name}`)
  }

  persoToCraft.addTask(() => farm(persoToCraft, item, quantity, true))
}

/**
 * Retourne la liste des personnage sous forme de tableaux
 *
 * @returns La liste des personnage
 */
export const getAllPerso = (): Character[] => Object.values(team)
