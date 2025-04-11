import { db } from "@/lib/db";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { sendRecoveryEmail } from "@/lib/mailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email } = z
            .object({
                email: z
                    .string()
                    .max(100, "Email can't be longer than 100 characters")
                    .min(5, "Email can't be shorter than 5 characters")
                    .email({ message: "Email format is not valid" }),
            })
            .parse(body);

        const user = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            return new Response(
                JSON.stringify({ message: "Email not found" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const token = uuidv4();
        const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

        await db.passwordRecovery.create({
            data: {
                token,
                userId: user.id,
                expiresAt: tokenExpiry,
            },
        });

        const resetURL = `${process.env.NEXT_PUBLIC_APP_URL}/password-recovery?token=${token}`;
        await sendRecoveryEmail(email, resetURL);

        return new Response(
            JSON.stringify({
                message:
                    "Check your email for the recovery link. If you don't see it, check your spam folder.",
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(
                JSON.stringify({ message: error.errors[0].message }),
                {
                    status: 422,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        return new Response(
            JSON.stringify({ message: "Server error. Try again later." }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
}
