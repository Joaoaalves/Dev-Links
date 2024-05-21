"use client";
import { Instrument_Sans } from "next/font/google";
import Login from "@/components/Login";
import Image from "next/image";
const font = Instrument_Sans({ subsets: ["latin"] });

import { NextAuthProvider } from "@/contexts/AuthProvider";

export default function Home() {
  return (
    <main
      className={`${font.className} w-full h-[100vh] flex items-center justify-center bg-background`}
      role="main"
    >
        <div className="flex flex-col items-center justify-center">
          <Image
            width={185}
            height={40}
            src={"/images/logo-devlinks-large.svg"}
            className="mb-12"
            alt="Logo of DevLinks"
          />
          <Login />
        </div>
    </main>
  );
}
