import { CharacterFightResponseSchema } from './ApiArtifacts'

import { client, gestionError } from './api'
import { delay } from './utils'

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
