import { Document } from 'mongoose';

export interface AccountActivationTypes extends Document
{
    email: string;
    token: string;
    expires: Date;
}