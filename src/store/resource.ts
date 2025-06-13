import getAll from "../api/resources";
import { Resource } from "../api/resources/type";

export const resources: Map<string, Resource> = new Map()

export const loadResources = async () => {
  resources.clear()
  console.log(`ℹ️ Récupération de l'ensemble des ressources`)
  const apiresources = await getAll()
  for (const resource of apiresources) {
    resources.set(resource.code, resource)
  }
  console.log(`ℹ️ Chargement des ressources terminé`)
}

export const get = (resourceCode: string): Resource | undefined => {
  const resource = resources.get(resourceCode)
  if (!resource) {
    console.log(`⚠️ La ressource ${resourceCode} n'existe pas`)
    return undefined
  }
  return resource
}

export const getResourceWhoDrop = (itemCode: string): Resource | undefined => {
  for (const resource of resources.values()) {
    if (resource.drops?.find(drop => drop.code === itemCode)) {
      return resource
    }
  }
  return undefined
}
