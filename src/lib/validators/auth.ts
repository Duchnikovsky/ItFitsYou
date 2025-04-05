import { z } from "zod";

export const AuthValidator = z.object({
    email: z
        .string()
        .max(100, "Email can't be longer than 100 characters")
        .min(5, "Email can't be shorter than 5 characters")
        .email({ message: "Email format is not valid" }),
    password: z.string().regex(/^[A-Za-z0-9]{6,18}$/, {
        message:
            "Password must be 6-18 characters and contain only letters and numbers",
    }),
});

export type SignInRequest = z.infer<typeof AuthValidator>;

export const SignUpValidator = z
    .object({
        email: z
            .string()
            .max(100, "Email can't be longer than 100 characters")
            .min(5, "Email can't be shorter than 5 characters")
            .email({ message: "Email format is not valid" }),
        password: z.string().regex(/^[A-Za-z0-9]{6,18}$/, {
            message:
                "Password must be 6-18 characters and contain only letters and numbers",
        }),
        rep_password: z.string().regex(/^[A-Za-z0-9]{6,18}$/, {
            message:
                "Password must be 6-18 characters and contain only letters and numbers",
        }),
    })
    .refine((data) => data.password === data.rep_password, {
        message: "Passwords do not match",
        path: ["rep_password"],
    });

export type SignUpRequest = z.infer<typeof SignUpValidator>;
