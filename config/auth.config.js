import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { better_auth_secret, better_auth_url, mongo_shortener_uri, nodemail_user } from "../env/env.js";
import { emailOTP } from "better-auth/plugins";
import { transporter } from "./nodemailer.config.js";
import { sendMail } from "../services/sendMail.service.js";

const client = new MongoClient(mongo_shortener_uri);
await client.connect();
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),

  secret: better_auth_secret,

  baseURL: better_auth_url,

  trustedOrigins: ["http://localhost:5173"],

  emailAndPassword: {
    enabled: true,
  },

  emailVerification: {
    enabled: true,
  },
  plugins: [
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const user = await db.collection("user").findOne({ email });

        const name = user?.name ?? "User";
        console.log({email, name, otp})
        sendMail(name, email, otp);
      },
    }),
  ],
});
