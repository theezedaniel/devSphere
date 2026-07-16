import { useEffect, useState } from "react";
import { checkIsBookmarked, removeBookmark, setBookmark } from "../../services/apiBookmark";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../components/Modal";

export function useBookmark(postId){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);
    

    const {user} = useAuth();
    const {open} = useModal();

    useEffect(()=> {
        async function fetchBookmarkStatus(){
            if(!user || !postId) return ;
            try{
                const bookmarkedStatus = await checkIsBookmarked({userId: user?.id, postId})
                setIsBookmarked(bookmarkedStatus);
            }
            catch (err){
                console.error("Error checking initial bookmark state: ", err)                
            }
        }

        fetchBookmarkStatus();
    }, [user, postId])

    async function bookmarkPost({postId, authorId}){
        try{
            setLoading(true)
            setError(null)
            if (user){
                const userId = user?.id;
                await setBookmark({userId, postId, authorId})
                setIsBookmarked(true)
                toast.success("Post has been addded to your bookmarks")
            }
            else {
                open("sign-in"); 
                toast.error("Please sign in to bookmark posts");
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

    async function removePostBookmark({postId}){
        try{
            setLoading(true)
            setError(null)
            if (user){
                const userId = user?.id;
                await removeBookmark({userId, postId})
                setIsBookmarked(false)
                toast.success("Post has been removed from your bookmarks")
            }
            else {
                open("sign-in"); 
                toast.error("Please sign in to bookmark posts");
            }
           
        }
        catch(err){
            const message = err?.message;
            setError(message ?? "Failed to remove bookmarked post");
            toast.error("Failed to remove bookmarked post")
        }
        finally{
            setLoading(false);
        }
    }

    

    return {loading, error, isBookmarked, bookmarkPost, removePostBookmark}
}