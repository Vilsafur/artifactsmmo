import blessed from 'blessed';
import chalk from 'chalk';
import { Character } from './character';

// Définir les types pour les logs et les tâches
type Log = string;
type Task = string[];

let screen: blessed.Widgets.Screen;
let logBox: blessed.Widgets.BoxElement;
let characterBoxes: blessed.Widgets.ListElement[] = [];
let characters: string[];
let tasks: Task[] = [];

export function initializeInterface(charactersInput: string[], tasksInput: Task[]) {
  characters = charactersInput;
  tasks = tasksInput;
  characterBoxes = [];

  screen = blessed.screen({
    smartCSR: true,
    title: 'Artifacts MMO'
  });

  logBox = blessed.box({
    top: 'top',
    left: 'left',
    width: '50%',
    height: '100%',
    label: ' Logs ',
    border: {
      type: 'line'
    },
    style: {
      border: {
        fg: 'cyan'
      }
    },
    scrollable: true,
    alwaysScroll: true,
    scrollbar: {
      ch: ' ',
      track: {
        bg: 'grey'
      },
      style: {
        inverse: true
      }
    }
  });

  screen.append(logBox);

  characters.forEach((character, index) => {
    const box = blessed.list({
      top: `${20 * index}%`,
      left: '50%',
      width: '50%',
      height: '20%',
      label: ` ${character} `,
      border: {
        type: 'line'
      },
      style: {
        border: {
          fg: 'yellow'
        },
        selected: {
          bg: 'blue'
        }
      },
      items: tasks[index],
      keys: true,
      vi: true
    });

    characterBoxes.push(box);
    screen.append(box);
  });

  screen.key(['escape', 'q', 'C-c'], () => process.exit(0));
  screen.render();
}

export function addLog(message: Log) {
  logBox.insertBottom(message);
  logBox.setScrollPerc(100);
  screen.render();
}

export function addTask(personnage: Character, task: string) {
  const characterIndex = getCharacterIndex(personnage)
  if (characterIndex >= 0 && characterIndex < characterBoxes.length) {
    characterBoxes[characterIndex].addItem(task);
    screen.render();
  } else {
    addLog(chalk.red(`Erreur: Index de personnage invalide (${characterIndex})`));
  }
}

export function removeTask(personnage: Character, task: string) {
  const characterIndex = getCharacterIndex(personnage)
  if (characterIndex >= 0 && characterIndex < characterBoxes.length) {
    const box = characterBoxes[characterIndex];
    const taskIndex = getTaskIndex(task, personnage)
    if (taskIndex >= 0) {
      box.removeItem(taskIndex);
      screen.render();
    } else {
      addLog(`Erreur: Index de tâche invalide (${taskIndex}) pour le personnage ${characterIndex}`);
    }
  } else {
    addLog(`Erreur: Index de personnage invalide (${characterIndex})`);
  }
}

const getCharacterIndex = (personnage: Character): number  => characters.findIndex(v => v == personnage.getName())

const getTaskIndex = (task: string, personnage: Character) => characterBoxes[getCharacterIndex(personnage)].getItemIndex(task)
