import { HTTPError } from '../../../commons/errors';

export const PostPipeError = {
  EmptyContent: class extends HTTPError {
    constructor() {
      super(400, '게시물의 내용을 입력하세요.');
    }
  },
  EmptyImage: class extends HTTPError {
    constructor() {
      super(400, '게시물의 이미지를 업로드하세요.');
    }
  },
  InValidParams: class extends HTTPError {
    constructor() {
      super(400, '게시물 번호가 잘못 입력되었습니다.');
    }
  },
  NotFound: class extends HTTPError {
    constructor() {
      super(404, '삭제되었거나 존재하지 않는 게시물입니다.');
    }
  },
  AccessDenied: class extends HTTPError {
    constructor() {
      super(401, '해당 게시물의 수정 또는 삭제 권한이 없습니다.');
    }
  },
};
