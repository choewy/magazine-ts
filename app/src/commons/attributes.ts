export const UserAttrs = {
  default: ['user_id', 'email', 'nickname', 'role'],
  password: ['nickname, password'],
};

export const PostAttrs = {
  default: ['post_id', 'content', 'image_url', 'createdAt', 'updatedAt'],
  user: ['user_id', 'email', 'nickname', 'role'],
};

export const CommentAttrs = {
  default: ['comment_id', 'post_id', 'content', 'createdAt', 'updatedAt'],
  user: ['user_id', 'email', 'nickname'],
};
