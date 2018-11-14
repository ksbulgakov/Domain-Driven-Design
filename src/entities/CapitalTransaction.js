import uuid from 'uuid-js';
import ApplicationEntity from './ApplicationEntity';

export default class CapitalTransaction extends ApplicationEntity {
  static types = ['income', 'loss'];

  static constraints = {
    ticket: {
      presence: true,
    },
    cost: {
      presence: true,
      numericality: true,
    },
    type: {
      presence: true,
      inclusion: CapitalTransaction.types,
    },
  }

  constructor(ticket, type) {
    super();
    this.id = uuid.create().hex;
    this.ticket = ticket;
    switch (type) { // eslint-disable-line
      case 'income':
        this.cost = ticket.cost;
        break;
      case 'loss':
        this.cost = -ticket.cost;
        break;
    }
    this.createdAt = new Date();
    this.type = type;
  }
}
