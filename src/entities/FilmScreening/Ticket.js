import uuid from 'uuid-js';
import StateMachine from 'javascript-state-machine';
import ApplicationEntity from '../ApplicationEntity';

export default class FilmScreeningTicket extends ApplicationEntity {
  static constraints = {
    filmScreening: {
      presence: true,
      uniqueness: {
        scope: ['place'], conditions: { _fsm: { state: 'active' } },
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
    this._fsm(); // eslint-disable-line
  }
}

StateMachine.factory(FilmScreeningTicket, {
  init: 'active',
  transitions: [
    { name: 'refund', from: 'active', to: 'returned' },
  ],
});
