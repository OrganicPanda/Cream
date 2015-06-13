import persistence from './persistence';

class BaseCollection {
  constructor(models) {
    this.models = models || [];
  }

  get() {
    return persistence
      .getList(this.model.name)
      .then(models => models.map(model => new this.model(model)))
      .then(models => this.models = models);
  }

  set(models) {
    return persistence
      .setList(this.model.name, models)
      .then(() => this.get);
  }

  create(obj) {
    return new this.model(obj);
  }

  static get() {
    return new (this)().get();
  }

  static create(obj) {
    return new this.model(obj);
  }
}

export default BaseCollection;