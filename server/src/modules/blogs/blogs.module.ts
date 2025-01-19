import { Module } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogsController } from './blogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/modules/blogs/entities/blog.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';
import { BlogTopic } from 'src/modules/blog_topic/entities/blog_topic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog, Topic, BlogTopic]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule { }
