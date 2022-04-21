import { SystemError } from '../../../commons/errors';

export const UserRepositoryError = {
  find: class extends SystemError {
    constructor(public error: unknown) {
      super(500, 'FindError : UserRepository', error);
    }
  },
  create: class extends SystemError {
    constructor(public error: unknown) {
      super(500, 'CreateError : UserRepository', error);
    }
  },
};
