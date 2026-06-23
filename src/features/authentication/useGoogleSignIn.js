import { useState } from "react";
import { googleSignIn } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useGoogleSignIn(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    async function handleSignInWithGoogle({onSuccess}){
        setIsLoading(true);
        setError(null);

        try{
            await googleSignIn();
            if(typeof onSuccess === "function") onSuccess();
            navigate("/");
            toast.success("Signed In successfully!")
        }
        catch(err){
            const message= err?.message;
            setError(message);
            toast.error(message);
        }
        finally{
            setIsLoading(false);
        }
    }

    return {handleSignInWithGoogle, isLoading, error,}
}

export default useGoogleSignIn;