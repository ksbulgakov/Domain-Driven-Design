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
  }

  constructor(film, cinemaHall, time) {
    super();
    this.id = uuid.create().hex;
    this.createdAt = new Date();
    this.film = film;
    this.cinemaHall = cinemaHall;
    this.time = time;
    this.cinemaHall.addFilmScreening(this);
  }
}
