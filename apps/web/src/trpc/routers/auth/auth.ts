import { auth } from "@repo/auth";
import {
  githubSessionProviderInputSchema,
  githubSignInProviderInputSchema,
} from "./auth.input";
import {
  githubSessionProviderOutputSchema,
  githubSignInProviderOutputSchema,
} from "./auth.output";
import { publicProcedure, router } from "../../init";

export const authRouter = router({
  githubSignInProvider: publicProcedure
    .input(githubSignInProviderInputSchema)
    .output(githubSignInProviderOutputSchema)
    .mutation(async ({ ctx, input }) => {
      if (!ctx.headers) return { url: undefined };
      const { callbackURL } = input;
      const result = await auth.api.signInSocial({
        body: {
          provider: "github",
          callbackURL,
        },
        headers: ctx.headers,
      });
      return { url: result.url };
    }),
  getGithubSessionProvider: publicProcedure
    .input(githubSessionProviderInputSchema)
    .output(githubSessionProviderOutputSchema)
    .query(async ({ ctx }) => {
      if (!ctx.headers) return null;
      const result = await auth.api.getSession({
        headers: ctx.headers,
      });

      return result ? { session: result.session, user: result.user } : null;
    }),
});
