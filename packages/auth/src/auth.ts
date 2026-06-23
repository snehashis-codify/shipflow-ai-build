import "dotenv/config";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@repo/database";
import * as schema from "@repo/database/schema";
export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      mapProfileToUser:async(profile)=>({
        email:profile.email??`${profile.id}@users.noreply.gihub.com`,
        name:profile.name??profile.login,
      })
    },
  },
  plugins: [nextCookies()],
});
