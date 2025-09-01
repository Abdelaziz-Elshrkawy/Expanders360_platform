import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/entities/mysql/match.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Document, DocumentSchema } from 'src/entities/mongodb/document.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([Match]),
    MongooseModule.forFeature([
      { name: Document.name, schema: DocumentSchema },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
