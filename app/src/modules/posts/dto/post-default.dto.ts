export interface PostDefaultDto {
  post_id: number;
  content: string;
  image_url: string;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    user_id: number;
    email: string;
    nickname: string;
    role: number;
  };
  likes?: Array<{ user_id: number }>;
}
