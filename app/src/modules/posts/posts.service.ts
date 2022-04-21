import { Request, Response } from 'express';
import { Exception } from '../../commons/exceptions';
import { PostCreateDto } from './dto/post-create.dto';
import { PostServiceError } from './error/post.service.error';
import { PostRepository } from './posts.repository';

export class PostService extends PostRepository {
  public static async GetPosts(_: Request, res: Response): Promise<Response> {
    try {
      const rows = await this.getPosts();
      return res.status(200).send({ ok: true, rows });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }

  public static async GetPost(req: Request, res: Response): Promise<Response> {
    try {
      const { post_id } = req.params;
      const row = await this.getPost(Number(post_id));
      if (!row) throw new PostServiceError.NotFound();
      return res.status(200).send({ ok: true, row });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }

  public static async CreatePost(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { user_id } = res.locals.user;
      const postCreateDto: PostCreateDto = { ...req.body, user_id };
      await this.createPost(postCreateDto);
      return res.status(201).send({ ok: true });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }

  public static async UpdatePost(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { post_id } = req.params;
      const { content } = req.body;
      await this.updatePost(Number(post_id), content);
      return res.status(200).send({ ok: true });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }

  public static async DeletePost(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { post_id } = req.params;
      await this.deletePost(Number(post_id));
      return res.status(200).send({ ok: true });
    } catch (error) {
      const { code, body } = new Exception(error);
      return res.status(code).send(body);
    }
  }
}
