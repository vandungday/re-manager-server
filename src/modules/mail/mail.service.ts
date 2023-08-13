import { MailType } from '@/common/enums/mail.enum';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private static readonly logger = new Logger(MailService.name);

  constructor(private readonly mailerService: MailerService, private readonly configService: ConfigService) {}

  public async sendMail(to: string, type: MailType) {
    try {
      const { subject, template } = this.getSubjectTemplateByType(type);

      this.mailerService.sendMail({
        to,
        from: this.configService.get<string>('MAIL_FROM'),
        subject,
        template,
      });
      MailService.logger.log(`[SEND_MAIL][SUCCESS]: to ${to}`);
    } catch (error) {
      MailService.logger.log(`[SEND_MAIL][ERROR]: to ${to}, error: ${error}`);
    }
  }

  private getSubjectTemplateByType(type: string) {
    switch (type) {
      case 'interview':
        return {
          subject: 'Ban da duoc moi phong van',
          template: './interview',
        };
      case 'onboard':
        return {
          subject: 'Ban da trung tuyen',
          template: './onboard',
        };
      case 'reject':
        return {
          subject: 'Ban da bi loai',
          template: './reject',
        };
      case 'test':
        return {
          subject: 'Ban da duoc moi lam bai test',
          template: './test',
        };
      default: {
        throw new Error('Type is not supported');
      }
    }
  }
}
