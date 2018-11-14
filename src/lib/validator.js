import _ from 'lodash';
import validate from 'validate.js';

import BaseEntity from './BaseEntity';

export default ({ repositories }) => {
  const entityValidator = (entity, options = { exception: false }) => {
    const errors = validate(entity, entity.constructor.constraints);
    if (errors && options.exception) {
      const err = new Error(`${entity.constructor.name} is not valid.
        Errors: (${JSON.stringify(errors)})`);
      err.errors = errors;
      throw err;
    }
    return errors;
  };

  validate.validators.uniqueness = (value, options, key, attributes) => {
    if (!value) {
      return null;
    }
    const className = attributes.constructor.name;
    const repository = repositories[className];
    const scope = options.scope || [];
    const conditions = options.conditions || {};
    const params = { [key]: value, ...conditions, ..._.pick(attributes, scope) };
    const result = repository.findBy(params);
    const isEntity = result instanceof BaseEntity;
    if (result || (isEntity && result.id !== value.id)) {
      return 'already exists';
    }
    return null;
  };

  validate.validators.association = (value) => {
    if (!value) {
      return null;
    }
    return entityValidator(value);
  };

  return entityValidator;
};
