import BaseModel from './BaseModel';

class Filter extends BaseModel {
  get defaults() {
    return {
      text: null,
      value: 50
    };
  }

  apply(transactions) {
    return transactions.slice(0, this.value);
  }
}

export default Filter;