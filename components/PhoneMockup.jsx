import { useProfile } from "@/hooks/useProfile"
import Image from "next/image"
import { useEffect,useState } from "react"

const res = await fetch("http://localhost:3000/platforms.json")
const platforms = await res.json()

function Root({children}){
    return (
        <div className="relative h-[630px] w-[307px] bg-center bg-no-repeat" style={{backgroundImage: "url(/images/illustration-phone-mockup.svg"}}>
            {children}
        </div>
    )
}

function ProfileImage({src}){
    return (
        <div className="rounded-full absolute top-16 left-1/2 -translate-x-1/2 size-24 z-10 bg-white bg-center" style={{backgroundImage: `url(${src})`}}/>
    )
}

function Name({children}){
    return (
        <h1 className="absolute left-1/2 -translate-x-1/2 top-[180px] rounded-lg h-6 w-40 bg-white text-center">{children}</h1>
    )
}

function Email({children}){
    return (
        <h2 className="absolute left-1/2 -translate-x-1/2 top-[208px] rounded-lg h-4 w-auto bg-white text-center text-xs">{children}</h2>
    )
}

function Links(){
    const {links} = useProfile()


    return (
        <div className="absolute top-[277px] left-1/2 -translate-x-1/2  w-[237px]  flex flex-col items-center gap-y-5">
            {links && links.map((link, index) => (
                <Link link={link} key={`mockupLink-${index}`}/>
            ))}
        </div>
    )
}

function Link({link}) {
    "use state"
    const [platform, setPlatform] = useState()
    useEffect(() => {
        platforms.map((platform) => {
            if(platform.value === link.platform){
                setPlatform(platform)
            }
        })
    }, [link])

    if(!platform)
        return

    return (
        <a target="_blank" href={link.url} rel="noopener noreferrer" passHref className={`w-full h-11 rounded-lg grid grid-cols-[2em_1fr_2em] items-center align-center ps-3 shadow-[0px_2px_6px_4px_rgba(0,0,0,0.08)]`} style={{
            backgroundColor: platform.color,
            color: platform.textColor
        }}>
            <Image src={platform.icon} width={16} height={16} alt={`${link.platform}'s Icon`}  className="filter" style={{
                filter: platform.textColor === '#ffffff' ? "brightness(0) invert(1)" : "saturate(1) brightness(1) invert(1)",
            }}/>
            {platform.name}
            <Image src="/images/icon-arrow-right.svg" width={16} alt="Arrow Right Icon" height={11} className="place-self-center" style={{
                filter: platform.textColor === '#ffffff' ? "brightness(0) invert(1)" : "saturate(1) brightness(1) invert(1)",
            }}/>
        </a>
    );
}

export default{
    Root,
    ProfileImage,
    Name,
    Email,
    Links,
    Link
}