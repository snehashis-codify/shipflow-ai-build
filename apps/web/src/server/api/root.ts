import { authRouter } from "./routers/auth";
import { router } from "./trpc";

export const serverRouter = router({
  auth: authRouter,
});

export { createContext } from "./context";
export type ServerRouter = typeof serverRouter;
