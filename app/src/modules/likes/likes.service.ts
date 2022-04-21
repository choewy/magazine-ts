import { Request, Response } from 'express';
import { Exception } from '../../commons/exceptions';
import { LikeRepository } from './likes.repository';

export class LikeService extends LikeRepository {
  public static PostLike = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const { user_id } = res.locals.user;
      const { post_id } = req.params;
      await this.enumPostLike(user_id, Number(post_id));
      return res.status(200).send({ ok: true });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  };
}
