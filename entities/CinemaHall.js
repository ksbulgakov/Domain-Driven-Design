import uuid from 'uuid-js';

export default class CinemaHall {
  constructor(name, rows, cols) {
    this.id = uuid.create().hex;
    this.createdAt = new Date();
    this.name = name;
    this.rows = rows;
    this.cols = cols;
    this.filmScreenings = [];
  }

  addFilmScreening(filmScreening) {
    this.filmScreenings.push(filmScreening);
  }
}
