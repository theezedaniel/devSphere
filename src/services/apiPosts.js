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


export async function writePost({
    title, summary, content, tags, cover_image_url, read_time, published,
}, postId) {
    
    // If postId exists, UPDATE the post; otherwise INSERT a new one
    let query;
    
    if (postId) {
        // UPDATE existing post
        query = supabase
            .from('posts')
            .update({ title, summary, content, tags, cover_image_url, read_time, published })
            .eq('id', postId)
            .select();
    } else {
        // INSERT new post
        query = supabase
            .from('posts')
            .insert([
                { title, summary, content, tags, cover_image_url, read_time, published },
            ])
            .select();
    }

    const { error } = await query;

    if (error) {
        console.error(error);
        throw new Error(postId ? "Post could not be updated!" : "Post could not be created!");
    }
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





