import chalk, { Chalk } from 'chalk';
import { Character } from './character';

type Level = 'debug' | 'info' | 'error'

const log = (color: Chalk, message: string, level: Level) => {
  if (level == 'debug' && process.env.DEBUG != 'true') {
    return
  }
  let logMessage = `[${getCurrentTime()}] ${message}`
  if (level === 'error') {
    logMessage = chalk.bold(logMessage)
  }
  console.log(color(logMessage))
}

export const logCharacter = (character: Character, message: string, level: Level = 'debug'): void => {
  log(character.getColor(), `${character.getName()} : ${message}`, level)
}

export const logMap = (message: string, level: Level = 'debug'): void => {
  log(chalk.rgb(220, 20, 60), `Map : ${message}`, level)
}

export const logItem = (message: string, level: Level = 'debug'): void => {
  log(chalk.rgb(192, 192, 192), `Item : ${message}`, level)
}

// Fonction pour obtenir l'heure actuelle formatée
const getCurrentTime = (): string  => {
    return new Date().toISOString();
}
