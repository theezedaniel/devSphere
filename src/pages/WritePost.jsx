import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";   
import FormButton from "../components/FormButton";
import { useAuth } from "../context/AuthContext";
import useWritePost from "../features/posts/useWritePost";
import useEditPostById from "../features/posts/useEditPostById";

function WritePost(){
    const {user} = useAuth();
    const {postId} = useParams();
    const {writePost, loading} = useWritePost(user);
    const {post, fetchPost} = useEditPostById();

    const isEditMode = Boolean(postId); //makes sure we are editing an existing post and not creating a new one

    const MAX_IMAGE_SIZE = 5 * 1024 * 1024; //5MB
    
    const [form, setForm] = useState({
        title: "",
        summary: "",
        content: "",
        tags: "",
        cover_image_url: "",
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (type === "file") {
            // For file inputs, store the File object
            const file = files[0];
            if(file && file.size > MAX_IMAGE_SIZE) {
                alert("File size exceeds the 5MB limit. Please choose a smaller file.");
                return;
            }
            setForm(prevForm => ({
                ...prevForm,
                [name]: file, // Store the actual file
            }));
        } else {
            // For text inputs
            setForm(prevForm => ({
                ...prevForm,
                [name]: value,
            }));
        }
    }

    const handleSubmit = (published = false) => {
        if(!form.title || !form.summary || !form.content ||!form.cover_image_url) return;

        //size guard for file
        const fileObj = typeof form.cover_image_url === "string" ? null : form.cover_image_url;
        if (fileObj && fileObj.size > MAX_IMAGE_SIZE) {
            alert("Image must be under 5MB");
            return;
        }

        //check if its a file or a string (in edit mode, it will be a string, in create mode, it will be a file)
        const coverImage = typeof form.cover_image_url === "string" ? form.cover_image_url : form.cover_image_url;

        const normalizedTagsText = form.tags
            .split(',')
            .map(t => t.trim())
            .filter(Boolean)
            .join(',');
  
        writePost(
            {
            ...form,
            coverImageUrl: coverImage, //coverImage,
            tags: normalizedTagsText,
            published,
        },
        postId //pass postId to update existing post, if postId is undefined, a new post will be created);
    );
    }

    useEffect(()=>{
        if(!isEditMode) return;

        fetchPost(postId);
        
    }, [postId]);

    useEffect(()=>{
        if(post){
            setForm(post);
        }
    }, [post]);


    const inputClass = "w-full border-l border-l-neutral-300 focus:border-l-neutral-500 outline-0 p-3";

    if(isEditMode && !post) return <p>Loading post...</p> 
    return (
        <form className="flex-6 space-y-6 p-6 lg:p-10 lg:space-y-10 " 
        onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(false);
        }}>
            {/* <h1 className="text-3xl font-bold">Write a new post</h1> */}
            <input
            type="file"
            id="coverImage"
            name="cover_image_url"
            accept="image/*"
            className="text-lg rounded-sm file:font-medium file:px-3 file:py-2 file:mr-3 file:rounded-sm file:border-0 file:bg-primary file:text-blue-50 file:cursor-pointer file:transition-colors file:duration-200 hover:file:bg-primary"
            onChange={handleChange}
            />

            {form.cover_image_url && 
                <picture className="w-90 rounded overflow-hidden block md:w-120">
                    <img
                    src={typeof form.cover_image_url === "string" 
                        ? form.cover_image_url 
                        : URL.createObjectURL(form.cover_image_url)}
                    alt="Cover preview"
                    className="w-full object-cover rounded"
                    />
                </picture>
            }



            <input
            type="text"
            name="title"
            id="title"
            placeholder="Post title"
            className={`${inputClass} placeholder:uppercase placeholder:tracking-widest font-semibold text-3xl`}
            value={form.title}
            onChange={handleChange} />

            <textarea
            placeholder="Short summary"
            name="summary"
            id="summary"
            className={`${inputClass} text-lg h-24`}
            value={form.summary}
            onChange={handleChange} />


        <input
            type="text"
            name="tags"
            id="tags"
            placeholder="Tags (comma separated)"
            className={`${inputClass} text-lg`}
            value={form.tags}
            onChange={handleChange} />

        <textarea
            placeholder="Write your article here..."
            name="content"
            id="content"
            className={`${inputClass} text-lg h-64`}
            value={form.content}
            onChange={handleChange}
        />

        <div className="flex gap-4">
            <FormButton 
            text={"save draft"} 
            disabled={loading} onClick={() => handleSubmit(false)} />
            <FormButton 
            text={isEditMode ? "update post" : "publish"} 
            disabled={loading} onClick={() => handleSubmit(true)} />
        </div>

        </form>
    )
}

export default WritePost;

