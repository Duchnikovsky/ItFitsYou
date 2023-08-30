import { z } from "zod";

export const AuthValidator = z.object({
  email: z
    .string()
    .max(100, "Email can't be longer than 100 characters")
    .min(5, "Email can't be shorter than 5 characters")
    .email({ message: "Email format is not valid" }),
  password: z
    .string()
    .max(20, "Password must be 8-20 characters long")
    .min(8, "Password must be 8-20 characters long"),
});

export type SignInRequest = z.infer<typeof AuthValidator>;

export const SignUpValidator = z.object({
  email: z
    .string()
    .max(100, "Email can't be longer than 100 characters")
    .min(5, "Email can't be shorter than 5 characters")
    .email({ message: "Email format is not valid" }),
  password: z
    .string()
    .max(20, "Password must be 8-20 characters long")
    .min(8, "Password must be 8-20 characters long"),
  rep_password: z
    .string()
    .max(20, "Repeated password must be 8-20 characters long")
    .min(8, "Repeated password must be 8-20 characters long"),
});

export type SignUpRequest = z.infer<typeof SignUpValidator>;

export interface InputTypes {
  name: string;
  type: string;
  pattern: string;
  maxlenght: number;
  icon: JSX.Element;
}
