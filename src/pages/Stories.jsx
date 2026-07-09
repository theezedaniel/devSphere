import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import WritePostButton from "../components/WritePostButton";
import Tab from "../components/Tab";
import StoriesList from "../components/StoriesList";
import useDraftedPosts from "../features/posts/useDraftedPosts";
import usePublishedPosts from "../features/posts/usePublishedPosts";

function Stories(){
    const {user} = useAuth();
    const [openDraft, setOpenDraft] = useState(false);

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
        <div className="flex-6 py-10 px-2 space-y-6 lg:py-3.5 lg:px-10">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Stories</h1>
                <WritePostButton />
            </div>
            <div>
                <ul className="flex gap-6 border-b border-b-neutral-300 pb-3 mb-6 text-base">
                    <Tab active={openDraft} onClick={showDrafts} name={"Draft"}  />
                    <Tab active={!openDraft} onClick={showPublished} name={"Published"} />
                </ul>

                
                {openDraft ? (
                <div>
                    {
                        draftsError ? (
                            <div>{draftsError}</div>
                        ) : (
                            draftedPosts.length > 0 ? 
                            <StoriesList posts={draftedPosts} isLoading={isLoadingDrafts} error={draftsError} isPublished={false} />
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
                            <StoriesList posts={publishedPosts} isLoading={isLoadingPublished} error={publishedError}
                            isPublished={true} />
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
