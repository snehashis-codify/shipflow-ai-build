import { getGithubApp } from "@repo/github";
export async function createContext({ headers }: { headers?: Headers }) {
  const app = getGithubApp();
  if (!headers) return { headers: null };
  return { headers, app };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
