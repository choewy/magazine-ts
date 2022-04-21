import db from '../app/app.models';
import { PostCreateDto } from './dto/post-create.dto';
import { PostDefaultDto } from './dto/post-default.dto';
import { DBErrors } from '../../commons/errors';
import { DefaultOptions } from '../../commons/options';
import { PostAttrs } from '../../commons/attributes';

const Errors = DBErrors('PostRepository');

export class PostRepository extends db.Post {
  public static async getPosts(): Promise<PostDefaultDto[]> {
    try {
      const likes = await db.Like.findAll({ ...DefaultOptions });
      const posts: PostDefaultDto[] = await this.findAll({
        ...DefaultOptions,
        attributes: PostAttrs.default,
        include: [
          {
            ...DefaultOptions,
            model: db.User,
            as: 'user',
            attributes: PostAttrs.user,
          },
        ],
        order: [[db.sequelize.literal('createdAt'), 'DESC']],
      });

      return posts.map((post) => {
        const { post_id } = post;
        return {
          ...post,
          likes: likes
            .filter((like) => like.post_id === post_id)
            .map((like) => ({ user_id: like.user_id })),
        };
      });
    } catch (error) {
      throw new Errors.find(error);
    }
  }

  public static async getPost(post_id: number): Promise<PostDefaultDto | null> {
    try {
      const likes = await db.Like.findAll({
        ...DefaultOptions,
        where: { post_id },
      });
      const post: PostDefaultDto | null = await this.findOne({
        ...DefaultOptions,
        where: [{ post_id }],
        attributes: PostAttrs.default,
        include: [
          {
            ...DefaultOptions,
            model: db.User,
            as: 'user',
            attributes: PostAttrs.user,
          },
        ],
      });
      if (post) post.likes = likes.map((like) => ({ user_id: like.user_id }));
      return post;
    } catch (error) {
      throw new Errors.find(error);
    }
  }

  protected static async createPost(
    postCreateDto: PostCreateDto
  ): Promise<void> {
    try {
      this.create(postCreateDto);
    } catch (error) {
      throw new Errors.create(error);
    }
  }

  protected static async updatePost(
    post_id: number,
    content: string
  ): Promise<void> {
    try {
      await this.update({ content }, { where: { post_id } });
    } catch (error) {
      throw new Errors.create(error);
    }
  }

  protected static async deletePost(post_id: number): Promise<void> {
    try {
      await this.destroy({ where: { post_id } });
    } catch (error) {
      throw new Errors.delete(error);
    }
  }
}
