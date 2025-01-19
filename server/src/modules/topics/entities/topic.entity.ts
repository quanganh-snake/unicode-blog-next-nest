import { BlogTopic } from "src/modules/blog_topic/entities/blog_topic.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text'
  })
  name: string;

  @Column({
    type: 'text'
  })
  description: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({
    type: 'timestamp', default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updated_at: Date;

  @OneToMany(() => BlogTopic, (blogTopic) => blogTopic.topic)
  blogTopics: BlogTopic[];
}
