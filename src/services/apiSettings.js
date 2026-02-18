import supabase from "./supabase";

export async function getUserSettings(userId){
    const {data:settings, error} = await supabase
    .from("settings")
    .select("*")
    .eq("id", userId)
    .single();

    if(error){
        console.log(error);
        throw new Error("Failed to fetch user settings");
    }

    return settings;
}


export async function updateUserSettings(userId, settings){
    const {data, error} = await supabase
    .from("settings")
    .update(settings)
    .eq("id", userId);

    if(error){
        console.log(error);
        throw new Error("Failed to update user settings")
    }

    return data;
}


