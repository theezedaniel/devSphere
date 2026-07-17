import { useEffect } from "react";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useModal } from "./Modal";

function ProtectedRoute({children}){
    //1. Load the authenticated user
    const {user, loading: isLoading, error, loadUser} = useUser();
    const {open} = useModal();

    useEffect(()=>{
        loadUser();
    }, []);

    if(isLoading) return (
        <div>
            <Spinner />
        </div>
    )

    //3. if there IS an authenticated user, show the protected page  
    if(user) return children;
    
    // If no user, redirect to login
    if(!user && !isLoading){
        return open("sign-in");
    }
}


export default ProtectedRoute;