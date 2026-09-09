import { resendClient, sender } from "../lib/resend.js";
import { createWelcomeEmailTemplate } from "./emailTemplates.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
    const { data, error } = await resendClient.emails.send({
        from: `${sender?.name} <${sender?.email}>`,
        to: email,
        subject: "Welcome to Chatter World!",
        html: createWelcomeEmailTemplate(name, clientURL),
    });

    if(error) {
        console.error("Error sending welcome emails:", error);
    } else {
        console.log("Welcome Email Sent Successfully!", data);
    }
}