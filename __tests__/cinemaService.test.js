import uuid from 'uuid-js';

import CinemaService from '../services/CinemaService';
import * as repositories from '../repositories';

describe('CinemaService', () => {
  let service;

  beforeEach(() => {
    const repositoryInstances = Object.keys(repositories)
      .reduce((acc, name) => ({ [name]: new repositories[name](), ...acc }), {});
    service = new CinemaService(repositoryInstances);
    // console.log(service);
  });

  it('createFilm', () => {
    const film = service.createFilm('first glance', 100);
    const expected = {
      name: 'first glance',
      duration: 100,
    };
    expect(film).toMatchObject(expected);
  });

  it('createCinemaHall', () => {
    const cinemaHall = service.createCinemaHall('first', 5, 5);
    const expected = {
      name: 'first',
      rows: 5,
      cols: 5,
    };
    expect(cinemaHall).toMatchObject(expected);
  });

  it('createFilmScreening', () => {
    const time = new Date();
    const film = service.createFilm('the game', 200);
    const cinemaHall = service.createCinemaHall('first', 5, 5);
    const filmScreening = service.createFilmScreening(film.id, cinemaHall.id, time);

    const expected = {
      film,
      cinemaHall,
      time,
    };
    expect(filmScreening).toMatchObject(expected);
  });

  it('Entity not found', () => {
    const id = uuid.create().hex;
    const time = new Date();

    expect(() => service.createFilmScreening(id, id, time))
      .toThrowError(/No such entity in the repository/);
  });
});
