import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../../middleware/error-handeler";
import jwt from "jsonwebtoken";
import env from "../../utils/validate-ENV";
import { UserModel } from "../../models/userModel/user-model";
import { sendUserSessionCookie } from "../../utils/send-cookie";
export const generateAccessTokenFromRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;
    const decoded_token: any = jwt.verify(
      refreshToken,
      env.JWT_REFRESH_TOKEN_SECRET,
      (err: any, decoded: any) => {
        if (err) {
          throw new ErrorHandler(false, " Refresh Token has  Expired n pls login again", 400);
        }
        return decoded;
      }
    );
    const user_id = decoded_token._id;
    const user = await UserModel.findOne({ _id: user_id });
    if (!user) {
      return next(new ErrorHandler(false, "Email Not Registered", 400));
    }
    sendUserSessionCookie(user, res, `Welcome back, ${user.username}`, 200);
  } catch (error) {
    next(error);
  }
};
