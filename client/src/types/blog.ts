export type Blog = {
  id: number;
  title: string;
  content: string;
  slug: string;
  thumbnail: string;
  topics: string[];
  created_at: string;
  updated_at: string;
}

export type TBlogResponse = {
  id: number;
  title: string;
  content: string;
  slug: string;
  thumbnail: null;
  created_at: string;
  updated_at: string;
  topics: string[];
}

export type TFilterBlog = {
  keyword: string;
  topicIds: string[];
  page: number;
  limit: number;
}