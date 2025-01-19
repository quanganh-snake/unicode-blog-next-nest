import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Topic } from 'src/modules/topics/entities/topic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TopicsService {

  constructor(
    @InjectRepository(Topic) private topicRepository: Repository<Topic>
  ) { }

  create(createTopicDto: CreateTopicDto) {
    return 'This action adds a new topic';
  }

  findAll() {
    return this.topicRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} topic`;
  }

  update(id: number, updateTopicDto: UpdateTopicDto) {
    return `This action updates a #${id} topic`;
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
