var ent = require('ent')
  , accounting = require('accounting');

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

GBP.prototype.add = function(x) {
  return new GBP(this.pence + x.pence);
};

GBP.prototype.toString = function() {
  return accounting.formatMoney(this.pence / 100, "£", 2);
};

var parseDate = function(str) {
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
      /REFERENCE STEPHEN RENT/i
    ], transactions: [] },
    { name: 'Savings', rules: [
      /REFERENCE Joint Savings/i
    ], transactions: [] },
    { name: 'Salary', rules: [
      /SALARY/i
    ], transactions: [] },
    { name: 'Cash Withdrawal', rules: [
      /CASH WITHDRAWAL/i
    ], transactions: [] },
    { name: 'Supermarket one-offs', rules: [
      /CARD PAYMENT TO (SAINSBURYS|CO-OP|TESCO)/i
    ], transactions: [] },
    { name: 'Supermarket shopping', rules: [
      /OCADO/i
    ], transactions: [] },
    { name: 'Cycling', rules: [
      /(EVANS CYCLES|BAKER STREET BIKES|SYDNEY STREET BIKES)/i
    ], transactions: [] }
  ];

  categories.forEach(function(category) {
    category.transactions = transactions.filter(function(transaction) {
      return isCategory(transaction, category);
    });
  });

  return categories;
}

var analyse = function(categories) {
  categories.forEach(function(category) {
    var sum = category.transactions.reduce(function(total, transaction) {
      return total.add(transaction.amount);
    }, new GBP(0));

    console.log('>', category.name, ':', sum.toString());
  });
}

var extractTransactions = function(categories) {
  return categories.map(function(category) {
    return category.transactions;
  }).reduce(function(a, b) {
    return a.concat(b);
  });
};

var leftoverTransactions = function(all, found) {
  return all.filter(function(item) {
    return found.indexOf(item) === -1;
  });
};

module.exports = function(data) {
  var transactions = findTransactions(data)
    , categories = categorise(transactions);

  analyse(categories);

  var found = extractTransactions(categories)
    , notFound = leftoverTransactions(transactions, found);

  console.log('Total:', transactions.length);
  console.log('Found:', found.length);
  console.log('Not Found:', notFound.length);
};