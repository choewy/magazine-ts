import { Router, Express } from 'express';
import { PostPipe } from '../posts/posts.pipe';
import { UserPipe } from '../users/users.pipe';
import { CommentPipe } from './comments.pipe';
import { CommentService } from './comments.service';

export const CommentController = (app: Express) => {
  const router = Router({ mergeParams: true });

  router.get('/', PostPipe.IsExist, CommentService.GetComments);
  router.post(
    '/',
    UserPipe.IsLogin,
    PostPipe.IsExist,
    CommentPipe.Content,
    CommentService.CreateComment
  );
  router.patch(
    '/:comment_id',
    UserPipe.IsLogin,
    PostPipe.IsExist,
    CommentPipe.Accessable,
    CommentPipe.Content,
    CommentService.UpdateComment
  );
  router.delete(
    '/:comment_id',
    UserPipe.IsLogin,
    PostPipe.IsExist,
    CommentPipe.Accessable,
    CommentService.DeleteComment
  );

  return app.use('/api/posts/:post_id/comments', router);
};
