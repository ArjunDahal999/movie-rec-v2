import { Document, Schema, Types } from "mongoose";

export interface UserModelType extends Document
{
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    emailActivated?: Date;
    role: string;
}

