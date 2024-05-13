import { Instrument_Sans } from "next/font/google";

import { ProfileProvider } from "@/hooks/useProfile";
import { PlatformProvider } from "@/hooks/usePlatforms";
import { NextAuthProvider } from "@/contexts/AuthProvider";
import  {ProfileCard} from "@/components/ProfileCard";

const font = Instrument_Sans({ subsets: ["latin"] });

import { useRouter } from "next/router";

import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner";

export default function Home() {
    const router = useRouter()
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
          .then(() => {
            toast("The link has been copied to your clipboard!")
          })}

  return (
    <main
      className={`${font.className} w-full min-h-screen max-h-screen bg-background grid grid-cols-1 grid-rows-[126px_1fr] bg-[#FAFAFA]`}
    >
      <NextAuthProvider>
        <PlatformProvider>
          <ProfileProvider>
            <div className="w-screen h-screen bg-[#FAFAFA]">
                <div className="bg-primary rounded-b-[32px] w-screen h-96 p-6">
                    <div className="bg-white w-full px-6 py-3 flex items-center justify-between rounded-xl">
                        <button onClick={() => router.push('/dashboard')} className="text-primary border-2 border-primary py-3 px-6 rounded-md hover:bg-primary hover:text-white transition-all duration-200">Back to Editor</button>
                        <button onClick={() => copyToClipboard('')} className="text-white bg-primary border-2 border-primary py-3 px-6 rounded-md hover:bg-primary/90  transition-all duration-200">Share Link</button>
                    </div>
                </div>
                <ProfileCard />
            </div>
          </ProfileProvider>
        </PlatformProvider>
      </NextAuthProvider>
      <Toaster />
    </main>
  );
}
