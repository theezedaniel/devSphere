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

export async function checkIsBookmarked({userId, postId}){
    const {data, error} = await supabase
    .from("bookmarks")
    .select("id")
    .eq("user_id", userId)
    .eq("post_id", postId)
    .maybeSingle(); //returns null safely instead of throwing error if no row is found

    if(error){
        console.error(error);
        throw new Error(error?.message);
    }

    return data !== null; //returns true if a bookmark row exist and false if it doesn't
}

export async function removeBookmark({userId, postId}){
    const {data, error} = await supabase
    .from("bookmarks")
    .delete()
    .eq("user_id", userId)
    .eq("post_id", postId)

    if(error){
        console.log(error);
        throw new Error("Failed to remove bookmark!")
    }

    return data
}

export async function getBookmarks({userId}){
    const {data, error} = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", userId)
    .single()

    if(error){
        console.error(error);
        throw new Error("Failed to get bookmarks")
    }

    return data;
}





