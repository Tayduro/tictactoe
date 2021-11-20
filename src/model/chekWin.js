import { victoryCheckText, sing, restart, renewalCell, saveCounter, cellCount, checkRedo } from './fieldGeneration';

export function winMessageGenerator(pointer) {
  const array = document.querySelector('.won-title, .hidden');
  array.classList.remove('hidden');
  const wonMessage = document.querySelector('.won-message');
  if (pointer === 'r') {
    wonMessage.innerHTML = `Toes won!`;
  }
  if (pointer === 'ch') {
    wonMessage.innerHTML = `Crosses won!`;
  }
}

export function vertical(pointer, victoryCheck, numberCells) {
  let localVictoryCheck = victoryCheck;
  const stripLength = Math.sqrt(numberCells);
  for (let i = 0, y = 0; i !== stripLength; i += 1) {
    const arrayCells = [];
    y = i;
    for (let j = 0; j < stripLength; j += 1) {
      const idCells = `c-${y}`;
      arrayCells.push(document.getElementById(idCells));
      y += stripLength;
      if (arrayCells.length === stripLength) {
        localVictoryCheck = 'win';
        for (let z = 0; z < stripLength; z += 1) {
          if (arrayCells[z].classList[1] !== pointer) {
            localVictoryCheck = 'game continues';
          }
        }
        if (localVictoryCheck === 'win') {
          for (let x = 0; x < stripLength; x += 1) {
            arrayCells[x].classList.add('win');
            arrayCells[x].classList.add('vertical');
          }
          winMessageGenerator(pointer);
          return localVictoryCheck;
        }
      }
    }
  }
  return localVictoryCheck;
}

export function horizontal(pointer, victoryCheck, numberCells) {
  let localVictoryCheck = victoryCheck;
  const stripLength = Math.sqrt(numberCells);
  for (let i = 0; i < numberCells; ) {
    const arrayCells = [];
    for (let j = 0; j < stripLength; j += 1, i += 1) {
      const idCells = `c-${i}`;
      arrayCells.push(document.getElementById(idCells));
      if (arrayCells.length === stripLength) {
        localVictoryCheck = 'win';
        for (let z = 0; z < stripLength; z += 1) {
          if (arrayCells[z].classList[1] !== pointer) {
            localVictoryCheck = 'game continues';
          }
        }
        if (localVictoryCheck === 'win') {
          for (let x = 0; x < stripLength; x += 1) {
            arrayCells[x].classList.add('win');
            arrayCells[x].classList.add('horizontal');
          }
          winMessageGenerator(pointer);
          return localVictoryCheck;
        }
      }
    }
  }
  return localVictoryCheck;
}

export function diagonalRight(pointer, victoryCheck, numberCells) {
  let localVictoryCheck = victoryCheck;
  const stripLength = Math.sqrt(numberCells);
  const arrayCells = [];
  for (let i = 0, y = 0; y !== stripLength; i += stripLength + 1, y += 1) {
    const idCells = `c-${i}`;
    arrayCells.push(document.getElementById(idCells));
    if (arrayCells.length === stripLength) {
      localVictoryCheck = 'win';
      for (let z = 0; z < stripLength; z += 1) {
        if (arrayCells[z].classList[1] !== pointer) {
          localVictoryCheck = 'game continues';
        }
      }
      if (localVictoryCheck === 'win') {
        for (let x = 0; x < stripLength; x += 1) {
          arrayCells[x].classList.add('win');
          arrayCells[x].classList.add('diagonal-right');
        }
        winMessageGenerator(pointer);
        return localVictoryCheck;
      }
    }
  }
  return localVictoryCheck;
}

export function diagonalLeft(pointer, victoryCheck, numberCells) {
  let localVictoryCheck = victoryCheck;
  const stripLength = Math.sqrt(numberCells);
  const arrayCells = [];
  for (let i = stripLength - 1, y = 0; y !== stripLength; i += stripLength - 1, y += 1) {
    const idCells = `c-${i}`;
    arrayCells.push(document.getElementById(idCells));
    if (arrayCells.length === stripLength) {
      localVictoryCheck = 'win';
      for (let z = 0; z < stripLength; z += 1) {
        if (arrayCells[z].classList[1] !== pointer) {
          localVictoryCheck = 'game continues';
        }
      }
      if (localVictoryCheck === 'win') {
        for (let x = 0; x < stripLength; x += 1) {
          arrayCells[x].classList.add('win');
          arrayCells[x].classList.add('diagonal-left');
        }
        winMessageGenerator(pointer);
        return localVictoryCheck;
      }
    }
  }
  return localVictoryCheck;
}

export function judge(pointer, victoryCheck) {
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

export function checkWin() {
  judge('ch', victoryCheckText);
  judge('r', victoryCheckText);

  if (judge('ch', victoryCheckText) === 'game continues' && judge('r', victoryCheckText) === 'game continues') {
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

export function renewalCounter(event) {
  const element = event.target;
  if (document.querySelector('.redo-btn').disabled === false) {
    localStorage.setItem('savedMoves', '[]');
    localStorage.setItem('savedCounters', '[]');
    checkRedo();
  }
  const wonMessage = document.querySelector('.won-message').innerHTML;
  if (wonMessage === 'Toes won!' || wonMessage === 'Crosses won!') {
    return;
  }
  if (!element.classList.contains('cell')) {
    return;
  }
  if (!sing.counter) {
    sing.counter = 'x';
  }
  if (sing.counter === 'x') {
    renewalCell(element);
    sing.counter = 'o';
    saveCounter('o');
    return;
  }
  if (sing.counter === 'o') {
    renewalCell(element);
    sing.counter = 'x';
    saveCounter('x');
  }
}
