import * as nodeMailer from "nodemailer";
import { sign, verify } from "jsonwebtoken";
import { getEmailConfirmToken } from "../common/token";

export const sendMail = async (email: string, userId: number) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: { user: process.env.NODEMAILER_USER, pass: process.env.NODEMAILER_PASSWORD },
  });

  const token = getEmailConfirmToken(email);
  const url = `${process.env.SERVER_URL}/user/confirm/${token}/${userId}`;

  const mailOptions = {
    to: "EMAIL",
    subject: "가입 인증 메일",
    html: `
    메일인증 버튼를 누르시면 가입 인증이 완료됩니다.<br/>
    인증은 메일전송후 15분까지 유효합니다.<br/>
    <a style="color: #FFF; text-decoration: none; text-align: center;" href=${url} target="_blank">
        <p style="display: inline-block; width: 210px; height: 45px; margin: 30px 5px 40px; background: #3bc9db; line-height: 45px; vertical-align: middle; font-size: 16px;">
            메일 인증
        </p>
    </a>
      `,
  };
  await transporter.sendMail(mailOptions);
};
