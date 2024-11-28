import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/userModel/user-model";

import { generatePasswordToken } from "../../libs/generateTokenLibs/generate-reset-password-token";
import { sendEmail } from "../../libs/sendMailLibs/send-email";
import { forgotPasswordSchema } from "../../zodschema/authSchema/forgot-password-schema";
import ErrorHandler from "../../middleware/error-handeler";

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) =>
{
    try
    {
        const { email } = req.body;

        forgotPasswordSchema.parse(req.body)
        console.log(email)

        // 1st checking if the email is registered or not 

        const isEmailValid = await UserModel.findOne({ email: email, });

        if (!isEmailValid) 
        {
            return next(new ErrorHandler(false, "Email not Registered", 401));
        }


        //generate password Reset Token 
        const passwordResetToken = await generatePasswordToken(email);

        //sending the password reset token to user email
        sendEmail({ email, subject: "Reset Your Account Password", templateName: "resetPasswordMail.ejs", data: { passwordResetToken, email } });
        return res.json({ success: true, message: "Password Reset Link Sent to Your Mail" });
    } catch (error)
    {
        next(error)
    }
};
