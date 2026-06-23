import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Button from "../components/Button";
import Logo from "../components/Logo";
import Modal from "../components/Modal";
import useLogin from "../features/authentication/useLogin";
import useGoogleSignIn from "../features/authentication/useGoogleSignIn";


function Login({onCloseModal}) {
    const {handleLogin, isLoading} = useLogin(); 
    const {handleSignInWithGoogle, isLoading: googleLoading} = useGoogleSignIn();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    
    const handleGoogleLogin = async () => {
        await handleSignInWithGoogle({onSuccess: onCloseModal});
    };

    const handleSubmit = (e)=> {
        e.preventDefault();
        if(!email || !password){
            setError("Please fill all the fields");
            return;
        } 
        handleLogin({email, password, onSuccess: onCloseModal});
    }
    

    return (
        <div className="flex flex-col gap-5 py-10 px-6 w-[370px] m-auto lg:w-[600px] lg:px-20">
            <header className="text-center space-y-1">
                <div className="w-[85px] mx-auto">
                    <Logo/>
                </div>
                <h1 className="text-2xl font-bold mt-4 lg:text-3xl">Welcome Back</h1>
                <p className="text-xs text-stone-600">Sign in to your DevSphere account</p>
            </header>
            <main className="">
                <form className="flex flex-col gap-4 lg:gap-8" onSubmit={handleSubmit}>
                    <div>
                        <label>Email</label>
                        <input 
                        type="email" 
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-0"
                        id="email"
                        onChange={(e)=> setEmail(e.target.value)} 
                        disabled={isLoading || googleLoading }  /> 
                    </div>
                    <div>
                        <label>Password</label>
                        <input 
                        type="password" 
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-0"
                        id="password"
                        onChange={(e)=> setPassword(e.target.value)}
                        disabled={isLoading || googleLoading}
                        /> 
                    </div>
                    <Button type="primary" disabled={isLoading || googleLoading}>
                        {isLoading ? "Logging in..." : "Log in"}
                    </Button>
                </form>
                {error && <p className="text-red-600">{error}</p>}            
            </main>    

            <div className="flex items-center gap-4">
                <div className="w-full h-0.5 bg-stone-300"></div>
                <p>or</p>
                <div className="w-full h-0.5 bg-stone-300"></div>
            </div>            
            <button 
                onClick={handleGoogleLogin}
                disabled={googleLoading}  
                className="w-fit mx-auto cursor-pointer ring rounded-full px-4 py-2 flex items-center gap-2 disabled:cursor-not-allowed"
                >
                <FcGoogle className="text-lg" />
                <span>Sign In with Google Account</span>
            </button>
            <p className="italic">
                Don't have an account? 
                <Modal.Open opens="sign-up">
                        <span className="text-blue-700 cursor-pointer hover:underline">Sign up</span>
                </Modal.Open>
            </p>
        </div>
    )
}

export default Login
