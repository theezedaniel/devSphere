import supabase, {supabaseUrl} from "./supabase";


export async function setBookmark({userId, postId}){
    const {data, error} = await supabase
    .from("bookmarks")
    .insert({user_id: userId, post_id: postId})
    .select()
    .single()

    if(error){
        console.error(error);
        throw new Error("Failed to bookmark post!")
    }

    
    return data;
}





