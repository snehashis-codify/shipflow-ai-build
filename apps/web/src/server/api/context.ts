export async function createContext({ headers }: { headers?: Headers }) {
  if (!headers) return { headers: null };
  return { headers };
}
export type Context = Awaited<ReturnType<typeof createContext>>;
