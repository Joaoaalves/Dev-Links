import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function NavBar() {
  const router = useRouter();

  const handlePreview = () => {
    router.push("/preview");
  };

  return (
    <div className="p-12 h-20 flex items-center justify-between rounded-xl lg:mx-6 lg:mt-6 bg-white">
      <Image
        alt="Devlinks Logo"
        width={185}
        height={40}
        src={"/images/logo-devlinks-large.svg"}
        className="hidden lg:block"
      />

      <Image
        alt="Devlinks Logo"
        width={36}
        height={36}
        src={"/images/logo-devlinks-small.svg"}
        className="block lg:hidden"
      />

      <Links />

      <button
        onClick={handlePreview}
        className="bg-white text-primary border border-primary rounded-lg p-2 sm:px-3 lg:px-2 hover:bg-primary hover:text-white transition-all duration-300 group"
      >
        <span className="hidden lg:block">Preview</span>
        <Image
          src={"/images/icon-preview-header.svg"}
          width={20}
          height={20}
          className="group-hover:filter group-hover:invert group-hover:brightness-0 transition-all duration-300 lg:hidden"
          alt="Preview icon."
        />
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
            alt="Links dashboard icon."
            width={24}
            height={24}
            src={"/images/icon-links-header.svg"}
            style={{
              filter: isDashBoardActive
                ? "brightness(0) invert(52%) sepia(100%) saturate(7491%) hue-rotate(257deg) brightness(97%) contrast(94%)"
                : "",
            }}
            className="w-5 sm:w-6"
          />
          <span className="hidden lg:block">Links</span>
        </Link>
        <Link href={"/profile"} isActive={isProfileActive}>
          <Image
            alt="Profile link icon."
            width={24}
            height={24}
            src={"/images/icon-profile-details-header.svg"}
            style={{
              filter: isProfileActive
                ? "brightness(0) invert(52%) sepia(100%) saturate(7491%) hue-rotate(257deg) brightness(97%) contrast(94%)"
                : "",
            }}
            className="w-5 sm:w-6"
          />
          <span className="hidden lg:block">Profile Details</span>
        </Link>
      </ul>
    </nav>
  );
}

function Link({ href, isActive, children }) {
  return (
    <a
      href={href}
      className={`bg-white text-borders flex items-center justify-center gap-x-2 p-2 sm:px-5 sm:py-2 lg:px-2 rounded`}
      style={{
        backgroundColor: isActive ? "#EFEBFF" : "#fff",
        color: isActive ? "#633CFF" : "",
      }}
    >
      {children}
    </a>
  );
}
