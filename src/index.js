document.addEventListener('DOMContentLoaded', ready);
let counter = 'x';
let arrayArrayValueCell = [];
let arraySavedMoves = [];
let arrayCounter = [];
let arraySavedCounters = [];
let victoryCheck = 'game continues';

function ready() {
  fieldGeneration();

  checkWin();

  let cell0 = document.getElementById('c-0');
  let cell1 = document.getElementById('c-1');
  let cell2 = document.getElementById('c-2');
  let cell3 = document.getElementById('c-3');
  let cell4 = document.getElementById('c-4');
  let cell5 = document.getElementById('c-5');
  let cell6 = document.getElementById('c-6');
  let cell7 = document.getElementById('c-7');
  let cell8 = document.getElementById('c-8');

  cell0.addEventListener('click', renewalCounter);
  cell1.addEventListener('click', renewalCounter);
  cell2.addEventListener('click', renewalCounter);
  cell3.addEventListener('click', renewalCounter);
  cell4.addEventListener('click', renewalCounter);
  cell5.addEventListener('click', renewalCounter);
  cell6.addEventListener('click', renewalCounter);
  cell7.addEventListener('click', renewalCounter);
  cell8.addEventListener('click', renewalCounter);

  function renewalCounter() {
    if (
      document.querySelector('.won-message').innerHTML === `Toes won!` ||
      document.querySelector('.won-message').innerHTML === `Crosses won!`
    ) {
      return;
    }
    if (!counter) {
      counter = 'x';
    }
    if (counter === 'x') {
      renewalCell(event);
      counter = 'o';
      saveCounter('o');
      return;
    }
    if (counter === 'o') {
      renewalCell(event);
      counter = 'x';
      saveCounter('x');
    }
  }

  function renewalCell(event) {
    if (event) {
      let element = event.target;

      if (counter === 'x') {
        element.classList.add('ch');
      }
      if (counter === 'o') {
        element.classList.add('r');
      }
    }
    checkWin();

    let indicatorDraw = 'true';
    let arrayValueCell = [];
    for (let i = 0; i < 9; i++) {
      let counterCell = 'c-' + i;
      arrayValueCell.push(document.getElementById(counterCell).classList[1]);

      if (!document.getElementById(counterCell).classList[1]) {
        indicatorDraw = 'false';
      }
    }
    if (indicatorDraw === 'true') {
      let array = document.querySelector('.won-title, .hidden');
      array.classList.remove('hidden');
      let RestartGame = document.querySelector('.restart-btn, btn');
      RestartGame.addEventListener('click', restart);
      let wonMessage = document.querySelector('.won-message');
      wonMessage.innerHTML = `It's a draw!`;
    }
    if (localStorage.getItem('Cell')) {
      const saveCellStr = localStorage.getItem('Cell');
      arrayArrayValueCell = JSON.parse(saveCellStr);
    }
    arrayArrayValueCell.push(arrayValueCell);
    let str = JSON.stringify(arrayArrayValueCell);
    localStorage.setItem('Cell', str);

    checkUndo();
  }
}

function trueJudge(pointer, victoryCheck) {
  let arrayResult = [];

  let cell0 = document.getElementById('c-0');
  let cell1 = document.getElementById('c-1');
  let cell2 = document.getElementById('c-2');
  let cell3 = document.getElementById('c-3');
  let cell4 = document.getElementById('c-4');
  let cell5 = document.getElementById('c-5');
  let cell6 = document.getElementById('c-6');
  let cell7 = document.getElementById('c-7');
  let cell8 = document.getElementById('c-8');

  arrayResult.push(judge(cell0, cell1, cell2, pointer, victoryCheck));
  arrayResult.push(judge(cell3, cell4, cell5, pointer, victoryCheck));
  arrayResult.push(judge(cell6, cell7, cell8, pointer, victoryCheck));

  arrayResult.push(judge(cell0, cell3, cell6, pointer, victoryCheck));
  arrayResult.push(judge(cell1, cell4, cell7, pointer, victoryCheck));
  arrayResult.push(judge(cell2, cell5, cell8, pointer, victoryCheck));

  arrayResult.push(judge(cell0, cell4, cell8, pointer, victoryCheck));
  arrayResult.push(judge(cell2, cell4, cell6, pointer, victoryCheck));

  for (let i = 0; i < arrayResult.length; i++) {
    if (arrayResult[i] === 'win') {
      return 'win';
    }
  }
  return 'game continues';
}

