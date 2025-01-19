import { Injectable } from '@nestjs/common';
import { CreateBlogTopicDto } from './dto/create-blog_topic.dto';
import { UpdateBlogTopicDto } from './dto/update-blog_topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogTopic } from 'src/modules/blog_topic/entities/blog_topic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogTopicService {

  constructor(
    @InjectRepository(BlogTopic) private blogTopicRepository: Repository<BlogTopic>
  ) { }

  create(createBlogTopicDto: CreateBlogTopicDto) {
    return 'This action adds a new blogTopic';
  }

  findAll() {
    return `This action returns all blogTopic`;
  }

  findOne(id: number) {
    return `This action returns a #${id} blogTopic`;
  }

  update(id: number, updateBlogTopicDto: UpdateBlogTopicDto) {
    return `This action updates a #${id} blogTopic`;
  }

  remove(id: number) {
    return `This action removes a #${id} blogTopic`;
  }
}
