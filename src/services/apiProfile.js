import supabase, {supabaseUrl} from "./supabase";


export async function getUserProfile(userId) {
    let { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)

    if(error){
        console.error(error);
        throw new Error("Profile could not be loaded!");
    }

    return profile;
}


export async function updateUserProfile(userId, profileData) {
    //1.checking if it has an image path already
    const hasImagePath = profileData.avatar_url?.startsWith?.(supabaseUrl);
    //2.create an image name (use file name when a File object)
    // choose a base for the image name: existing path, string name, File.name, or fallback 'image'

    const imageBase = hasImagePath ? profileData.avatar_url 
        : (typeof profileData.avatar_url === "string" 
            ? profileData.avatar_url : profileData.avatar_url?.name || 'image');

    const imageName = `${Math.random()}-${imageBase}`.replaceAll("/", "");
     
    //3.make sure it follows this pattern   https://cbicjzbuopidnsoqmbqa.supabase.co/storage/v1/object/public/avatars/team4.jpg
    const imagePath = hasImagePath ? profileData.avatar_url : `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`
    
    const { data, error } = await supabase
    .from('profiles')
    .update({...profileData, avatar_url: imagePath})
    .eq('id', userId)
    .select();
    
    if(error){
        console.error(error);
        throw new Error("Profile could not be updated!");
    }

     //2. Upload image
    if(hasImagePath) return data;
    // if the cover was already a hosted URL, skip upload and return DB result
    const {error: storageError } = await supabase
    .storage
    .from('avatars')
    .upload(imageName, profileData.avatar_url)

    if(storageError) {
        console.error(storageError);
        throw new Error("Profile image could not be uploaded!");
     }

    return data;
}



