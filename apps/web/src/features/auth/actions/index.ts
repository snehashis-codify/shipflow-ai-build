"use server";

import { createCaller } from "@/src/trpc/server-caller";
import { DEFAULT_AUTH_CALLBACK, getSafeCallbackPath, SIGN_IN_PATH } from "../utils";
import { redirect } from "next/navigation";

export async function signInWithGithub(formData: FormData) {
  const callback = formData.get("callbackUrl");
  const redirectTo = getSafeCallbackPath(
    typeof callback === "string" ? callback : null,
  );
  const caller = await createCaller();
  const result = await caller.auth.githubSignInProvider({
    callbackURL: redirectTo,
  });
  if (result.url) {
    redirect(result.url);
  }
}

export async function getServerSessions() {
  const caller = await createCaller();
  return await caller.auth.getGihubSessionProvider();
}

export async function requireAuth(redirectTo = SIGN_IN_PATH) {
  const session = await getServerSessions();
  if (!session) {
    redirect(redirectTo);
  }
  return session;
}
export async function requireUnauth(redirectTo = DEFAULT_AUTH_CALLBACK) {
  const session = await getServerSessions();
  if (session) {
    redirect(redirectTo);
  }
}
