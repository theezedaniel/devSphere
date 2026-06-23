import { Link } from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";
import { GoHome, GoPerson, GoBookmark } from "react-icons/go";
import { CiSettings, CiLogout } from "react-icons/ci";
import Modal from "./Modal.jsx";
import {useOutsideClick} from "../hooks/useOutsideClick";

function SideNavBar({display, toggleSideNav}) {
    const {user} = useAuth();
    const ref = useOutsideClick(() => {
        if (display) toggleSideNav();
    }, true);

    if(!user)
        return null;

    return (
        <ul ref={ref} className={`px-4 py-6 space-y-12 text-base backdrop-blur-lg shadow-md
        fixed left-0 h-dvh w-64 z-50 
        transform transition-transform duration-300 ease-in-out
        ${display ? 'translate-x-0' : '-translate-x-full'}
        lg:sticky lg:top-30 lg:translate-x-0 lg:z-auto lg:block lg:w-40 lg:p-1 lg:transition-none lg:shadow-none lg:border-r lg:border-r-stone-200
        `}>
            
            <Link to="/" className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded ">
                <GoHome className="text-primary text-xl" />
                <span>Home</span>                
            </Link>
            
            <Link to={"/profile"} className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded ">
                <GoPerson className="text-primary text-xl" />
                <span>Profile</span>
            </Link>

            {/* <Link className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded ">
                <GoBookmark className="text-primary text-xl" />
                <span>Library</span>
            </Link> */}

            <Link to={"/stories"} className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded ">
                <GoBookmark className="text-primary text-xl" />
                <span>Stories</span>
            </Link>

            <Link to={"/settings"} className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded ">
                <CiSettings className="text-primary text-xl" />
                <span>Settings</span>
            </Link>

            {user && (
                <Modal.Open opens={"logout"}>
                <li className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded ">
                    <CiLogout className="text-primary text-xl" />
                    <span>Logout</span>
                </li>
                </Modal.Open>
            )
            }
        </ul>
    )
}

export default SideNavBar
