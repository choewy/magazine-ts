import { Router, Express } from 'express';
import { PostService } from './posts.service';
import { UserPipe } from '../users/users.pipe';
import { PostPipe } from './posts.pipe';
import { ImageUploader } from '../../configs/multer.config';

export const PostController = (app: Express) => {
  const router = Router();

  router.get('/', PostService.GetPosts);
  router.get('/:post_id', PostService.GetPost);
  router.post(
    '/',
    UserPipe.IsLogin,
    ImageUploader.single('image'),
    PostPipe.Image,
    PostPipe.Content,
    PostService.CreatePost
  );
  router.patch(
    '/:post_id',
    UserPipe.IsLogin,
    PostPipe.Content,
    PostPipe.Accessable,
    PostService.UpdatePost
  );
  router.delete(
    '/:post_id',
    UserPipe.IsLogin,
    PostPipe.Accessable,
    PostService.DeletePost
  );

  app.use('/api/posts', router);
};
