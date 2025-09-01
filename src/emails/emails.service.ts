import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor(private readonly mailerService: MailerService) {}

  async sendNewMatchNotification(project: any, vendor: any, score: number) {
    const mailOptions: ISendMailOptions = {
      to: project.client.email, // Assuming project has a client with an email
      subject: 'New Vendor Match!',
      text: `A new vendor has been matched to your project ${project.id}: ${vendor.name} with a score of ${score}`,
    };

    try {
      const info = await this.mailerService.sendMail(mailOptions);
      this.logger.log(`Email sent: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Error sending email: ${error.message}`);
      throw error;
    }
  }
}