function judge(cellX, cellY, cellZ, pointer, victoryCheck) {
  let arrayResultRow = [];

  let cell0 = document.getElementById('c-0');
  let cell1 = document.getElementById('c-1');
  let cell2 = document.getElementById('c-2');
  let cell3 = document.getElementById('c-3');
  let cell4 = document.getElementById('c-4');
  let cell5 = document.getElementById('c-5');
  let cell6 = document.getElementById('c-6');
  let cell7 = document.getElementById('c-7');
  let cell8 = document.getElementById('c-8');

  arrayResultRow.push(horizontal(cell0, cell1, cell2, pointer, victoryCheck));
  arrayResultRow.push(horizontal(cell3, cell4, cell5, pointer, victoryCheck));
  arrayResultRow.push(horizontal(cell6, cell7, cell8, pointer, victoryCheck));

  arrayResultRow.push(vertical(cell0, cell3, cell6, pointer, victoryCheck));
  arrayResultRow.push(vertical(cell1, cell4, cell7, pointer, victoryCheck));
  arrayResultRow.push(vertical(cell2, cell5, cell8, pointer, victoryCheck));

  arrayResultRow.push(diagonalRight(cell0, cell4, cell8, pointer, victoryCheck));
  arrayResultRow.push(diagonalLeft(cell2, cell4, cell6, pointer, victoryCheck));

  for (let i = 0; i < arrayResultRow.length; i++) {
    if (arrayResultRow[i] === 'win') {
      return 'win';
    }
  }
  return 'game continues';
}

function vertical(cellX, cellY, cellZ, pointer, victoryCheck) {
  if (cellX.classList[1] === pointer && cellY.classList[1] === pointer && cellZ.classList[1] === pointer) {
    cellX.classList.add('win');
    cellX.classList.add('vertical');
    cellY.classList.add('win');
    cellY.classList.add('vertical');
    cellZ.classList.add('win');
    cellZ.classList.add('vertical');
    victoryCheck = 'win';
    winMessageGenerator(pointer);
  }
  return victoryCheck;
}

function horizontal(cellX, cellY, cellZ, pointer, victoryCheck) {
  if (cellX.classList[1] === pointer && cellY.classList[1] === pointer && cellZ.classList[1] === pointer) {
    cellX.classList.add('win');
    cellX.classList.add('horizontal');
    cellY.classList.add('win');
    cellY.classList.add('horizontal');
    cellZ.classList.add('win');
    cellZ.classList.add('horizontal');
    victoryCheck = 'win';
    winMessageGenerator(pointer);
  }
  return victoryCheck;
}

function diagonalRight(cellX, cellY, cellZ, pointer, victoryCheck) {
  if (cellX.classList[1] === pointer && cellY.classList[1] === pointer && cellZ.classList[1] === pointer) {
    cellX.classList.add('win');
    cellX.classList.add('diagonal-right');
    cellY.classList.add('win');
    cellY.classList.add('diagonal-right');
    cellZ.classList.add('win');
    cellZ.classList.add('diagonal-right');
    victoryCheck = 'win';
    winMessageGenerator(pointer);
  }
  return victoryCheck;
}

