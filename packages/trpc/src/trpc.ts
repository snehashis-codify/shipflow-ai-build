import { initTRPC } from "@trpc/server";

const t = initTRPC.create();

export const router = t.router; //router-> function declaration
export const publicProcedure = t.procedure; // Writing procedures
