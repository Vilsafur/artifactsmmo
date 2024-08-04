import chalk from 'chalk';

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const playerColors = [
  chalk.rgb(0, 128, 128),
  chalk.rgb(148, 0, 211),
  chalk.rgb(255, 165, 0),
  chalk.rgb(50, 205, 50),
  chalk.rgb(135, 206, 235),
];
