import { Api } from './ApiArtifacts'

export const client = new Api({
  baseUrl: process.env.ARTIFACTS_SERVER,
  baseApiParams: {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + process.env.TOKEN,
    }
  }
})

export const gestionError = (error: Response): string => {
  switch (error.status) {
    case 490:
      return `Le personnage est déjà sur la case`
  
    default:
      return `Probleme non définit : ${error.status} => ${error.json()}`
  }
}
