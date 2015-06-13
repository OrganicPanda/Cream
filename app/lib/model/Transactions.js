import BaseCollection from './BaseCollection';
import Transaction from './Transaction';

class Transactions extends BaseCollection {
  get model() {
    return Transaction;
  }
}

export default new Transactions();

