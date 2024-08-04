import { client } from './api'
import { CharacterFightResponseSchema, CharacterMovementResponseSchema, CharacterSchema, DestinationSchema, EquipSchema, InventorySlot, ItemSchema, UnequipSchema } from './ApiArtifacts';
import { getItemsByCode } from './items'
import { getItemPosition, getWorkshopsPositionByCode } from './map';
import { delay } from './utils';

export class Character {
  private name

  constructor(name: string) {
    this.name = name
  }

  /**
   * Récupère les informations du personnage
   *
   * @returns Promise<CharacterSchema>
   */
  async getInfos(): Promise<CharacterSchema> {
    return (await client.characters.getCharacterCharactersNameGet(this.name).then(v => v.json())).data
  }

  async getInventory(): Promise<InventorySlot[] | undefined> {
    return (await this.getInfos()).inventory
  }

  /**
   * Récupère les informations de niveaux de profession
   *
   * @returns 
   */
  async getJobLevels(): Promise<{
    mining: number
    cooking: number
    fishing: number
    gearcrafting: number
    jewelrycrafting: number
    woodcutting: number
    weaponcrafting: number
  }> {
    const character = (await this.getInfos())

    return {
      mining: character.mining_level,
      cooking: character.cooking_level,
      fishing: character.fishing_level,
      gearcrafting: character.gearcrafting_level,
      jewelrycrafting: character.jewelrycrafting_level,
      woodcutting: character.woodcutting_level,
      weaponcrafting: character.weaponcrafting_level
    }

  }

  /**
   * Récupère l'objet via la collecte ou la fabrication
   *
   * @param item L'objet à récupérer
   * @returns 
   */
  async retrieveOrCraft(item: ItemSchema, quantity: number): Promise<void> {
    const inInventory = (await this.getInfos()).inventory?.find(i => i.code === item.code)?.quantity ?? 0
    if (inInventory === quantity) {
      console.log(`L'objet ${item.name} est déjà dans l'inventaire`)
      return
    }

    let toRetrieve = quantity - inInventory

    while (toRetrieve > 0) {
      console.log(`${toRetrieve} objets à récupérer`)
      for (let index = 0; index < toRetrieve; index++) {
        if (item.craft) {
          console.log(`L'objet ${item.name} doit être fabriqué`)
          await this.craft(item)
        } else {
          console.log(`L'objet ${item.name} doit être récupéré`)
          const position = await getItemPosition(item, await this.getInfos())
          console.log(`Déplacement vers l'objet ${item.name}`)
          await this.move(position)
          console.log(`Récupération de l'objet ${item.name}`)
          await this.gathering()
        }
      }
      const inInventory = (await this.getInfos()).inventory?.find(i => i.code === item.code)?.quantity ?? 0
      if (inInventory === quantity) {
        console.log(`L'objet ${item.name} est déjà dans l'inventaire`)
        return
      }
  
      toRetrieve = quantity - inInventory
    }
  }

  /**
   * Fabrique un objet,
   * Va rechercher les objets nécessaire à la fabrication
   *
   * @param item L'objet à fabriquer
   */
  async craft(item: ItemSchema): Promise<void> {

    if (!item.craft || !item.craft.skill) {
      throw new Error(`L'objet ${item.name} n'est pas fabricable`);
    }

    const jobLevel = (await this.getJobLevels())[item.craft.skill]

    if (item.craft.level && item.craft.level > jobLevel) {
      throw new Error(`${this.name} n'a pas les compétences de ${item.craft.skill} (${jobLevel} / ${item.craft.level}) pour fabriquer l'objet ${item.name}`);
    }

    console.log(`Début de la fabrication de l'objet : ${item.name}`)

    const itemsNeeded = item.craft.items

    if (itemsNeeded) {
      for (const itemNeeded of itemsNeeded) {
        const item = await getItemsByCode(itemNeeded.code)
        if (!item) {
          throw new Error(`Erreur lors de la récupération de l'objet ${itemNeeded.code}`)
        }

        await this.retrieveOrCraft(item, itemNeeded.quantity)
      }
    }

    const workshop = await getWorkshopsPositionByCode(item.craft.skill)
    if (!workshop) {
      throw new Error(`L'atelier ${item.craft.skill} n'a pas été trouvé`)
    }

    console.log(`Déplacement vers l'atelier ${workshop.content?.code}`)
    await this.move(workshop)

    const { data } = await client.my.actionCraftingMyNameActionCraftingPost(this.name, {code: item.code})
      .then(v => v.json())
      .catch((e: Response) => {throw new Error(`Erreur lors de la fabrication de l'objet, code : ${e.status}`)}
      )


    const cooldown = data.cooldown.total_seconds;
    await delay(cooldown * 1000);
  }

  /**
   * Déplace le personnage à l'endroit indiqué
   *
   * @param position La position de destination
   */
  async move(position: DestinationSchema): Promise<void> {
    await client.my.actionMoveMyNameActionMovePost(this.name, position)
      .then(v => v.json())
      .then(async response => {
        const cooldown = response.data.cooldown.total_seconds;
        await delay(cooldown * 1000);
      })
      .catch((e: Response) => {
        if (e.status !== 490) {
          throw new Error(`Erreur dans le déplacement, code de retour : ${e.status}`);          
        }
      })
  }

  /**
   * Récupère une ressource à l'emplacement du personnage
   */
  async gathering (): Promise<void> {
    const response = await client.my.actionGatheringMyNameActionGatheringPost(this.name)
      .then(v => v.json())

      const cooldown = response.data.cooldown.total_seconds;
      await delay(cooldown * 1000);
  }

  async equip (data: EquipSchema): Promise<void> {
    await client.my.actionEquipItemMyNameActionEquipPost(this.name, data)
      .then(v => v.json())
      .then(async response => {
        const cooldown = response.data.cooldown.total_seconds;
        await delay(cooldown * 1000);
      })
      .catch((e: Response) => {
        throw new Error(`Erreur lors de l'équipement de l'objet ${data.code}, code : ${e.status}`)
      })
  }

  async unequip (data: UnequipSchema): Promise<void> {
    await client.my.actionUnequipItemMyNameActionUnequipPost(this.name, data)
      .then(v => v.json())
      .then(async response => {
        const cooldown = response.data.cooldown.total_seconds;
        await delay(cooldown * 1000);
      })
      .catch((e: Response) => {
        throw new Error(`Impossible de déséquiper l'objet à l'emplacement ${data.slot}, code ${e.status}`)
      })
  }

  /**
   * Combat le monstre sur la case
   */
  async fight (): Promise<void> {
    await client.my.actionFightMyNameActionFightPost(this.name)
      .then(v => v.json())
      .then(async (response: CharacterFightResponseSchema) => {
        const cooldown = response.data.cooldown.total_seconds;
        await delay(cooldown * 1000);
      })
      .catch((e: Response) => {throw new Error (`Erreur lors du combat, code ${e.status}`)})
  }
}
