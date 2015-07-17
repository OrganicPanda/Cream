import BaseCollection from './BaseCollection';
import Transaction from './Transaction';

class Transactions extends BaseCollection {
  get model() {
    return Transaction;
  }

  filter() {
    return new Transactions(this.models.slice(0, 5));
  }
}

export default Transactions;

