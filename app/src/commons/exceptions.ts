import { ValidationError } from 'joi';
import { HTTPError } from './errors';

export interface Exception {
  code: number;
  body: {
    ok?: false;
    message: string;
  };
}

export class Exception extends Error implements Exception {
  constructor(error: unknown) {
    let message: string = '';
    let code: number = 500;

    if (error instanceof ValidationError) {
      message = error.details[0].message;
      code = 400;
    }

    if (error instanceof HTTPError) {
      message = error.message;
      code = error.code;
    }

    super(message);
    this.code = code;
    this.body = {
      message,
    };
  }
}
