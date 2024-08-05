import { client } from './api'
import { CharacterSchema, ItemSchema, MapSchema } from './ApiArtifacts'
import { logMap } from './logger';
import { getResourceForItem } from './items';

const map: MapSchema[] = [];

export const getMap = async (): Promise<MapSchema[]> => {
  if (map.length === 0) {
    logMap(`Début de la récupération de la carte`, 'info')
    /** @var data ItemSchema[] */
    let { data, page, pages } = await client.maps.getAllMapsMapsGet().then(v => v.json())
    logMap(`Page ${page} / ${pages}`)
    
    for (const item of data) {
      map.push(item)
    }

    for (page++; page <= pages; page++) {
      logMap(`Page ${page} / ${pages}`)
      let { data } = await client.maps.getAllMapsMapsGet({ page }).then(v => v.json())

      for (const item of data) {
        map.push(item)
      }
    }
  }

  return map
}

export const getItemPosition = async (item: ItemSchema, character: CharacterSchema): Promise<MapSchema | undefined> => {
  return new Promise(async (resolve, reject) => {
    const resource = await getResourceForItem(item)
    if (!resource) {
      logMap(`L'objet ${item.name} (code : ${item.code}) n'a pas de resource sur la carte et n'est pas présent`, 'error')
      return reject()
    }
  
    const resourcePositions = (await getMap()).filter(m => m.content?.code === resource.code)
  
    if (resourcePositions.length === 1) {
      return resolve(resourcePositions[0])
    }
  
    let itemNearest = resourcePositions[0];
    let distanceMinimale = Infinity;
  
    for (const itemPosition of resourcePositions) {
      let dist = distance(character.x, character.y, itemPosition.x, itemPosition.y);
      if (dist < distanceMinimale) {
          distanceMinimale = dist;
          itemNearest = itemPosition;
      }
    }
  
    return resolve(itemNearest)
  })
}

export const getWorkshopsPosition = async () => (await getMap()).filter(m => m.content?.type == 'workshop')

export const getWorkshopsPositionByCode = async (code: string) => (await getMap()).filter(m => m.content?.type == 'workshop').find(m => m.content?.code === code)

const distance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}