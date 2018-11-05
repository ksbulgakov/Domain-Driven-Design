export default class {
  save(entity) {
    this[entity.id] = entity;
  }

  find(id) {
    if (!this[id]) {
      throw new Error('No such entity in the repository');
    }
    return this[id];
  }
}
