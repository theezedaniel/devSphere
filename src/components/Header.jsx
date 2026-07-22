import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoSearch } from "react-icons/go";
import Button from "./Button";

function Header() {
    const navigate = useNavigate();
    // 1. Create a local state to track typing on the homepage
    const [query, setQuery] = useState("");

    function handleSubmit(e) {
        e.preventDefault(); // 2. Stop the browser from appending "?" and reloading
        
        if (query.trim().length > 0) {
            // 3. Jump straight to the posts list view page with the query
            navigate(`/posts?q=${encodeURIComponent(query.trim())}`);
        }
    }

    return (
        <section className="rounded py-10 px-2 space-y-7 flex flex-col justify-center items-center text-center lg:mb-10 lg:px-20 lg:py-16">
            <h1 className="text-3xl tracking-widest font-bold lg:text-5xl">Learn. Code. Grow.</h1>
            <p className="text-stone-700 text-sm lg:text-base">
                A collaborative platform for developers and students to share knowledge about their code, what they learnt, what they can do and what actually works!
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center gap-4 lg:gap-2">
                <div className="flex gap-3 items-center px-4 py-2 rounded-3xl w-[300px] bg-stone-200 lg:w-[500px]">
                    <GoSearch className="text-xl" /> 
                    <input 
                        type="text" 
                        placeholder="Search articles..." 
                        className="outline-0 w-full placeholder:text-stone-600 text-stone-900 p-1"
                        value={query} // 4. Bind value to state
                        onChange={(e) => setQuery(e.target.value)} // 5. Update state as user types
                    />
                </div>
                <Button type="submit">
                    Search
                </Button>
            </form>
        </section>
    );
}

export default Header;