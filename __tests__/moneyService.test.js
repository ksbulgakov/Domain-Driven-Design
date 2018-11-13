import cinemaManager from '../src';

describe('MoneyService', () => {
  let services;
  let film;
  let cinemaHall;
  let filmScreening;
  let user;

  beforeEach(() => {
    const app = cinemaManager();
    services = app.services; // eslint-disable-line

    const email = 'etst@email.com';
    [user] = services.User.createUser(email);
    [film] = services.Cinema.createFilm('first glance', 100);
    [cinemaHall] = services.Cinema.createCinemaHall('first', 5, 5);
    [filmScreening] = services.Cinema
      .createFilmScreening(film.id, cinemaHall.id, new Date());
  });

  it('buyTicket', () => {
    const place = { row: 5, col: 3 };
    const [ticket] = services.Money.buyTicket(user.id, filmScreening.id, place);
    const ticketExpected = {
      place,
    };

    expect(ticket).toMatchObject(ticketExpected);
  });

  it('buyTicket (Entity not found error)', () => {
    const f = () => services.Money.buyTicket();

    expect(f).toThrow();
  });

  it('buyTicket with double reservation', () => {
    const place = { row: 5, col: 3 };
    services.Money.buyTicket(user.id, filmScreening.id, place);
    const [, errors] = services.Money.buyTicket(user.id, filmScreening.id, place);
    console.log(errors);
    const expected = {
      filmScreening: [
        'Film screening already exists',
      ],
    };

    expect(errors).toMatchObject(expected);
  });
});
