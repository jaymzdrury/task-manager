import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { cookieValues, paths } from "./lib/utils";
import { env } from "./types/env";

const url = env.CLIENT;

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const auth = cookies().get(cookieValues.ACCESSTOKEN)?.value;

  if (path !== paths.LOGIN && path !== paths.REGISTER && !auth) {
    return NextResponse.redirect(url + paths.LOGIN);
  }

  if ((path === paths.LOGIN || path === paths.REGISTER) && auth) {
    return NextResponse.redirect(url + paths.TASKS);
  }

  return NextResponse.next();
}
