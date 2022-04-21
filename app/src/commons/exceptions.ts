import { ValidationError } from 'joi';
import { HTTPError, SystemError } from './errors';

export class Exception extends Error {
  code: number;
  body: {};
  constructor(error: unknown) {
    if (error instanceof ValidationError) {
      const message = error.details[0].message;
      super(message);
      this.code = 400;
      this.body = {
        ok: false,
        message,
      };
    } else if (error instanceof HTTPError) {
      const message = error.message;
      super(message);
      this.code = error.code;
      this.body = {
        ok: false,
        message,
      };
    } else if (error instanceof SystemError) {
      const message = error.message;
      super(message);
      this.code = error.code;
      this.body = {
        ok: false,
        message,
        error,
      };
    } else {
      const message = '서버 내부적인 오류입니다.';
      super(message);
      this.code = 500;
      this.body = {
        ok: false,
        message,
        error,
      };
    }
  }
}
