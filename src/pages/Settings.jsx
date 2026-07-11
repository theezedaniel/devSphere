import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useSettings from "../features/settings/useSettings";
import useUpdateSettings from "../features/settings/useUpdateSettings";
import Spinner from "../components/Spinner";

function Settings() {
    const {user} = useAuth();
    const userId = user?.id;
    const {data: settings, loading, fetchSettings} = useSettings();
    const [form, setForm] = useState({
        email_notifications: false,
        likes_notifications: false,
        comments_notifications: false,
    })
    const {updateSettings, loading: updating } = useUpdateSettings();

    const handleChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    useEffect(()=>{
        if(!userId) return;
        fetchSettings(userId);
    }, [userId]) 

    // Update form when settings are fetched
    useEffect(() => {
        if (settings) {
            setForm({
                email_notifications: settings.email_notifications || false,
                likes_notifications: settings.likes_notifications || false,
                comments_notifications: settings.comments_notifications || false,
            });
        }
    }, [settings]);

    function handleSubmit(e){
        e.preventDefault();
    }

    async function handleNotificationsUpdate(e){
        e.preventDefault();
        await updateSettings(userId, form);
        // Refetch settings after successful update
        await fetchSettings(userId);
    }

    if(loading) return <Spinner />
    return (
        <div className="py-10 px-2 space-y-6 lg:py-3.5 lg:px-10">
            <div>
                <h2 className="text-xl font-bold lg:text-2xl">Account Settings</h2>
                <p className="text-sm text-stone-600">Make changes to your personal information or account type</p>
            </div>
            <div className="lg:w-[800px]">
                <h2 className="text-lg font-medium">Your account</h2>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="flex items-center gap-1  text-stone-600 mt-3">
                            Email &bull; Private
                        </label>
                        <input type="email" id="email" value={user?.email || ""} readOnly
                        name="email" placeholder="you@example.com"
                        className="w-full p-2 border border-stone-300 rounded-md outline-none "
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

            <div>
                <h2 className="text-lg font-medium">Notifications Settings</h2>
                <p className="text-stone-600 lg:text-xl">
                    We may send you notifications about your account activity and updates. You can manage your notification preferences in your account settings.
                </p>

                <form className="flex flex-col gap-1">
                    <label className="flex items-center gap-2 mt-5">
                        <input
                        id="email"
                        name="email_notifications" 
                        type="checkbox"
                        checked={form?.email_notifications}
                        onChange={handleChange}
                        className="accent-primary h-5 w-5 text-primary" />
                        <span className="text-stone-600">Email Notifications</span>
                    </label>
                    <label className="flex items-center gap-2 mt-5">
                        <input
                        id="likes"
                        name="likes_notifications" 
                        type="checkbox"
                        checked={form?.likes_notifications}
                        onChange={handleChange}
                        className="accent-primary h-5 w-5 text-primary" />
                        <span className="text-stone-600">Likes Notifications</span>
                    </label>
                    <label className="flex items-center gap-2 mt-5">
                        <input
                        id="comments"
                        name="comments_notifications" 
                        type="checkbox"
                        checked={form?.comments_notifications}
                        onChange={handleChange}
                        className="accent-primary h-5 w-5 text-primary" />
                        <span className="text-stone-600">Comments Notifications</span>
                    </label>
                    <button 
                    className="bg-primary text-stone-50 px-6 py-2 rounded cursor-pointer mt-5 w-fit ml-auto  hover:bg-primary-darker disabled:cursor-not-allowed" 
                    onClick={handleNotificationsUpdate}
                    disabled={updating}>
                        Update Preferences
                    </button>
                </form>
            </div>

            <div className="border-t border-stone-300 pt-5 mt-10">
                <h2 className="text-lg font-medium">Account Deletion</h2>
                <p className="text-stone-600 lg:text-xl">Deleting your account is permanent and cannot be undone.</p>
                <button className="bg-red-600 text-stone-50 px-6 py-2 rounded cursor-pointer mt-5 hover:bg-red-600">Delete Account</button>
            </div>
            
        </div>
    )
}

export default Settings
