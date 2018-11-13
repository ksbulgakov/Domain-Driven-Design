import uuid from 'uuid-js';
import ApplicationEntity from './ApplicationEntity';


export default class Film extends ApplicationEntity {
  static constraints = {
    name: {
      presence: true,
    },
    duration: {
      presence: true,
    },
  }

  constructor(name, duration) {
    super();
    this.id = uuid.create().hex;
    this.createdAt = new Date();
    this.name = name;
    this.duration = duration;
  }
}
