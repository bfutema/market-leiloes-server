import nodemailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';
import { th } from 'date-fns/locale';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host, // 'smtp.ethereal.email',
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe Market Lailões <equipe@marketleiloes.com.br>',
      to,
      subject: '',
      text: body,
    });

    console.log('Message sent: $s', message.messageId);
    console.log('Preview URL: $s', nodemailer.getTestMessageUrl(message));
  }
}
