import { useCallback, useState } from "react";
import {getUserPublishedPosts} from "../../services/apiPosts";

function usePublishedPosts(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);

    const fetchPosts = useCallback(async (userId) => {
        if (!userId || userId === "undefined") return [];
        try {
            setIsLoading(true);
            setError(null);
            const data = await getUserPublishedPosts(userId);
            setPosts(data || []);
        } catch (err) {
            const message = err?.message;
            setError(message ?? "Failed to load published posts");
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {isLoading, error, posts, fetchPosts};
}


export default usePublishedPosts;

