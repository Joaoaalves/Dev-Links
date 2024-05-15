import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/router";
import { toast } from "sonner";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL;

export default function PreviewNavBar() {
  const router = useRouter();
  const { userId } = useProfile();

  const copyToClipboard = () => {
    const textToCopy = `${APP_URL}/links/${userId}`;
    try {
      navigator.clipboard.writeText(textToCopy).then(showToast);
    } catch {
      fallbackCopyTextToClipboard();
    }
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      errorToast();
    }
    document.body.removeChild(textArea);
  };

  const showToast = () => {
    toast("The link has been copied to your clipboard!", {
      position: "bottom-center",
      style: {
        backgroundColor: "#333333",
        color: "white",
        textAlign: "center",
      },
    });
  };

  const errorToast = () => {
    toast("An error occurred while copying to clipboard.", {
      position: "bottom-center",
      style: {
        backgroundColor: "#FF3939",
        color: "white",
        textAlign: "center",
      },
    });
  };

  return (
    <div className="bg-primary rounded-b-[32px] w-screen h-96 p-6">
      <div className="bg-white w-full px-6 py-3 flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between rounded-xl gap-2">
        <button
          onClick={() => router.push("/dashboard")}
          className="text-primary border-2 border-primary py-2 px-3 lg:px-6 rounded-md hover:bg-primary hover:text-white transition-all duration-200 lg:w-auto w-full"
        >
          Back to Editor
        </button>
        <button
          onClick={copyToClipboard}
          className="text-white bg-primary border-2 border-primary py-2 px-3 lg:px-6 rounded-md hover:bg-primary/90 transition-all duration-200 lg:w-auto w-full"
        >
          Share Link
        </button>
      </div>
    </div>
  );
}
