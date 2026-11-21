import { clerkMiddleware } from "@клерк/nextjs/сервер";
import { NextResponse } from "next/server";
import { getLink } from "./lib/getLink";
export const config = {
  matcher: ["/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)"],
};
export default clerkMiddleware(async (auth, req) => {
  const url = req.nextUrl;
  const hostname = req.headers.get("host")!;
  const path = url.pathname;
  if (
    hostname === getLink({ subdomain: "editor", method: false }).slice(0, -1)
  ) {
    await auth.protect();
    return NextResponse.rewrite(
      new URL(`/редактор${path === "/" ? "" : path}`, req.url),
    );
  }
  if (hostname === getLink({ subdomain: "app", method: false }).slice(0, -1)) {
    await auth.protect();
    return NextResponse.rewrite(
      new URL(`/панель мониторинга${path === "/" ? "" : path}`, req.url),
    );
  }
  if (
    hostname === getLink({ subdomain: "dashboard", method: false }).slice(0, -1)
  ) {
    return NextResponse.redirect(getLink({ subdomain: "app" }));
  }
  if (hostname === getLink({ method: false }).slice(0, -1)) {
    return NextResponse.rewrite(new URL(`/панель мониторинга${path}`, req.url));
  }
  const subdomain = hostname.split(".")[0];
  return NextResponse.rewrite(new URL(`/${subdomain}${path}`, req.url));
});