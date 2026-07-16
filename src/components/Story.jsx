import { GoClock } from "react-icons/go";
import { FaEllipsis } from "react-icons/fa6";
import { useEffect, useState } from "react";
import StoryOptions from "./StoryOptions";
import { formatDateFns } from "../utils/helpers";
import useProfile from "../features/profiles/useProfile";

function Story({post, isPublished, onRefresh }) {
    const {profile, loading: profileLoading, error: profileError, fetchProfile} = useProfile();
    const {title, summary, read_time, id, created_at, cover_image_url, author_id} = post;

    const [open, setOpen] = useState();

    const dateTime = formatDateFns(created_at);

    useEffect(()=> {
        if(author_id)
            fetchProfile(author_id)
    }, [author_id])

    const handleProfileClick = (e, authorId) => {
        e.stopPropagation(); // Stops click from triggering navigate
        // if(authorId) navigate(`/profile/${authorId}`); // Navigate directly to user profile
    };

    if(profileLoading) return null;
    
    return (
        <div className="relative flex gap-4 rounded-lg cursor-pointer shadow lg:w-full">
            <picture className="hidden md:block flex-2 md:flex-1">
                <source srcSet={cover_image_url } type="image/jpg" crossOrigin="anonymous" />
                <img src={cover_image_url } alt="post image" className="w-full h-full object-cover rounded-lg transition duration-300 ease-in-out transform hover:scale-102" crossOrigin="anonymous"/>
            </picture>
            <div className=" flex-4 flex flex-col justify-between px-3 py-4">
                <div className="space-y-3">
                    <h3 className="text-base font-medium lg:text-lg">
                        {title}
                    </h3>
                    <p className="line-clamp-1">{summary}</p>                
                    <div className="flex gap-2">
                        <p>
                            {read_time} mins read
                        </p>
                        <p>&bull;</p>
                        <div className="flex items-center gap-1">
                            <GoClock className="text-base text-primary" />
                            <p>{dateTime}</p>
                        </div>
                    </div>
                    {isPublished === "bookmarked" && <div className="flex gap-1 items-center text-slate-600">
                        <div 
                            onClick={(e) => handleProfileClick(e, author_id)}
                            className="flex gap-1 items-center text-slate-600 hover:text-primary transition-colors z-10"
                            >
                            by
                            <img src={profile[0]?.avatar_url || "./team3.jpg"} alt="avatar" className="w-6 h-6 rounded-full" crossOrigin="anonymous"/>
                            <p className="text-slate-600"> 
                                <i className="hover:underline font-medium">{profile[0]?.full_name || "User"}</i>
                            </p>
                        </div>
                    </div>}
                </div>
                <button 
                className="w-full flex justify-end" 
                onClick={()=> setOpen((value)=> !value) }>
                    <FaEllipsis className="text-lg cursor-pointer" />
                </button>                
            </div>
            {open && <StoryOptions isPublished={isPublished} postId={id} title={title} onRefresh={onRefresh} />}
        </div>
    )
}


export default Story
