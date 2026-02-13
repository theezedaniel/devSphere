import { useState } from "react";
import { writePost as apiWritePost } from "../../services/apiPosts";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { slugify } from "../../utils/slugify";

function useWritePost(user) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function writePost({
        title, summary, content, tags, coverImageUrl, published, 
    }, postId){

        const slug = slugify(title);

        const readTime = Math.ceil(content.split(' ').length / 200);

        setLoading(true);
        setError(null);
        try {
            await apiWritePost({
                title, 
                summary, 
                content, 
                tags, 
                cover_image_url: coverImageUrl, 
                read_time: readTime, 
                published,
                author_id: user.id,
            }, postId)
            toast.success(`Post ${published ? "published" : "saved as draft"} successfully`);
            navigate(published ? `/posts/${slug}` : '/posts');
        }
        catch(err){
            const message = err?.message;
            setError(message ?? "Failed to write post");
            toast.error(message ?? "Failed to write post");
            throw err;            
        }
        finally{
            setLoading(false);
        }
    }

    return {loading, error, writePost};
}


export default useWritePost;