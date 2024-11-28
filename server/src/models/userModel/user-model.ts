import { Schema, model } from "mongoose";
import { UserModelType } from "../../types/userModelTypes/user-types";

const UserModelSchema = new Schema<UserModelType>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now },
  emailActivated: { type: Date },
});

export const UserModel = model<UserModelType>("UserTable", UserModelSchema);
