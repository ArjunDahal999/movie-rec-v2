import { Response } from "express";
import jwt from "jsonwebtoken";
import env from "./validate-ENV";
import { generateAccessToken } from "../helper/generate-access-token";
export const sendUserSessionCookie = (
  user: any,
  res: Response,
  message: string,
  statuscode = 200
) => {
  //making the token out of user id and assiging a key to verity that token
  const accessToken = generateAccessToken(user._id);
  const refreshToken = jwt.sign({ _id: user._id }, env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  res.cookie("access_token", accessToken, {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
  });
  res
    .cookie("refresh_token", refreshToken, {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 day
    })
    .json({
      data: {
        user,
        accessToken,
        refreshToken,
      },
      success: true,
      message,
    })
    .status(statuscode);
};
