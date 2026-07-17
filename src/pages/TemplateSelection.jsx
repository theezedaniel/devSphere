import { useState } from "react";
import { FaBug, FaRocket } from "react-icons/fa";
import { FaBookOpen, FaDiagramProject, FaRegPenToSquare, FaScrewdriverWrench, FaTriangleExclamation } from "react-icons/fa6";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

function TemplateSelection() {
    const [template, setTemplate] = useState("");

    // 1. Centralized template array preserving unique gradients and icons
    const templatesList = [
        {
            id: "build-log",
            title: "Build Log",
            description: "Document a project you've been building.",
            gradientClass: "from-violet-100 to-indigo-50",
            icon: <FaRocket className="text-4xl text-violet-500" />
        },
        {
            id: "architecture-decision",
            title: "Architecture Decision",
            description: "Explain why you chose a technical solution.",
            gradientClass: "from-emerald-100 to-teal-50",
            icon: <FaDiagramProject className="text-4xl text-emerald-500" />
        },
        {
            id: "refactor-story",
            title: "Refactor Story",
            description: "Walk through improving existing code.",
            gradientClass: "from-orange-100 to-amber-50",
            icon: <FaScrewdriverWrench className="text-4xl text-orange-500" />
        },
        {
            id: "bug-fix-journey",
            title: "Bug fix Journey",
            description: "Explain how you diagnosed and fixed an issue.",
            gradientClass: "from-red-100 to-rose-50",
            icon: <FaBug className="text-4xl text-red-500" />
        },
        {
            id: "tutorial",
            title: "Tutorial",
            description: "Start from scratch",
            gradientClass: "from-sky-100 to-cyan-50",
            icon: <FaBookOpen className="text-4xl text-sky-500" />
        },
        {
            id: "post-mortem",
            title: "Post Mortem",
            description: "Start from scratch",
            gradientClass: "from-yellow-100 to-orange-50",
            icon: <FaTriangleExclamation className="text-4xl text-yellow-500" />
        },
        {
            id: "blank-story",
            title: "Blank Story",
            description: "Start from scratch",
            gradientClass: "from-slate-100 to-slate-50",
            icon: <FaRegPenToSquare className="text-4xl text-slate-500" />
        }
    ];

    function useTemplate(id){
        setTemplate(id);
    }
    
    
    return (
        <div className="space-y-6 py-3 px-2 lg:py-2 lg:px-10">
            <div>
                <h1 className="text-lg font-medium lg:text-2xl">Start with a template</h1>                
                <p className="text-xs text-gray-600 lg:text-sm">Make your writing easier with predefined templates</p>
            </div>

            {/* templates grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {templatesList.map((item) => {
                    const isActive = template === item.id;

                    return (
                        <div 
                            key={item.id}
                            id={item.id} 
                            onClick={() => useTemplate(item.id)}
                            className={`space-y-1 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border-b border-b-slate-300 
                                ${isActive ? "ring-2 ring-indigo-300 -translate-y-1 shadow-xl" : ""}`}
                        >
                            <div className={`py-3 lg:py-6 w-full flex items-center justify-center`}>
                                {item.icon}
                            </div>
                            <div className="px-2 py-3 space-y-1 text-center">
                                <h3 className="text-sm font-medium lg:text-base">{item.title}</h3>
                                <p className="text-xs text-gray-500 lg:text-sm">{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            { template !== "" && <Link to={`/stories/write/${template}`} className=" flex items-center w-fit ml-auto gap-1 bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary-darker transition-colors text-base">
                Continue
                <MdOutlineKeyboardArrowRight />
            </Link>}
        </div>
    );
}

export default TemplateSelection
