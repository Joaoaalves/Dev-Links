import { Instrument_Sans } from "next/font/google";

import PhoneMockup from "@/components/PhoneMockup";
import NavBar from "@/components/NavBar";

import { ProfileProvider } from "@/hooks/useProfile";
import { PlatformProvider } from "@/hooks/usePlatforms";
import { NextAuthProvider } from "@/contexts/AuthProvider";
import Profile from "@/components/Profile";

const font = Instrument_Sans({ subsets: ["latin"] });

import { Toaster } from "@/components/ui/sonner";

export default function ProfileDetails() {
  return (
    <main
      className={`${font.className} w-full min-h-screen max-h-screen bg-background grid grid-cols-1 grid-rows-[96px_1fr] lg:grid-rows-[126px_1fr]`}
    >
      <NextAuthProvider>
        <PlatformProvider>
          <ProfileProvider>
            <NavBar />
            <div className="flex items-start justify-start w-full p-3 lg:p-6 gap-x-6 max-h-[90vh] lg:max-h-[86vh]">
              <div className="hidden lg:w-2/5 h-full lg:flex justify-center">
                <PhoneMockup.Root>
                  <PhoneMockup.ProfileImage />
                  <PhoneMockup.Email />
                  <PhoneMockup.Name />
                  <PhoneMockup.Links />
                </PhoneMockup.Root>
              </div>

              <div className="w-full lg:w-3/5 h-full flex flex-col items-center">
                <Profile />
              </div>
            </div>
          </ProfileProvider>
        </PlatformProvider>
      </NextAuthProvider>
      <Toaster />
    </main>
  );
}
