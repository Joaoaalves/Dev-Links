import { useProfile } from "@/hooks/useProfile";
import { usePlatforms } from "@/hooks/usePlatforms";
import Image from "next/image";
export function ProfileCard() {
  const {error} = useProfile()

  if(error)
    return(
      <div className="flex flex-col items-center justify-center rounded-[24px] bg-white shadow-md p-12 w-96 min-h-72 mt-8 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-red text-center font-bold text-4xl">
          Error 404
        </h1>
        <span className="text-borders text-xl">An error ocurred!</span>
        <p>Check if your link is correct, if it is, contact us.</p>
      </div>
    )
  
  return (
    <div className="flex flex-col items-center rounded-[24px] bg-white shadow-md p-6 sm:p-12 min-w-[90vw] sm:min-w-80 xl:min-w-96 xl:min-h-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <ProfileImage />
      <Name />
      <Email />
      <Links />
    </div>
  );
}

function ProfileImage() {
  const { image, firstName } = useProfile();
  
  if(!image)
    return

  return (
    <Image
      className="rounded-full size-24 z-10 bg-white bg-center border-2 border-primary"
      src={image}
      width={96}
      height={96}
      alt={`Foto de ${firstName}.`}
    />
  );
}

function Name() {
  const { firstName, lastName } = useProfile();

  return (
    <h1 className="text-lg sm:text-2xl font-bold mt-6 text-center flex-1">{`${firstName} ${lastName}`}</h1>
  );
}

function Email() {
  const { email } = useProfile();

  return <p className="text-borders/80 text-sm sm:text-[16px]">{email}</p>;
}

function Links() {
  const { links } = useProfile();
  
  return (
    <div className="flex flex-col items-center justify-center gap-y-[20px] min-w-full mt-14">
      {links && links.map((link, index) => <Link link={link} key={`link-${index}`}/>)}
    </div>
  );
}

function Link({ link }) {
  const { getPlatform } = usePlatforms();
  const platform = getPlatform(link.platform);
  if (!platform) return;
  return (
    <a
      target="_blank"
      href={link.url}
      rel="noopener noreferrer"
      passhref="true"
      className={`w-full text-sm md:text-md rounded-lg grid grid-cols-[2em_1fr_2em] items-center align-center p-2 sm:p-4 shadow-[0px_2px_6px_4px_rgba(0,0,0,0.08)] font-bold`}
      style={{
        backgroundColor: platform.color,
        color: platform.textColor,
      }}
    >
      <Image
        src={platform.icon}
        width={24}
        height={24}
        alt={`${link.platform}'s Icon`}
        className="size-5 md:size-6 filter"
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
    </a>
  );
}
