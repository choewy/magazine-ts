import db from '../app/app.models';
import { DefaultOptions } from '../../commons/options';
import { CommentDefaultDto } from './dto/comment-default.dto';
import { CommentAttrs } from '../../commons/attributes';
import { CommentCreateDto } from './dto/comment-create.dto';

export class CommentRepository extends db.Comment {
  public static getComments = async (
    post_id: number
  ): Promise<CommentDefaultDto[]> => {
    return await this.findAll({
      ...DefaultOptions,
      where: { post_id },
      include: [
        {
          ...DefaultOptions,
          model: db.User,
          as: 'user',
          attributes: CommentAttrs.user,
        },
      ],
      attributes: CommentAttrs.default,
      order: [[db.sequelize.literal('createdAt'), 'DESC']],
    });
  };

  public static getComment = async (
    post_id: number,
    comment_id: number
  ): Promise<CommentDefaultDto | null> => {
    return await this.findOne({
      ...DefaultOptions,
      where: { post_id, comment_id },
      include: [
        {
          ...DefaultOptions,
          model: db.User,
          as: 'user',
          attributes: CommentAttrs.user,
        },
      ],
      attributes: CommentAttrs.default,
    });
  };

  protected static createComment = async (
    commentCreateDto: CommentCreateDto
  ): Promise<void> => {
    await this.create(commentCreateDto);
  };

  protected static updateComment = async (
    post_id: number,
    comment_id: number,
    content: string
  ): Promise<void> => {
    await this.update({ content }, { where: { post_id, comment_id } });
  };

  protected static deleteComment = async (
    post_id: number,
    comment_id: number
  ): Promise<void> => {
    await this.destroy({ where: { post_id, comment_id } });
  };
}
