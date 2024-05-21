import { useRouter } from "next/router";
import { ProfileProvider } from "@/hooks/useProfile";
import { ProfileCard } from "@/components/ProfileCard";
import { PlatformProvider } from "@/hooks/usePlatforms";
import ProfileHeader from "@/components/ProfileHeader";

export default function Page() {
  const router = useRouter();
  const userId = router.query.user;

  if (!userId) {
    return <h1>Invalid Url...</h1>;
  }

  return (
    <div className="w-screen h-screen bg-background">
      <PlatformProvider>
        <ProfileProvider userId={userId}>
          <ProfileHeader>
          <ProfileCard />
          </ProfileHeader>
        </ProfileProvider>
      </PlatformProvider>
    </div>
  );
}
