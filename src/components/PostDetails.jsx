import { BsShare } from "react-icons/bs";
import { useBookmark } from "../features/bookmarks/useBookmark";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";
import { slugify } from "../utils/slugify";

function PostDetails({profile, readTime, dateTime, title,  postId}) {
    const {loading, error, isBookmarked, bookmarkPost, removePostBookmark} = useBookmark(postId);
    const slug = slugify(title);

    const postPath = `/posts/${postId}/${slug}`;
    const postUrl = `${window.location.origin}${postPath}`;

    const removebookmark = (postId)=> {
        if(postId) removePostBookmark({postId})
    }
    const placebookmark = (postId, authorId)=> {
        if(postId) bookmarkPost({postId, authorId})
    }

    const handleShare = async () => {        
        if (navigator.share) {
            await navigator.share({
                title,
                text: `Read up this article by ${profile?.full_name} on Devsphere!`,
                url: postUrl,
            });
        }
    };
        
    return (
        <div className="flex justify-between gap-10 lg:gap-20 px-5 lg:px-20 py-4 border-b border-t border-gray-300 mb-6 items-center">
            <div className="flex gap-2 items-center">
                <img src={profile[0]?.avatar_url || "./team3.jpg"} alt="avatar" className="w-8 h-8 rounded-full" crossOrigin="anonymous"/>
                <p>{profile[0]?.full_name || "User"}</p>
            </div>
            <div className="flex gap-1">
                <p>{readTime} min read &bull;</p>
                <p>{dateTime}</p>
            </div>
            <div className="flex gap-2">
                {isBookmarked 
                ? <button type="button" className="cursor-pointer disabled:cursor-not-allowed" disabled={loading}
                onClick={()=> removebookmark(postId)} >
                    <IoBookmark className="text-lg text-primary"/>
                </button> :
                <button type="button" className="cursor-pointer disabled:cursor-not-allowed" disabled={loading}
                onClick={()=> placebookmark(postId, profile[0]?.id)}>
                    <CiBookmark className="text-lg" />
                </button>
                    }
                <button type="button" className="cursor-pointer disabled:cursor-not-allowed" disabled={loading} onClick={()=> handleShare()}>
                    <BsShare className="text-lg cursor-pointer" />
                </button>
            </div>
        </div>
    )
}

export default PostDetails
