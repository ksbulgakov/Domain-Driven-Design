import ApplicationService from './ApplicationService';

export default class extends ApplicationService {
  createPrice(cinemaHallId, value) {
    const cinemaHall = this.repositories.CinemaHall.find(cinemaHallId);
    const price = new this.entities.Price(cinemaHall, value);
    const errors = this.validate(price);
    if (!errors) {
      this.repositories.Price.save(price);
    }
    return [price, errors];
  }

  buyTicket(userId, filmScreeningId, place) {
    const user = this.repositories.User.find(userId);
    const filmScreening = this.repositories.FilmScreening.find(filmScreeningId);
    const ticket = new this.entities.FilmScreeningTicket(filmScreening, user, place);
    const errors = this.validate(ticket);
    if (errors) {
      return [ticket, errors];
    }
    const transaction = new this.entities.CapitalTransaction(ticket);
    this.validate(transaction, { exception: true });
    this.repositories.FilmScreeningTicket.save(ticket);
    this.repositories.CapitalTransaction.save(transaction);
    return [ticket, errors];
  }

  createFilmScreening(filmId, cinemaHallId, time) {
    const film = this.repositories.Film.find(filmId);
    const cinemaHall = this.repositories.CinemaHall.find(cinemaHallId);
    const cinemaHallPrice = this.repositories.Price.findBy({ cinemaHall });
    const cost = cinemaHallPrice.calculateFor(time);
    const filmScreening = new this.entities.FilmScreening(film, cinemaHall, time, cost);
    const errors = this.validate(filmScreening);
    if (!errors) {
      this.repositories.FilmScreening.save(filmScreening);
    }
    return [filmScreening, errors];
  }
}
