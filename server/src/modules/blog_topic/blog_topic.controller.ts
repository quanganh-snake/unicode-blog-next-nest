import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BlogTopicService } from './blog_topic.service';
import { CreateBlogTopicDto } from './dto/create-blog_topic.dto';
import { UpdateBlogTopicDto } from './dto/update-blog_topic.dto';

@Controller('blog-topic')
export class BlogTopicController {
  constructor(private readonly blogTopicService: BlogTopicService) {}

  @Post()
  create(@Body() createBlogTopicDto: CreateBlogTopicDto) {
    return this.blogTopicService.create(createBlogTopicDto);
  }

  @Get()
  findAll() {
    return this.blogTopicService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogTopicService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogTopicDto: UpdateBlogTopicDto) {
    return this.blogTopicService.update(+id, updateBlogTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogTopicService.remove(+id);
  }
}
