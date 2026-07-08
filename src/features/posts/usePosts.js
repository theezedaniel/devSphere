import { useEffect, useState } from "react";
import {getPostById, getPosts} from "../../services/apiPosts";

function usePosts(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(null);

    async function fetchPosts() {
        try {
            setIsLoading(true);
            setError(null);
            const data = await getPosts();
            setPosts(data ?? []);
        } catch (err) {
            const message = err?.message;
            setError(message ?? "Failed to load posts");
        } finally {
            setIsLoading(false);
        }
    }

    async function fetchPostById(postId){
        try {
            setIsLoading(true);
            setError(null);
            
            const data = await getPostById(postId);
            setPost(data ?? null);
        } catch (err){
            const message = err?.message;
            setError(message ?? "Failed to load post")
        } finally {
            setIsLoading(false);
        }
    }

    //fetch posts on mount
    useEffect(()=>{
        fetchPosts();
    }, []);

    return {isLoading, error, posts, post, fetchPosts, fetchPostById};
}


export default usePosts;



