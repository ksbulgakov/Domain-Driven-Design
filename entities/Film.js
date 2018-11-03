import uuid from 'uuid-js';


export default class Film {
  constructor(name, duration) {
    this.id = uuid.create().hex;
    this.createdAt = new Date();
    this.name = name;
    this.duration = duration;
  }
}
