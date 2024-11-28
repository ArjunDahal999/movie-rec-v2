import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/userModel/user-model";
import bcrypt from "bcryptjs";
import { registerFormSchema } from "../../zodschema/authSchema/register-schema";
import { generateVerificationToken } from "../../libs/generateTokenLibs/generate-activation-token";
import { sendEmail } from "../../libs/sendMailLibs/send-email";
import ErrorHandler from "../../middleware/error-handeler";

export const registerAccount = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password } = req.body;

    //zod validation
    registerFormSchema.parse(req.body);

    // Check if email is already registered
    const existingEmailUser = await UserModel.findOne({ email });
    if (existingEmailUser) {
      return next(new ErrorHandler(false, "Email already registered", 409));
    }

    // Check if username is already registered
    const existingUsernameUser = await UserModel.findOne({ username });
    if (existingUsernameUser) {
      return next(new ErrorHandler(false, "Username already registered", 409));
    }

    // Hashing the password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create admin account with the determined role
    const createUser = await UserModel.create({
      username,
      email,
      password: hashedPassword,
    });

    await createUser.save();

    // Send the email verification token to the user's email
    const activationToken = await generateVerificationToken(email);
    sendEmail({
      email,
      subject: "Activate Your Account",
      templateName: "activationMail.ejs",
      data: { activationToken, email },
    });
    return res.json({ success: true, message: "Activation Link Sent to Your Mail" });
  } catch (error) {
    next(error);
  }
};
