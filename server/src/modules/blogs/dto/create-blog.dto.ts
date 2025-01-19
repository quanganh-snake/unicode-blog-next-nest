import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateBlogDto {
  @IsNotEmpty({
    message: 'Tiêu đề blog là bắt buộc'
  })
  title: string;

  @IsOptional()
  topics: number[];

  @IsOptional()
  thumbnail?: string;
}
