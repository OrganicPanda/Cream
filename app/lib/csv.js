export default function(transactions) {
  var csvValue = function(value) {
    return '"' + String(value).replace('"', '""') + '"';
  };

  var csv = transactions.map(function(transaction) {
    return ''
      + csvValue(transaction.date.toDateString()) + ','
      + csvValue(transaction.description) + ','
      + csvValue(transaction.amount) + ','
      + csvValue(transaction.balance)
  });

  var header = 'Date,Description,Amount,Balance'

  return [header].concat(csv).join('\n');
}