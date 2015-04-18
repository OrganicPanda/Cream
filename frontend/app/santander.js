import GBP from './GBP';

var parseDate = function(str) {
  var parse = /(\d{2})\/(\d{2})\/(\d{4})/
    , dateArray = parse.exec(str);

  return new Date(
    (+dateArray[3]),
    (+dateArray[2]) - 1, // Careful, month starts at 0!
    (+dateArray[1])
  );
};

export default function(data) {
  var newLine = '\\r\\n'
    , newLineOrSpace = newLine + '\\s'
    , value = '\\s([^' + newLine + ']+)'
    , valueAndNewLine = value + '[' + newLineOrSpace + ']+'
    , structure = 'Date:' + valueAndNewLine +
                  'Description:' + valueAndNewLine +
                  'Amount:' + valueAndNewLine +
                  'Balance:' + value
    , pattern = new RegExp(structure)
    , patterng = new RegExp(structure, 'g');

  var transactions = data.match(patterng) || [];

  return transactions.map(function(transaction) {
    var result = pattern.exec(transaction);

    if (result && result.length === 5) {
      var date = result[1].trim()
        , description = result[2].trim()
        , amount = result[3].trim()
        , balance = result[4].trim();

      return {
        date: parseDate(date),
        description: description,
        amount: new GBP(amount),
        balance: new GBP(balance)
      };
    } else {
      console.log('no match!', JSON.stringify(transaction));

      return null;
    }
  }).filter(function(transaction) {
    return transaction !== null;
  });
}