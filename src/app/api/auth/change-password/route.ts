import { db } from "@/lib/db";
import { RecoveryValidator } from "@/lib/validators/auth";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { token, password } = RecoveryValidator.parse(body);

        const recovery = await db.passwordRecovery.findUnique({
            where: {
                token,
            },
        });

        if (!recovery) {
            return new Response(
                JSON.stringify({ message: "Invalid or expired token" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const user = await db.user.findUnique({
            where: {
                id: recovery.userId,
            },
        });

        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.$transaction([
            db.user.update({
                where: { id: user.id },
                data: { password: hashedPassword },
            }),
            db.passwordRecovery.delete({
                where: { token },
            }),
        ]);

        return new Response(
            JSON.stringify({
                message:
                    "Your password has been changed successfully. You can now sign in.",
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
