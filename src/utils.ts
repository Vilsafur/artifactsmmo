import chalk from 'chalk';
import { CharacterRole, Skill } from './types';

/**
 * Fait une pause dans le script
 *
 * @param ms Le nombe de microsecondes à attendre
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * La liste des couleurs disponibles pour les personnages
 */
export const playerColors = [
  chalk.rgb(0, 128, 128),
  chalk.rgb(148, 0, 211),
  chalk.rgb(255, 165, 0),
  chalk.rgb(50, 205, 50),
  chalk.rgb(135, 206, 235),
];

export const jobByRole = (role: CharacterRole): Skill[] => {
  switch (role) {
    case 'cooker':
      return ['cooking']
    case 'farmer':
      return ['mining', 'woodcutting']
    case 'gearcrafter':
      return ['gearcrafting']
    case 'weaponcrafter':
      return ['weaponcrafting']
    case 'jewelrycrafter':
      return ['jewelrycrafting']
  
    default:
      throw new Error(`Erreur lors de la récupération des skill pour le role ${role}`)
  }
}

export const roleBySkill = (job: Skill): CharacterRole => {
  switch (job) {
    case 'cooking':
      return 'cooker'
    case 'gearcrafting':
      return 'gearcrafter'
    case 'jewelrycrafting':
      return 'jewelrycrafter'
    case 'mining':
      return 'farmer'
    case 'weaponcrafting':
      return 'weaponcrafter'
    case 'woodcutting':
      return 'farmer'
  
    default:
      throw new Error(`Erreur lors de la récupération du role pour le skill ${job}`)
  }
}