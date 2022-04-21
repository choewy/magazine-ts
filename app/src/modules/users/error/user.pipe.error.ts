import { HTTPError } from '../../../commons/errors';

export const UserPipeError = {
  NicknameInPassword: class extends HTTPError {
    constructor() {
      super(400, '비밀번호에 닉네임이 포함되어 있습니다.');
    }
  },
  InvalidToken: class extends HTTPError {
    constructor() {
      super(401, '로그인이 필요합니다.');
    }
  },
};
