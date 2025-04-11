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
        "/((?!api|signIn|signUp|password-recovery|terms|privacy|_next|favicon.ico).*)",
    ],
};
