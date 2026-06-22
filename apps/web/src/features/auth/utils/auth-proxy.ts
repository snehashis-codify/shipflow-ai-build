import { NextRequest, NextResponse } from "next/server";
import { getSafeCallbackPath, SIGN_IN_PATH } from ".";
import { getServerSessions } from "../actions";

export function redirectToSignin(request: NextRequest, pathName: string) {
  const signInUrl = new URL(SIGN_IN_PATH, request.url);
  signInUrl.searchParams.set(
    "callbackUrl",
    `${pathName}${request.nextUrl.search}`,
  );

  return NextResponse.redirect(signInUrl);
}
function getAuthPostRedirectPath(request: NextRequest) {
  const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
  return getSafeCallbackPath(callbackUrl);
}
export async function handleAuthProxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.next();
  }

  const session = await getServerSessions();

  if (pathname === SIGN_IN_PATH) {
    if (session) {
      const redirectPath = getAuthPostRedirectPath(request);
      return NextResponse.redirect(new URL(redirectPath, request.url));
    }
    return NextResponse.next();
  }
  if (!session) {
    return redirectToSignin(request, pathname);
  }
  return NextResponse.next();
}
