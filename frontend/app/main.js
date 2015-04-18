import extract from './extract';
import santander from './santander';
import csv from './csv';
import categories from './categories';

var textarea = document.querySelector('textarea')
  , statementTextarea = document.querySelector('.statement')
  , csvTextarea = document.querySelector('.csv')
  , categoriesTextarea = document.querySelector('.categories')
  , statusEl = document.querySelector('.status');

var outputSuccess = function(statements) {
  textarea.innerHTML = statements.join('\r\n');
  statusEl.innerHTML += 'Import successful!\n';

  return statements;
};

var outputError = function(err) {
  statusEl.innerHTML = 'Error: ' + err;
};

var outputStatement = function(statements) {
  var transactions = santander(statements.join('\r\n'));

  statementTextarea.innerHTML = JSON.stringify(transactions);
  statusEl.innerHTML += 'Statement successful!\n';

  return transactions;
};

var outputCSV = function(transactions) {
  csvTextarea.innerHTML = csv(transactions);
  statusEl.innerHTML += 'CSV successful!\n';

  return transactions;
};

var outputCategories = function(transactions) {
  var cats = categories(transactions);

  categoriesTextarea.innerHTML = JSON.stringify(cats);
  statusEl.innerHTML += 'Categories successful!\n';

  return cats;
};

var handleFileSelect = function(evt) {
  var files = Array.prototype.slice.call(evt.target.files);

  Promise
    .all(files.map(extract))
    .then(outputSuccess)
    .then(outputStatement)
    .then(outputCSV)
    .then(outputCategories)
    // .catch(outputError);
};

document
  .getElementById('files')
  .addEventListener('change', handleFileSelect, false);