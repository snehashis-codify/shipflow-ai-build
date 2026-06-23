import { router } from "../init";
import { authRouter } from "./auth/auth";
import { githubRouter } from "./github";


export const serverRouter = router({
  auth: authRouter,
  github:githubRouter
});

export type ServerRouter = typeof serverRouter;
