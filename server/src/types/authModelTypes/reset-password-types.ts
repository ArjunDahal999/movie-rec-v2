import { Document } from 'mongoose';

export interface ResetPasswordTypes extends Document
{
    email: string;
    token: string;
    expires: Date;
}