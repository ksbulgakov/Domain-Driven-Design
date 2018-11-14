import uuid from 'uuid-js';
import dateFns from 'date-fns';
import ApplicationEntity from './ApplicationEntity';

export default class Price extends ApplicationEntity {
  static weekendMultiplier = 1.3;

  static constrains = {
    cinemaHall: {
      presence: true,
    },
    basePrice: {
      presence: true,
    },
  }

  constructor(cinemaHall, value) {
    super();
    this.id = uuid.create().hex;
    this.value = value;
    this.cinemaHall = cinemaHall;
  }

  calculateFor(date) {
    return dateFns.isWeekend(date)
      ? this.value * this.constructor.weekendMultiplier : this.value;
  }
}
