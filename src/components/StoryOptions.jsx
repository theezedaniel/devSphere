import { GoLink, GoPencil, GoTrash } from "react-icons/go";
import { Link } from "react-router-dom";
function StoryOptions({isPublished, postId}) {
    return (
        <div className="absolute z-20 -bottom-50 right-0 bg-white rounded-lg drop-shadow-xl py-4 w-60 space-y-2 md:w-90 md:space-y-6 md:-bottom-65">
            <p className="hover:font-medium flex gap-2 items-center px-4 mb-2 md:text-lg">
                <GoLink />
                <span>Copy Link</span>
            </p>
            <hr className="text-neutral-200"/>
            <ul className="space-y-4 px-4 md:text-lg">
                <Link to={`/stories/write/${postId}`} className="hover:font-medium flex gap-2 items-center">
                    <GoPencil />
                    <span>Edit Story</span>
                </Link>
                {!isPublished && 
                <Link className="hover:font-medium flex gap-2 items-center">
                    <GoPencil />
                    <span>Publish Story</span>
                </Link>
                }
                <Link className="hover:font-medium flex gap-2 items-center">
                    <GoPencil />
                    <span>View Settings</span>
                </Link>
            </ul>
            <hr className="text-neutral-200"/>
            <p className="hover:font-medium flex gap-2 items-center px-4 text-red-600 md:text-lg ">
                <GoTrash />
                <span>Delete Story</span>
            </p>
        </div>
    )
}

export default StoryOptions
