import { checkRedo, checkUndo, fieldCleaning, sing, arrayCounter } from '../model/fieldGeneration';

export function fieldGeneration() {
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
    const localSaveCounter = JSON.parse(saveCounterStr);
    sing.counter = localSaveCounter[localSaveCounter.length - 1];
    arrayCounter.array = localSaveCounter;
  }
}
