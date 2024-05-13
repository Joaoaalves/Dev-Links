import { useProfile } from "@/hooks/useProfile";
import { usePlatforms } from "@/hooks/usePlatforms";
import Image from "next/image";
export function ProfileCard(){
    return (
        <div className="flex flex-col items-center rounded-[24px] bg-white shadow-md p-12 w-96 min-h-96 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <ProfileImage />
            <Name />
            <Email />
            <Links />
        </div>
    )
}

function ProfileImage(){
    const {image, firstName} = useProfile()

    return (
        <Image
        className="rounded-full size-24 z-10 bg-white bg-center border-2 border-primary"
        src={image}
        width={96}
        height={96}
        alt={`Foto de ${firstName}.`}
      />
    )
}

function Name(){
    const {firstName, lastName} = useProfile()

    return (
        <h1 className="text-2xl font-bold mt-6">{`${firstName} ${lastName}`}</h1>
    )
}

function Email(){
    const {email} = useProfile()

    return (
        <p className="text-borders/80 text-[16px]">{email}</p>
    )
}

function Links(){
    const {links} = useProfile()

    return (
        <div className="flex flex-col items-center justify-center gap-y-[20px] min-w-full mt-14">
            {links && links.map(link => (
                <Link link={link} />
            ))}
        </div>
    )
}

function Link({link}){
  const {getPlatform} = usePlatforms()
  const platform = getPlatform(link.platform)
  if(!platform)
    return
  return (
    <a
      target="_blank"
      href={link.url}
      rel="noopener noreferrer"
      passHref
      className={`w-full rounded-lg grid grid-cols-[2em_1fr_2em] items-center align-center p-4 shadow-[0px_2px_6px_4px_rgba(0,0,0,0.08)] font-bold`}
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
    </a>
  );
}
     