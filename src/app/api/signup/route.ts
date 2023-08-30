import { db } from "@/lib/db";
import { SignUpValidator } from "@/lib/validators/auth";
import { z } from "zod";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { email, password, rep_password } = SignUpValidator.parse(body);

    if (password !== rep_password) {
      return new Response("Passwords does not match", { status: 400 });
    }

    const isUser = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (isUser) {
      return new Response("This email is already taken", { status: 409 });
    }

    const hashedPass = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        email: email,
        password: hashedPass,
      },
    });

    return new Response("OK");
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.errors[0].message, { status: 422 });
    }

    return new Response("Could not sign up, try again later", { status: 500 });
  }
}
