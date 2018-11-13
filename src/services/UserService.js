import ApplicationService from './ApplicationService';
import entities from '../entities';

export default class extends ApplicationService {
  createUser(email) {
    const user = new entities.User(email);
    const errors = this.validate(user);
    if (!errors) {
      this.repositories.User.save(user);
    }
    return [user, errors];
  }
}
