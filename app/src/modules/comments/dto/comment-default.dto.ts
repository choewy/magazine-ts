export interface CommentDefaultDto {
  comment_id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    user_id: number;
    email: string;
    nickname: string;
  };
}
