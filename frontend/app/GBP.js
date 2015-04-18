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
  // return accounting.formatMoney(this.pence / 100, '£', 2);
  return '£' + (this.pence / 100).toFixed(2); // TODO: Make accurate
};

export default GBP;