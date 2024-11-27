import { clerkMiddleware , createRouteMatcher } from "@clerk/nextjs/server";

const isWebhookRoute = createRouteMatcher(["/api/webhooks/clerk(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isWebhookRoute(request)) {
    await auth.protect();
  }
});


export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
