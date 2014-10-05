var ent = require('ent');

var GBP = function(amount) {
  if (typeof amount == 'string') {
    if (amount.indexOf('.') > -1) {
      this.pence = parseInt(amount.replace('.', ''), 10);
    } else {
      this.pence = parseInt(amount, 10) * 100;
    }
  } else {
    this.pence = amount;
  }
};

GBP.prototype.add = function(a, b) {
  return new GBP(a.pence + b.pence);
};

var parseDate = function(str) {
  // 27/09/2013
  var parse = /(\d{2})\/(\d{2})\/(\d{4})/
    , dateArray = parse.exec(str); 
  
  return dateObject = new Date(
    (+dateArray[3]),
    (+dateArray[2]) - 1, // Careful, month starts at 0!
    (+dateArray[1])
  );
};

var findTransactions = function(data) {
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
        description: ent.decode(description),
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
};

var isCategory = function(transaction, category) {
  return category.rules.some(function(rule) {
    return transaction.description.match(rule);
  });
};

var categorise = function(transactions) {
  var categories = [
    { name: 'Rent', rules: [
      /REFERENCE STEPHEN RENT/
    ], transactions: [] }
  ];

  categories.forEach(function(category) {
    category.transactions = transactions.filter(function(transaction) {
      return isCategory(transaction, category);
    });
  });

  return categories;
}

module.exports = function(data) {
  var transactions = findTransactions(data);

  var categories = categorise(transactions);

  console.log('categories', categories);
};