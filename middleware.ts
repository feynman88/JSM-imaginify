import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

const isWebhookRoute = createRouteMatcher(["/api/webhooks/clerk(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isTestRoute = createRouteMatcher(["/test(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (isAdminRoute(request)) {
    await auth.protect();
  }

  if (isTestRoute(request)) {
    await auth.protect();
  }

  if (!isWebhookRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
