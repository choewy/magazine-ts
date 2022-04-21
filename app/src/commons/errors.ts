export class HTTPError extends Error {
  body: {};
  constructor(public code: number, message?: string) {
    super(message);
    this.code = code;
    this.body = {
      ok: false,
      message,
    };
  }
}

export class SystemError extends Error {
  body: {};
  constructor(public code: number, message?: string, public error?: unknown) {
    super(message);
    this.code = code;
    this.body = {
      ok: false,
      message,
      error,
    };
  }
}

export const DBErrors = (repositoryName: string) => ({
  find: class extends SystemError {
    constructor(public error: unknown) {
      super(500, `FindError : ${repositoryName}`, error);
    }
  },
  create: class extends SystemError {
    constructor(public error: unknown) {
      super(500, `CreateError : ${repositoryName}`, error);
    }
  },
  update: class extends SystemError {
    constructor(public error: unknown) {
      super(500, `UpdateError : ${repositoryName}`, error);
    }
  },
  delete: class extends SystemError {
    constructor(public error: unknown) {
      super(500, `DeleteError : ${repositoryName}`, error);
    }
  },
});
