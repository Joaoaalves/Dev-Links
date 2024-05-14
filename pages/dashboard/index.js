import { Instrument_Sans } from "next/font/google";

import PhoneMockup from "@/components/PhoneMockup";
import NavBar from "@/components/NavBar";
import Links from "@/components/Links";

import { ProfileProvider } from "@/hooks/useProfile";
import { PlatformProvider } from "@/hooks/usePlatforms";
import { NextAuthProvider } from "@/contexts/AuthProvider";

import { Toaster } from "@/components/ui/sonner";
const font = Instrument_Sans({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${font.className} w-full min-h-screen max-h-screen bg-background grid grid-cols-1 grid-rows-[126px_1fr] bg-[#FAFAFA]`}
    >
      <NextAuthProvider>
        <PlatformProvider>
          <ProfileProvider>
            <NavBar />
            <div className="flex items-start justify-start w-full p-6 gap-x-6 max-h-[85vh]">
              <div className="w-2/5 h-full flex justify-center">
                <PhoneMockup.Root>
                  <PhoneMockup.ProfileImage />
                  <PhoneMockup.Name />
                  <PhoneMockup.Email />
                  <PhoneMockup.Links />
                </PhoneMockup.Root>
              </div>

              <div className="w-3/5 h-full flex flex-col items-center">
                <Links />
              </div>
            </div>
          </ProfileProvider>
        </PlatformProvider>
      </NextAuthProvider>
      <Toaster />
    </main>
  );
}
