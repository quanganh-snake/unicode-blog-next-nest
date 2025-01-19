import { Blog } from "src/modules/blogs/entities/blog.entity";
import { Topic } from "src/modules/topics/entities/topic.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('blog_topics')
export class BlogTopic {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Blog, (blog) => blog.blogTopics, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'blog_id' })
  blog: Blog;

  @ManyToOne(() => Topic, (topic) => topic.blogTopics, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp', default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updated_at: Date;
}
