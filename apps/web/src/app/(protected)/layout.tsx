import { requireAuth } from "@/src/features/auth/actions";
import React from "react";

export default async function ProtectedLayout() {
  await requireAuth();
  return <div>layout</div>;
}
