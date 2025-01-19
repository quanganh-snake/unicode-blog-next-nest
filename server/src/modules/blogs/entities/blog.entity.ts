import { BlogTopic } from "src/modules/blog_topic/entities/blog_topic.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('blogs')
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text'
  })
  title: string;

  @Column({
    type: 'text'
  })
  content: string;

  @Column({
    type: 'text'
  })
  slug: string;

  @Column({
    type: 'text',
    nullable: true
  })
  thumbnail: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp', default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updated_at: Date;

  @OneToMany(() => BlogTopic, (blogTopic) => blogTopic.blog)
  blogTopics: BlogTopic[];
}
