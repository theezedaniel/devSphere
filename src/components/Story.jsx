import { GoClock } from "react-icons/go";
import { FaEllipsis } from "react-icons/fa6";
import { useState } from "react";
import StoryOptions from "./StoryOptions";
import { formatDateFns } from "../utils/helpers";

function Story({post, isPublished, onRequestDelete}) {
    const {title, read_time, id, created_at, cover_image_url} = post;

    const [open, setOpen] = useState();

    const dateTime = formatDateFns(created_at);

    
    return (
        <div className="relative flex gap-4 rounded-xl cursor-pointer shadow lg:w-full">
            <picture className="hidden md:block flex-2 md:flex-1">
                <source srcSet={cover_image_url || "../team3.jpg"} type="image/jpg" />
                <img src={cover_image_url || "../team3.jpg"} alt="post image" className="w-full transition duration-300 ease-in-out transform hover:scale-110"/>
            </picture>
            <div className=" flex-4 flex flex-col justify-between p-5">
                <div className="space-y-3">
                    <h3 className="text-xl font-medium lg:text-2xl">
                        {title}
                    </h3>                
                    <div className="flex gap-2">
                        <p>
                            {read_time} mins read
                        </p>
                        <p>&bull;</p>
                        <div className="flex items-center gap-1">
                            <GoClock className="text-xl text-primary" />
                            <p>{dateTime}</p>
                        </div>
                    </div>
                </div>
                <button 
                className="w-full flex justify-end" 
                onClick={()=> setOpen((value)=> !value) }>
                    <FaEllipsis className="text-3xl cursor-pointer md:text-4xl" />
                </button>                
            </div>
            {open && <StoryOptions isPublished={isPublished} postId={id} onRequestDelete={onRequestDelete} />}
        </div>
    )
}


export default Story
