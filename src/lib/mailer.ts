import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendRecoveryEmail(to: string, resetUrl: string) {
    await resend.emails.send({
        from: "ItFitsYou <onboarding@resend.dev>",
        to,
        subject: "Password recovery - It Fits You",
        html: `
        <p>Hello!</p>
        <p>We received a request to reset your password.</p>
        <p>Click the link below to set a new password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>If this wasn’t you, you can ignore this email.</p>
      `,
    });
}
