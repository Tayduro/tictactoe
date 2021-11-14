import generateField from './generateField';

let counter = 'x';
let arrayArrayValueCell = [];
let arraySavedMoves = [];
let arrayCounter = [];
let arraySavedCounters = [];
const victoryCheck = 'game continues';

function vertical(pointer, victoryCheck, numberCells) {
  const stripLength = Math.sqrt(numberCells);
  for (let i = 0, y = 0; i !== stripLength; i += 1) {
    const arrayCells = [];
    y = i;
    for (let j = 0; j < stripLength; j += 1) {
      const idCells = `c-${y}`;
      arrayCells.push(document.getElementById(idCells));
      y += stripLength;
      if (arrayCells.length === stripLength) {
        victoryCheck = 'win';
        for (let z = 0; z < stripLength; z += 1) {
          if (arrayCells[z].classList[1] !== pointer) {
            victoryCheck = 'game continues';
          }
        }
        if (victoryCheck === 'win') {
          for (let x = 0; x < stripLength; x += 1) {
            arrayCells[x].classList.add('win');
            arrayCells[x].classList.add('vertical');
          }
          winMessageGenerator(pointer);
          return victoryCheck;
        }
      }
    }
  }
}

function horizontal(pointer, victoryCheck, numberCells) {
  const stripLength = Math.sqrt(numberCells);
  for (let i = 0; i < numberCells; ) {
    const arrayCells = [];
    for (let j = 0; j < stripLength; j += 1, i += 1) {
      const idCells = `c-${i}`;
      arrayCells.push(document.getElementById(idCells));
      if (arrayCells.length === stripLength) {
        victoryCheck = 'win';
        for (let z = 0; z < stripLength; z += 1) {
          if (arrayCells[z].classList[1] !== pointer) {
            victoryCheck = 'game continues';
          }
        }
        if (victoryCheck === 'win') {
          for (let x = 0; x < stripLength; x += 1) {
            arrayCells[x].classList.add('win');
            arrayCells[x].classList.add('horizontal');
          }
          winMessageGenerator(pointer);
          return victoryCheck;
        }
      }
    }
  }
}

function diagonalRight(pointer, victoryCheck, numberCells) {
  const stripLength = Math.sqrt(numberCells);
  const arrayCells = [];
  for (let i = 0, y = 0; y !== stripLength; i += stripLength + 1, y += 1) {
    const idCells = `c-${i}`;
    arrayCells.push(document.getElementById(idCells));
    if (arrayCells.length === stripLength) {
      victoryCheck = 'win';
      for (let z = 0; z < stripLength; z += 1) {
        if (arrayCells[z].classList[1] !== pointer) {
          victoryCheck = 'game continues';
        }
      }
      if (victoryCheck === 'win') {
        for (let x = 0; x < stripLength; x += 1) {
          arrayCells[x].classList.add('win');
          arrayCells[x].classList.add('diagonal-right');
        }
        winMessageGenerator(pointer);
        return victoryCheck;
      }
    }
  }
}

function diagonalLeft(pointer, victoryCheck, numberCells) {
  const stripLength = Math.sqrt(numberCells);
  const arrayCells = [];
  for (let i = stripLength - 1, y = 0; y !== stripLength; i += stripLength - 1, y += 1) {
    const idCells = `c-${i}`;
    arrayCells.push(document.getElementById(idCells));
    if (arrayCells.length === stripLength) {
      victoryCheck = 'win';
      for (let z = 0; z < stripLength; z += 1) {
        if (arrayCells[z].classList[1] !== pointer) {
          victoryCheck = 'game continues';
        }
      }
      if (victoryCheck === 'win') {
        for (let x = 0; x < stripLength; x += 1) {
          arrayCells[x].classList.add('win');
          arrayCells[x].classList.add('diagonal-left');
        }
        winMessageGenerator(pointer);
        return victoryCheck;
      }
    }
  }
}

function saveCounter(Counter) {
  arrayCounter.push(Counter);
  const str = JSON.stringify(arrayCounter);
  localStorage.setItem('Counter', str);
}

