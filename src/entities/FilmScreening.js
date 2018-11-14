import uuid from 'uuid-js';
import ApplicationEntity from './ApplicationEntity';

export default class FilmScreening extends ApplicationEntity {
  static constrains = {
    film: {
      presence: true,
    },
    cinemaHall: {
      presence: true,
    },
    time: {
      presence: true,
    },
    cost: {
      presence: true,
      numericallity: true,
    },
  }

  constructor(film, cinemaHall, time, cost) {
    super();
    this.id = uuid.create().hex;
    this.film = film;
    this.cinemaHall = cinemaHall;
    this.time = time;
    this.cost = cost;
  }
}
