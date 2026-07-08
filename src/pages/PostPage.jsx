import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostDetails from "../components/PostDetails"
import { IoArrowBackCircleOutline } from "react-icons/io5";
import usePosts from "../features/posts/usePosts";
import Spinner from "../components/Spinner";
import useProfile from "../features/profiles/useProfile";
import { formatDateFns} from "../utils/helpers";

function PostPage() {
    const {postId} = useParams();
    const {post, isLoading: postLoading, error: postError, fetchPostById} = usePosts();
    const {profile, loading: profileLoading, error: profileError, fetchProfile} = useProfile();
    const navigate = useNavigate();
 

    const goBack = () => {
        navigate(-1);
    }

    useEffect(()=> {
        if(postId)
            fetchPostById(postId);
    }, [postId])

    useEffect(()=> {
        if(post?.author_id)
            fetchProfile(post?.author_id)
    }, [post?.author_id]);  

    if(postError || profileError) return <p>{postError?.message || profileError?.message}</p>;
    if(postLoading || profileLoading || !post) return <Spinner />;

    const {title, content, cover_image_url, author_id, read_time, created_at } = post;
    const dateTime = formatDateFns(created_at);
 
    return (
        <div className="p-3 lg:p-10 flex flex-col gap-5">
            <div className="flex items-center gap-1 cursor-pointer" onClick={goBack}>
                <IoArrowBackCircleOutline className="text-xl text-stone-600" />
                <span className="text-sm text-stone-600">Back</span>
            </div>
            <div className="text-center flex flex-col justify-center items-center gap-2">
                <h1 className="text-2xl font-bold mb-4">{title} </h1>
                <PostDetails profile={profile} readTime={read_time} dateTime={dateTime} />
                <article className="">
                    <div>
                        <img src={cover_image_url} alt="cover image" crossOrigin="anonymous" />
                    </div>
                    <p className="text-sm/8 text-left lg:text-base/10">{content}</p>
                </article>
            </div>
        </div>
    )
}

export default PostPage
