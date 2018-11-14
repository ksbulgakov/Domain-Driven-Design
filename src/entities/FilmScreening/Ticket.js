import uuid from 'uuid-js';
import ApplicationEntity from '../ApplicationEntity';

export default class FilmScreeningTicket extends ApplicationEntity {
  static constraints = {
    filmScreening: {
      presence: true,
      uniqueness: {
        scope: ['place'],
      },
    },
    user: {
      presence: true,
    },
    place: {
      presence: true,
    },
    cost: {
      presence: true,
      numericality: {
        greatThan: 0,
      },
    },
  };

  constructor(filmScreening, user, place) {
    super();
    this.id = uuid.create().hex;
    this.filmScreening = filmScreening;
    this.cost = filmScreening.cost;
    this.user = user;
    this.place = place;
    this.createdAt = new Date();
  }
}
