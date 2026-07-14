import { BsShare } from "react-icons/bs";
import { useBookmark } from "../features/bookmarks/useBookmark";
import { CiBookmark } from "react-icons/ci";
import { IoBookmark } from "react-icons/io5";

function PostDetails({profile, readTime, dateTime, postId}) {
    const {loading, error, isBookmarked, bookmarkPost, removePostBookmark} = useBookmark(postId);

    const removebookmark = (postId)=> {
        if(postId) removePostBookmark({postId})
    }
    const placebookmark = (postId)=> {
        if(postId) bookmarkPost({postId})
    }
        
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
                onClick={()=> placebookmark(postId)}>
                    <CiBookmark className="text-lg" />
                </button>
                    }
                <BsShare className="text-lg cursor-pointer" />
            </div>
        </div>
    )
}

export default PostDetails
