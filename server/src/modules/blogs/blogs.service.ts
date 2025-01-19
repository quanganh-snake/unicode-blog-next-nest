import { Injectable } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { Blog } from 'src/modules/blogs/entities/blog.entity';
import { dataBlogTransform } from 'src/modules/blogs/transform';
import { BlogTopic } from 'src/modules/blog_topic/entities/blog_topic.entity';
import { Topic } from 'src/modules/topics/entities/topic.entity';

@Injectable()
export class BlogsService {

  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    @InjectRepository(BlogTopic)
    private readonly blogTopicRepository: Repository<BlogTopic>,
  ) { }

  async create(createBlogDto: CreateBlogDto) {
    // 1. Tạo blog mới
    const { topics, ...blogData } = createBlogDto;
    const blog = await this.blogRepository.save(blogData);

    // 2. Xử lý liên kết blog với các topics
    if (topics && topics.length > 0) {
      await Promise.all(
        topics.map(async (topicId) => {
          const topic = await this.topicRepository.findOne({ where: { id: topicId } });
          if (!topic) {
            throw new Error(`Topic with id ${topicId} not found`);
          }

          return this.blogTopicRepository.save({
            blog,
            topic,
          });
        }),
      );
    }

    // 3. Trả về blog mới
    return this.blogRepository.findOne({
      where: { id: blog.id },
      relations: ['blogTopics', 'blogTopics.topic'],
    });


  }

  async findAll({ keyword, topicIds, page, limit }: { keyword?: string, topicIds?: string, page: number, limit: number }) {

    const whereConditions: any = [];

    const dataSearchTopics = topicIds ? topicIds.split(',').map(topic => topic.trim()) : [];

    if (keyword) {
      whereConditions.push(
        { title: ILike(`%${keyword}%`) },
        { content: ILike(`%${keyword}%`) },
      );
    }

    let topicCondition: any = null;
    if (dataSearchTopics.length > 0) {
      topicCondition = {
        blogTopics: {
          topic: {
            id: In(dataSearchTopics),
          },
        },
      };
      whereConditions.push(topicCondition);
    }

    const skip = (page - 1) * limit || 0;


    const [blogs, total] = await this.blogRepository.findAndCount({
      where: whereConditions.length > 0 ? whereConditions : undefined,
      relations: ['blogTopics', 'blogTopics.topic'],
      take: limit,
      skip,
      order: { created_at: 'DESC' },
    });

    const blogsWithFormattedData = blogs.map(blog => dataBlogTransform(blog));

    return {
      data: blogsWithFormattedData,
      pagination: {
        page,
        limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['blogTopics', 'blogTopics.topic'],
    });
    return dataBlogTransform(blog);
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return this.blogRepository.update(id, updateBlogDto);
  }

  remove(id: number) {
    return this.blogRepository.delete(id);
  }
}
