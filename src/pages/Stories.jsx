import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useDraftedPosts from "../features/posts/useDraftedPosts";
import PostsList from "../components/PostsList";
import WritePostButton from "../components/WritePostButton";
import Tab from "../components/Tab";
import usePublishedPosts from "../features/posts/usePublishedPosts";

function Stories(){
    const {user} = useAuth();
    const [openDraft, setOpenDraft] = useState(true);

    const {posts: draftedPosts, isLoading: isLoadingDrafts, error: draftsError, fetchPosts: fetchDrafts} = useDraftedPosts();
    const {posts: publishedPosts, isLoading: isLoadingPublished, error: publishedError, fetchPosts: fetchPublished} = usePublishedPosts();
    

    const userId = user?.id;

    const showDrafts = () => setOpenDraft(true);
    const showPublished = () => setOpenDraft(false);


    useEffect(()=>{
        if(userId){
            fetchDrafts(userId);
            fetchPublished(userId);
        }

    }, [userId, fetchDrafts, fetchPublished]);

    
    return ( 
        <div className="flex-6 p-8 space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Stories</h1>
                <WritePostButton />
            </div>
            <div>
                <ul className="flex gap-6 border-b border-b-neutral-300 pb-3 mb-6 text-lg">
                    <Tab active={openDraft} onClick={showDrafts} name={"Draft"} />
                    <Tab active={!openDraft} onClick={showPublished} name={"Published"} />
                </ul>

                
                {openDraft ? (
                <div>
                    {
                        draftsError ? (
                            <div>{draftsError}</div>
                        ) : (
                            draftedPosts.length > 0 ? 
                            <PostsList posts={draftedPosts} isLoading={isLoadingDrafts} error={draftsError} />
                            : <div>No drafted post yet!</div> 
                        )
                    }
                </div>
                ):(
                    <div>
                    {
                        publishedError ? (
                            <div>{publishedError}</div>
                        ) : (
                            publishedPosts.length > 0 ? 
                            <PostsList posts={publishedPosts} isLoading={isLoadingPublished} error={publishedError} />
                            : <div>No published post yet!</div> 
                        )
                    }
                </div>
                )}
            </div>    
        </div>
    )
}



export default Stories;
