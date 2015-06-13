import guid from 'guid';
import persistence from './persistence';

class BaseModel {
  constructor(props) {
    this.props = this.defaults;
    this.id = guid.raw();
    this.props = props;
  }

  get defaults() {
    return {};
  }

  set props(props) {
    Object.keys(props)
      .forEach(key => this[key] = props[key]);
  }

  save() {
    return persistence
      .addItem(this.constructor.name, this);
  }
}

export default BaseModel;