import {Instrument_Sans} from "next/font/google"

import PhoneMockup from "@/components/PhoneMockup";
import NavBar from "@/components/NavBar"
import Links from "@/components/Links";

import { ProfileProvider } from "@/hooks/useProfile";
const font = Instrument_Sans({subsets: ['latin']})


export default function Home() {
  return (
    <main
      className={`${font.className} w-full min-h-screen max-h-screen bg-background grid grid-cols-1 grid-rows-[126px_1fr]`}
    >
      <ProfileProvider>
      <NavBar />
      <div className="flex w-full h-full items-center justify-center gap-0">
        <div className="w-2/5 h-full flex items-center justify-center">
          <PhoneMockup.Root>
            <PhoneMockup.Links />
          </PhoneMockup.Root>
        </div>

        <div className="w-3/5 h-full flex flex-col items-center pe-24">
          <Links />
        </div>
      </div>
      </ProfileProvider>
    </main>
  );
}
