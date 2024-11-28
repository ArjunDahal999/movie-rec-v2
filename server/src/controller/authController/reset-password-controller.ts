import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/userModel/user-model";
import ErrorHandler from "../../middleware/error-handeler";
import { resetPasswordSchema } from "../../zodschema/authSchema/reset-password-schema";
import { ResetPasswordModel } from "../../models/authModel/reset-password-model";
import bcrypt from "bcryptjs";

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { newPassword, confirmPassword, email, token } = req.body;

    //zod verification of the data this will also check if both password are same or not
    resetPasswordSchema.parse(req.body);

    //checking if the email with that  token is present in the body or not
    const isTokenPresent = await ResetPasswordModel.findOne({
      email: email,
      token: token,
    });

    if (!isTokenPresent) {
      return next(new ErrorHandler(false, "Invald Token or Email Id", 409));
    }

    // now checking if the token has expired or not
    const hasTokenExpired = new Date(isTokenPresent.expires) < new Date();
    if (hasTokenExpired) {
      return next(new ErrorHandler(false, "Token has expired", 401));
    }
    //finally delete the email with token from ResetTokenTable
    await isTokenPresent.deleteOne({ email });

    // hash the password and save into the database
    const user = await UserModel.findOne({ email });

    if (!user) {
      return next(new ErrorHandler(false, "User not Found", 401));
    }
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.json({ success: true, message: " Password Reset Successfully" }).status(200);
  } catch (error) {
    next(error);
  }
};
