

import { AccountActivationModel } from "../../models/authModel/account-activation-model";
import { v4 as uuidv4 } from 'uuid'


export const generateVerificationToken = async (email: string) =>
{
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
    // if token already exist then delete it 
    let existingTokenEntry = await AccountActivationModel.findOneAndDelete({ email });

    //make new token for the email
    existingTokenEntry = await AccountActivationModel.create({
        email,
        token,
        expires,
    });
    await existingTokenEntry.save()

    return token
};