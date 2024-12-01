import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isWebhookRoute = createRouteMatcher(["/api/webhooks/clerk"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isAdminRoute(request)) {
    await auth.protect();
  }


  if (!isWebhookRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
