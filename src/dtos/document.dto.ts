import { ArrayNotEmpty, IsString } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @ArrayNotEmpty()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  projectId: string;
}
