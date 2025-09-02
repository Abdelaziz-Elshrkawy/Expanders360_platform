import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Match } from 'src/entities/mysql/match.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Document } from 'src/entities/mongodb/document.schema';
import { InjectSqlRepository } from 'src/decorators/injection/repository.decorator';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectSqlRepository(Match)
    private matchRepository: Repository<Match>,
    @InjectModel(Document.name) private documentModel: Model<Document>,
  ) {}

  async getTopVendors() {
    const monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);

    const topVendors = await this.matchRepository
      .createQueryBuilder('match')
      .select([
        'vendor.name',
        'AVG(match.score) as averageScore',
        'country.name',
      ])
      .leftJoin('match.vendor', 'vendor')
      .leftJoin('vendor.countriesSupported', 'country')
      .where('match.createdAt >= :monthAgo', { monthAgo })
      .groupBy('country.id')
      .addGroupBy('match.vendor')
      .orderBy('averageScore', 'DESC')
      .limit(3)
      .getRawMany();

    const countryDocumentCounts = await this.documentModel
      .aggregate([
        {
          $lookup: {
            from: 'projects',
            localField: 'projectId',
            foreignField: '_id',
            as: 'project',
          },
        },
        {
          $unwind: '$project',
        },
        {
          $group: {
            _id: '$project.country',
            count: { $sum: 1 },
          },
        },
      ])
      .exec();

    return {
      topVendors,
      countryDocumentCounts,
    };
  }
}
