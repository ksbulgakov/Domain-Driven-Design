import Bottle from 'bottlejs';
import services from './services';
import entities from './entities';
import repositories from './repositories';
import makeValidator from './lib/validator';

export default () => {
  const bottle = new Bottle();

  bottle.factory('entities', () => entities);

  bottle.factory('repositories', () => {
    const repositoryInstances = Object.keys(repositories)
      .reduce((acc, repoName) => ({ ...acc, [repoName]: new repositories[repoName]() }), {});
    return repositoryInstances;
  });

  bottle.factory('validate', container => makeValidator(container));

  bottle.factory('services', (container) => {
    const serviceInstatces = Object.keys(services)
      .reduce((acc, serviceName) => {
        const service = new services[serviceName](container);
        return { ...acc, [serviceName]: service };
      }, {});
    return serviceInstatces;
  });

  return bottle.container;
};
