import { client } from './api'
import { CharacterFightResponseSchema, CharacterSchema, DestinationSchema, EquipSchema, InventorySlot, ItemSchema, UnequipSchema } from './ApiArtifacts';
import { logCharacter, logMap } from './logger';
import { getItemsByCode } from './items'
import { getBankPosition, getItemPosition, getWorkshopsPositionByCode } from './map';
import { delay } from './utils';
import { Chalk } from 'chalk';
import { addRetriveItemTask, getPersoWithSkill } from './team';
import { Task } from './types';

export class Character {
  private name
  private color: Chalk
  private tasks: Task[] = []
  private isExecuting: boolean = false

  constructor(name: string, color: Chalk) {
    this.name = name
    this.color = color
  }

  /**
   * Retourne le nom du personnage
   *
   * @returns La nom du personnage
   */
  getName(): String {
    return this.name
  }

  /**
   * Retourne la couleur de log du personnage
   *
   * @returns La couleur de log
   */
  getColor(): Chalk {
    return this.color
  }

  /**
   * Ajoute une tâche à la liste de tâche à effectuer du personnage
   *
   * @param task La tâche à effectuer
   */
  addTask(task: Task) {
    logCharacter(this, `Réception d'une tâche : ${task.toString()}`)
    this.tasks.push(task)
    if(!this.isExecuting) {
      this.executeTasks()
    }
  }

  /**
   * Execute les tâches à faire
   */
  private async executeTasks(): Promise<void> {
    logCharacter(this, `Début de l'exécution des tâches`)
    this.isExecuting = true
    while(this.tasks.length > 0) {
      const currentTask = this.tasks.shift()
      if (currentTask) {
        try {
          logCharacter(this, `Début de l'exécution d'une tâche (${currentTask.toString()})`)
          await currentTask()
          logCharacter(this, `Fin de l'exécution d'une tâche (${currentTask.toString()})`)
        } catch (error) {
          logCharacter(this, `Il y a eu un soucis lors de l'exécution de la tâche`, 'error')
        }
      }
    }
    this.isExecuting = false
  }

  /**
   * Récupère les informations du personnage
   *
   * @returns Promise<CharacterSchema>
   */
  async getInfos(): Promise<CharacterSchema> {
    return (await client.characters.getCharacterCharactersNameGet(this.name).then(v => v.json())).data
  }

