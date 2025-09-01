import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumentDto } from 'src/dtos/document.dto';
import { Document } from 'src/entities/mongodb/document.schema';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Document.name) private documentModel: Model<Document>,
  ) {}

  async create(createDocumentDto: CreateDocumentDto): Promise<Document | null> {
    const createdDocument = new this.documentModel(createDocumentDto);
    return await createdDocument.save();
  }

  async findAll(
    tag?: string,
    text?: string,
    projectId?: string,
  ): Promise<Document[]> {
    const query: any = {};
    if (tag) {
      query.tags = tag;
    }
    if (text) {
      query.$text = { $search: text };
    }
    if (projectId) {
      query.projectId = projectId;
    }
    return await this.documentModel.find(query).exec();
  }

  async findOne(id: string): Promise<Document | null> {
    return await this.documentModel.findById(id).exec();
  }
}