function diagonalLeft(cellX, cellY, cellZ, pointer, victoryCheck) {
  if (cellX.classList[1] === pointer && cellY.classList[1] === pointer && cellZ.classList[1] === pointer) {
    cellX.classList.add('win');
    cellX.classList.add('diagonal-left');
    cellY.classList.add('win');
    cellY.classList.add('diagonal-left');
    cellZ.classList.add('win');
    cellZ.classList.add('diagonal-left');
    victoryCheck = 'win';
    winMessageGenerator(pointer);
  }
  return victoryCheck;
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

function saveCounter(Counter) {
  arrayCounter.push(Counter);
  let str = JSON.stringify(arrayCounter);
  localStorage.setItem('Counter', str);
}

function rollback() {
  const saveCellStr = localStorage.getItem('Cell');
  const saveCell = JSON.parse(saveCellStr);

  const saveCounterStr = localStorage.getItem('Counter');
  const saveCounter = JSON.parse(saveCounterStr);

  arraySavedMoves = saveCell.pop();

  arraySavedCounters = saveCounter.pop();

  let strCell = JSON.stringify(saveCell);
  localStorage.setItem('Cell', strCell);

  let strCounter = JSON.stringify(saveCounter);
  localStorage.setItem('Counter', strCounter);

  if (!localStorage.getItem('savedMoves') && localStorage.getItem('Cell') !== '[]') {
    let strSaveMoves = JSON.stringify([]);
    localStorage.setItem('savedMoves', strSaveMoves);
  }

  if (!localStorage.getItem('savedCounters') && localStorage.getItem('Counter') !== '[]') {
    let strSaveCounter = JSON.stringify([]);
    localStorage.setItem('savedCounters', strSaveCounter);
  }

  const saveMovesStr = localStorage.getItem('savedMoves');
  let saveMoves = JSON.parse(saveMovesStr);
  saveMoves.push(arraySavedMoves);
  let NewStrMoves = JSON.stringify(saveMoves);
  localStorage.setItem('savedMoves', NewStrMoves);

  const saveCountersStr = localStorage.getItem('savedCounters');
  let saveCounters = JSON.parse(saveCountersStr);
  saveCounters.push(arraySavedCounters);
  let strSaveCounter = JSON.stringify(saveCounters);
  localStorage.setItem('savedCounters', strSaveCounter);

  fieldGeneration();
  checkRedo();
  checkWin();
}

function rollbackRollback() {
  let arraySavedMoves = JSON.parse(localStorage.getItem('savedMoves'));
  let lastMoveData = arraySavedMoves.pop();
  let strSavedMoves = JSON.stringify(arraySavedMoves);
  localStorage.setItem('savedMoves', strSavedMoves);
  let arrayCells = JSON.parse(localStorage.getItem('Cell'));
  arrayCells.push(lastMoveData);
  let strArrayCell = JSON.stringify(arrayCells);
  localStorage.setItem('Cell', strArrayCell);

  let arraySavedCounters = JSON.parse(localStorage.getItem('savedCounters'));
  let lastCountersData = arraySavedCounters.pop();
  let strArraySavedCounters = JSON.stringify(arraySavedCounters);
  localStorage.setItem('savedCounters', strArraySavedCounters);
  let arrayCounters = JSON.parse(localStorage.getItem('Counter'));
  arrayCounters.push(lastCountersData);
  let strArrayCounters = JSON.stringify(arrayCounters);
  localStorage.setItem('Counter', strArrayCounters);

  fieldGeneration();
  checkWin();
}

function fieldGeneration() {
  checkUndo();
  checkRedo();
  fieldCleaning();
  if (localStorage.getItem('Cell') && localStorage.getItem('Cell') !== '[]') {
    const saveCellStr = localStorage.getItem('Cell');
    const saveCell = JSON.parse(saveCellStr);

    for (let z = 0; z < saveCell[saveCell.length - 1].length; z++) {
      let counterCell = 'c-' + z;

      if (saveCell[saveCell.length - 1][z]) {
        document.getElementById(counterCell).classList.add(saveCell[saveCell.length - 1][z]);
      }
    }
  }
  if (localStorage.getItem('Counter')) {
    const saveCounterStr = localStorage.getItem('Counter');
    let saveCounter = JSON.parse(saveCounterStr);
    counter = saveCounter[saveCounter.length - 1];
    arrayCounter = saveCounter;
  }
}

function fieldCleaning() {
  for (let i = 3; i !== 0; i--) {
    document.getElementById('c-0').classList.remove(document.getElementById('c-0').classList[i]);
    document.getElementById('c-1').classList.remove(document.getElementById('c-1').classList[i]);
    document.getElementById('c-2').classList.remove(document.getElementById('c-2').classList[i]);
    document.getElementById('c-3').classList.remove(document.getElementById('c-3').classList[i]);
    document.getElementById('c-4').classList.remove(document.getElementById('c-4').classList[i]);
    document.getElementById('c-5').classList.remove(document.getElementById('c-5').classList[i]);
    document.getElementById('c-6').classList.remove(document.getElementById('c-6').classList[i]);
    document.getElementById('c-7').classList.remove(document.getElementById('c-7').classList[i]);
    document.getElementById('c-8').classList.remove(document.getElementById('c-8').classList[i]);
  }
}

function checkUndo() {
  if (localStorage.getItem('Cell') && localStorage.getItem('Cell') !== '[]') {
    let arrayButton = document.querySelector('.undo-btn');
    arrayButton.disabled = false;
    arrayButton.addEventListener('click', rollback);
  } else {
    document.querySelector('.undo-btn').disabled = true;
  }
}

function winMessageGenerator(pointer) {
  let array = document.querySelector('.won-title, .hidden');
  array.classList.remove('hidden');
  let RestartGame = document.querySelector('.restart-btn, btn');
  RestartGame.addEventListener('click', restart);
  let wonMessage = document.querySelector('.won-message');
  if (pointer === 'r') {
    wonMessage.innerHTML = `Toes won!`;
  }
  if (pointer === 'ch') {
    wonMessage.innerHTML = `Crosses won!`;
  }
}

function checkRedo() {
  if (localStorage.getItem('savedMoves') && localStorage.getItem('savedMoves') !== '[]') {
    console.log('a');
    let arrayButton = document.querySelector('.redo-btn');
    arrayButton.disabled = false;
    arrayButton.addEventListener('click', rollbackRollback);
  } else {
    document.querySelector('.redo-btn').disabled = true;
  }
}

function checkWin() {
  trueJudge('ch', victoryCheck);
  trueJudge('r', victoryCheck);

  if (trueJudge('ch', victoryCheck) === 'game continues' && trueJudge('r', victoryCheck) === 'game continues') {
    document.querySelector('.won-message').innerHTML = '';
    document.querySelector('.won-title').classList.add('hidden');
  }

  let indicatorDraw = 'true';
  for (let i = 0; i < 9; i++) {
    let counterCell = 'c-' + i;

    if (!document.getElementById(counterCell).classList[1]) {
      indicatorDraw = 'false';
    }
  }

  if (indicatorDraw === 'true') {
    let array = document.querySelector('.won-title, .hidden');
    array.classList.remove('hidden');
    console.log(document.querySelector('.won-title, .hidden'));
    let RestartGame = document.querySelector('.restart-btn, btn');
    RestartGame.addEventListener('click', restart);
    let wonMessage = document.querySelector('.won-message');
    wonMessage.innerHTML = `It's a draw!`;
  }
}
