import { Router, Express } from 'express';
import { PostPipe } from '../posts/posts.pipe';
import { UserPipe } from '../users/users.pipe';
import { LikeService } from './likes.service';

export const LikeController = (app: Express) => {
  const router = Router({ mergeParams: true });

  router.put('/like', UserPipe.isLogin, PostPipe.IsExist, LikeService.PostLike);

  return app.use('/posts/:post_id/', router);
};
