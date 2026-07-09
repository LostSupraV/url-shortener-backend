import dotenv from "dotenv";

dotenv.config();

export const mode = process.env.MODE || process.env.NODE_ENV || "development";
export const port = Number(process.env.PORT) || 3000;
export const arcjet_key = process.env.ARCJET_KEY || "";
export const better_auth_secret = process.env.BETTER_AUTH_SECRET || "";
export const better_auth_url = process.env.BETTER_AUTH_URL || "http://localhost:3000";
export const mongo_shortener_uri = process.env.MONGO_SHORTENER_URI || "";
export const nodemail_user = process.env.NODEMAIL_USER || "";
export const nodemail_pass = process.env.NODEMAIL_PASS || "";
export const frontend_url = process.env.FRONTEND_ACCESS