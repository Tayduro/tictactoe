import { checkWin } from './chekWin';
import { fieldGeneration } from '../view/fieldUpdate';

const sing = {
  counter: 'x',
};
export { sing };
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
    const arrayButton = document.querySelector('.redo-btn');
    arrayButton.disabled = false;
  } else {
    document.querySelector('.redo-btn').disabled = true;
  }
}

export function checkUndo() {
  if (localStorage.getItem('Cell') && localStorage.getItem('Cell') !== '[]') {
    const arrayButton = document.querySelector('.undo-btn');
    arrayButton.disabled = false;
  } else {
    document.querySelector('.undo-btn').disabled = true;
  }
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

export function renewalCell(element) {
  if (element) {
    if (sing.counter === 'x') {
      element.classList.add('ch');
    }
    if (sing.counter === 'o') {
      element.classList.add('r');
    }
  }
  checkWin();

  const numberCells = cellCount();
  const arrayValueCell = [];
  for (let i = 0; i < numberCells; i += 1) {
    const counterCell = `c-${i}`;
    arrayValueCell.push(document.getElementById(counterCell).classList[1]);
  }

  if (localStorage.getItem('Cell')) {
    const saveCellStr = localStorage.getItem('Cell');
    arrayArrayValueCell = JSON.parse(saveCellStr);
  }
  arrayArrayValueCell.push(arrayValueCell);
  const str = JSON.stringify(arrayArrayValueCell);
  localStorage.setItem('Cell', str);

  checkUndo();
}

export function fieldCleaning() {
  const rows = document.querySelector('.field').querySelectorAll('.row');
  for (let i = 0; i < rows.length; i += 1) {
    for (let j = 0; j < rows[i].querySelectorAll('.cell').length; j += 1) {
      for (let z = 3; z !== 0; z -= 1) {
        rows[i].querySelectorAll('.cell')[j].classList.remove(rows[i].querySelectorAll('.cell')[j].classList[z]);
      }
    }
  }
}

export function restart() {
  fieldCleaning();

  document.querySelector('.won-message').innerHTML = '';
  document.querySelector('.won-title').classList.add('hidden');
  if (localStorage.getItem('Cell') !== undefined) {
    localStorage.clear();
  }
  arrayCounter.array = [];
  arrayArrayValueCell = [];
  sing.counter = 'x';
  document.querySelector('.undo-btn').disabled = true;
  checkRedo();
}

export function saveCounter(Counter) {
  arrayCounter.array.push(Counter);
  const str = JSON.stringify(arrayCounter.array);
  localStorage.setItem('Counter', str);
}

export function rollbackRollback() {
  const localArraySavedMoves = JSON.parse(localStorage.getItem('savedMoves'));
  const lastMoveData = localArraySavedMoves.pop();
  const strSavedMoves = JSON.stringify(localArraySavedMoves);
  localStorage.setItem('savedMoves', strSavedMoves);
  const arrayCells = JSON.parse(localStorage.getItem('Cell'));
  arrayCells.push(lastMoveData);
  const strArrayCell = JSON.stringify(arrayCells);
  localStorage.setItem('Cell', strArrayCell);

  const localArraySavedCounters = JSON.parse(localStorage.getItem('savedCounters'));
  const lastCountersData = localArraySavedCounters.pop();
  const strArraySavedCounters = JSON.stringify(localArraySavedCounters);
  localStorage.setItem('savedCounters', strArraySavedCounters);
  const arrayCounters = JSON.parse(localStorage.getItem('Counter'));
  arrayCounters.push(lastCountersData);
  const strArrayCounters = JSON.stringify(arrayCounters);
  localStorage.setItem('Counter', strArrayCounters);

  fieldGeneration();
  checkWin();
}

export function rollback() {
  const saveCellStr = localStorage.getItem('Cell');
  const saveCell = JSON.parse(saveCellStr);
  const saveCounterStr = localStorage.getItem('Counter');
  const localSaveCounter = JSON.parse(saveCounterStr);
  arraySavedMoves = saveCell.pop();
  arraySavedCounters = localSaveCounter.pop();

  const strCell = JSON.stringify(saveCell);
  localStorage.setItem('Cell', strCell);
  const strCounter = JSON.stringify(localSaveCounter);
  localStorage.setItem('Counter', strCounter);

  if (!localStorage.getItem('savedMoves')) {
    const strSaveMoves = JSON.stringify([]);
    localStorage.setItem('savedMoves', strSaveMoves);
  }

  if (!localStorage.getItem('savedCounters')) {
    const strSaveCounter = JSON.stringify([]);
    localStorage.setItem('savedCounters', strSaveCounter);
  }

  const saveMovesStr = localStorage.getItem('savedMoves');
  const saveMoves = JSON.parse(saveMovesStr);
  saveMoves.push(arraySavedMoves);
  const NewStrMoves = JSON.stringify(saveMoves);
  localStorage.setItem('savedMoves', NewStrMoves);

  const saveCountersStr = localStorage.getItem('savedCounters');
  const saveCounters = JSON.parse(saveCountersStr);
  saveCounters.push(arraySavedCounters);
  const strSaveCounter = JSON.stringify(saveCounters);
  localStorage.setItem('savedCounters', strSaveCounter);

  fieldGeneration();
  checkRedo();
  checkWin();
}
