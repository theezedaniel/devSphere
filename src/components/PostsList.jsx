import { FaRegFolderOpen } from "react-icons/fa";
import Post from "./Post";
import SkeletonLoading from "./SkeletonLoading";
import { LuFolderSearch } from "react-icons/lu";
import EmptyStories from "./EmptyStories";

function PostsList({posts = [], isLoading, error}) {
    const skeletonCount = posts && posts.length > 0 ? posts.length : 6;
    return (          
            <div className="mt-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-5 ">
                {isLoading 
                ? (
                    <SkeletonLoading skeletonCount={skeletonCount} />
                ) : error ? (
                    <p>Error loading posts</p>
                ) : posts.length === 0 ? (    
                    <div className="md:col-span-2 lg:col-span-3 w-full flex items-center justify-center">                
                        <EmptyStories
                            icon={LuFolderSearch}
                            title="No posts available"
                            description="Couldn't find available post under this category. Try a different search."
                                                        
                          />
                    </div>
                ) : (
                    
                        posts.map(post => (
                            <Post key={post.id} post={post} />
                        ))
                    )}
                </div>
            </div>
    )
}

export default PostsList
