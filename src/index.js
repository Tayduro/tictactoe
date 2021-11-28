import generateField from './generateField';
import { renewalCounter, checkWin } from './model/chekWin';
import { restart, rollback, rollbackRollback, fieldGeneration } from './model/fieldGeneration';

function eventAssignment() {
  const field = document.querySelector('.field');
  field.addEventListener('click', renewalCounter);
  document.querySelector('.redo-btn').addEventListener('click', rollbackRollback);
  document.querySelector('.undo-btn').addEventListener('click', rollback);
  document.querySelector('.restart-btn, btn').addEventListener('click', restart);
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
