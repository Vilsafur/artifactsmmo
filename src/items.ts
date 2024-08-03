import { ItemSchema } from './ApiArtifacts'
import { client } from './api'

const items: ItemSchema[] = [];

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
