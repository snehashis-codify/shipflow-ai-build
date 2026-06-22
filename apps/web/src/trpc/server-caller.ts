import { headers } from "next/headers";
import { createContext } from "../server/api/context";
import { serverRouter } from "../server/api/root";

export async function createCaller() {
  const ctx = await createContext({ headers: await headers() });
  return serverRouter.createCaller(ctx);
}
