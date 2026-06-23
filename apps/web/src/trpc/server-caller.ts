import { headers } from "next/headers";
import { createContext } from "./context";
import { serverRouter } from "./routers/_app";


export async function createCaller() {
  const ctx = await createContext({ headers: await headers() });
  return serverRouter.createCaller(ctx);
}
