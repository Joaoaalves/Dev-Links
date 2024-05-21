import { Instrument_Sans } from "next/font/google";

import PhoneMockup from "@/components/PhoneMockup";
import NavBar from "@/components/NavBar";
import Links from "@/components/Links";

import { NextAuthProvider } from "@/contexts/AuthProvider";

import { Toaster } from "@/components/ui/sonner";
const font = Instrument_Sans({ subsets: ["latin"] });

export default function Dashboard() {
  return (
    <main
      className={`${font.className} w-full min-h-screen max-h-screen bg-background grid grid-cols-1 grid-rows-[96px_1fr] lg:grid-rows-[126px_1fr]`}
    >
      
            <NavBar />
            <div className="flex items-start justify-start w-full p-3 lg:p-6 gap-x-6 max-h-[90vh] lg:max-h-[86vh]">
              <div className="hidden lg:w-2/5 h-full lg:flex justify-center">
                <PhoneMockup.Root>
                  <PhoneMockup.ProfileImage />
                  <PhoneMockup.Name />
                  <PhoneMockup.Email />
                  <PhoneMockup.Links />
                </PhoneMockup.Root>
              </div>

              <div className="w-full lg:w-3/5 h-full flex flex-col items-center">
                <Links />
              </div>
            </div>
      <Toaster />
    </main>
  );
}
