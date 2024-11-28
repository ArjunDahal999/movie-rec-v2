
import nodemailer, { Transporter } from "nodemailer";
import ejs from "ejs";
import path from "path";
import env from '../../utils/validate-ENV'

export interface Emailoptions
{
    email: string;
    subject: string;
    templateName: string;
    data?: { [key: string]: any };
}

export const sendEmail = async (options: Emailoptions): Promise<void> =>
{

    const transporter: Transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: parseInt(env.SMTP_PORT || "587"),
        auth: {
            user: env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    const { email, data, subject, templateName } = options;
    const templetePath = path.join(__dirname, "../../../src/mails", templateName);
    const html = await ejs.renderFile(templetePath, data);

    const mailoptions = {
        from: env.SMTP_MAIL,
        to: email,
        subject,
        html,
    };
    await transporter.sendMail(mailoptions);

}
