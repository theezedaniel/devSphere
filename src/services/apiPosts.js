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

export async function writePost({
    title, summary, content, tags, cover_image_url, read_time, published,
}) {
    
    const {error } = await supabase
    .from('posts')
    .insert([
        { title, summary, content, tags, cover_image_url, read_time, published },
    ])
    .select()

    if (error) 
    {
        console.error(error);
        throw new Error("Post could not be created!");
    }

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





