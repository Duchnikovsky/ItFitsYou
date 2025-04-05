import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
    pages: {
        signIn: "/signIn",
    },
});

export const config = {
    matcher: [
        "/((?!signIn|signUp|forgot-password|terms|privacy|_next|favicon.ico).*)",
    ],
};
