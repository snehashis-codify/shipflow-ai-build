import { z } from "zod";
export const githubSignInProviderInputSchema = z.object({
  callbackURL: z.string().min(1, "Callback URL is required"),
});

export const githubSessionProviderInputSchema = z.undefined();

export type GithubSignInProviderInput = z.infer<
  typeof githubSignInProviderInputSchema
>;

export type GithubSessionProviderInput = z.infer<
  typeof githubSessionProviderInputSchema
>;
