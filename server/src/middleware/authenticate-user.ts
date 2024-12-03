import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import env from "../utils/validate-ENV";
import { UserModel } from "../models/userModel/user-model";
import ErrorHandler from "./error-handeler";

export const userAuthenication = async (req: Request, res: Response, next: NextFunction) => {
  let token;
  try {
    if (
      req.cookies.access_token ||
      (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
    ) {
      token = req.cookies.access_token || req.headers?.authorization?.split(" ")[1];
    }
    console.log("token", token);
    if (!token) return res.status(400).json({ success: false, message: "Not logged In" });
    const decodedToken: any = jwt.verify(
      token,
      env.JWT_ACCESS_TOKEN_SECRET,
      (err: any, decoded: any) => {
        if (err) {
          throw new ErrorHandler(false, "Token Expired", 403);
        }
        return decoded;
      }
    );

    const userId: string = decodedToken._id;

    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    res.locals.user = userId;
  } catch (error) {
    next(error);
  }
  next();
};
