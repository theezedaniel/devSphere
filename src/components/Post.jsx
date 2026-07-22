import { Link, useNavigate } from "react-router-dom";
import Tags from "./Tags"
import { GoClock, GoHeart } from "react-icons/go";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { formatDateFns } from "../utils/helpers";
import { slugify } from "../utils/slugify";
import { useEffect } from "react";
import useProfile from "../features/profiles/useProfile";
import { BsShare } from "react-icons/bs";
import { useBookmark } from "../features/bookmarks/useBookmark";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";

function Post({post}) {
    const {profile, loading: profileLoading, error: profileError, fetchProfile} = useProfile();
    const {title, summary, read_time, created_at, cover_image_url, id, author_id } = post;

    const {loading, error, isBookmarked, bookmarkPost, removePostBookmark} = useBookmark(id);
    const navigate = useNavigate();

    const dateTime = formatDateFns(created_at, "MMM d"); 
    const slug = slugify(title);

    const postPath = `/posts/${id}/${slug}`;
    const postUrl = `${window.location.origin}${postPath}`;

    const removebookmark = (e, postId)=> {
        e.stopPropagation();
        if(postId) removePostBookmark({postId})
    }
    const placebookmark = (e, postId, authorId)=> {
        e.stopPropagation();
        if(postId) bookmarkPost({postId, authorId})
    }

    const handleShare = async (e) => {
        e.stopPropagation(); // Stops click from triggering navigate
        if (navigator.share) {
            await navigator.share({
                title,
                text: `Read up this article by ${profile[0]?.full_name} on Devsphere!`,
                url: postUrl,
            });
        }
    };

    const handleProfileClick = (e, authorId) => {
        e.stopPropagation(); // Stops click from triggering navigate
        if(authorId) navigate(`/profile/${authorId}`); // Navigate directly to user profile
    };
    
    useEffect(()=> {
        if(author_id)
            fetchProfile(author_id)
    }, [author_id])
   
    if(profileLoading) return null;
    return (
        <div
        onClick={()=> navigate(`/posts/${id}/${slug}`)} 
        className=" pb-2 border-b border-b-slate-200">
            <div className="flex flex-col gap-1 overflow-hidden cursor-pointer">
                <picture className="w-full h-60 lg:h-40">
                    <source srcSet={cover_image_url || "../team3.jpg"} type="image/jpg" crossOrigin="anonymous" />
                    <img src={cover_image_url || "../team3.jpg"} alt="post image" className="w-full h-full object-cover" crossOrigin="anonymous"/>
                </picture>
                <div className=" space-y-3 px-3 py-2">
                    <h3 className="text-base font-medium">
                        {title}
                    </h3>
                    <p className="text-stone-600 line-clamp-2">                        
                        {summary || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem modi dolor facere voluptatem repellat rerum dignissimos nihil nulla reiciendis! Sequi amet, repellendus incidunt ipsa ab quae. Et sequi beatae optio."}
                    </p>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-1 text-slate-600 text-xs">                           
                            <p>
                                {read_time} mins read &bull;
                            </p>                            
                        </div>
                        <div className="flex items-center gap-1">
                            <GoClock className="text-sm text-primary" />
                            <p>{dateTime}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex gap-1 items-center text-slate-600">
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
                        </div>
                        <div className="flex gap-2">
                            {isBookmarked 
                            ? <button type="button" className="cursor-pointer disabled:cursor-not-allowed" disabled={loading}
                            onClick={(e)=> removebookmark(e,id)} >
                                <IoBookmark className="text-base text-primary"/>
                            </button> :
                            <button type="button" className="cursor-pointer disabled:cursor-not-allowed" disabled={loading}
                            onClick={(e)=> placebookmark(e,id, profile[0]?.id)}>
                                <CiBookmark className="text-base" />
                            </button>
                                }
                            <button type="button" className="cursor-pointer disabled:cursor-not-allowed" disabled={loading}
                            onClick={(e)=> handleShare(e)}>
                                <BsShare className="text-base cursor-pointer" />
                            </button>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    )
}


export default Post
