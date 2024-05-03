import {Instrument_Sans} from "next/font/google"

import PhoneMockup from "@/components/PhoneMockup";

import Image from "next/image";
const font = Instrument_Sans({subsets: ['latin']})


export default function Home() {
  return (
    <main
      className={`${font.className} w-full h-[100vh] flex items-center justify-center bg-background`}
    >
      <div className="flex flex-col items-center justify-center">
        <PhoneMockup.Root>
        </PhoneMockup.Root>
      </div>
    </main>
  );
}
