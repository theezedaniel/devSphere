import { Link } from "react-router-dom";
import Modal from "./Modal";
import ConfirmAction from "./ConfirmAction";
import useDeletePost from "../features/posts/useDeletePost";
import useCopyLinkButton from "../hooks/useCopyLinkButton";
import { slugify } from "../utils/slugify";
import { GoLink, GoPencil, GoTrash } from "react-icons/go";


function StoryOptions({isPublished, postId, title}) {

    const {loading: deleteLoading, deletePost} = useDeletePost(); 
    const {handleCopyLink, copied} = useCopyLinkButton();

    const slug = slugify(title);
    
    function handleDeletePost(){
        if(!postId) return;
        deletePost(postId);
    }

    function handleCopyLinkClick(){
        const url = `${window.location.origin}/posts/${slug}`;
        handleCopyLink(url);
    }

    return (
        <div className="absolute z-40 -bottom-28 right-0 bg-white rounded-lg drop-shadow-xl py-4 w-60 space-y-2 md:w-90 md:space-y-6 md:-bottom-65">
            <p className="hover:font-medium flex gap-2 items-center px-4 mb-2 md:text-lg cursor-pointer" onClick={handleCopyLinkClick}>
                <GoLink />
                <span>{copied ? "Link Copied!" : "Copy Link"}</span>
            </p>
            <hr className="text-neutral-200"/>
            <ul className="space-y-4 px-4 md:text-lg">
                <Link to={`/stories/write/${postId}`} className="hover:font-medium  flex gap-2 items-center">
                    <GoPencil />
                    <span>Edit Story</span>
                </Link>
                {!isPublished && 
                <Link className="hover:font-medium flex gap-2 items-center">
                    <GoPencil />
                    <span>Publish Story</span>
                </Link>
                }
                {/* <Link className="hover:font-medium flex gap-2 items-center">
                    <GoPencil />
                    <span>View Settings</span>
                </Link> */}
            </ul>
            <hr className="text-neutral-200"/>
            <Modal.Open opens={"delete"}>
                <button 
                className="hover:font-medium flex gap-2 items-center px-4 text-red-600 cursor-pointer md:text-lg"     disabled={deleteLoading}                
                >
                    <GoTrash />
                    <span>Delete Story</span>
                </button>
            </Modal.Open> 
            
            <Modal.Window name="delete">
                <ConfirmAction onClick={handleDeletePost} 
                icon={<GoTrash className="text-lg"/>} 
                action={"delete"} loading={deleteLoading} />
            </Modal.Window>
        </div>
    )
}

export default StoryOptions
