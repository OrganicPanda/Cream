import BaseModel from './BaseModel';

class Transaction extends BaseModel {
  get defaults() {
    return {
      date: null,
      description: null,
      amount: null,
      balance: null
    };
  }
}

export default Transaction;