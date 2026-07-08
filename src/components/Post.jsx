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
        <div className="flex flex-col gap-1 bg-white overflow-hidden rounded-xl cursor-pointer shadow">
            <picture className=" w-full">
                <source srcSet={cover_image_url || "../team3.jpg"} type="image/jpg" crossOrigin="anonymous" />
                <img src={cover_image_url || "../team3.jpg"} alt="post image" className="w-full" crossOrigin="anonymous"/>
            </picture>
            <div className=" space-y-3 px-3 py-2">
                <h3 className="text-base font-medium lg:text-lg">
                    {title}
                </h3>
                <p className="text-stone-600 line-clamp-2">
                    {summary}
                </p>
                <ul className="flex gap-2">
                    {tagList.map((tag, id)=>(
                        <Tags key={`${tag}-${id}`} tag={tag} type="secondary"/>
                    ))}
                </ul>
                <div className="flex justify-between">
                    <p>
                        {read_time} mins read
                    </p>
                    <div className="flex items-center gap-1">
                        <GoClock className="text-lg text-primary" />
                        <p>{dateTime}</p>
                    </div>
                </div>
                <div className="flex">
                    {/* <div className="flex items-center gap-1">
                        <GoHeart className="text-xl text-red-600" />
                        <span>{likes_count} likes</span>
                    </div> */}
                    <Link to={`/posts/${id}/${slug}`} className=" ml-auto">
                        <div className="flex flex-row-reverse items-center px-3 py-1 rounded bg-primary">
                            <TbArrowBadgeRightFilled className="text-lg text-white" />
                            <span className="text-white font-medium text-base">Read</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default Post
