import { usePlatforms } from "@/hooks/usePlatforms";
import { useProfile } from "@/hooks/useProfile";
import Image from "next/image";
import Link from 'next/link'

function Root({ children }) {
  return (
    <div className="bg-white w-full flex items-center justify-center rounded-xl">
      <div
        className="relative h-[630px] w-[307px] bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/illustration-phone-mockup.svg" }}
      >
        {children}
      </div>
    </div>
  );
}

function ProfileImage() {
  const { image, firstName } = useProfile();

  if (!image) return;

  return (
    <Image
      className="rounded-full absolute top-16 left-1/2 -translate-x-1/2 size-24 z-10 bg-white bg-center"
      src={image}
      width={96}
      height={96}
      alt={`Foto de ${firstName}.`}
    />
  );
}

function Name() {
  const { firstName, lastName } = useProfile();

  if (!firstName) return;

  return (
    <h1 className="absolute left-1/2 -translate-x-1/2 top-[180px] rounded-lg h-6 w-40 bg-white text-center truncate">
      {`${firstName} ${lastName}`}
    </h1>
  );
}

function Email() {
  const { email } = useProfile();
  return (
    <h2 className="absolute left-1/2 -translate-x-1/2 top-[208px] rounded-lg h-4 w-auto bg-white text-center text-xs">
      {email}
    </h2>
  );
}

function Links() {
  const { links } = useProfile();
  return (
    <div className="absolute top-[277px] left-1/2 -translate-x-1/2  w-[237px]  flex flex-col items-center gap-y-5">
      {links &&
        links.map((link, index) => (
          <UserLink link={link} key={`mockupLink-${index}`} />
        ))}
    </div>
  );
}

function UserLink({ link }) {
  const { getPlatform } = usePlatforms();
  const platform = getPlatform(link.platform);

  if (!platform) return;
  return (
    <Link
      target="_blank"
      href={link.url}
      rel="noopener noreferrer"
      passhref="true"
      className={`w-full h-11 rounded-lg grid grid-cols-[2em_1fr_2em] items-center align-center ps-3 shadow-[0px_2px_6px_4px_rgba(0,0,0,0.08)]`}
      style={{
        backgroundColor: platform.color,
        color: platform.textColor,
      }}
    >
      <Image
        src={platform.icon}
        width={16}
        height={16}
        alt={`${link.platform}'s Icon`}
        className="filter"
        style={{
          filter:
            platform.textColor === "#ffffff"
              ? "brightness(0) invert(1)"
              : "saturate(1) brightness(1) invert(1)",
        }}
      />
      {platform.name}
      <Image
        src="/images/icon-arrow-right.svg"
        width={16}
        alt="Arrow Right Icon"
        height={11}
        className="place-self-center"
        style={{
          filter:
            platform.textColor === "#ffffff"
              ? "brightness(0) invert(1)"
              : "saturate(1) brightness(1) invert(1)",
        }}
      />
    </Link>
  );
}

export default {
  Root,
  ProfileImage,
  Name,
  Email,
  Links,
  UserLink,
};
