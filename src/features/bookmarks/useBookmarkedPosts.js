import { useCallback, useState } from "react";
import {getUserBookmarks} from "../../services/apiBookmark"; 


function useBookmarkedPosts(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);

    const fetchPosts = useCallback(async (userId) => {
        if (!userId || userId === "undefined") return;

        try {
            setIsLoading(true);
            setError(null);
            const data = await getUserBookmarks({userId});
            setPosts(data || []);
        } catch (err) {
            const message = err?.message;
            setError(message ?? "Failed to load bookmarked posts!");
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {isLoading, error, posts, fetchPosts};
}


export default useBookmarkedPosts;

