import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import WritePostButton from "../components/WritePostButton";
import Tab from "../components/Tab";
import StoriesList from "../components/StoriesList";
import useDraftedPosts from "../features/posts/useDraftedPosts";
import usePublishedPosts from "../features/posts/usePublishedPosts";
import useBookmarkedPosts from "../features/bookmarks/useBookmarkedPosts";

function Stories(){
    const {user} = useAuth();
    const [openTab, setOpenTab] = useState("published");

    const {posts: draftedPosts, isLoading: isLoadingDrafts, error: draftsError, fetchPosts: fetchDrafts} = useDraftedPosts();
    const {posts: publishedPosts, isLoading: isLoadingPublished, error: publishedError, fetchPosts: fetchPublished} = usePublishedPosts();
    const {posts: bookmarkedPosts, isLoading: isLoadingBookmarked, error: bookmarkedError, fetchPosts: fetchBookmarked} = useBookmarkedPosts();
    

    const userId = user?.id;

    const showDrafts = () => setOpenTab("draft");
    const showPublished = () => setOpenTab("published");
    const showBookmarked = () => setOpenTab("bookmarked");


    useEffect(()=>{
        if(userId && userId !== "undefined"){
            fetchDrafts(userId);
            fetchPublished(userId);
            fetchBookmarked(userId);
        }

    }, [userId, fetchDrafts, fetchPublished, fetchBookmarked]);

    
    return ( 
        <div className="py-10 px-2 space-y-6 lg:py-3.5 lg:px-10">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Stories</h1>
                <WritePostButton />
            </div>
            <div>
                <ul className="flex gap-6 border-b border-b-neutral-300 pb-3 mb-6 text-base">
                    <Tab active={openTab === "draft"} onClick={showDrafts} name={"draft"}  />
                    <Tab active={openTab === "published"} onClick={showPublished} name={"published"} />
                    <Tab active={openTab === "bookmarked"} onClick={showBookmarked} name={"bookmarked"} />
                </ul>

                
                {openTab === "draft" ? (
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
                ) : openTab === "published" ? (
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
                ) : (
                    <div>
                    {
                        bookmarkedError ? (
                            <div>{bookmarkedError}</div>
                        ) : (
                            bookmarkedPosts.length > 0 ? 
                            <StoriesList posts={bookmarkedPosts} isLoading={isLoadingBookmarked} error={bookmarkedError}
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
