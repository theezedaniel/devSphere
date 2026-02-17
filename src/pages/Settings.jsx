import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import useProfile from "../features/profiles/useProfile";

function Settings() {
    const {user} = useAuth();
    const userId = user?.id;
    const {profile, fetchProfile} = useProfile();
    
    useEffect(()=>{
        if(!userId) return;
             fetchProfile(userId);
          }, [userId])
      
    
    return (
        <div className="flex-6 p-10 space-y-6 lg:py-10 lg:px-30">
            <div>
                <h2 className="text-4xl font-bold lg:text-5xl">Account Settings</h2>
                <p className="text-lg text-stone-600 lg:text-xl">Make changes to your personal information or account type</p>
            </div>
            <div className="lg:w-[800px]">
                <h2 className="text-xl font-medium">Your account</h2>
                <form className="space-y-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="flex items-center gap-1  text-stone-600 mt-3">
                            Email &bull; Private
                        </label>
                        <input type="email" id="email" value={user?.email || ""} readOnly
                        name="email" placeholder="you@example.com"
                        className="w-full p-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                         />
                        <p className="px-2 py-1 bg-green-100 text-green-800 font-medium w-fit">{user?.aud === "authenticated" ? "confirmed" :"not confirmed"}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <label htmlFor="password" className="font-medium text-stone-600">
                            {/* Password */}
                        </label>
                        <button className="bg-primary text-stone-50 px-6 py-2 rounded cursor-pointer hover:bg-primary-darker"
                        >
                            Change
                        </button>
                    </div>
                </form>
            </div>

            <div className="border-t border-stone-300 pt-5 mt-10">
                <h2 className="text-xl font-medium">Account Deletion</h2>
                <p className="text-stone-600 lg:text-xl">Deleting your account is permanent and cannot be undone.</p>
                <button className="bg-red-500 text-stone-50 px-6 py-2 rounded cursor-pointer mt-5 hover:bg-red-600">Delete Account</button>
            </div>
            
        </div>
    )
}

export default Settings
