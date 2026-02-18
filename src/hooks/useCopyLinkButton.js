import { useState } from "react";
import toast from "react-hot-toast";

export default function useCopyLinkButton(){
    const [copied, setCopied] = useState(false);

    async function handleCopyLink(url) {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            toast.success("Link copied to clipboard!");
            setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
        } catch (err) {
            console.error("Failed to copy link:", err);
            toast.error("Failed to copy link. Please try again.");
        }
    }

    return { copied, handleCopyLink };
}



