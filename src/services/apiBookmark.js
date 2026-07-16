import supabase, {supabaseUrl} from "./supabase";


export async function setBookmark({userId, postId, authorId}){
    const {data, error} = await supabase
    .from("bookmarks")
    .insert({user_id: userId, post_id: postId, author_id: authorId})
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

export async function getUserBookmarks({userId}){
    if (!userId || userId === "undefined" || typeof userId === "object") {
        console.warn("getUserBookmarks block prevented a bad request due to missing userId.");
        return []; // Gracefully return an empty state array instead of making a broken API call
    }
    const {data, error} = await supabase
    .from("bookmarks")
    .select(`
            id,
            post_id,
            posts!post_id (
                id,
                title,
                content,
                summary,
                cover_image_url,
                author_id,
                read_time,
                created_at
            )
    `)
    .eq("user_id", userId)

    if(error){
        console.error(error);
        throw new Error("Failed to get bookmarks")
    }

    return data
        .map((bookmark) => bookmark.posts)
        .filter((post) => post !== null);
}





