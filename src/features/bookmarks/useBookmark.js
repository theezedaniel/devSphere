import { useState } from "react";
import { setBookmark } from "../../services/apiBookmark";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function useBookmark(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const navigate = useNavigate();
    const {user} = useAuth();

    async function bookmarkPost({postId}){

        try{
            setLoading(true)
            setError(null)
            if (user){
                const userId = user?.id;
                const data = await setBookmark({userId, postId})
                if(data) 
                    setIsBookmarked(true)
                toast.success("Post has been addded to your bookmarks")
            }
            else {
                navigate("/login")
            }
           
        }
        catch(err){
            const message = err?.message;
            setError(message ?? "Failed to bookmark post");
            toast.error("Failed to bookmark post")
        }
        finally{
            setLoading(false);
        }
    }

    return {loading, error, isBookmarked, bookmarkPost}
}