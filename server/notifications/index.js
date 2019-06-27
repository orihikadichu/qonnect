import db from '../../models/index';
import i18n from 'i18n';
import { config } from 'dotenv';
import { sprintf } from 'sprintf-js';
import { sendMailFromAdmin } from '../mails';
config();

const HOST = process.env.HOST;
const COUNTRY_ID_JAPAN = 1;

export const notifyForQuestionUser = (question_id) => {
  return db.questions.findOne({
    where: { id: question_id },
    include: [db.users]
  })
    .then((instance) => {
      if (!instance) {
        return false;
      }
      const { id, user } = instance.get();
      const locale = (user.country_id === COUNTRY_ID_JAPAN) ? 'ja' : 'en';
      i18n.setLocale(locale);
      const to = user.mail;
      const subject = i18n.__('mails.questions.subject');
      const textTemp = i18n.__('mails.questions.body');
      const url = `${HOST}/questions/${id}`;
      const text = sprintf(textTemp, url);
      const mailParams = { to, subject, text };
      return sendMailFromAdmin(mailParams);
    });
};

export const notifyForAnswerUser = (answer_id) => {
  return db.answers.findOne({
    where: { id: answer_id },
    include: [db.users]
  })
    .then((instance) => {
      if (!instance) {
        return false;
      }
      const { question_id, user } = instance.get();
      const locale = (user.country_id === COUNTRY_ID_JAPAN) ? 'ja' : 'en';
      i18n.setLocale(locale);
      const to = user.mail;
      const subject = i18n.__('mails.answers.subject');
      const textTemp = i18n.__('mails.answers.body');
      const url = `${HOST}/questions/${question_id}`;
      const text = sprintf(textTemp, url);
      const mailParams = { to, subject, text };
      return sendMailFromAdmin(mailParams);
    });
};
