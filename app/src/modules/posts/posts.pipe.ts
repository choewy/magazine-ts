import { NextFunction, Request, Response } from 'express';
import { Exception } from '../../commons/exceptions';
import { PipePromise } from '../../commons/interfaces';
import { PostPipeError } from './error/post.pipe.error';
import { PostService } from './posts.service';

export interface PostNewDto {
  content?: string;
  image_url?: string;
}

export class PostPipe {
  public static async Image(
    req: Request<PostNewDto>,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> {
    try {
      const { file } = req;
      if (!file) throw new PostPipeError.EmptyImage();
      req.body.image_url = `/image/${file.filename}.png`;
      next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }

  public static async Content(
    req: Request<PostNewDto>,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> {
    try {
      const { content } = req.body;
      if (!content) throw new PostPipeError.EmptyContent();
      next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }

  public static async IsExist(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> {
    try {
      const { user_id } = res.locals.user;
      const post_id: number = Number(req.params.post_id);
      if (isNaN(post_id)) throw new PostPipeError.InValidParams();

      const post = await PostService.getPost(post_id);
      if (!post) throw new PostPipeError.NotFound();

      const isOwner = post.user?.user_id === user_id;
      const isAdmin = post.user?.role === 1;
      if (!isOwner && !isAdmin) throw new PostPipeError.AccessDenied();

      next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }
}
