import { Link } from "react-router-dom"
import Button from "../components/Button"
import Logo from "../components/Logo"
import { useForm } from "react-hook-form";
import useSignUp from "../features/authentication/useSignUp";
import Modal from "../components/Modal";

function Signup() {
    const {handleSignUp, isLoading, error} = useSignUp();
    const {register, handleSubmit, formState} = useForm();
    const {errors} = formState;

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
