import BaseModel from './BaseModel';

class Filter extends BaseModel {
  get defaults() {
    return {
      text: null,
      value: 50
    };
  }
}

export default Filter;