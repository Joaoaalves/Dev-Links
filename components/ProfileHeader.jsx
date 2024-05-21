import { useProfile } from "@/hooks/useProfile";

export default function ProfileHeader({children}){
    const {color} = useProfile()

    return (
        <div className={`rounded-b-[32px] w-screen h-96 p-6`} style={{backgroundColor: color}}>
            {children}
        </div>
    )
}