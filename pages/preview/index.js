import { Instrument_Sans } from "next/font/google";

import { NextAuthProvider } from "@/contexts/AuthProvider";
import { ProfileCard } from "@/components/ProfileCard";

const font = Instrument_Sans({ subsets: ["latin"] });

import { Toaster } from "@/components/ui/sonner";
import PreviewNavBar from "@/components/PreviewNavBar";

export default function Home() {
  return (
    <main
      className={`${font.className} w-full min-h-screen max-h-screen grid grid-cols-1 bg-background`}
    >
            <div className="w-screen h-screen bg-background">
              <PreviewNavBar />
              <ProfileCard />
            </div>
      <Toaster />
    </main>
  );
}
