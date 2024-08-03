import { ItemSchema, ResourceSchema } from './ApiArtifacts'
import { client } from './api'

const items: ItemSchema[] = [];
const resources: ResourceSchema[] = [];

export const getItems = async (): Promise<ItemSchema[]> => {
  return new Promise(async (resolve, reject) => {
    if (items.length === 0) {
      console.log(`Début de la récupération des items`)
      /** @var data ItemSchema[] */
      let { data, page, pages } = await client.items.getAllItemsItemsGet().then(v => v.json())
      console.log(`Page ${page} / ${pages}`)
      
      for (const item of data) {
        items.push(item)
      }

      for (page++; page <= pages; page++) {
        console.log(`Page ${page} / ${pages}`)
        let { data } = await client.items.getAllItemsItemsGet({ page }).then(v => v.json())
  
        for (const item of data) {
          items.push(item)
        }
        
      }
    }
    resolve(items)
  })
}

export const getItemsByCategory = async (category: string) => (await getItems()).filter(item => item.type === category)

export const getItemsByName = async (name: string) => (await getItems()).find(item => item.name === name)

export const getItemsByCode = async (code: string): Promise<ItemSchema | undefined> => (await getItems()).find(item => item.code === code)

export const getResources = async (): Promise<ResourceSchema[]> => {
  return new Promise(async (resolve, reject) => {
    if (resources.length === 0) {
      console.log(`Début de la récupération des resources`)
      /** @var data resourceschema[] */
      let { data, page, pages } = await client.resources.getAllResourcesResourcesGet().then(v => v.json())
      console.log(`Page ${page} / ${pages}`)
      
      for (const item of data) {
        resources.push(item)
      }

      for (page++; page <= pages; page++) {
        console.log(`Page ${page} / ${pages}`)
        let { data } = await client.resources.getAllResourcesResourcesGet({ page }).then(v => v.json())
  
        for (const item of data) {
          resources.push(item)
        }
        
      }
    }
    resolve(resources)
  })
}

export const getResourceForItem = async (item: ItemSchema) => (await getResources()).find(v => v.drops.find(c => c.code === item.code))

export const getItemFromResource = async (resource: ResourceSchema) => (await getItems()).find(v => v.code === resource.code)