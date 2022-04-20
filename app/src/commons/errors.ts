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

export const UserError = {
  NicknameInPassword: class extends HTTPError {
    constructor() {
      super(400, '비밀번호에 닉네임이 포함되어 있습니다.');
    }
  },
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
  InvalidToken: class extends HTTPError {
    constructor() {
      super(401, '로그인이 필요합니다.');
    }
  },
};