function fieldCleaning() {
  const rows = document.querySelector('.field').querySelectorAll('.row');
  for (let i = 0; i < rows.length; i += 1) {
    for (let j = 0; j < rows[i].querySelectorAll('.cell').length; j += 1) {
      for (let z = 3; z !== 0; z -= 1) {
        rows[i].querySelectorAll('.cell')[j].classList.remove(rows[i].querySelectorAll('.cell')[j].classList[z]);
      }
    }
  }
}

function cellCount() {
  const rows = document.querySelector('.field').querySelectorAll('.row');
  let numberCells = 0;
  for (let i = 0; i < rows.length; i += 1) {
    for (let j = 0; j < rows[i].querySelectorAll('.cell').length; j += 1) {
      numberCells += 1;
    }
  }
  return numberCells;
}

function judge(pointer, victoryCheck) {
  const numberCells = cellCount();
  horizontal(pointer, victoryCheck, numberCells);
  if (horizontal(pointer, victoryCheck, numberCells) === 'win') {
    return 'win';
  }
  vertical(pointer, victoryCheck, numberCells);
  if (vertical(pointer, victoryCheck, numberCells) === 'win') {
    return 'win';
  }
  diagonalRight(pointer, victoryCheck, numberCells);
  if (diagonalRight(pointer, victoryCheck, numberCells) === 'win') {
    return 'win';
  }
  diagonalLeft(pointer, victoryCheck, numberCells);
  if (diagonalLeft(pointer, victoryCheck, numberCells) === 'win') {
    return 'win';
  }
  return 'game continues';
}

function restart() {
  fieldCleaning();

  document.querySelector('.won-message').innerHTML = '';
  document.querySelector('.won-title').classList.add('hidden');
  if (localStorage.getItem('Cell') !== undefined) {
    localStorage.clear();
  }
  arrayCounter = [];
  arrayArrayValueCell = [];
  counter = 'x';
  document.querySelector('.undo-btn').disabled = true;
  checkRedo();
}

function checkWin() {
  judge('ch', victoryCheck);
  judge('r', victoryCheck);

  if (judge('ch', victoryCheck) === 'game continues' && judge('r', victoryCheck) === 'game continues') {
    document.querySelector('.won-message').innerHTML = '';
    document.querySelector('.won-title').classList.add('hidden');

    const numberCells = cellCount();

    let indicatorDraw = 'true';
    for (let i = 0; i < numberCells; i += 1) {
      const counterCell = `c-${i}`;

      if (!document.getElementById(counterCell).classList[1]) {
        indicatorDraw = 'false';
      }
    }

    if (indicatorDraw === 'true') {
      const array = document.querySelector('.won-title, .hidden');
      array.classList.remove('hidden');
      const RestartGame = document.querySelector('.restart-btn, btn');
      RestartGame.addEventListener('click', restart);
      const wonMessage = document.querySelector('.won-message');
      wonMessage.innerHTML = `It's a draw!`;
    }
  }
}

function checkUndo() {
  if (localStorage.getItem('Cell') && localStorage.getItem('Cell') !== '[]') {
    const arrayButton = document.querySelector('.undo-btn');
    arrayButton.disabled = false;
    arrayButton.addEventListener('click', rollback);
  } else {
    document.querySelector('.undo-btn').disabled = true;
  }
}

function winMessageGenerator(pointer) {
  const array = document.querySelector('.won-title, .hidden');
  array.classList.remove('hidden');
  const RestartGame = document.querySelector('.restart-btn, btn');
  RestartGame.addEventListener('click', restart);
  const wonMessage = document.querySelector('.won-message');
  if (pointer === 'r') {
    wonMessage.innerHTML = `Toes won!`;
  }
  if (pointer === 'ch') {
    wonMessage.innerHTML = `Crosses won!`;
  }
}

function checkRedo() {
  if (localStorage.getItem('savedMoves') && localStorage.getItem('savedMoves') !== '[]') {
    const arrayButton = document.querySelector('.redo-btn');
    arrayButton.disabled = false;
    arrayButton.addEventListener('click', rollbackRollback);
  } else {
    document.querySelector('.redo-btn').disabled = true;
  }
}

