import { Link } from "react-router-dom";
import Modal from "./Modal.jsx";
import {useAuth} from "../context/AuthContext.jsx";
import { GoHome, GoPerson, GoBookmark } from "react-icons/go";
import { CiSettings, CiLogout } from "react-icons/ci";
import {useOutsideClick} from "../hooks/useOutsideClick";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";

function SideNavBar({display, toggleSideNav}) {
    const {user} = useAuth();
    const ref = useOutsideClick(() => {
        if (display) toggleSideNav();
    }, true);

    if(!user)
        return null;

    return (
        <ul ref={ref}         
        className={`px-4 py-6 space-y-12 text-base backdrop-blur-lg shadow-md
        fixed left-0 h-dvh z-50 
        transition-all duration-300 ease-in-out
        
        /* Mobile Behavior */
        ${display ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'}
        
        /* Large Screen (Desktop) Behavior */
        lg:relative lg:z-0 lg:backdrop-blur-none lg:shadow-none lg:border-r lg:border-r-stone-200 lg:translate-x-0
        ${display ? 'lg:w-40 lg:px-1 lg:overflow-visible' : 'lg:w-0 lg:px-0 lg:py-0 lg:border-none lg:overflow-visible'}
    `}
        >
            {display ? <LuPanelLeftClose className={`text-xl cursor-pointer absolute top-6 transition-all duration-300 right-4 `}  onClick={toggleSideNav}  /> 
            :
            <LuPanelRightClose className={`text-xl cursor-pointer absolute top-6 transition-all duration-300 left-4 lg:left-6 `}  onClick={toggleSideNav}  />}
            
            <div className={`w-34 space-y-12 pt-10 transition-opacity duration-200 ${display ? 'opacity-100' : 'opacity-0 pointer-events-none lg:hidden'}`}>
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
            </div>
        </ul>
    )
}

export default SideNavBar
