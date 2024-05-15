import { Instrument_Sans } from "next/font/google";
import Signup from "@/components/Signup";
import Image from "next/image";
const font = Instrument_Sans({ subsets: ["latin"] });
import { Toaster } from "sonner";

export default function Home() {
  return (
    <main
      className={`${font.className} w-full h-[100vh] flex items-center justify-center bg-background`}
    >
      <div className="flex flex-col items-center justify-center">
        <Image
          width={185}
          height={40}
          src={"/images/logo-devlinks-large.svg"}
          className="mb-12"
        />
        <Signup />
      </div>
      <Toaster />
    </main>
  );
}
