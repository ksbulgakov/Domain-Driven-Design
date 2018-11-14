import cinemaManager from '../src/index';

describe('MoneyService', () => {
  let services;
  let film;
  let cinemaHall;
  let filmScreening;
  let user;
  let repositories;

  beforeEach(() => {
    const app = cinemaManager();
    services = app.services; // eslint-disable-line
    repositories = app.repositories; // eslint-disable-line
    const email = 'etst@email.com';
    [user] = services.User.createUser(email);
    [film] = services.Cinema.createFilm('first glance', 100);
    [cinemaHall] = services.Cinema.createCinemaHall('first', 5, 5);
    services.Money.createPrice(cinemaHall.id, 100);
    [filmScreening] = services.Money
      .createFilmScreening(film.id, cinemaHall.id, new Date());
    services.Money.createPrice(cinemaHall.id, 100);
  });

  it('createPrice', () => {
    const [price] = services.Money.createPrice(cinemaHall.id, 200);
    const expected = {
      value: 200,
    };

    expect(price).toMatchObject(expected);
  });

  it('createFilmScreening (errors)', () => {
    const f = () => services.Money.createFilmScreening();
    expect(f).toThrow();
  });

  it('createFilmScreening', () => {
    const time = new Date();
    const [localFilmScreening] = services.Money
      .createFilmScreening(film.id, cinemaHall.id, time);

    const expected = {
      // film,
      // cinemaHall,
      time,
    };
    expect(localFilmScreening).toMatchObject(expected);
    const fs = repositories.FilmScreening.find(localFilmScreening.id);
    expect(localFilmScreening).toMatchObject(fs);
  });

  it('buyTicket', () => {
    const place = { row: 5, col: 3 };
    const [ticket] = services.Money.buyTicket(user.id, filmScreening.id, place);
    const capital = repositories.CapitalTransaction.findBy({ ticket });
    const ticketExpected = {
      place,
    };

    expect(ticket).toMatchObject(ticketExpected);

    const capitalExpected = {
      ticket,
    };
    expect(capital).toMatchObject(capitalExpected);
  });

  it('buyTicket (errors)', () => {
    const f = () => services.Money.buyTicket();

    expect(f).toThrow();
  });

  it('buyTicket with double reservation', () => {
    const place = { row: 5, col: 3 };
    services.Money.buyTicket(user.id, filmScreening.id, place);
    const [, errors] = services.Money.buyTicket(user.id, filmScreening.id, place);
    const expected = {
      filmScreening: ['Film screening already exists'],
    };
    expect(errors).toMatchObject(expected);
  });
});
