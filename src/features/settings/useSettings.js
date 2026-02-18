import { useState } from "react";
import { getUserSettings } from "../../services/apiSettings";

function useSettings(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    async function fetchSettings(userId){
        setLoading(true);
        setError(null);
        try{
            const settings = await getUserSettings(userId);
            setData(settings);            
        }
        catch(err){
            const message = err?.message;
            setError(message)
            console.log(message || "Failed to load settings");
            throw new Error(message || "Failed to load settings");
        }
        finally{
            setLoading(false);
        } 
    }

    return {data, fetchSettings, loading, error};
}




export default useSettings;
