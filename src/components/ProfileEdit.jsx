import {useState, useEffect} from "react";
import useUpdateProfile from "../features/profiles/useUpdateProfile";


export default function ProfileEdit({profile, onCloseModal}) {
    const {loading, updateProfile} = useUpdateProfile();
    const [{avatar_url, first_name, last_name, bio, github_url, linkedIn_url, portfolio_url, twitter_url, role, id}] = profile;
    const [form, setForm] = useState({
        first_name: "",
        last_name: "",
        bio: "",
        role: "",
        avatar_url: "",
        github_url: "",
        linkedIn_url: "",
        twitter_url: "",
        portfolio_url: "",
    });

    // Initialize form state with profile data
    useEffect(() => {
        setForm({
            first_name: first_name || "",
            last_name: last_name || "",
            bio: bio || "",
            role: role || "",
            avatar_url: avatar_url || "",
            github_url: github_url || "",
            linkedIn_url: linkedIn_url || "",
            twitter_url: twitter_url || "",
            portfolio_url: portfolio_url || "",
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
            first_name: first_name || "",
            last_name: last_name || "",
            bio: bio || "",
            role: role || "",
            avatar_url: avatar_url || "",
            github_url: github_url || "",
            linkedIn_url: linkedIn_url || "",
            twitter_url: twitter_url || "",
            portfolio_url: portfolio_url || "",
        });
        onCloseModal();
    }

    const handleSubmit = ()=>{
        if(!form.first_name || !form.last_name || !form.bio ||!form.role) return;
        const fileObj = typeof form.avatar_url === "string" ? null : form.avatar_url;
        if (fileObj && fileObj.size > MAX_IMAGE_SIZE) {
            alert("Image must be under 5MB");
            return;
        }

        const avatarImage = typeof form.avatar_url === "string" ? form.avatar_url : URL.createObjectURL(form.avatar_url);

        const formData = {
            ...form,
            avatar_url: avatarImage,
        }
        updateProfile(formData, id, { onSuccess: onCloseModal });     

    }

    console.log(avatar_url);
    
    const inputClass = "w-full ring ring-neutral-200 focus:ring-neutral-300 p-2 outline-0";
    return (
             <form className="w-[600px] p-10 space-y-6 lg:w-[900px]" 
             onSubmit={(e) => {
                 e.preventDefault();
                 handleSubmit(false);
             }}>
                 <h1 className="text-2xl font-bold">Edit Profile</h1>
                
                 <input
                 type="file"
                 id="avatar_url"
                 name="avatar_url"
                 accept="image/*"
                 className="lg:text-lg rounded-sm file:font-medium file:px-3 file:py-2 file:mr-3 file:rounded-sm file:border-0 file:bg-primary file:text-blue-50 file:cursor-pointer file:transition-colors file:duration-200 hover:file:bg-primary"
                 onChange={handleChange}
                 />
     
                 {avatar_url && 
                     <picture className="w-90 rounded overflow-hidden block md:w-120">
                         <img
                         src={typeof avatar_url === "string" 
                             ? avatar_url 
                             : URL.createObjectURL(avatar_url)}
                         alt="Avatar preview"
                         className="w-full object-cover rounded"
                         />
                     </picture>
                 }
     
     
                <ul className="grid grid-cols-2 gap-6">
                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">First Name</span>
                    <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="John"
                    className={`${inputClass} capitalize `}
                    value={form.first_name}
                    onChange={handleChange} />
                 </li>

                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">Last Name</span>
                    <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Doe"
                    className={`${inputClass} capitalize `}
                    value={form.last_name}
                    onChange={handleChange} />
                 </li>   

                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">Role</span>
                    <input
                    type="text"
                    name="role"
                    id="role"
                    placeholder="User"
                    className={`${inputClass} capitalize `}
                    value={form.role}
                    onChange={handleChange} />
                 </li>
     
                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">Bio</span>
                    <textarea
                    placeholder="Write a short bio about yourself..."
                    name="bio"
                    id="bio"
                    className={`${inputClass} text-lg h-24`}
                    value={form.bio}
                    onChange={handleChange} />
                 </li>

                  {/* links   */}
                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">Github Url</span>
                    <input
                    type="text"
                    name="github_url"
                    id="github_url"
                    placeholder="https://www.github.com/johndoe"
                    className={`${inputClass} `}
                    value={form.github_url}
                    onChange={handleChange} />
                 </li>

                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">LinkedIn Url</span>
                    <input
                    type="text"
                    name="linkedIn_url"
                    id="linkedIn_url"
                    placeholder="https://www.linkedin.com/in/johndoe"
                    className={`${inputClass} `}
                    value={form.linkedIn_url}
                    onChange={handleChange} />
                 </li>

                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">Twitter Url</span>
                    <input
                    type="text"
                    name="twitter_url"
                    id="twitter_url"
                    placeholder="https://www.twitter.com/johndoe"
                    className={`${inputClass} `}
                    value={form.twitter_url}
                    onChange={handleChange} />
                 </li>

                 <li className="flex gap-1 flex-col">
                    <span className="text-lg">Portfolio Url</span>
                    <input
                    type="text"
                    name="portfolio_url"
                    id="portfolio_url"
                    placeholder="https://www.johndoe.com"
                    className={`${inputClass} `}
                    value={form.portfolio_url}
                    onChange={handleChange} />
                 </li>

                </ul> 


     
             <div className="flex gap-4">
                <button 
                className="ring ring-neutral-300 px-4 py-2 rounded hover:ring-neutral-400 cursor-pointer"
                disabled={loading} 
                onClick={handleCancel}>
                    Cancel
                </button>
                <button className="bg-primary px-4 py-2 rounded text-stone-100 hover:bg-primary-darker cursor-pointer">
                    Save Profile
                </button>
            </div>
     
             </form>
         )
    
}