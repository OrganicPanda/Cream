import BaseCollection from './BaseCollection';
import Transaction from './Transaction';

class Transactions extends BaseCollection {
  get model() {
    return Transaction;
  }

  filter(filterToApply) {
    if (!filterToApply) return new Transactions(this.models);

    return new Transactions(filterToApply.apply(this.models));
  }
}

export default Transactions;

