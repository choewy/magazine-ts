import { HTTPError } from '../../../commons/errors';

export const CommentPipeError = {
  EmptyContent: class extends HTTPError {
    constructor() {
      super(400, '댓글의 내용을 입력하세요.');
    }
  },
  NotFound: class extends HTTPError {
    constructor() {
      super(404, '삭제되었거나 존재하지 않는 댓글입니다.');
    }
  },
  InValidParams: class extends HTTPError {
    constructor() {
      super(400, '잘못된 요청입니다.');
    }
  },
  AccessDenied: class extends HTTPError {
    constructor() {
      super(401, '해당 댓글의 수정 또는 삭제 권한이 없습니다.');
    }
  },
};
