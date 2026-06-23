import { requireAuth } from "@/src/features/auth/actions";
import React, { ReactNode } from "react";

export default async function ProtectedLayout({children}:{children:ReactNode}) {
  await requireAuth();
  return <div>{children}</div>;
}
