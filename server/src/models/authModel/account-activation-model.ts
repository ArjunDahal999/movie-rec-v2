
import { Schema, model } from "mongoose";
import { AccountActivationTypes } from "../../types/authModelTypes/account-activation-types";

const AccountActivationSchema = new Schema<AccountActivationTypes>(
    {
        email: { type: String, unique: true },
        token: { type: String },
        expires: { type: Date, },
    },
    { timestamps: true }
);


export const AccountActivationModel = model<AccountActivationTypes>('AccountActivationTable', AccountActivationSchema);