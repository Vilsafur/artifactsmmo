import chalk, { Chalk } from 'chalk';
import { Character } from './character';

const log = (color: Chalk, message: string) => {
  const logMessage = `[${getCurrentTime()}] ${message}`
  console.log(color(logMessage))
}

export const logCharacter = (character: Character, message: string): void => {
  log(character.getColor(), `${character.getName()} : ${message}`)
}

export const logMap = (message: string): void => {
  log(chalk.rgb(220, 20, 60), `Map : ${message}`)
}

export const logItem = (message: string): void => {
  log(chalk.rgb(192, 192, 192), `Item : ${message}`)
}

// Fonction pour obtenir l'heure actuelle formatée
const getCurrentTime = (): string  => {
    return new Date().toISOString();
}