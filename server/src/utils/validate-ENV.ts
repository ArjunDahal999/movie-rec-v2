import { cleanEnv, str, port } from "envalid";
import dotenv from "dotenv";
import path from "path";

const envFilePath = path.resolve(path.dirname(__dirname), "../.env");

dotenv.config({ path: envFilePath });
// export default cleanEnv(process.env, {
//   PORT: port(),
//   MONGO_URL: str(),
//   SMTP_HOST: str(),
//   SMTP_PORT: str(),
//   SMTP_MAIL: str(),
//   SMTP_PASSWORD: str(),
//   JWT_REFRESH_TOKEN_SECRET: str(),
//   JWT_ACCESS_TOKEN_SECRET: str(),
// });

const env = {
  PORT: 5000,
  MONGO_URL:
    "mongodb+srv://admin-arjun:9pJ9D3YiqtYwXipM@cluster0.ldmnk.mongodb.net/?retryWrites=true&w=majority",
  SMTP_HOST: "smtp.gmail.com",
  SMTP_PORT: "465",
  SMTP_MAIL: "dahalarjun409@gmail.com",
  SMTP_PASSWORD: "xafbbasoqenxxqye",
  JWT_ACCESS_TOKEN_SECRET: "fasdfasdfa",
  JWT_REFRESH_TOKEN_SECRET: "afsdfadf",
};

export default env;
