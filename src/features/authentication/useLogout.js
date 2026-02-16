import toast from "react-hot-toast";
import { logout as logoutApi } from "../../services/apiAuth";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

function useLogout(){
    const {user} = useAuth();
    const [loading, setLoading] = useState(false);
    const logout = async () => {
        try{
            if(!user) throw new Error("No user is currently logged in.");
            setLoading(true);
            await logoutApi();
            toast.success("Logged out successfully");
        }
        catch(err){
            console.error("Logout failed:", err);
            toast.error("Logout failed. Please try again.");
        }
        finally{
            setLoading(false);
        }
    }
    return {logout, loading};
}


export default useLogout;