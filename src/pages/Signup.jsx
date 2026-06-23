import Button from "../components/Button"
import Logo from "../components/Logo"
import { useForm } from "react-hook-form";
import useSignUp from "../features/authentication/useSignUp";
import Modal from "../components/Modal";
import useGoogleSignIn from "../features/authentication/useGoogleSignIn";
import { FcGoogle } from "react-icons/fc";

function Signup() {
    const {handleSignUp, isLoading, error} = useSignUp();
    const {handleSignInWithGoogle, isLoading: googleLoading} = useGoogleSignIn();
    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;

    const handleGoogleLogin = async () => {
        await handleSignInWithGoogle({onSuccess: onCloseModal});
    };

    const onSubmit = ({email, password})=>{
        handleSignUp({email, password});
    }

    return (
        <div className="flex flex-col gap-5 py-10 px-6 rounded w-[370px] m-auto lg:w-[600px] lg:px-20">
            <header className="text-center space-y-1">
                <div className="w-[85px] mx-auto">
                    <Logo/>
                </div>
                <h1 className="text-2xl font-bold mt-4 lg:text-3xl">Create Account</h1>
                <p className="text-xs text-stone-600">Sign up a DevSphere account</p>
            </header>
            <main className="">
                <form className="flex flex-col gap-4 lg:gap-8" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Email</label>
                        <input 
                        type="email" 
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-0"
                        id="email"
                        {...register("email", {
                            required: "This field is required",          
                            pattern: {
                              value: /\S+@\S+\.\S+/,
                              message: "Please provide a valid email address"
                            }
                        })}                        
                        disabled={isLoading}
                        /> 
                        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
                    </div>
                    <div>
                        <label>Password</label>
                        <input 
                        type="password" 
                        className="w-full border border-gray-300 rounded-md p-2 mt-1 outline-0"
                        id="password"
                        {...register("password", {
                            required: "Password is required", 
                            minLength: {
                                value: 8, 
                                message: "Password must be at least 8 characters"
                            }}
                        )}                       
                        disabled={isLoading}
                        /> 
                         {errors.password && <p className="text-red-400">{errors.password.message}</p>}
                    </div>
                    <Button type="primary">
                        {isLoading ? "Signing up..." : "Sign Up"}
                    </Button>
                </form>
                {error && <p className="text-red-400">{error}</p>}
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
                <span>Sign up with Google Account</span>
            </button>    
            <p className="italic">
                Have an account? 
                <Modal.Open opens="sign-in">
                    <span className="text-blue-700 cursor-pointer hover:underline"> Log in</span>
                 </Modal.Open> 
            </p> 
        </div>
    )
}

export default Signup
