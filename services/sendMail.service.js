import { auth } from "../config/auth.config.js";
import { transporter } from "../config/nodemailer.config.js";
import { nodemail_user } from "../env/env.js";
import { generateOTPEmail } from "../utils/template.js";

export const sendMail = (name, email, otp) => {
  const { subject, text, html } = generateOTPEmail(name, otp);
  transporter
    .sendMail({
      from: nodemail_user,
      to: email,
      subject: subject,
      text: text,
      html: html,
    })
    .then((info, err) => {
      if (err) throw new Error(err.message);
      console.log(info);
    });
};
