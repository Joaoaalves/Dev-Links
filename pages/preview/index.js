import { Instrument_Sans } from "next/font/google";

import { ProfileProvider } from "@/hooks/useProfile";
import { PlatformProvider } from "@/hooks/usePlatforms";
import { NextAuthProvider } from "@/contexts/AuthProvider";
import { ProfileCard } from "@/components/ProfileCard";

const font = Instrument_Sans({ subsets: ["latin"] });

import { Toaster } from "@/components/ui/sonner";
import PreviewNavBar from "@/components/PreviewNavBar";

export default function Home() {

  return (
    <main
      className={`${font.className} w-full min-h-screen max-h-screen bg-background grid grid-cols-1 grid-rows-[126px_1fr] bg-[#FAFAFA]`}
    >
      <NextAuthProvider>
        <PlatformProvider>
          <ProfileProvider>
            <div className="w-screen h-screen bg-[#FAFAFA]">
              <PreviewNavBar />
              <ProfileCard />
            </div>
          </ProfileProvider>
        </PlatformProvider>
      </NextAuthProvider>
      <Toaster />
    </main>
  );
}
