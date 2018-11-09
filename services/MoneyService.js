import ApplicationService from './ApplicationService';
import { FilmScreeningTicket } from '../entities';

export default class extends ApplicationService {
  buyTicket(userId, filmScreeningId, place) {
    const user = this.UserRepository.find(userId);
    const filmScreening = this.FilmScreeningRepository.find(filmScreeningId);
    const ticket = new FilmScreeningTicket(filmScreening, user, place);
    const errors = this.validate(ticket);
    if (!errors) {
      this.FilmScreeningTicketRepository.save(ticket);
    }
    return [ticket, errors];
  }
}
