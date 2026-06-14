import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GoFilter } from "react-icons/go";
import Tags from "./Tags";

function FilterBar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [open, setOpen] = useState(false);
    
    // Always derive selectedTags from URL, don't store separately
    const selectedTags = searchParams.get("tags")?.split(",") ?? [];

    function updateUrl(tags) {
        const params = new URLSearchParams(searchParams); //creates a copy of the URL query params 
        if (tags.length) params.set("tags", tags.join(","));
        else params.delete("tags");
        setSearchParams(params, { replace: true }); //prevents back button spam
    }

    function onSelect(tag) {
        const next = selectedTags.includes(tag) 
            ? selectedTags.filter(t => t !== tag) 
            : [...selectedTags, tag];
        updateUrl(next);
    }

    const filterTags = ["javascript", "react", "css", "node.js", "python", "beginners", "growth", "supabase"];
    return (
        <div className="relative">
            <GoFilter
                className={`text-2xl cursor-pointer ${selectedTags.length > 0 ? 'text-primary bg-primary/20 p-0.5' : ''}`}
                onClick={() => setOpen(v => !v)}
            />
            {open && (
                <div className="top-9 -left-5 ring ring-stone-300 px-1 py-1 rounded absolute bg-white w-[180px] h-[250px] overflow-y-scroll flex flex-col gap-1 z-10 animate-in fade-in zoom-in-95 duration-200">
                    <p className="px-3 py-1 font-semibold">{filterTags.length} tags(scroll for more)</p>
                    <hr className="text-stone-100"/>
                    {filterTags.map((tag, index) => (
                        <Tags key={index} tag={tag} type="filter" onSelect={onSelect} isSelected={selectedTags.includes(tag)} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default FilterBar;
