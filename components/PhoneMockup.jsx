import Image from "next/image"
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

function Links({children}){
    return (
        <div className="absolute top-[277px] left-1/2 -translate-x-1/2  w-[237px]  flex flex-col items-center gap-y-5">
            {children}
        </div>
    )
}

function Link({ children, href, className }) {
    return (
        <a target="_blank" href={href} rel="noopener noreferrer" passHref className={`w-full h-11 rounded-lg grid grid-cols-[2em_1fr_2em] items-center align-center text-white ${className}`}>
            {children}
            <Image src="/images/icon-arrow-right.svg" width={11} height={11} className="place-self-center"/>
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