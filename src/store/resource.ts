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
