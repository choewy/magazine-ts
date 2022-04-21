import { Request, Response } from 'express';
import { Exception } from '../../commons/exceptions';
import { CommentRepository } from './comments.repository';
import { CommentCreateDto } from './dto/comment-create.dto';

export class CommentService extends CommentRepository {
  public static GetComments = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { post_id } = req.params;
      const rows = await this.getComments(Number(post_id));
      return res.status(200).send({ ok: true, rows });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };

  public static CreateComment = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { user_id } = res.locals.user;
      const { post_id } = req.params;
      const { content } = req.body;
      const commentCreateDto: CommentCreateDto = {
        content,
        user_id,
        post_id: Number(post_id),
      };
      await this.createComment(commentCreateDto);
      return res.status(201).send({ ok: true });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };

  public static UpdateComment = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { post_id, comment_id } = req.params;
      const { content } = req.body;
      await this.updateComment(Number(post_id), Number(comment_id), content);
      return res.status(200).send({ ok: true });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };

  public static DeleteComment = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { post_id, comment_id } = req.params;
      await this.deleteComment(Number(post_id), Number(comment_id));
      return res.status(200).send({ ok: true });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };
}
