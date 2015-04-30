import localforage from 'localforage';

localforage.config({
  name: 'OrganicBank',
  version: 1.0,
  storeName: 'bank', // Should be alphanumeric, with underscores.
  description: 'A Bank App'
});

export default {
  getList(listId) {
    return localforage
      .getItem(listId)
      .then(function(result) {
        if (Array.isArray(result)) return result;

        return [];
      });
  },

  setList(listId, list) {
    return localforage
      .setItem(listId, list);
  },

  getItem(listId, itemId) {
    return this
      .getList(listId)
      .then(function(list) {
        return list.filter(x => x.id === itemId)[0] || null;
      });
  },

  addItem(listId, item) {
    var that = this;

    return this
      .getList(listId)
      .then(function(list) {
        list.push(item);

        return that.setList(listId, list);
      });
  }
};