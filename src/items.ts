import { ItemSchema, ResourceSchema } from './ApiArtifacts'
import { client } from './api'
import { logItem } from './logger';

const items: ItemSchema[] = [];
const resources: ResourceSchema[] = [];

/**
 * Retourne la liste de tous les objets
 *
 * @returns La liste des objets
 */
export const getItems = async (): Promise<ItemSchema[]> => {
  return new Promise(async (resolve, reject) => {
    if (items.length === 0) {
      logItem(`Début de la récupération des items`, 'info')
      /** @var data ItemSchema[] */
      let { data, page, pages } = await client.items.getAllItemsItemsGet().then(v => v.json())
      logItem(`Page ${page} / ${pages}`)
      
      for (const item of data) {
        items.push(item)
      }

      for (page++; page <= pages; page++) {
        logItem(`Page ${page} / ${pages}`)
        let { data } = await client.items.getAllItemsItemsGet({ page }).then(v => v.json())
  
        for (const item of data) {
          items.push(item)
        }
        
      }
    }
    resolve(items)
  })
}

/**
 * Retourne les objets appartenant à une catégorie
 *
 * @param category Le nom de la catégorie
 * @returns Les objets de la catégorie
 */
export const getItemsByCategory = async (category: string) => (await getItems()).filter(item => item.type === category)

/**
 * Retourne un objet à partir de son nom
 *
 * @param name Le nom de l'objet
 * @returns L'objet
 */
export const getItemsByName = async (name: string) => (await getItems()).find(item => item.name === name)

/**
 * Retourne un objet à partir de son code
 *
 * @param code Le code de l'objet
 * @returns L'objet
 */
export const getItemsByCode = async (code: string): Promise<ItemSchema | undefined> => (await getItems()).find(item => item.code === code)

/**
 * Retourne la liste des ressources
 *
 * @returns La liste des ressources
 */
export const getResources = async (): Promise<ResourceSchema[]> => {
  return new Promise(async (resolve, reject) => {
    if (resources.length === 0) {
      logItem(`Début de la récupération des resources`, 'info')
      /** @var data resourceschema[] */
      let { data, page, pages } = await client.resources.getAllResourcesResourcesGet().then(v => v.json())
      logItem(`Page ${page} / ${pages}`)
      
      for (const item of data) {
        resources.push(item)
      }

      for (page++; page <= pages; page++) {
        logItem(`Page ${page} / ${pages}`)
        let { data } = await client.resources.getAllResourcesResourcesGet({ page }).then(v => v.json())
  
        for (const item of data) {
          resources.push(item)
        }
        
      }
    }
    resolve(resources)
  })
}

/**
 * Retourne une ressource à partir d'un objet
 *
 * @param item L'objet de base
 * @returns La ressource
 */
export const getResourceForItem = async (item: ItemSchema) => (await getResources()).find(v => v.drops.find(c => c.code === item.code))