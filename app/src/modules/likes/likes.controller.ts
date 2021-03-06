import { Router, Express } from 'express';
import { PostPipe } from '../posts/posts.pipe';
import { UserPipe } from '../users/users.pipe';
import { LikeService } from './likes.service';

export const LikeController = (app: Express) => {
  const router = Router({ mergeParams: true });

  router.put('/like', UserPipe.IsLogin, PostPipe.IsExist, LikeService.PostLike);

  return app.use('/api/posts/:post_id', router);
};
