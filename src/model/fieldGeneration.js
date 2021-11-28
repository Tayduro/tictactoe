import { checkWin } from './chekWin';
import { fieldUpdate } from '../view/fieldUpdate';

const sign = {
  counter: 'x',
};
export { sign };

const pageState = {
  currentItem: undefined,
  currentSign: undefined,
  victoryClass: undefined,
  victoryPosition: undefined,
  fieldCleaning: false,
  wonMessage: undefined,
  hidden: true,
  undoBtnDisabled: true,
  redoBtnDisabled: true,
};
export { pageState };
let arrayArrayValueCell = [];
let arraySavedMoves = [];
const arrayCounter = {
  array: [],
};
export { arrayCounter };
let arraySavedCounters = [];
export const victoryCheckText = 'game continues';

export function checkRedo() {
  if (localStorage.getItem('savedMoves') && localStorage.getItem('savedMoves') !== '[]') {
    pageState.redoBtnDisabled = false;
  } else {
    pageState.redoBtnDisabled = true;
  }
  fieldUpdate(pageState);
}

export function checkUndo() {
  if (localStorage.getItem('Cell') && localStorage.getItem('Cell') !== '[]') {
    pageState.undoBtnDisabled = false;
  } else {
    pageState.undoBtnDisabled = true;
  }
  fieldUpdate(pageState);
}

export function cellCount() {
  const rows = document.querySelector('.field').querySelectorAll('.row');
  let numberCells = 0;
  for (let i = 0; i < rows.length; i += 1) {
    for (let j = 0; j < rows[i].querySelectorAll('.cell').length; j += 1) {
      numberCells += 1;
    }
  }
  return numberCells;
}

export function getItem(item) {
  const saveElementStr = localStorage.getItem(item);
  return JSON.parse(saveElementStr);
}

function setItem(item, value) {
  const strElement = JSON.stringify(value);
  localStorage.setItem(item, strElement);
}

export function renewalCell(element) {
  if (element) {
    if (sign.counter === 'x') {
      pageState.currentItem = element;
      pageState.currentSign = 'ch';
    }
    if (sign.counter === 'o') {
      pageState.currentItem = element;
      pageState.currentSign = 'r';
    }
    fieldUpdate(pageState);
  }
  checkWin();

  const numberCells = cellCount();
  const arrayValueCell = [];
  for (let i = 0; i < numberCells; i += 1) {
    const counterCell = `c-${i}`;
    arrayValueCell.push(document.getElementById(counterCell).classList[1]);
  }

  if (localStorage.getItem('Cell')) {
    arrayArrayValueCell = getItem('Cell');
  }
  arrayArrayValueCell.push(arrayValueCell);
  setItem('Cell', arrayArrayValueCell);

  checkUndo();
}

export function fieldCleaning() {
  pageState.fieldCleaning = true;
  fieldUpdate(pageState);
}

export function restart() {
  fieldCleaning();
  pageState.wonMessage = '';
  pageState.hidden = true;
  fieldUpdate(pageState);
  if (localStorage.getItem('Cell') !== undefined) {
    localStorage.clear();
  }
  fieldUpdate(pageState);
  arrayCounter.array = [];
  arrayArrayValueCell = [];
  sign.counter = 'x';

  pageState.undoBtnDisabled = true;
  fieldUpdate(pageState);
  checkRedo();
}

export function saveCounter(Counter) {
  arrayCounter.array.push(Counter);
  setItem('Counter', arrayCounter.array);
}

export function fieldGeneration() {
  checkUndo();
  checkRedo();
  fieldCleaning();
  fieldUpdate(pageState);
  if (localStorage.getItem('Cell') && localStorage.getItem('Cell') !== '[]') {
    const saveCell = getItem('Cell');

    for (let z = 0; z < saveCell[saveCell.length - 1].length; z += 1) {
      const counterCell = `c-${z}`;

      if (saveCell[saveCell.length - 1][z]) {
        pageState.currentItem = document.getElementById(counterCell);
        pageState.currentSign = saveCell[saveCell.length - 1][z];
        fieldUpdate(pageState);
      }
    }
  }
  if (localStorage.getItem('Counter')) {
    const localSaveCounter = getItem('Counter');
    sign.counter = localSaveCounter[localSaveCounter.length - 1];
    arrayCounter.array = localSaveCounter;
  }
}

export function rollbackRollback() {
  const localArraySavedMoves = getItem('savedMoves');
  const lastMoveData = localArraySavedMoves.pop();
  setItem('savedMoves', localArraySavedMoves);

  const arrayCells = getItem('Cell');
  arrayCells.push(lastMoveData);
  setItem('Cell', arrayCells);

  const localArraySavedCounters = getItem('savedCounters');
  const lastCountersData = localArraySavedCounters.pop();
  setItem('savedCounters', localArraySavedCounters);

  const arrayCounters = getItem('Counter');
  arrayCounters.push(lastCountersData);
  setItem('Counter', arrayCounters);

  fieldGeneration();
  checkWin();
}

export function rollback() {
  const saveCell = getItem('Cell');
  const localSaveCounter = getItem('Counter');

  arraySavedMoves = saveCell.pop();
  arraySavedCounters = localSaveCounter.pop();

  setItem('Cell', saveCell);
  setItem('Counter', localSaveCounter);

  if (!localStorage.getItem('savedMoves')) {
    setItem('savedMoves', []);
  }
  if (!localStorage.getItem('savedCounters')) {
    setItem('savedCounters', []);
  }

  const saveMoves = getItem('savedMoves');
  saveMoves.push(arraySavedMoves);
  setItem('savedMoves', saveMoves);

  const saveCounters = getItem('savedCounters');
  saveCounters.push(arraySavedCounters);
  setItem('savedCounters', saveCounters);

  fieldGeneration();
  checkRedo();
  checkWin();
}
