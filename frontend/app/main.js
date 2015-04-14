import extract from './extract';

var textarea = document.querySelector('textarea')
  , statusEl = document.querySelector('.status');

var outputSuccess = function(statements) {
  textarea.innerHTML = statements.join('\r\n');
  statusEl.innerHTML = 'Import successful!';
};

var outputError = function(err) {
  statusEl.innerHTML = 'Error: ' + err;
};

var handleFileSelect = function(evt) {
  var files = Array.prototype.slice.call(evt.target.files);

  Promise
    .all(files.map(extract))
    .then(outputSuccess)
    .catch(outputError);
};

document
  .getElementById('files')
  .addEventListener('change', handleFileSelect, false);