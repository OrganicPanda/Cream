var sum = function(transactions) {
  return transactions.reduce(function(total, transaction) {
    return total.add(transaction.amount);
  }, new GBP(0));
};

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

export default function(categories) {
  // var found = extractTransactions(categories)
  //   , notFound = leftoverTransactions(transactions, found);
  //
  return categories.map(function(category) {
    var total = sum(category.transactions);

    return category.name + '\t' + total.toString();
  });
}