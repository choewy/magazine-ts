import db from '../app/app.models';
import { PostCreateDto } from './dto/post-create.dto';
import { PostDefaultDto } from './dto/post-default.dto';
import { DefaultOptions } from '../../commons/options';
import { PostAttrs } from '../../commons/attributes';

export class PostRepository extends db.Post {
  public static async getPosts(): Promise<PostDefaultDto[]> {
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
  }

  public static async getPost(post_id: number): Promise<PostDefaultDto | null> {
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
  }

  protected static async createPost(
    postCreateDto: PostCreateDto
  ): Promise<void> {
    this.create(postCreateDto);
  }

  protected static async updatePost(
    post_id: number,
    content: string
  ): Promise<void> {
    await this.update({ content }, { where: { post_id } });
  }

  protected static async deletePost(post_id: number): Promise<void> {
    await this.destroy({ where: { post_id } });
  }
}
