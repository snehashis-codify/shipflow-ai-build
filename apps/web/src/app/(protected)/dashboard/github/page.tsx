import { requireAuth } from "@/src/features/auth/actions";
import { GithubConnectCard } from "@/src/features/github/components/github-connect-card";
import { getInstallationStatus } from "@/src/features/github/server/installation";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "GitHub App · Dashboard",
};

export default async function DashboardGithubPage() {
  const session = await requireAuth();
  const installation = await getInstallationStatus(session.user.id);
  return (
    <>
      <GithubConnectCard userId={session.user.id} installation={installation} />
    </>
  );
}
