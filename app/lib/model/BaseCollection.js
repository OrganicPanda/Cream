import persistence from './persistence';

class BaseCollection {
  constructor(models) {
    this.models = models || [];
  }

  _get() {
    return persistence
      .getList(this.model.name)
      .then(this.initModels.bind(this));
  }

  static get() {
    return new (this)()._get();
  }

  initModels(models) {
    return this.models = models
      .map(model => new this.model(model));
  }
}

export default BaseCollection;