function fieldGeneration() {
  checkUndo();
  checkRedo();
  fieldCleaning();
  if (localStorage.getItem('Cell') && localStorage.getItem('Cell') !== '[]') {
    const saveCellStr = localStorage.getItem('Cell');
    const saveCell = JSON.parse(saveCellStr);

    for (let z = 0; z < saveCell[saveCell.length - 1].length; z += 1) {
      const counterCell = `c-${z}`;

      if (saveCell[saveCell.length - 1][z]) {
        document.getElementById(counterCell).classList.add(saveCell[saveCell.length - 1][z]);
      }
    }
  }
  if (localStorage.getItem('Counter')) {
    const saveCounterStr = localStorage.getItem('Counter');
    const saveCounter = JSON.parse(saveCounterStr);
    counter = saveCounter[saveCounter.length - 1];
    arrayCounter = saveCounter;
  }
}

function rollbackRollback() {
  const arraySavedMoves = JSON.parse(localStorage.getItem('savedMoves'));
  const lastMoveData = arraySavedMoves.pop();
  const strSavedMoves = JSON.stringify(arraySavedMoves);
  localStorage.setItem('savedMoves', strSavedMoves);
  const arrayCells = JSON.parse(localStorage.getItem('Cell'));
  arrayCells.push(lastMoveData);
  const strArrayCell = JSON.stringify(arrayCells);
  localStorage.setItem('Cell', strArrayCell);

  const arraySavedCounters = JSON.parse(localStorage.getItem('savedCounters'));
  const lastCountersData = arraySavedCounters.pop();
  const strArraySavedCounters = JSON.stringify(arraySavedCounters);
  localStorage.setItem('savedCounters', strArraySavedCounters);
  const arrayCounters = JSON.parse(localStorage.getItem('Counter'));
  arrayCounters.push(lastCountersData);
  const strArrayCounters = JSON.stringify(arrayCounters);
  localStorage.setItem('Counter', strArrayCounters);

  fieldGeneration();
  checkWin();
}

function rollback() {
  const saveCellStr = localStorage.getItem('Cell');
  const saveCell = JSON.parse(saveCellStr);
  const saveCounterStr = localStorage.getItem('Counter');
  const saveCounter = JSON.parse(saveCounterStr);
  arraySavedMoves = saveCell.pop();
  arraySavedCounters = saveCounter.pop();

  const strCell = JSON.stringify(saveCell);
  localStorage.setItem('Cell', strCell);
  const strCounter = JSON.stringify(saveCounter);
  localStorage.setItem('Counter', strCounter);

  if (!localStorage.getItem('savedMoves') && localStorage.getItem('Cell') !== '[]') {
    const strSaveMoves = JSON.stringify([]);
    localStorage.setItem('savedMoves', strSaveMoves);
  }

  if (!localStorage.getItem('savedCounters') && localStorage.getItem('Counter') !== '[]') {
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

function renewalCell(element) {
  if (element) {
    if (counter === 'x') {
      element.classList.add('ch');
    }
    if (counter === 'o') {
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

function renewalCounter(event) {
  const element = event.target;
  if (
    document.querySelector('.won-message').innerHTML === `Toes won!` ||
    document.querySelector('.won-message').innerHTML === `Crosses won!`
  ) {
    return;
  }
  if (!element.classList.contains('cell')) {
    return;
  }
  if (!counter) {
    counter = 'x';
  }
  if (counter === 'x') {
    renewalCell(element);
    counter = 'o';
    saveCounter('o');
    return;
  }
  if (counter === 'o') {
    renewalCell(element);
    counter = 'x';
    saveCounter('x');
  }
}

function eventAssignment() {
  const field = document.querySelector('.field');
  field.addEventListener('click', renewalCounter);
}

function CheckAndGeneration() {
  fieldGeneration();
  checkWin();
}

function ready() {
  generateField();
  eventAssignment();
  fieldGeneration();
  window.addEventListener('storage', CheckAndGeneration);
  checkWin();
}

document.addEventListener('DOMContentLoaded', ready);
