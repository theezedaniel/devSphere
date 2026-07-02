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
    
    // 1. Check if avatar_url is already a hosted URL string
    const isString = typeof profileData.avatar_url === "string";
    const hasImagePath = isString && profileData.avatar_url.startsWith(supabaseUrl);
    
    let imagePath = profileData.avatar_url;

    // 2. Upload image ONLY if a new file object was provided
    if (!hasImagePath && profileData.avatar_url) {
        const file = profileData.avatar_url;
        
        // Safely fallback to a timestamp string if file name is missing
        const originalName = file.name || `avatar-${Date.now()}`;
        
        // Build a clean, unique file name
        // This replaces spaces and slashes with dashes and cleans up the filename
        const imageName = `${Math.random()}-${originalName}`.replace(/[\s/]/g, "-");

        
        // Upload the actual file object to Supabase storage first
        const { error: storageError } = await supabase
            .storage
            .from('avatars')
            .upload(imageName, file);

        if (storageError) {
            console.error("Storage Error details:", storageError);
            throw new Error("Profile image could not be uploaded!");
        }

        // Construct the public URL for the newly uploaded file
        imagePath = `${supabaseUrl}/storage/v1/object/public/avatars/${imageName}`;
    }

    // 3. Update the user profile row in the database
    const { data, error } = await supabase
        .from('profiles')
        .update({
            ...profileData, 
            avatar_url: imagePath
        })
        .eq('id', userId)
        .select();
    
    if (error) {
        console.error("Database Error details:", error);
        throw new Error("Profile could not be updated!");
    }

    return data;
}




