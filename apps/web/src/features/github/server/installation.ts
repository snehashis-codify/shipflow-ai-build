import { createCaller } from "@/src/trpc/server-caller";
import { GithubInstallationStatus } from "../../dashboard/lib/types";
import { getServerSessions } from "../../auth/actions";
import { redirect } from "next/navigation";
import { DEFAULT_AUTH_CALLBACK, SIGN_IN_PATH } from "../../auth/utils";

function getAccountLogin(
  account: { login?: string; slug?: string } | null | undefined,
): string | null {
  if (!account) {
    return null;
  }

  if ("login" in account && account.login) {
    return account.login;
  }

  if (account.slug) {
    return account.slug;
  }

  return null;
}
function buildDisconnectedStatus(): GithubInstallationStatus {
  return { connected: false, accountLogin: null, installedAt: null };
}

export async function getInstallationStatus(userId: string) {
  const caller = await createCaller();
  const installation = await caller.github.getInstallationByUserId({ userId });

  if (!installation) {
    return buildDisconnectedStatus();
  }

  return {
    connected: true,
    accountLogin: installation.accountLogin,
    installedAt: installation.createdAt.toISOString(),
  };
}

export async function saveInstallation(userId: string, installationId: number) {
  const caller = await createCaller();
  const response = await caller.github.getInstallationDetails({
    installationId,
  });

  const accountLogin = getAccountLogin(response.account);

  await caller.github.upsertInstalltionByUserId({
    userId,
    installationId,
    accountLogin,
    accountType: response.target_type,
  });
}

export async function deleteInstallation(userId: string) {
  const caller = await createCaller();
  await caller.github.deleteInstallationByUserId({ userId });
}

export async function getUserIdByInstallationId(installationId: number) {
  const caller = await createCaller();
  const installation = await caller.github.getUserIdByInstallationIdProvider({
    installationId,
  });

  if (!installation) {
    return null;
  }

  return installation.userId;
}

export async function getUserInstallationId(userId: string) {
  const caller = await createCaller();
  const installation = await caller.github.getUserInstallationIdProvider({
    userId,
  });
  if (!installation) {
    return null;
  }

  return installation.installationId;
}

