import { HTTPError } from './HttpError';

export class NicknameInPasswordError extends HTTPError {
  constructor() {
    super(400, '비밀번호에 닉네임이 포함되어 있습니다.');
  }
}

export class UserNotFoundError extends HTTPError {
  constructor() {
    super(404, '사용자 정보를 찾을 수 없습니다.');
  }
}

export class UserAleadyExistError extends HTTPError {
  constructor() {
    super(409, '이미 존재하는 계정입니다.');
  }
}

export class UserWrongEmailOrPassword extends HTTPError {
  constructor() {
    super(401, '이메일 또는 비밀번호를 확인하세요.');
  }
}

export class UserTokenError extends HTTPError {
  constructor() {
    super(401, '유효하지 않은 인증 토큰입니다.');
  }
}
