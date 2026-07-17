import { useState } from "react";
import toast from "react-hot-toast";
import { googleSignIn } from "../../services/apiAuth";

function useGoogleSignIn(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function handleSignInWithGoogle(){
        setIsLoading(true);
        setError(null);

        try{
            await googleSignIn();;
        }
        catch(err){
            const message= err?.message;
            setError(message);
            toast.error(message);
            setIsLoading(false); // Only clear loading if it fails immediately
        }
    }

    return {handleSignInWithGoogle, isLoading, error,}
}

export default useGoogleSignIn;