
// import GithubSignInForm from "@/features/auth/components/github-sign-in-form";

import GithubSignInForm from "@/src/features/auth/components/github-sign-in-form";

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};
export default async function SignInPage({ searchParams }: SignInPageProps) {
  const { callbackUrl } = await searchParams;
  return (
    <div className="w-full max-w-105 glass-card rounded-xl p-xl shadow-2xl flex flex-col">
      <div className="text-center mb-xl">
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-xs">
          Welcome back
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Sign in to continue your high-precision code analysis session.
        </p>
      </div>

      <div>
        <GithubSignInForm callbackUrl={callbackUrl} />
      </div>

      <p className="mt-xl text-center font-body-sm text-body-sm text-outline leading-relaxed">
        By clicking continue, you agree to our{" "}
        <a className="text-primary hover:underline underline-offset-4" href="#">
          Terms of Service
        </a>{" "}
        and{" "}
        <a className="text-primary hover:underline underline-offset-4" href="#">
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
