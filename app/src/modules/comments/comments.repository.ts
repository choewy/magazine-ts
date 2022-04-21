import db from '../app/app.models';
import { DBErrors } from '../../commons/errors';
import { DefaultOptions } from '../../commons/options';
import { CommentDefaultDto } from './dto/comment-default.dto';
import { CommentAttrs } from '../../commons/attributes';
import { CommentCreateDto } from './dto/comment-create.dto';

const Errors = DBErrors('CommentRepository');

export class CommentRepository extends db.Comment {
  public static getComments = async (
    post_id: number
  ): Promise<CommentDefaultDto[]> => {
    try {
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
    } catch (error) {
      throw new Errors.find(error);
    }
  };

  public static getComment = async (
    post_id: number,
    comment_id: number
  ): Promise<CommentDefaultDto | null> => {
    try {
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
    } catch (error) {
      throw new Errors.find(error);
    }
  };

  protected static createComment = async (
    commentCreateDto: CommentCreateDto
  ): Promise<void> => {
    try {
      await this.create(commentCreateDto);
    } catch (error) {
      throw new Errors.create(error);
    }
  };

  protected static updateComment = async (
    post_id: number,
    comment_id: number,
    content: string
  ): Promise<void> => {
    try {
      await this.update({ content }, { where: { post_id, comment_id } });
    } catch (error) {
      throw new Errors.update(error);
    }
  };

  protected static deleteComment = async (
    post_id: number,
    comment_id: number
  ): Promise<void> => {
    try {
      await this.destroy({ where: { post_id, comment_id } });
    } catch (error) {
      throw new Errors.delete(error);
    }
  };
}
