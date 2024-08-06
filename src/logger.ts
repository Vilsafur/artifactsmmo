import chalk, { Chalk } from 'chalk';
import { Character } from './character';
import { addLog } from './interface';

type Level = 'debug' | 'info' | 'error'

/**
 * Ecrit un message en console
 *
 * @param color La couleur à utiliser
 * @param message Le message à écrire
 * @param level Le niveau du message
 */
const log = (color: Chalk, message: string, level: Level): void => {
  if (level == 'debug' && process.env.DEBUG != 'true') {
    return
  }
  let logMessage = `[${getCurrentTime()}] ${message}`
  switch (level) {
    case 'error':
      logMessage = chalk.bold(logMessage)
      break;
    case 'debug':
      logMessage = chalk.italic(logMessage)
      break;
  
    default:
      break;
  }
  addLog(color(logMessage))
}

/**
 * Ecrit un log pour le personnage
 *
 * @param character Le personnage du log
 * @param message le message à écrire
 * @param level Le niveau du log
 */
export const logCharacter = (character: Character, message: string, level: Level = 'debug'): void => {
  log(character.getColor(), `${character.getName()} : ${message}`, level)
}

/**
 * Ecrit un message de log pour la carte
 *
 * @param message Le message à écrire
 * @param level Le niveau du log
 */
export const logMap = (message: string, level: Level = 'debug'): void => {
  log(chalk.rgb(220, 20, 60), `Map : ${message}`, level)
}

/**
 * Ecrit un message de log pour un objet
 *
 * @param message Le message à écrire
 * @param level Le niveau du log
 */
export const logItem = (message: string, level: Level = 'debug'): void => {
  log(chalk.rgb(192, 192, 192), `Item : ${message}`, level)
}

/**
 * Ecrit un message de log pour un objet
 *
 * @param message Le message à écrire
 * @param level Le niveau du log
 */
export const logTeam = (message: string, level: Level = 'debug'): void => {
  log(chalk.rgb(255, 215, 0), `Team : ${message}`, level)
}

/**
 * Fonction pour obtenir l'heure actuelle formatée
 *
 * @returns L'heure actuelle
 */
const getCurrentTime = (): string  => {
    return new Date().toISOString();
}
