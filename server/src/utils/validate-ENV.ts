import { cleanEnv, str, port } from "envalid";
import dotenv from "dotenv";
import path from "path";

const envFilePath = path.resolve(path.dirname(__dirname), "../.env");

dotenv.config({ path: envFilePath });
export default cleanEnv(process.env, {
    PORT: port(),
    MONGO_URL: str(),
    SMTP_HOST: str(),
    SMTP_PORT: str(),
    SMTP_MAIL: str(),
    SMTP_PASSWORD: str(),
    JWT_URL: str()
});
