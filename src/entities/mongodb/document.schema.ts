import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DocumentDocument = HydratedDocument<Document>;

@Schema()
export class Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop([String])
  tags: string[];

  @Prop({ required: true })
  projectId: string;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);

DocumentSchema.index({ content: 'text' });
