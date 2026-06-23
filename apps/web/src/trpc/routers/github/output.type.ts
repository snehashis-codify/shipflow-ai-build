import z from "zod";

export const getInstallationByUserIdOutputSchema = z.object({
  //   userId: z.string(),
  //   id: z.string(),
  createdAt: z.date(),
  //   updatedAt: z.date(),
  //   installationId: z.number(),
  accountLogin: z.string().nullable(),
  //   accountType: z.string().nullable(),
}).nullable();

export type GetInstallationByUserIdOutputSchema = z.infer<
  typeof getInstallationByUserIdOutputSchema
>;

export const getInstallationByInstallationIdOutputSchema = z.object({
  target_type: z.string().nullable(),

  account: z
    .object({
      login: z.string().optional(),
      slug: z.string().optional(),
    })
    .nullable(),
});

export type GetInstallationByInstallationIdOutputSchema = z.infer<
  typeof getInstallationByInstallationIdOutputSchema
>;

export const upsertInstallationByUserIdOutputSchema = z.void();

export type UpsertInstallationByUserIdOutputSchema = z.infer<
  typeof upsertInstallationByUserIdOutputSchema
>;
