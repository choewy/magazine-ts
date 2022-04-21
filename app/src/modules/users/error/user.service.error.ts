import { HTTPError } from '../../../commons/errors';

export const UserServiceError = {
  NotFound: class extends HTTPError {
    constructor() {
      super(404, '사용자 정보를 찾을 수 없습니다.');
    }
  },
  AleadyExist: class extends HTTPError {
    constructor() {
      super(409, '이미 존재하는 계정입니다.');
    }
  },
  WrongEmailOrPasswd: class extends HTTPError {
    constructor() {
      super(401, '이메일 또는 비밀번호를 확인하세요.');
    }
  },
};
