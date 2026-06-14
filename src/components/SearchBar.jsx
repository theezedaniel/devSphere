import { useSearchParams } from "react-router-dom";
import { GoSearch } from "react-icons/go"

function SearchBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchQuery = searchParams.get("q") || ""; // Derive from URL, no state needed

    function updateUrl(query) {
        const params = new URLSearchParams(searchParams); //creates a copy of the URL query params 
        if (query.length) params.set("q", query);
        else params.delete("q");
        setSearchParams(params, { replace: true }); //prevents back button spam
    }

    function onSearchChange(e) {
        const query = e.target.value;
        updateUrl(query);
    }

    function handleSubmit(e){
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-3 items-center px-4 py-2 rounded-full w-full bg-stone-100 lg:w-[600px]">
            <GoSearch className="text-xl" /> 
            <input type="text" 
            placeholder="Search articles..." className="outline-0 w-full placeholder:text-stone-600 text-stone-900 p-1 text-sm" 
            value={searchQuery} 
            onChange={onSearchChange}/>
        </form>        
    )
}

export default SearchBar
