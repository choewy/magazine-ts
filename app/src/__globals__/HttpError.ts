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
