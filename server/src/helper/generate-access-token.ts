import jwt from "jsonwebtoken";
import env from "../utils/validate-ENV";

export const generateAccessToken = (user_id: any) => {
  try {
    const accessToken = jwt.sign({ _id: user_id }, env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "20s",
    });
    return accessToken;
  } catch (error) {
    return null;
  }
};
