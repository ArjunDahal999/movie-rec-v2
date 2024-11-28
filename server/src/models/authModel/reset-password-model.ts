
import { Schema, model } from "mongoose";
import { ResetPasswordTypes } from "../../types/authModelTypes/reset-password-types";

const ResetPasswordSchema = new Schema<ResetPasswordTypes>(
    {
        email: { type: String, unique: true },
        token: { type: String },
        expires: { type: Date, },
    },
    { timestamps: true }
);

export const ResetPasswordModel = model<ResetPasswordTypes>('RestPasswordTable', ResetPasswordSchema);