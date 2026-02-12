import { Link } from "react-router-dom";
import { GoClock, GoHeart } from "react-icons/go";
import { TbArrowBadgeRightFilled } from "react-icons/tb";
import Tags from "./Tags"
import { formatDistanceFromNow } from "../utils/helpers";

function Post({post}) {
    const {title, tags, slug, summary, read_time, likes_count, created_at } = post;

    const dateTime = formatDistanceFromNow(created_at); 

    const tagList = Array.isArray(tags) 
    ? tags 
    : (typeof tags === "string" 
        ? tags
        .replace(/[\[\]\"]/g, "") //handles old json
        .split(",")
        .map(tag => tag.trim()).filter(Boolean) : []); 
   
    
    return (
        <div className="flex flex-col gap-4 bg-white overflow-hidden rounded-xl cursor-pointer shadow">
            <picture className=" w-full">
                <source srcSet="../team3.jpg" type="image/jpg" />
                <img src="../team3.jpg" alt="post image" className="w-full transition duration-300 ease-in-out transform hover:scale-110"/>
            </picture>
            <div className=" space-y-3 p-5">
                <h3 className="text-xl font-medium lg:text-2xl">
                    {title}
                </h3>
                <p className="text-stone-600">
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
                        <GoClock className="text-xl text-primary" />
                        <p>{dateTime}</p>
                    </div>
                </div>
                <div className="flex justify-between">
                    <div className="flex items-center gap-1">
                        <GoHeart className="text-xl text-red-600" />
                        <span>{likes_count} likes</span>
                    </div>
                    <Link to={`/posts/${slug}`}>
                        <div className="flex items-center gap-1 px-5 py-2 rounded bg-primary">
                            <TbArrowBadgeRightFilled className="text-2xl text-white" />
                            <span className="text-white font-medium text-lg lg:text-xl">Read</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}


export default Post
