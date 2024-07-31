import { resolve } from 'path'
import { CharacterFightResponseSchema, CharacterMovementResponseSchema, CraftingSchema, DestinationSchema, EquipSchema, EquipmentResponseSchema, SkillResponseSchema, UnequipSchema } from './ApiArtifacts'

import { client } from './api'
import { delay } from './utils'

const gestionError = (error: Response): string => {
  switch (error.status) {
    case 490:
      return `Le personnage est déjà sur la case`
  
    default:
      return `Probleme non définit : ${error.status} => ${error.json()}`
  }
}

export const move = (name: string, data: DestinationSchema): Promise<CharacterMovementResponseSchema> => {
  return new Promise(async (resolve, reject) => {
    const response: CharacterMovementResponseSchema = await client.my.actionMoveMyNameActionMovePost(name, data)
      .then(v => v.json())
      .catch((e: Response) => reject(gestionError(e)))

    const cooldown = response.data.cooldown.total_seconds;
    await delay(cooldown * 1000);
    
    resolve(response)
  })
}

export const fight = (name: string): Promise<CharacterFightResponseSchema> => {
  return new Promise(async (resolve, reject) => {
    const response: CharacterFightResponseSchema = await client.my.actionFightMyNameActionFightPost(name)
      .then(v => v.json())
      .catch((e: Response) => reject(gestionError(e)))

    const cooldown = response.data.cooldown.total_seconds;
    await delay(cooldown * 1000);

    resolve(response)
  })
}

export const gathering = (name: string): Promise<SkillResponseSchema> => {
  return new Promise(async (resolve, reject) => {
    const response = await client.my.actionGatheringMyNameActionGatheringPost(name)
      .then(v => v.json())
      .catch((e: Response) => reject(gestionError(e)))

      const cooldown = response.data.cooldown.total_seconds;
      await delay(cooldown * 1000);
  
      resolve(response)
  })
}

export const equip = (name: string, data: EquipSchema): Promise<EquipmentResponseSchema> => {
  return new Promise(async (resolve, reject) => {
    const response = await client.my.actionEquipItemMyNameActionEquipPost(name, data)
      .then(v => v.json())
      .catch((e: Response) => reject(gestionError(e)))

      const cooldown = response.data.cooldown.total_seconds;
      await delay(cooldown * 1000);
  
      resolve(response)
  })
}

export const unequip = (name: string, data: UnequipSchema): Promise<EquipmentResponseSchema> => {
  return new Promise(async (resolve, reject) => {
    const response = await client.my.actionUnequipItemMyNameActionUnequipPost(name, data)
      .then(v => v.json())
      .catch((e: Response) => reject(gestionError(e)))

      const cooldown = response.data.cooldown.total_seconds;
      await delay(cooldown * 1000);
  
      resolve(response)
  })
}

export const craft = (name: string, data: CraftingSchema): Promise<SkillResponseSchema> => {
  return new Promise(async (resolve, reject) => {
    const response = await client.my.actionCraftingMyNameActionCraftingPost(name, data)
      .then(v => v.json())
      .catch((e: Response) => reject(gestionError(e)))

      const cooldown = response.data.cooldown.total_seconds;
      await delay(cooldown * 1000);
  
      resolve(response)
  })
}