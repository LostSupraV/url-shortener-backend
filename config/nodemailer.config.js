import nodemailer from "nodemailer";
import { nodemail_pass, nodemail_user } from "../env/env.js";

export const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:nodemail_user,
        pass:nodemail_pass
    }
})