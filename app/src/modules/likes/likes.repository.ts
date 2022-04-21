import db from '../app/app.models';
import { DBErrors } from '../../commons/errors';

const Errors = DBErrors('LikeRepository');
const Options = { raw: true, nest: true };

export class LikeRepository extends db.Like {
  protected static async enumPostLike(
    user_id: number,
    post_id: number
  ): Promise<void> {
    try {
      const target = { user_id, post_id };
      const like = await this.findOne({ ...Options, where: target });
      like ? await this.destroy({ where: target }) : await this.create(target);
    } catch (error) {
      throw new Errors.update(error);
    }
  }
}
