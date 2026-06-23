import { z } from "zod";
const sessionSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  expiresAt: z.date(),
  token: z.string(),
  ipAddress: z.string().nullish(),
  userAgent: z.string().nullish(),
});

const userSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  email: z.string(),
  emailVerified: z.boolean(),
  name: z.string(),
  image: z.string().nullish(),
});

export const githubSignInProviderOutputSchema = z.object({
  url: z.string().optional(),
});
export const githubSessionProviderOutputSchema = z
  .object({
    session: sessionSchema,
    user: userSchema,
  })
  .nullable();
export type GithubSignInProviderOutput = z.infer<
  typeof githubSignInProviderOutputSchema
>;

export type GithubSessionProviderOutput = z.infer<
  typeof githubSessionProviderOutputSchema
>;
