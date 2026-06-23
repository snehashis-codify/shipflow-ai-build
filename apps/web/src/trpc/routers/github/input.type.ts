import z from "zod";

export const getInstallationByUserIdInputSchema = z.object({
  userId: z.string().min(1, { message: "User Id is required" }),
});

export type GetInstallationByUserIdInputSchema = z.infer<
  typeof getInstallationByUserIdInputSchema
>;

export const getInstallationByInstallationIdInputSchema = z.object({
  installationId: z.number({ message: "Installation Id is required" }),
});

export type GetInstallationByInstallationIdInputSchema = z.infer<
  typeof getInstallationByInstallationIdInputSchema
>;

export const upsertInstallationByUserIdInputSchema = z.object({
  userId: z.string().min(1, { message: "User Id is required" }),
  installationId: z.number({ message: "Installation Id is required" }),
  accountLogin: z.string().nullable(),
  accountType: z.string().nullable(),
});

export type UpsertInstallationByUserIdInputSchema = z.infer<
  typeof upsertInstallationByUserIdInputSchema
>;
