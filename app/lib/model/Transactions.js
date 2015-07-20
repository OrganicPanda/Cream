import BaseCollection from './BaseCollection';
import Transaction from './Transaction';

class Transactions extends BaseCollection {
  get model() {
    return Transaction;
  }

  filter(filterToApply) {
    return new Transactions(filterToApply.apply(this.models));
  }
}

export default Transactions;

