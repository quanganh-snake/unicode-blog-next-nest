import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogTopicDto } from './create-blog_topic.dto';

export class UpdateBlogTopicDto extends PartialType(CreateBlogTopicDto) {}
