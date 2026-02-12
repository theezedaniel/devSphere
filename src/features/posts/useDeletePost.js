import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost as apiDeletePost } from "../../services/apiPosts";
import toast from "react-hot-toast";

function useDeletePost(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function deletePost(postId){
        setLoading(true);
        setError(null);
        try{
            await apiDeletePost(postId); 
            toast.success("Post deleted successfully!");
            navigate("/posts");   
        } catch(error){
            const message = error?.message || "An error occurred while deleting the post.";
            setError(message);
        } finally {
            setLoading(false);
        }
    }

    return { deletePost, loading, error };
}


export default useDeletePost;