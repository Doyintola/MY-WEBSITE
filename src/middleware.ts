import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/admin/login" },
});

// Protect /admin/* but allow /admin/login itself
export const config = {
  matcher: ["/admin/((?!login).*)", "/admin"],
};
