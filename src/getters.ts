import { CharacterResponseSchema, InventorySlot } from './ApiArtifacts'
import { client } from './api'

export const getInventory = async (name: string): Promise<InventorySlot[] | undefined> => {
  const data: CharacterResponseSchema = await client.characters.getCharacterCharactersNameGet(name).then(v => v.json())
  return data.data.inventory
}