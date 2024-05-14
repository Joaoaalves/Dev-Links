import { useProfile } from "@/hooks/useProfile"
import { useRouter } from "next/router"
import { toast } from "sonner"

const APP_URL = process.env.NEXT_PUBLIC_APP_URL

export default function PreviewNavBar(){
    const router = useRouter();
    const {userId} = useProfile()

    const copyToClipboard = () => {
      navigator.clipboard.writeText(`${APP_URL}/links/${userId}`).then(() => {
        toast("The link has been copied to your clipboard!", {
          position: "bottom-center",
          style: {
            backgroundColor: "#333333",
            color: "white",
            textAlign: "center",
          },
        });
      });
    };

    return (
        <div className="bg-primary rounded-b-[32px] w-screen h-96 p-6">
        <div className="bg-white w-full px-6 py-3 flex items-center justify-between rounded-xl">
          <button
            onClick={() => router.push("/dashboard")}
            className="text-primary border-2 border-primary py-3 px-6 rounded-md hover:bg-primary hover:text-white transition-all duration-200"
          >
            Back to Editor
          </button>
          <button
            onClick={copyToClipboard}
            className="text-white bg-primary border-2 border-primary py-3 px-6 rounded-md hover:bg-primary/90  transition-all duration-200"
          >
            Share Link
          </button>
        </div>
      </div>
    )
}