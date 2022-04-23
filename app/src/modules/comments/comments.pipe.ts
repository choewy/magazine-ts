import { NextFunction, Request, Response } from 'express';
import { Exception } from '../../commons/exceptions';
import { PipePromise } from '../../commons/interfaces';
import { CommentService } from './comments.service';
import { CommentPipeError } from './error/comment.pipe.error';

export class CommentPipe {
  public static async Content(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> {
    try {
      const { content } = req.body;
      if (!content) throw new CommentPipeError.EmptyContent();
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
      const comment_id = Number(req.params.comment_id);
      if (isNaN(comment_id)) throw new CommentPipeError.InValidParams();

      const post_id = Number(req.params.post_id);
      const comment = await CommentService.getComment(post_id, comment_id);
      if (!comment) throw new CommentPipeError.NotFound();

      next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }

  public static async Accessable(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<PipePromise> {
    try {
      const comment_id = Number(req.params.comment_id);
      if (isNaN(comment_id)) throw new CommentPipeError.InValidParams();

      const post_id = Number(req.params.post_id);
      const comment = await CommentService.getComment(post_id, comment_id);
      if (!comment) throw new CommentPipeError.NotFound();

      const { user } = res.locals;
      const isOwner = comment.user?.user_id === user.user_id;
      const isAdmin = user.role === 1;
      if (!isOwner && !isAdmin) throw new CommentPipeError.AccessDenied();

      next();
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }
}
