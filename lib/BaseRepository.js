export default class {
  data = [];

  all() {
    return this.data;
  }

  save(entity) {
    this.data.push(entity);
  }

  find(id) {
    const result = this.data.find(entity => entity.id === id);
    if (!result) {
      throw new Error('No such entity in the repository');
    }
    return result;
  }
}
