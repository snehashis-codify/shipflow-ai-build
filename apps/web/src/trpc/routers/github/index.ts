import { publicProcedure, router } from "../../init";

import db from "@repo/database";
import { githubInstallation } from "@repo/database/schema";
import { equal } from "@repo/database/operator";
import {
  getInstallationByInstallationIdInputSchema,
  getInstallationByUserIdInputSchema,
  upsertInstallationByUserIdInputSchema,
} from "./input.type";
import {
  getInstallationByInstallationIdOutputSchema,
  getInstallationByUserIdOutputSchema,
  upsertInstallationByUserIdOutputSchema,
} from "./output.type";
export const githubRouter = router({
  getInstallationByUserId: publicProcedure
    .input(getInstallationByUserIdInputSchema)
    .output(getInstallationByUserIdOutputSchema)
    .query(async ({ input }) => {
      const { userId } = input;
      const [result] = await db
        .select()
        .from(githubInstallation)
        .where(equal(githubInstallation.userId, userId));

      return result
        ? { createdAt: result.createdAt, accountLogin: result.accountLogin }
        : null;
    }),
  getInstallationDetails: publicProcedure
    .input(getInstallationByInstallationIdInputSchema)
    .output(getInstallationByInstallationIdOutputSchema)
    .query(async ({ ctx, input }) => {
      if (!ctx.app) throw new Error("Octokit config issue");
      const { app } = ctx;
      const { installationId } = input;
      const { data } = await app.octokit.request(
        "GET /app/installations/{installation_id}",
        { installation_id: installationId },
      );
      const { target_type } = data;

      // if (data.account.slug) {
      //   account = { slug: data.account.slug };
      // }
      return {
        account: data.account
          ? "login" in data.account && data.account.login
            ? { login: data.account.login }
            : null
          : null,
        target_type,
      };
    }),
  upsertInstalltionByUserId: publicProcedure
    .input(upsertInstallationByUserIdInputSchema)
    .output(upsertInstallationByUserIdOutputSchema)
    .mutation(async ({ input }) => {
      const { userId, installationId, accountLogin, accountType } = input;
      await db
        .insert(githubInstallation)
        .values({ userId, installationId, accountLogin, accountType })
        .onConflictDoUpdate({
          target: githubInstallation.id,
          set: { installationId, accountLogin, accountType },
          setWhere: equal(githubInstallation.userId, userId),
        });
    }),
  deleteInstallationByUserId: publicProcedure
    .input(getInstallationByUserIdInputSchema)
    .output(upsertInstallationByUserIdOutputSchema)
    .mutation(async ({ input }) => {
      const { userId } = input;
      await db
        .delete(githubInstallation)
        .where(equal(githubInstallation.userId, userId));
    }),
  getUserIdByInstallationIdProvider: publicProcedure
    .input(getInstallationByInstallationIdInputSchema)
    .output(getInstallationByUserIdInputSchema)
    .query(async ({ input }) => {
      const { installationId } = input;
      const [result] = await db
        .select({ userId: githubInstallation.userId })
        .from(githubInstallation)
        .where(equal(githubInstallation.installationId, installationId));
      if (!result) {
        throw new Error(
          "Error while fetching github installation details by installation id",
        );
      }
      const { userId } = result;
      return { userId };
    }),
  getUserInstallationIdProvider: publicProcedure
    .input(getInstallationByUserIdInputSchema)
    .output(getInstallationByInstallationIdInputSchema)
    .query(async ({ input }) => {
      const { userId } = input;
      const [result] = await db
        .select({ installationId: githubInstallation.installationId })
        .from(githubInstallation)
        .where(equal(githubInstallation.userId, userId));
      if (!result) {
        throw new Error(
          "Error while fetching github installation details by installation id",
        );
      }
      const { installationId } = result;
      return { installationId };
    }),
});
