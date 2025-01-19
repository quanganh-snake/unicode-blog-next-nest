import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { checkValidEnvVariables, TDataEnvConfig } from 'src/configs/envConfig';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';

async function bootstrap() {
  const envVariables: TDataEnvConfig = {
    NEON_PG_HOST: process.env.NEON_PG_HOST,
    NEON_PG_USER: process.env.NEON_PG_USER,
    NEON_PG_PASSWORD: process.env.NEON_PG_PASSWORD,
    NEON_PG_DATABASE: process.env.NEON_PG_DATABASE,
  }
  checkValidEnvVariables(envVariables);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Tự động chuyển đổi kiểu dữ liệu của các trường
    exceptionFactory: (errors: ValidationError[]) => {
      return new BadRequestException(errors.map(error => {
        return {
          [error.property]: Object.values(error.constraints)[0]
        }
      }))
    }
  }));
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
