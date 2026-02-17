import SkeletonLoading from "./SkeletonLoading";
import Story from "./Story";

function StoriesList({posts = [], isLoading, error, isPublished, }) {
    const skeletonCount = posts && posts.length > 0 ? posts.length : 6;
    return (          
            <div className="mt-10">
                <div className="grid gap-10 mt-5">
                {isLoading 
                ? (
                    <SkeletonLoading skeletonCount={skeletonCount} />
                ) : error ? (
                    <p>Error loading posts</p>
                ) : (
                    
                        posts.map(post => (
                            <Story key={post.id} post={post} isPublished={isPublished} />
                        ))
                    )}
                </div>
            </div>
    )
}

export default StoriesList
