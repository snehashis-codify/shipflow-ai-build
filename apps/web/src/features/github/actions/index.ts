"use server";

import { redirect } from "next/navigation";
import { getServerSessions } from "../../auth/actions";
import { DEFAULT_AUTH_CALLBACK, SIGN_IN_PATH } from "../../auth/utils";
import { deleteInstallation } from "../server/installation";

export async function disconnectGithubApp() {
  const session = await getServerSessions();
  if (!session) {
    redirect(SIGN_IN_PATH);
  }
  await deleteInstallation(session.user.id);
  redirect(DEFAULT_AUTH_CALLBACK);
}