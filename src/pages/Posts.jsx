import PostsHeader from "../components/PostsHeader";
import PostsList from "../components/PostsList";
import usePosts from "../features/posts/usePosts";
import { useFilteredPosts } from "../hooks/useFilteredPosts";

function Posts() {
    const { isLoading, error, posts = [] } = usePosts();
    const sortedFilteredPosts = useFilteredPosts(posts);

    return (
        <div className="flex-6 p-10 space-y-6 lg:py-10 lg:px-30">
            <div>
                <h2 className="text-xl font-bold lg:text-2xl">Articles</h2>
                <p className="text-sm text-text lg:text-base">Discover and share developers articles</p>
            </div>
            <PostsHeader />
            <PostsList posts={sortedFilteredPosts} isLoading={isLoading} error={error} />
        </div>
    )
}

export default Posts
