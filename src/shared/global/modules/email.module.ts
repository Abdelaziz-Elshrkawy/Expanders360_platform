import { MailerModule } from '@nestjs-modules/mailer';
import { email_host, email, email_password } from 'src/config/env';

export const EmailModule = MailerModule.forRoot({
  transport: {
    host: email_host,
    auth: {
      user: email,
      pass: email_password,
    },
  },
});
