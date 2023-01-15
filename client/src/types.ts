export type Credentials = {
  username?: string;
  email: string;
  password: string;
};

export type Post = {
  category: string;
  id: string;
  title: string;
  image: string;
  upvotes: number;
  downvotes: number;
  comment_count: number;
  userId: string;
  created_at: number;
};
