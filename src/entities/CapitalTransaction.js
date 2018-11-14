import uuid from 'uuid-js';
import ApplicationEntity from './ApplicationEntity';

export default class CapitalTransaction extends ApplicationEntity {
  static constraints = {
    ticket: {
      presence: true,
      association: true,
    },
    cost: {
      presence: true,
      numericality: true,
    },
  }

  constructor(ticket) {
    super();
    this.id = uuid.create().hex;
    this.ticket = ticket;
    this.cost = ticket.cost;
    this.createdAt = new Date();
  }
}
