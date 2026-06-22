
import { requireUnauth } from "@/src/features/auth/actions";
import { SquareTerminal } from "lucide-react";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Sign In - LuminaCode AI",
  description: "Sign in to LuminaCode with your Github account",
};
export default async function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireUnauth()
  return (
    <>
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-gutter">
        <div className="mb-xl flex flex-col items-center gap-sm">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-[0_0_20px_rgba(192,193,255,0.3)]">
            <SquareTerminal color="#1000a9" />
          </div>
          <h1 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
            LuminaCode
          </h1>
        </div>
        {children}
      </main>
      <footer className="relative z-10 w-full py-lg">
        <div className="max-w-container-max mx-auto px-lg flex flex-col md:flex-row justify-between items-center gap-md">
          <div className="text-on-surface-variant/60 font-body-sm text-body-sm text-center md:text-left">
            © 2024 LuminaCode AI. Built for high-precision engineering.
          </div>
          <div className="flex gap-lg">
            <a
              className="text-on-surface-variant/60 hover:text-primary transition-colors font-body-sm text-body-sm"
              href="#"
            >
              Documentation
            </a>
            <a
              className="text-on-surface-variant/60 hover:text-primary transition-colors font-body-sm text-body-sm"
              href="#"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
