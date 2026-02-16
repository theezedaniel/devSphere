import supabase from "./supabase";


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



