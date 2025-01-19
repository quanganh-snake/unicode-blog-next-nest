import { Blog } from "src/modules/blogs/entities/blog.entity";

export const dataBlogTransform = (blog: Blog) => {
  return {
    ...blog,
    topics: blog.blogTopics.map(blogTopic => (blogTopic.topic.name)),
    blogTopics: undefined,
  };
}