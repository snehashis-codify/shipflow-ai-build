import { publicProcedure, router } from "./trpc.js";

export const appRouter = router({
  health: publicProcedure.query(() => {
    return {
      message: "Route is working",
    };
  }),
});

export type AppRouter = typeof appRouter;
