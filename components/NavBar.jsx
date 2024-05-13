import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
export default function NavBar() {
  const router = useRouter()

  const handlePreview = () => {
    router.push('/preview')
  }

  return (
    <div className="p-12 h-20 flex items-center justify-between rounded-xl mx-6 mt-6 bg-white">
      <Image
        alt="Devlinks Logo"
        width={185}
        height={40}
        src={"/images/logo-devlinks-large.svg"}
      />

      <Links />

      <button onClick={handlePreview} className="bg-white text-primary border-2 border-primary rounded-lg p-2 hover:bg-primary hover:text-white transition-all duration-300">
        Preview
      </button>
    </div>
  );
}

function Links() {
  "use client";
  const [isDashBoardActive, setIsDashBoardActive] = useState(true);
  const [isProfileActive, setIsProfileActive] = useState(true);
  const router = useRouter();
  const currentPathname = router.pathname;

  useEffect(() => {
    setIsDashBoardActive(currentPathname === "/dashboard");
    setIsProfileActive(currentPathname === "/profile");
  }, []);

  return (
    <nav>
      <ul className="flex items-center justify-between gap-x-4">
        <Link href={"/dashboard"} isActive={isDashBoardActive}>
          <Image
            alt="Header Link Icon"
            width={16}
            height={16}
            src={"/images/icon-links-header.svg"}
            style={{
              filter: isDashBoardActive
                ? "brightness(0) invert(52%) sepia(100%) saturate(7491%) hue-rotate(257deg) brightness(97%) contrast(94%)"
                : "",
            }}
          />
          Links
        </Link>
        <Link href={"/profile"} isActive={isProfileActive}>
          <Image
            alt="Header Link Icon"
            width={16}
            height={16}
            src={"/images/icon-profile-details-header.svg"}
            style={{
              filter: isProfileActive
                ? "brightness(0) invert(52%) sepia(100%) saturate(7491%) hue-rotate(257deg) brightness(97%) contrast(94%)"
                : "",
            }}
          />
          Profile Details
        </Link>
      </ul>
    </nav>
  );
}

function Link({ href, isActive, children }) {
  return (
    <a
      href={href}
      className={`bg-white text-borders flex items-center justify-center gap-x-2 p-2 rounded`}
      style={{
        backgroundColor: isActive ? "#EFEBFF" : "#fff",
        color: isActive ? "#633CFF" : "",
      }}
    >
      {children}
    </a>
  );
}
