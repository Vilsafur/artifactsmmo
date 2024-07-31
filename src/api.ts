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

