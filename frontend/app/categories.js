var isCategory = function(transaction, category) {
  return category.rules.some(function(rule) {
    return transaction.description.match(rule);
  });
};

var findCategory = function(transaction, categories) {
  return categories.find(function(category) {
    return isCategory(transaction, category);
  });
};

export default function(transactions) {
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
      /(CARD PAYMENT TO SAINSBURY|CO-OP|TESCO|ASDA|MORRISON|LONDIS|WH SMITH)/i
    ], transactions: [] },
    { name: 'Supermarket shopping', rules: [
      /OCADO/i
    ], transactions: [] },
    { name: 'Cycling', rules: [
      /(EVANS CYCLES|BAKER STREET BIKES|SYDNEY STREET BIKES|Wiggle|CYCLING|CYCLE)/i
    ], transactions: [] },
    { name: 'Utilities', rules: [
      /(EDF ENERGY|SOUTHERN WATER)/i
    ], transactions: [] },
    { name: 'Broadband/Phone/Mobile', rules: [
      /(SKY DIGITAL|BT GROUP|TELEFONICA UK|O2 UK|H3G|THREE-BRIGHTON|WWW.THREE.CO.UK)/i
    ], transactions: [] },
    { name: 'Entertainment (Apps/Music/Film)', rules: [
      /(APPLE ITUNES|SPOTIFY|lovefilm|netflix|CINEMA|Cineworld)/i
    ], transactions: [] },
    { name: 'Transport', rules: [
      /(RAIL|SNCF|NATIONALEXPRESS|EUROSTAR)/i
    ], transactions: [] },
    { name: 'Bank Charges', rules: [
      /(OVERDRAFT|NON-STERLING PURCHASE FEE|HANDLING CHARGE)/i
    ], transactions: [] },
    { name: 'Hosting', rules: [
      /(Amazon Web Services|VOOSERVERS|IWANTMYNAME|NAMECHEAP)/i
    ], transactions: [] },
    { name: 'Clothes', rules: [
      /(ROLLERSNAKE|GAP|DEBENHAMS|SPENCER|H&M|SPORTSDIRECT|Adidas|ZARA|TK MAXX)/i
    ], transactions: [] },
    { name: 'Insurance', rules: [
      /(PIN FINANCE|ALLCLEAR TRAVEL|TRAVEL ADMINISTRATION|C I S HOME|INSUREANDGO|INSURANCE)/i
    ], transactions: [] },
    { name: 'Kaz', rules: [
      /(KAZ CURRENT|FROM K Thomson)/i
    ], transactions: [] },
    { name: 'Gym/Fitness/Health', rules: [
      /(FREEDOM LEISURE|PHYSIO|PHARMACY|SWEATSHOP|BOOTS)/i
    ], transactions: [] },
    { name: 'Food/Pub', rules: [
      /(STAND UP|YEOMAN|SNOWDROP|TAVERN| INN|GREAT EASTERN|ALCAMPO|FOOD|BAKERY|CAFE|GOURMET|STARBUCK|RESTAURANT|BURRITO)/i
    ], transactions: [] },
    { name: 'Days Out', rules: [
      /(MUSEUM|clearleft|GALLERY|NATIONAL TRUST)/i
    ], transactions: [] },
    { name: 'Holidays', rules: [
      /(AIRBNB|HOTEL)/i
    ], transactions: [] },
    { name: 'Electronics', rules: [
      /(APPLE STORE|MAPLIN)/i
    ], transactions: [] },
    { name: 'Home', rules: [
      /(ROBERT DYAS|TINKERS HARDWARE)/i
    ], transactions: [] },
    { name: 'Charity', rules: [
      /(VIRGIN MONEY GIVING|CHARITY)/i
    ], transactions: [] },

    // These should go last
    { name: 'Misc Paypal', rules: [
      /(PAYPAL)/i
    ], transactions: [] },
    { name: 'Misc Amazon', rules: [
      /(amazon)/i
    ], transactions: [] }
  ];

  transactions.forEach(function(transaction) {
    var category = findCategory(transaction, categories);

    if (category) {
      category.transactions.push(transaction);
    }
  });

  return categories;
}