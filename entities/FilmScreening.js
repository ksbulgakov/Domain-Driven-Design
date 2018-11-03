import uuid from 'uuid-js';

export default class FilmScreening {
  constructor(film, cinemaHall, time) {
    this.id = uuid.create().hex;
    this.createdAt = new Date();
    this.film = film;
    this.cinemaHall = cinemaHall;
    this.time = time;
    this.cinemaHall.addFilmScreening(this);
  }
}
