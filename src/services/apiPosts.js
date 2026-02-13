import supabase, {supabaseUrl} from "./supabase";


export async function getPosts(){
    
    const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)


    if(error){
        console.error(error);
        throw new Error("Posts could not be loaded!");
    }

    return posts;
}
export async function getPostById(postId){
    
    const { data: post, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .single();

    if(error){
        console.error(error);
        throw new Error("Post could not be loaded!");
    }

    return post;
}


export async function getUserDrafts(userId) {
    const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("author_id", userId)
    .eq("published", false)
    .order("created_at", { ascending: false });
    
    if(error){
        console.error(error);
        throw new Error("Posts could not be loaded!");
    }
    
    return posts;
}

export async function getUserPublishedPosts(userId) {
    const { data: posts, error } = await supabase
    .from("posts")
    .select("*")
    .eq("author_id", userId)
    .eq("published", true)
    .order("created_at", { ascending: false });

    if(error){
        console.error(error);
        throw new Error("Posts could not be loaded!");
    }
    
    return posts;
}


export async function writePost(post, postId) {
    

    //1.checking if it has an image path already
    const hasImagePath = post.cover_image_url?.startsWith?.(supabaseUrl);
    //2.create an image name (use file name when a File object)
    // choose a base for the image name: existing path, string name, File.name, or fallback 'image'
    const imageBase = hasImagePath ? post.cover_image_url : (typeof post.cover_image_url === "string" ? post.cover_image_url : post.cover_image_url?.name || 'image');
    const imageName = `${Math.random()}-${imageBase}`.replaceAll("/", "");
 
    //3.make sure it follows this pattern   https://cbicjzbuopidnsoqmbqa.supabase.co/storage/v1/object/public/post-images/team3.jpg
    const imagePath = hasImagePath ? post.cover_image_url : `${supabaseUrl}/storage/v1/object/public/post-images/${imageName}`
     
    // If postId exists, UPDATE the post; otherwise INSERT a new one
    let query;
     
    if (postId) {
        // UPDATE existing post
        query = supabase
            .from('posts')
            .update({ ...post, cover_image_url: imagePath })
            .eq('id', postId)
            .select();
    } else {
        // INSERT new post
        query = supabase
            .from('posts')
            .insert([
                { ...post, cover_image_url: imagePath },
            ])
            .select();
    }
 
    const {data, error } = await query;
 
    if (error) {
        console.error(error);
        throw new Error(postId ? "Post could not be updated!" : "Post could not be created!");
    }
 
     //2. Upload image
    if(hasImagePath) return data;
    // if the cover was already a hosted URL, skip upload and return DB result
    const {error: storageError } = await supabase
    .storage
    .from('post-images')
    .upload(imageName, post.cover_image_url)
    //3. Delete the post if there was an error uploading image
    if(storageError) {
        await supabase
    .from("posts")
    .delete()
    .eq("id", Array.isArray(data) ? data[0]?.id : data?.id);
     console.error(storageError)
     throw new Error("Post image could not be uploaded and the post was not created")
     }
 
     return data;
}


export async function deletePost(postId){
    const {error} = await supabase
    .from("posts")
    .delete()
    .eq("id", postId);

    if(error){
        console.error(error);
        throw new Error("Post could not be deleted!");
    }
}





