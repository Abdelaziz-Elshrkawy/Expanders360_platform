import Module from 'module';
import { AnalyticsModule } from './routes/analytics/analytics.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailService } from './emails/emails.service';
import { DocumentsModule } from './routes/documents/documents.module';
import { GlobalModule } from './shared/global/global.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './routes/users/users.module';
import { VendorsModule } from './routes/vendors/vendors.module';
import { ServicesModule } from './routes/services/services.module';

@Module({
  imports: [
    GlobalModule,
    AuthModule,
    UsersModule,
    VendorsModule,
    ServicesModule,
    ProjectsModule,
    MatchesModule,
    DocumentsModule,
    AnalyticsModule,
    TasksModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
