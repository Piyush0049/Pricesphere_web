import nodemailer from 'nodemailer';
import { CustomError } from '@/db/middlewares/error';

interface SendMailOptions {
    email: string;
    subject: string;
    message: string;
    tag: string;
}

const sendMail = async ({ email, subject, message, tag }: SendMailOptions) => {
    console.log('Sending email...', tag);
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_USER,
            to: email,
            subject: subject,
            text: message,
            html: `<p>${message}</p>`,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to: ${email} with subject: ${subject}`);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new CustomError('Failed to send email, please try again later.', 500);
    }
};

export default sendMail;
