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


/**
 * Upload a cover image to Supabase Storage
 * Returns the public URL
 */
async function uploadPostImage(file) {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("User not authenticated.");
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `${user.id}/${fileName}`;

  const { error } = await supabase.storage
    .from("post-images")
    .upload(filePath, file);

  if (error) {
    console.error(error);
    throw new Error("Failed to upload cover image.");
  }

  const { data } = supabase.storage
    .from("post-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Delete an image from Supabase Storage.
 * Expects a public URL.
 */
async function deletePostImage(imageUrl) {
  if (!imageUrl?.startsWith(supabaseUrl)) return;

  const path = imageUrl.split("/storage/v1/object/public/post-images/")[1];

  if (!path) return;

  const { error } = await supabase.storage
    .from("post-images")
    .remove([path]);

  if (error) {
    // Don't throw. The post was already updated.
    console.error("Failed to delete old image:", error);
  }
}

export async function writePost(post, postId) {
  let coverImageUrl = post.cover_image_url;
  let oldCoverImageUrl = null;

  const hasExistingImage =
    typeof coverImageUrl === "string" &&
    coverImageUrl.startsWith(supabaseUrl);

  /**
   * Editing?
   * Fetch current cover image so we can remove it later.
   */
  if (postId) {
    const { data: currentPost } = await supabase
      .from("posts")
      .select("cover_image_url")
      .eq("id", postId)
      .single();

    oldCoverImageUrl = currentPost?.cover_image_url ?? null;
  }

  /**
   * Upload new image if a File was selected
   */
  if (!hasExistingImage && coverImageUrl instanceof File) {
    coverImageUrl = await uploadPostImage(coverImageUrl);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  
  const payload = {
    ...post,
    author_id: user.id,
    cover_image_url: coverImageUrl,
  };

  let query;

  if (postId) {
    query = supabase
      .from("posts")
      .update(payload)
      .eq("id", postId)
      .select()
      .single();
  } else {
    query = supabase
      .from("posts")
      .insert(payload)
      .select()
      .single();
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error(
      postId
        ? "Post could not be updated."
        : "Post could not be created."
    );
  }

  /**
   * Delete previous cover image only after
   * successful update.
   */
  if (
    postId &&
    oldCoverImageUrl &&
    oldCoverImageUrl !== coverImageUrl
  ) {
    await deletePostImage(oldCoverImageUrl);
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





