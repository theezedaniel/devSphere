import { useParams } from "react-router-dom";
import useProfile from "../features/profiles/useProfile";
import { useEffect } from "react";
import Spinner from "../components/Spinner";
import usePublishedPosts from "../features/posts/usePublishedPosts";
import StoriesList from "../components/StoriesList";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter, FaLink } from "react-icons/fa6";

function ViewProfile() {
    const {authorId} =  useParams();

    const {profile, loading: profileLoading, error: profileError, fetchProfile} = useProfile();
    const {isLoading: postsLoading, error: postsError, posts, fetchPosts} = usePublishedPosts();

    useEffect(()=>{
        if(!authorId) return;
        fetchProfile(authorId);        
    }, [authorId])
    useEffect(()=>{
        if(!authorId) return;
        fetchPosts(authorId);        
    }, [authorId])
    

    if(profileLoading) return <Spinner />;

    const [{avatar_url, full_name, bio, github_url, linkedIn_url, portfolio_url, twitter_url, role, created_at, updated_at}] = profile;

    return (
        <div className="py-10 px-2 space-y-6 lg:py-3.5 lg:px-10">

            {/* <div className="h-40 bg-primary">                
            </div> */}

            <div className="flex items-start gap-3">
                <img src={avatar_url} alt="avatar bg" crossOrigin="anonymous" className="rounded-full w-20 h-20" />
                <div className="space-y-2">

                    <h1 className="text-2xl font-bold">{full_name}</h1>

                    <p className="capitalize text-stone-500 font-medium text-base">{role}</p>

                    <div className="flex items-center">
                        <a href={github_url || "#"} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline lg:text-lg">
                            <FaGithub className="text-base" />
                        </a>
                        <span className="mx-2 text-gray-500">|</span>
                        <a href={linkedIn_url || "#"} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline lg:text-lg">
                            <FaLinkedin className="text-base" />
                        </a>
                        <span className="mx-2 text-gray-500">|</span>
                        <a href={twitter_url || "#"} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline lg:text-lg">
                            <FaXTwitter className="text-base" />
                        </a>
                        <span className="mx-2 text-gray-500">|</span>
                        <a href={portfolio_url || "#"} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline lg:text-lg">
                            <FaLink className="text-base" />
                        </a>

                    </div>
                </div>
                
            </div>

            <div>
                <h2 className="font-medium text-base">Bio</h2>
                <p className="text-stone-800">{bio}</p>
            </div>

            <div>
                <h2 className="font-medium text-base">Articles</h2>
                <StoriesList posts={posts} isLoading={postsLoading} error={postsError} isReaderView={true} />
            </div>

        </div>
    )
}

export default ViewProfile
