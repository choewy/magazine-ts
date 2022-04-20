import { ValidationError } from 'joi';
import { HTTPError } from './errors';

export class Exception extends HTTPError {
  constructor(error: unknown) {
    let code, message;

    if (error instanceof ValidationError) {
      (code = 400), (message = error.details[0].message);
    } else if (error instanceof HTTPError) {
      (code = error.code), (message = error.message);
    } else {
      (code = 500), (message = '서버 내부적인 오류입니다.');
    }
    super(code, message);
  }
}
