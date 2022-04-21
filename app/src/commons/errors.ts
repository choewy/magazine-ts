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
