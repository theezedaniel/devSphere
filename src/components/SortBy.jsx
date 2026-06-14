import { FaFire } from "react-icons/fa"
import { GoClock } from "react-icons/go"
import { useSearchParams } from "react-router-dom";

function SortBy() {
    const [searchParams, setSearchParams] = useSearchParams();

    const sortBy = searchParams.get("sortBy") || "latest";

    function handleChange(value){
        searchParams.set("sortBy", value);
        setSearchParams(searchParams);
    }

    const activeClass = (name) =>
        `flex items-center gap-2 rounded-full px-5 py-2 ${sortBy === name ? "bg-primary/10 ring ring-primary" : "ring ring-stone-400"}`

    return (
        <div className="flex items-center gap-5">
            <button type="button" onClick={()=> handleChange("latest")} className={activeClass("latest")}>
                <GoClock className="text-xl text-primary" />
                <p className="text-sm lg:text-base">Latest</p>
            </button>
            <button type="button" onClick={()=> handleChange("popular")} className={activeClass("popular")}>
                <FaFire className="text-xl text-primary" />
                <p className="text-sm lg:text-base">Popular</p>
            </button>
        </div>
    )
}

export default SortBy
