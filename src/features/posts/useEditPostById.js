import { useState } from "react";
import {getPostById} from "../../services/apiPosts";

function useEditPostById(){
    const [post, setPost] = useState(null);

    const fetchPost = async (postId) => {
    const data = await getPostById(postId);

    setPost({
      title: data.title || "",
      summary: data.summary || "",
      content: data.content || "",
      tags: Array.isArray(data.tags) ? data.tags.join(", ") : "",
        });
    };

    return { post, fetchPost };
}


export default useEditPostById;

