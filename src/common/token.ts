import { sign, verify } from "jsonwebtoken";

export const getEmailConfirmToken = async (email: string) => {
  try {
    return sign({ email }, process.env.ACCESS_SECRET as string, { expiresIn: "15m" });
  } catch (err) {
    console.log(err);
  }
};

export const tokenVerify = async (accessToken: string) => {
  try {
    return verify(accessToken, process.env.ACCESS_SECRET as string);
  } catch (err) {
    console.log(err);
    return null;
  }
};
