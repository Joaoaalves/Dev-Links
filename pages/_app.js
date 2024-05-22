import "@/styles/globals.css";

import { PlatformProvider } from "@/hooks/usePlatforms";
import { ProfileProvider } from "@/hooks/useProfile";
import { NextAuthProvider } from "@/contexts/AuthProvider";

export default function App({ Component, pageProps }) {
  return (
    <NextAuthProvider>
      <PlatformProvider>
        <ProfileProvider>
          <Component {...pageProps} />
        </ProfileProvider>
      </PlatformProvider>
    </NextAuthProvider>
  )
}
