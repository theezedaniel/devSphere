import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateUserProfile } from "../../services/apiProfile";

function useUpdateProfile() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function updateProfile(formData, userId, options = {}) {
        setLoading(true);
        setError(null);
        try {
            await updateUserProfile(userId, formData);
            toast.success("Profile updated successfully");
            if (typeof options.onSuccess === "function") {
                options.onSuccess();
            }
            navigate("/profile")
        }
        catch(err){
            const message = err?.message;
            setError(message ?? "Failed to update profile");
            toast.error(message ?? "Failed to update profile");
            throw err;
        }
        finally{
            setLoading(false);
        }        
    }

    return {loading, error, updateProfile};
}



export default useUpdateProfile;
