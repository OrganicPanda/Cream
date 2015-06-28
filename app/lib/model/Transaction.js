import GBP from './GBP';
import BaseModel from './BaseModel';

class Transaction extends BaseModel {
  get defaults() {
    return {
      date: null,
      description: null,
      amount: new GBP(),
      balance: new GBP()
    };
  }

  fromJSON(props) {
    this.props = {
      date: props.date,
      description: props.description,
      amount: new GBP().fromJSON(props.amount),
      balance: new GBP().fromJSON(props.balance)
    };
  }
}

export default Transaction;