import cinemaManager from '../src';

describe('UserService', () => {
  let service;
  beforeEach(() => {
    const app = cinemaManager();
    service = app.services.User;
  });

  it('createUser', () => {
    const email = 'test@test.com';
    const [user] = service.createUser(email);
    const expected = {
      email,
    };
    expect(user).toMatchObject(expected);
  });
});
