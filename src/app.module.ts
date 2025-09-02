import { AnalyticsModule } from './routes/analytics/analytics.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DocumentsModule } from './routes/documents/documents.module';
import { GlobalModule } from './shared/global/global.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './routes/users/users.module';
import { VendorsModule } from './routes/vendors/vendors.module';
import { ServicesModule } from './routes/services/services.module';
import { Module } from '@nestjs/common';
import { ProjectsModule } from './routes/projects/projects.module';

@Module({
  imports: [
    GlobalModule,
    UsersModule,
    VendorsModule,
    ServicesModule,
    DocumentsModule,
    AnalyticsModule,
    TasksModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
