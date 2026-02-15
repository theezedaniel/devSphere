import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiAuth";
import { useState } from "react";
import {toast} from "react-hot-toast";

function useLogin() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    async function handleLogin({email, password, onSuccess, onError} = {}) {
        try{
            setIsLoading(true);
            setError(null);
            await login({email, password});
            toast.success("Logged in successfully");
            if(typeof onSuccess === "function") onSuccess();
            navigate("/");
        }
        catch (err){
            const message= err?.message;
            setError(message && "No stable internet connection");
            toast.error(message && "No stable internet connection");
            onError?.(message && "No stable internet connection");
        }
        finally{
            setIsLoading(false); 
        }
    }
    return {handleLogin, error, isLoading};
}

export default useLogin
