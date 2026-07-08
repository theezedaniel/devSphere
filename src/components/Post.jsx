import { Link } from "react-router-dom";
import Tags from "./Tags"
import { GoClock, GoHeart } from "react-icons/go";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import { formatDistanceFromNow } from "../utils/helpers";
import { slugify } from "../utils/slugify";

function Post({post}) {
    const {title, tags, summary, read_time, likes_count, created_at, cover_image_url, id } = post;

    const dateTime = formatDistanceFromNow(created_at); 
    const slug = slugify(title);
    

    const tagList = Array.isArray(tags) 
    ? tags 
    : (typeof tags === "string" 
        ? tags
        .replace(/[\[\]\"]/g, "") //handles old json
        .split(",")
        .map(tag => tag.trim()).filter(Boolean) : []); 
   
    
    return (
        <Link to={`/posts/${id}/${slug}`} className=" pb-2 border-b border-b-slate-200">
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
                        {summary}
                    </p>
                    <div className="flex justify-between">
                        <p>
                            {read_time} mins read
                        </p>
                        <div className="flex items-center gap-1">
                            <GoClock className="text-sm text-primary" />
                            <p>{dateTime}</p>
                        </div>
                    </div>                    
                </div>
            </div>
        </Link>
    )
}


export default Post
