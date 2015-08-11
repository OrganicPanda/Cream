import numeral from 'numeral';
import BaseModel from './BaseModel';

class GBP extends BaseModel {
  constructor(amount) {
    super();

    if (typeof amount == 'string') {
      this.pence = numeral().unformat(amount) * 100;
    } else if (amount !== undefined && amount !== null) {
      this.pence = amount;
    }
  }

  get defaults() {
    return {
      pence: 0
    };
  }

  add(x) {
    return new GBP(this.pence + x.pence);
  }

  toString() {
    // return accounting.formatMoney(this.pence / 100, '£', 2);
    if (this.pence === undefined || this.pence === null) return 'N/A';

    return '£' + (this.pence / 100).toFixed(2); // TODO: Make accurate
  }
}

export default GBP;