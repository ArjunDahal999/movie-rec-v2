

import { v4 as uuidv4 } from 'uuid'
import { ResetPasswordModel } from '../../models/authModel/reset-password-model';


export const generatePasswordToken = async (email: string) =>
{
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    // if password token already exist then delete it 
    let existingTokenEntry = await ResetPasswordModel.findOneAndDelete({ email });

    //make new password reset token for the email
    existingTokenEntry = await ResetPasswordModel.create({
        email,
        token,
        expires,
    });
    await existingTokenEntry.save()

    return token
};