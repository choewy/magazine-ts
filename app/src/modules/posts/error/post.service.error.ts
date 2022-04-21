import { HTTPError } from '../../../commons/errors';

export const PostServiceError = {
  NotFound: class extends HTTPError {
    constructor() {
      super(404, '해당 게시물 정보를 찾을 수 없습니다.');
    }
  },
};
