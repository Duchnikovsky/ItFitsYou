import { db } from "@/lib/db";
import { SignUpValidator } from "@/lib/validators/auth";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { email, password } = SignUpValidator.parse(body);

        const isUser = await db.user.findUnique({
            where: {
                email,
            },
        });

        if (isUser) {
            return new Response(
                JSON.stringify({ message: "Email already in use" }),
                {
                    status: 400,
                    headers: { "Content-Type": "application/json" },
                }
            );
        }

        const hashedPass = await bcrypt.hash(password, 10);

        await db.user.create({
            data: {
                email: email,
                password: hashedPass,
            },
        });

        return new Response(
            JSON.stringify({
                message:
                    "Welcome! Your account has been created. Please sign in to continue.",
            }),
            {
                status: 201,
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
