import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/userModel/user-model";
import { AccountActivationModel } from "../../models/authModel/account-activation-model";
import { activateAccountSchema } from "../../zodschema/authSchema/activate-account-schema";
import ErrorHandler from "../../middleware/error-handeler";


export const activateAccount = async (req: Request, res: Response, next: NextFunction) =>
{
    try
    {
        const { email, token } = req.body;

        //validating the value with zod
        activateAccountSchema.parse(req.body)
        //checking if the email with that  token is present in the body or not
        const isTokenPresent = await AccountActivationModel.findOne({
            email: email,
            token: token,
        });

        if (!isTokenPresent) 
        {

            return next(new ErrorHandler(false, "Invald Token or Email Id", 409));
        }

        //checking if the token as expired or not
        const hasTokenExpired = new Date(isTokenPresent.expires!!) < new Date();

        if (hasTokenExpired)
        {
            return next(new ErrorHandler(false, "Token has expired", 401));
        }

        //delete the token for the activationModel and updating the user emailActivated status

        await isTokenPresent.deleteOne({ email })

        const user = await UserModel.findOne({ email })
        if (!user)
        {
            return next(new ErrorHandler(false, "Invalid Email ", 401));
        }

        user.emailActivated = new Date()
        await user.save()
        res.json({ success: true, message: "Account Activated" })


    } catch (error)
    {
        console.error(error);
        next(error)
    }
};
