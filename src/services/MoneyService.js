import ApplicationService from './ApplicationService';

export default class extends ApplicationService {
  buyTicket(userId, filmScreeningId, place) {
    const user = this.repositories.User.find(userId);
    const filmScreening = this.repositories.FilmScreening.find(filmScreeningId);
    const ticket = new this.entities.FilmScreeningTicket(filmScreening, user, place);
    const errors = this.validate(ticket);
    if (!errors) {
      this.repositories.FilmScreeningTicket.save(ticket);
    }
    return [ticket, errors];
  }
}
