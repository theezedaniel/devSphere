import { useState } from "react";
import { updateUserSettings } from "../../services/apiSettings";
import { toast } from "react-hot-toast";

function useUpdateSettings(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function updateSettings(userId, settings){
        setLoading(true);
        setError(null);
        try{
            await updateUserSettings(userId, settings);           
            toast.success("Settings updated successfully"); 
        }
        catch(err){
            setError(err?.message);
            console.log(err?.message);
            toast.error("Failed to update settings");
        }
        finally{
            setLoading(false);
        }
    }

    return {updateSettings, loading, error};
}



export default useUpdateSettings;


