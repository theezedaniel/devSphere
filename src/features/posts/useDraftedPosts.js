import { useEffect, useState } from "react";
import {getUserDrafts} from "../../services/apiPosts";

function useDraftedPosts(userId){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getUserDrafts(userId);
            setPosts(data ?? []);
        } catch (err) {
            const message = err?.message;
            setError(message ?? "Failed to load posts");
        } finally {
            setIsLoading(false);
        }
    }

    //fetch posts on mount
    useEffect(()=>{
        fetchPosts();
    }, [userId]);

    return {isLoading, error, posts, fetchPosts};
}


export default useDraftedPosts;userId



Drafted