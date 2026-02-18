import {useState, useEffect} from "react";
import { GoTrash } from "react-icons/go";
import useUpdateProfile from "../features/profiles/useUpdateProfile";
import SpinnerMini from "./SpinnerMini";


export default function ProfileEdit({profile, onCloseModal, refetchProfile}) {
    const {loading, updateProfile} = useUpdateProfile();
    const [{avatar_url, first_name, last_name, bio, github_url, linkedIn_url, portfolio_url, twitter_url, role, id}] = profile;
    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        bioData: "",
        roleData: "",
        avatarUrl: "",
        githubUrl: "",
        linkedInUrl: "",
        twitterUrl: "",
        portfolioUrl: "",
    });

    // Initialize form state with profile data
    useEffect(() => {
        setForm({
            firstName: first_name || "",
            lastName: last_name || "",
            bioData: bio || "",
            roleData: role || "",
            avatarUrl: avatar_url || "",
            githubUrl: github_url || "",
            linkedInUrl: linkedIn_url || "",
            twitterUrl: twitter_url || "",
            portfolioUrl: portfolio_url || "",
        });
    }, [profile]);

    const MAX_IMAGE_SIZE = 5 * 1024 * 1024; //5MB
    
    
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        if (type === "file") {
            // For file inputs, store the File object
            const file = files[0];
            if(file && file.size > MAX_IMAGE_SIZE) {
                alert("File size exceeds the 5MB limit. Please choose a smaller file.");
                return;
            }
            setForm(prevForm => ({
                ...prevForm,
                [name]: file, // Store the actual file
            }));
        } else {
            // For text inputs
            setForm(prevForm => ({
                ...prevForm,
                [name]: value,
            }));
        }
    }

    const handleCancel = ()=>{
        // Reset form to initial profile values
        setForm({
            firstName: first_name || "",
            lastName: last_name || "",
            bioData: bio || "",
            roleData: role || "",
            avatarUrl: avatar_url || "",
            githubUrl: github_url || "",
            linkedInUrl: linkedIn_url || "",
            twitterUrl: twitter_url || "",
            portfolioUrl: portfolio_url || "",
        });
        onCloseModal();
    }

    const handleSubmit = ()=>{
        if(!form.firstName || !form.lastName || !form.bioData ||!form.roleData) return;
        const fileObj = typeof form.avatarUrl === "string" ? null : form.avatarUrl;
        if (fileObj && fileObj.size > MAX_IMAGE_SIZE) {
            alert("Image must be under 5MB");
            return;
        }

        // Transform camelCase to snake_case for database columns
        const formData = {
            avatar_url: form.avatarUrl,
            first_name: form.firstName,
            last_name: form.lastName,
            bio: form.bioData,
            role: form.roleData,
            github_url: form.githubUrl,
            linkedIn_url: form.linkedInUrl,
            twitter_url: form.twitterUrl,
            portfolio_url: form.portfolioUrl,
        }
        updateProfile(formData, id, { 
            onSuccess: () => {
                refetchProfile();
                onCloseModal();
            } 
        });     

    }

    
    
    
    const inputClass = "w-full ring ring-neutral-200 focus:ring-neutral-300 p-2 outline-0";
    return (
             <form className="w-[600px] p-10 space-y-6 lg:w-[900px] overflow-y-auto overflow-x-hidden" 
             onSubmit={(e) => {
                 e.preventDefault();
                 handleSubmit();
             }}>
                 <h1 className="text-2xl font-bold">Edit Profile</h1>
                
                 <input
                 type="file"
                 id="avatarUrl"
                 name="avatarUrl"
                 accept="image/*"
                 className="lg:text-lg rounded-sm file:font-medium file:px-3 file:py-2 file:mr-3 file:rounded-sm file:border-0 file:bg-primary file:text-blue-50 file:cursor-pointer file:transition-colors file:duration-200 hover:file:bg-primary"
                 onChange={handleChange}
                 />
     
                 {form.avatarUrl && 
                    <div className="flex items-end gap-2">
                     <picture className="w-24 h-24 rounded-full overflow-hidden block md:w-40 md:h-40">
                         <img
                         src={typeof form.avatarUrl === "string" 
                             ? form.avatarUrl 
                             : URL.createObjectURL(form.avatarUrl)}
                         alt="Avatar preview"
                         className="w-full h-full object-cover"
                         />
                     </picture>
                     <button type="button" className="flex items-center gap-1 p-2 text-red-600 cursor-pointer ring ring-gray-200" onClick={() => setForm({...form, avatarUrl: null})}>
                        {/* <span>Remove</span> */}
                        <GoTrash className="text-red-600 hover:text-red-500" />
                     </button>
                    </div>
                 }
     
     
                <ul className="grid grid-cols-2 gap-6">
                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">First Name</span>
                    <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="John"
                    className={`${inputClass} capitalize `}
                    value={form.firstName}
                    onChange={handleChange} />
                 </li>

                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">Last Name</span>
                    <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Doe"
                    className={`${inputClass} capitalize `}
                    value={form.lastName}
                    onChange={handleChange} />
                 </li>   

                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">Role</span>
                    <input
                    type="text"
                    name="roleData"
                    id="roleData"
                    placeholder="User"
                    className={`${inputClass} capitalize `}
                    value={form.roleData}
                    onChange={handleChange} />
                 </li>
     
                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">Bio</span>
                    <textarea
                    placeholder="Write a short bio about yourself..."
                    name="bioData"
                    id="bioData"
                    className={`${inputClass} text-lg h-24`}
                    value={form.bioData}
                    onChange={handleChange} />
                 </li>

                  {/* links   */}
                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">Github Url</span>
                    <input
                    type="text"
                    name="githubUrl"
                    id="githubUrl"
                    placeholder="https://www.github.com/johndoe"
                    className={`${inputClass} `}
                    value={form.githubUrl}
                    onChange={handleChange} />
                 </li>

                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">LinkedIn Url</span>
                    <input
                    type="text"
                    name="linkedInUrl"
                    id="linkedInUrl"
                    placeholder="https://www.linkedin.com/in/johndoe"
                    className={`${inputClass} `}
                    value={form.linkedInUrl}
                    onChange={handleChange} />
                 </li>

                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">Twitter Url</span>
                    <input
                    type="text"
                    name="twitterUrl"
                    id="twitterUrl"
                    placeholder="https://www.twitter.com/johndoe"
                    className={`${inputClass} `}
                    value={form.twitterUrl}
                    onChange={handleChange} />
                 </li>

                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">Portfolio Url</span>
                    <input
                    type="text"
                    name="portfolioUrl"
                    id="portfolioUrl"
                    placeholder="https://www.johndoe.com"
                    className={`${inputClass} `}
                    value={form.portfolioUrl}
                    onChange={handleChange} />
                 </li>

                </ul> 


     
             <div className="flex gap-4">
                <button 
                className="ring ring-neutral-300 px-4 py-2 rounded hover:ring-neutral-400 cursor-pointer disabled:cursor-not-allowed"
                disabled={loading} 
                onClick={handleCancel}>
                    Cancel
                </button>
                <button type="submit" 
                className="flex items-center gap-1 bg-primary px-4 py-2 rounded text-stone-100 hover:bg-primary-darker cursor-pointer disabled:cursor-not-allowed"
                disabled={loading}
                >
                    {loading && <SpinnerMini />}
                    Save Profile
                </button>
            </div>
     
             </form>
         )
    
}