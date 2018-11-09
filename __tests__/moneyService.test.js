import CinemaService from '../services/CinemaService';
import MoneyService from '../services/MoneyService';
import UserService from '../services/UserService';
import * as repositories from '../repositories';
import validator from '../lib/validation';

describe('MoneyService', () => {
  let moneyService;
  let cinemaService;
  let userService;
  let film;
  let cinemaHall;
  let filmScreening;
  let user;

  beforeEach(() => {
    const repositoryInstances = Object.keys(repositories)
      .reduce((acc, name) => ({ [name]: new repositories[name](), ...acc }), {});
    const validate = validator(repositoryInstances);

    cinemaService = new CinemaService(repositoryInstances, validate);
    moneyService = new MoneyService(repositoryInstances, validate);
    userService = new UserService(repositoryInstances, validate);

    const email = 'etst@email.com';
    [user] = userService.createUser(email);
    [film] = cinemaService.createFilm('first glance', 100);
    [cinemaHall] = cinemaService.createCinemaHall('first', 5, 5);
    [filmScreening] = cinemaService
      .createFilmScreening(film.id, cinemaHall.id, new Date());
  });

  it('buyTicket', () => {
    const place = { row: 5, col: 3 };
    const [ticket] = moneyService.buyTicket(user.id, filmScreening.id, place);
    const ticketExpected = {
      place,
    };

    expect(ticket).toMatchObject(ticketExpected);
  });

  it('buyTicket (Entity not found error)', () => {
    const f = () => moneyService.buyTicket();

    expect(f).toThrow();
  });

  it('buyTicket with double reservation', () => {
    const place = { row: 5, col: 3 };
    moneyService.buyTicket(user.id, filmScreening.id, place);
    const [, errors] = moneyService.buyTicket(user.id, filmScreening.id, place);
    console.log(errors);
    const expected = {
      filmScreening: [
        'Film screening already exists',
      ],
    };

    expect(errors).toMatchObject(expected);
  });
});
