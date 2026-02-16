import { useState } from "react";
import { getUserProfile } from "../../services/apiProfile";

function useProfile(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [profile, setProfile] = useState(null);

    async function fetchProfile(userId){
        try{
            setLoading(true);
            setError(null);
            const data = await getUserProfile(userId);
            setProfile(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }


    return {profile, loading, error, fetchProfile};
}


export default useProfile;