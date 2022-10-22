import {bind, BindingScope} from '@loopback/core';
import {SentMessageInfo} from 'nodemailer';
import {AppUsers} from '../models';

@bind({scope: BindingScope.TRANSIENT})
export class EmailService {
  async sendResetPasswordMail(user: AppUsers): Promise<SentMessageInfo> {
    const emailTemplate = `${process.env.APPLICATION_URL}?resetKey=${user.resetKey}`;
    return emailTemplate;
  }
}
