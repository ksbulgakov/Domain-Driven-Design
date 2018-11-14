import cinemaManager from '../src';

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
  });

  it('createPrice', () => {
    const [price] = services.Money.createPrice(cinemaHall.id, 200);
    const expected = {
      value: 200,
    };

    expect(price).toMatchObject(expected);
  });

  it('buyTicket', () => {
    const place = { row: 5, col: 3 };
    const [ticket] = services.Money.buyTicket(user.id, filmScreening.id, place);
    const capitalTransaction = repositories.CapitalTransaction.findBy({ ticket });
    const ticketExpected = {
      place,
    };

    expect(ticket).toMatchObject(ticketExpected);
    expect(capitalTransaction).toHaveProperty('ticket', ticket);
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
      filmScreening: [
        'Film screening already exists',
      ],
    };
    expect(errors).toMatchObject(expected);
  });

  it('refundTicket', () => {
    const place = { row: 5, col: 3 };
    const [ticket] = services.Money.buyTicket(user.id, filmScreening.id, place);
    const isRefunded = services.Money.refundTicket(ticket.id);
    expect(isRefunded).toBe(true);
    expect(ticket).toMatchObject({ _fsm: { state: 'returned' } });

    const capitalTransactions = repositories.CapitalTransaction.findAllBy({ ticket });
    expect(capitalTransactions).toHaveLength(2);
    expect(capitalTransactions.reduce((acc, { cost }) => acc + cost, 0)).toBe(0);

    services.Money.refundTicket(ticket.id);
    const capitalTransactions2 = repositories.CapitalTransaction.findAllBy({ ticket });
    expect(capitalTransactions2).toHaveLength(2);
    expect(capitalTransactions2.reduce((acc, { cost }) => acc + cost, 0)).toBe(0);
  });

  it('createFilmScreening', () => {
    const time = new Date();
    const [localFilmScreening] = services.Money.createFilmScreening(film.id, cinemaHall.id, time);

    const expected = {
      // film,
      // cinemaHall,
      time,
    };
    expect(localFilmScreening).toMatchObject(expected);
  });

  it('createFilmScreening (errors)', () => {
    const f = () => services.Money.createFilmScreening();
    expect(f).toThrow();
  });
});
