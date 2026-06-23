
import { getServerSessions } from "@/src/features/auth/actions";
import { saveInstallation } from "@/src/features/github/server/installation";
import { redirect } from "next/navigation";


function buildSignInCallbackUrl(installationId: string | null): string {
    if (installationId) {
      return `/api/github/callback?installation_id=${installationId}`;
    }
  
    return "/dashboard/github";
  }

export async function GET(request: Request) {

    const {searchParams} = new URL(request.url);

    const  installationId = searchParams.get("installation_id");
    const session = await getServerSessions();


    if(!session){
        const callbackUrl = buildSignInCallbackUrl(installationId);
        redirect(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`); 
    }

    if(installationId){
        await saveInstallation(session.user.id , Number(installationId))
    }

    redirect("/dashboard/github")
}