  /**
   * Retourne l'inventaire du personnage
   *
   * @returns L'inventaire du personnage
   */
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
    return new Promise(async (resolve, reject) => {
      const inInventory = (await this.getInfos()).inventory?.find(i => i.code === item.code)?.quantity ?? 0
      if (inInventory === quantity) {
        logCharacter(this, `L'objet ${item.name} est déjà dans l'inventaire`)
        return resolve()
      }
  
      let toRetrieve = quantity - inInventory
  
      while (toRetrieve > 0) {
        logCharacter(this, `${toRetrieve} objets à récupérer`)
        for (let index = 0; index < toRetrieve; index++) {
          try {
            logCharacter(this, `Tentative de récupération de l'objet (${item.name}) à la banque`)
            await this.retriveItemInBank(item, toRetrieve)
          } catch (error) {
            let persoToCraft = item.craft?.skill ? getPersoWithSkill(item.craft.skill) : this
            if (persoToCraft.getName() !== this.name) {
              return reject(1)
            }

            if (item.craft) {
              logCharacter(this, `L'objet ${item.name} doit être fabriqué`)
              try {
                await this.craft(item)
              } catch (error) {
                return reject(2)
              }
            } else {
              logCharacter(this, `L'objet ${item.name} doit être récolté`)
              logCharacter(this, `Déplacement vers l'objet ${item.name}`)
              const position = await getItemPosition(item, await this.getInfos())
              if (!position) {
                return reject(2)
              }
              await this.move(position)
              logCharacter(this, `Récupération de l'objet ${item.name}`)
              await this.gathering()
            }
          }
        }
        const inInventory = (await this.getInfos()).inventory?.find(i => i.code === item.code)?.quantity ?? 0
        if (inInventory === quantity) {
          logCharacter(this, `L'objet ${item.name} est déjà dans l'inventaire`, 'info')
          return resolve()
        }

        toRetrieve = quantity - inInventory
      }
      resolve()
    })
  }

  /**
   * Fabrique un objet,
   * Va rechercher les objets nécessaire à la fabrication
   *
   * @param item L'objet à fabriquer
   */
  async craft(item: ItemSchema): Promise<void> {
    return new Promise(async (resolve, reject) => {

      if (!item.craft || !item.craft.skill) {
        logCharacter(this, `L'objet ${item.name} n'est pas fabricable`, 'error');
        return reject()
      }
  
      const jobLevel = (await this.getJobLevels())[item.craft.skill]
  
      if (item.craft.level && item.craft.level > jobLevel) {
        logCharacter(this, `Manque de compétences de ${item.craft.skill} pour fabriquer l'objet ${item.name} (${jobLevel} / ${item.craft.level})`, 'error');
        return reject()
      }
  
      logCharacter(this, `Début de la fabrication de l'objet : ${item.name}`, 'info')
  
      let itemsNeeded = item.craft.items ?? []
      let alreadyAsk = false
  
      while (itemsNeeded.length) {
        for (const itemNeeded of itemsNeeded) {
          const item = await getItemsByCode(itemNeeded.code)
          if (!item) {
            logCharacter(this, `Erreur lors de la récupération de l'objet ${itemNeeded.code}`, 'error')
            return reject()
          }

          try {
            await this.retrieveOrCraft(item, itemNeeded.quantity)  
          } catch (error) {
            if (error === 1 && !alreadyAsk) {
              logCharacter(this, `Demande de récupération de l'objet ${item.name} en ${itemNeeded.quantity} exemplaire(s)`)
              addRetriveItemTask(item, itemNeeded.quantity)
              alreadyAsk = true
            } else if (error === 2) {
              return reject()
            }
          }

          const inInventory = (await this.getInfos()).inventory?.find(i => i.code === item.code)?.quantity ?? 0
          if (inInventory === itemNeeded.quantity) {
            logCharacter(this, `L'objet ${item.name} est récupéré dans l'inventaire`)
            itemsNeeded = itemsNeeded.filter(item => item.code !== itemNeeded.code)
          }
        }
        await delay(1000)
      }
  
      const workshop = await getWorkshopsPositionByCode(item.craft.skill)
      if (!workshop) {
        logCharacter(this, `L'atelier ${item.craft.skill} n'a pas été trouvé`, 'error')
        return reject()
      }
  
      logCharacter(this, `Déplacement vers l'atelier ${workshop.content?.code}`)
      await this.move(workshop)
  
      const { data } = await client.my.actionCraftingMyNameActionCraftingPost(this.name, {code: item.code})
        .then(v => v.json())
        .catch((e: Response) => {
          logCharacter(this, `Erreur lors de la fabrication de l'objet, code : ${e.status}`, 'error')
          return reject()
        })
  
  
      const cooldown = data.cooldown.total_seconds;
      await delay(cooldown * 1000);
      resolve()
    })
  }

  /**
   * Récupère un objet dans la banque
   *
   * @param item L'objet à récupérer
   * @returns 
   */
  async retriveItemInBank(item: ItemSchema, quantity: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const bank = await getBankPosition()
      if (!bank) {
        logMap(`Impossible de trouver la banque`, 'error')
        return reject()
      }

      await this.move(bank)
      await client.my.actionWithdrawBankMyNameActionBankWithdrawPost(this.name, {code: item.code, quantity })
        .then(v => v.json())
        .then(async response => {
          const cooldown = response.data.cooldown.total_seconds;
          await delay(cooldown * 1000)
        })
        .catch((e: Response) => {
          if (e.status !== 404) {
            logCharacter(this, `Erreur dans la récupération de l'objet ${item.name} dans la banque, code de retour : ${e.status}`, 'error')
          }
          return reject()
        })
      resolve()
    })
  }

  /**
   * Dépose des objets à la banque
   *
   * @param item L'objet à déposer
   * @param quantity La quantité à déposer
   * @returns 
   */
  async depositItemToBank(item: ItemSchema, quantity: number): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await this.retrieveOrCraft(item, quantity)

      const bank = await getBankPosition()
      if (!bank) {
        logMap(`Impossible de trouver la banque`, 'error')
        return reject()
      }

      await this.move(bank)
      await client.my.actionDepositBankMyNameActionBankDepositPost(this.name, {code: item.code, quantity})
        .then(v => v.json())
        .then(async response => {
          const cooldown = response.data.cooldown.total_seconds;
          await delay(cooldown * 1000)
        })
        .catch((e: Response) => {
          logCharacter(this, `Erreur dans la récupération de l'objet ${item.name} dans la banque, code de retour : ${e.status}`, 'error')
          return reject()
        })
      resolve()
    })
  }

  /**
   * Déplace le personnage à l'endroit indiqué
   *
   * @param position La position de destination
   */
  async move(position: DestinationSchema): Promise<void> {
    return new Promise(async (resolve, reject) => {
      await client.my.actionMoveMyNameActionMovePost(this.name, position)
        .then(v => v.json())
        .then(async response => {
          const cooldown = response.data.cooldown.total_seconds;
          await delay(cooldown * 1000);
        })
        .catch((e: Response) => {
          if (e.status !== 490) {
            logCharacter(this, `Erreur dans le déplacement, code de retour : ${e.status}`, 'error');
            return reject()
          }
        })
        resolve()
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

  /**
   * Equipe un objet dans l'emplacement souhaité
   * 
   * @param data L'objet et l'emplacement à équiper
   */
  async equip (data: EquipSchema): Promise<void> {
    await client.my.actionEquipItemMyNameActionEquipPost(this.name, data)
      .then(v => v.json())
      .then(async response => {
        const cooldown = response.data.cooldown.total_seconds;
        await delay(cooldown * 1000);
      })
      .catch((e: Response) => {
        logCharacter(this, `Erreur lors de l'équipement de l'objet ${data.code}, code : ${e.status}`, 'error')
        return
      })
  }

  /**
   * Déséquipe un objet
   *
   * @param data L'emplacement de l'objet à déséquiper
   */
  async unequip (data: UnequipSchema): Promise<void> {
    await client.my.actionUnequipItemMyNameActionUnequipPost(this.name, data)
      .then(v => v.json())
      .then(async response => {
        const cooldown = response.data.cooldown.total_seconds;
        await delay(cooldown * 1000);
      })
      .catch((e: Response) => {
        logCharacter(this, `Impossible de déséquiper l'objet à l'emplacement ${data.slot}, code ${e.status}`, 'error')
        return
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
      .catch((e: Response) => {
        logCharacter(this, `Erreur lors du combat, code ${e.status}`, 'error')
        return
      })
  }
}
