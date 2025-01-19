import { Module } from '@nestjs/common';
import { BlogTopicService } from './blog_topic.service';
import { BlogTopicController } from './blog_topic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTopic } from 'src/modules/blog_topic/entities/blog_topic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BlogTopic]),
  ],
  controllers: [BlogTopicController],
  providers: [BlogTopicService],
})
export class BlogTopicModule { }
