import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from 'src/dtos/document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  async create(@Body() createDocumentDto: CreateDocumentDto) {
    return this.documentsService.create(createDocumentDto);
  }

  @Get()
  async findAll(
    @Query('tag') tag?: string,
    @Query('text') text?: string,
    @Query('projectId') projectId?: string,
  ) {
    return this.documentsService.findAll(tag, text, projectId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.documentsService.findOne(id);
  }
}
