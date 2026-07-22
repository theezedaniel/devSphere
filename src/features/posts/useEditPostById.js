import { useState } from "react";
import { getPostById } from "../../services/apiPosts";

function useEditPostById(){
    const [post, setPost] = useState(null);

    const fetchPost = async (postId) => {
        try {
            const data = await getPostById(postId);

            if (data) {
                setPost({
                    title: data.title || "",
                    summary: data.summary || "",
                    content: data.content || "",
                    // Check if tags is an array, otherwise fallback to handling comma strings safely
                    tags: Array.isArray(data.tags) 
                        ? data.tags.join(", ") 
                        : (typeof data.tags === "string" ? data.tags : ""),                    
                    cover_image_url: data.cover_image_url || "", 
                });
            }
        } catch (error) {
            console.error("Error fetching single post details:", error.message);
        }
    };

    return { post, fetchPost };
}

export default useEditPostById;
