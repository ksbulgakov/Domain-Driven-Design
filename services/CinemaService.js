import ApplicationService from './ApplicationService';
import { Film, CinemaHall, FilmScreening } from '../entities';

export default class extends ApplicationService {
  createFilmScreening(filmId, cinemaHallId, time) {
    const film = this.FilmRepository.find(filmId);
    const cinemaHall = this.CinemaHallRepository.find(cinemaHallId);
    const filmScreening = new FilmScreening(film, cinemaHall, time);
    this.FilmScreeningRepository.save(filmScreening);
    return filmScreening;
  }

  createCinemaHall(name, cols, rows) {
    const cinemaHall = new CinemaHall(name, cols, rows);
    this.CinemaHallRepository.save(cinemaHall);
    return cinemaHall;
  }

  createFilm(name, duration) {
    const film = new Film(name, duration);
    this.FilmRepository.save(film);
    return film;
  }
}
