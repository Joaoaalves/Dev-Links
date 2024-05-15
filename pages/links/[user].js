import { useRouter } from "next/router";
import { ProfileProvider } from "@/hooks/useProfile";
import { ProfileCard } from "@/components/ProfileCard";
import { PlatformProvider } from "@/hooks/usePlatforms";

export default function Page() {
  const router = useRouter();
  const userId = router.query.user;

  if (!userId) {
    return <h1>Invalid Url...</h1>;
  }

  return (
    <div className="w-screen h-screen bg-background">
      <div className="bg-primary w-screen h-96 rounded-b-[24px]"></div>
      <PlatformProvider>
        <ProfileProvider userId={userId}>
          <ProfileCard />
        </ProfileProvider>
      </PlatformProvider>
    </div>
  );
}
