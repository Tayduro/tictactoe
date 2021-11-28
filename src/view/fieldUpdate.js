import { pageState } from '../model/fieldGeneration';

export function fieldUpdate(object) {
  if (object.currentItem && object.currentSign) {
    object.currentItem.classList.add(object.currentSign);
  }
  if (object.currentItem && object.victoryClass && object.victoryPosition) {
    object.currentItem.classList.add(object.victoryClass);
    object.currentItem.classList.add(object.victoryPosition);
  }
  if (pageState.fieldCleaning === true) {
    const rows = document.querySelector('.field').querySelectorAll('.row');
    for (let i = 0; i < rows.length; i += 1) {
      for (let j = 0; j < rows[i].querySelectorAll('.cell').length; j += 1) {
        for (let z = 3; z !== 0; z -= 1) {
          rows[i].querySelectorAll('.cell')[j].classList.remove(rows[i].querySelectorAll('.cell')[j].classList[z]);
        }
      }
    }
  }

  if (pageState.wonMessage) {
    document.querySelector('.won-message').innerHTML = pageState.wonMessage;
  } else if (pageState.wonMessage === '') {
    document.querySelector('.won-message').innerHTML = '';
  }

  if (pageState.hidden) {
    document.querySelector('.won-title').classList.add('hidden');
  } else if (!pageState.hidden) {
    document.querySelector('.won-title, .hidden').classList.remove('hidden');
  }

  if (pageState.undoBtnDisabled) {
    document.querySelector('.undo-btn').disabled = true;
  } else if (!pageState.undoBtnDisabled) {
    document.querySelector('.undo-btn').disabled = false;
  }

  if (pageState.redoBtnDisabled) {
    document.querySelector('.redo-btn').disabled = true;
  } else if (!pageState.redoBtnDisabled) {
    document.querySelector('.redo-btn').disabled = false;
  }
  pageState.currentItem = undefined;
  pageState.currentSign = undefined;
  pageState.victoryClass = undefined;
  pageState.victoryPosition = undefined;
  pageState.fieldCleaning = false;
}
