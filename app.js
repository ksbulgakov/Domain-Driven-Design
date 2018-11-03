import { Film, CinemaHall, FilmScreening } from './entities';

export default (filmName, duration, cinemaHallName, rows, cols, time) => {
  const newFilm = new Film(filmName, duration);
  const newCinemaHall = new CinemaHall(cinemaHallName, rows, cols);

  return new FilmScreening(newFilm, newCinemaHall, time);
};
