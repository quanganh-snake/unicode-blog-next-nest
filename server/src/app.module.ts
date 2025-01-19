import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BlogsModule } from './modules/blogs/blogs.module';
import { TopicsModule } from './modules/topics/topics.module';
import { BlogTopicModule } from './modules/blog_topic/blog_topic.module';
import { MediaFileModule } from './modules/media-file/media-file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.NEON_PG_HOST,
      ssl: true,
      username: process.env.NEON_PG_USER,
      password: process.env.NEON_PG_PASSWORD,
      database: process.env.NEON_PG_DATABASE,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    BlogsModule,
    TopicsModule,
    BlogTopicModule,
    MediaFileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
