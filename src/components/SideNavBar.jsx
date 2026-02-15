import { GoHome, GoPerson, GoBookmark } from "react-icons/go";
import { CiSettings, CiLogout } from "react-icons/ci";
import { Link } from "react-router-dom";
import useLogout from "../features/authentication/useLogout";

function SideNavBar({display}) {
    const logout = useLogout();

    function handleLogout(){
        logout();
    }

    return (
        <ul className={`px-4 py-6 space-y-12 text-xl backdrop-blur-lg shadow-md
        fixed left-0 h-dvh w-64 z-50
        transform transition-transform duration-300 ease-in-out
        ${display ? 'translate-x-0' : '-translate-x-full'}
        lg:static lg:translate-x-0 lg:z-auto lg:block lg:w-64 lg:transition-none
  `}>
            
            <Link to="/" className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded lg:text-xl">
                <GoHome className="text-primary text-xl lg:text-3xl" />
                <span>Home</span>                
            </Link>
            
            {/* <Link className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded lg:text-xl">
                <GoPerson className="text-primary text-xl lg:text-3xl" />
                <span>Profile</span>
            </Link> */}

            {/* <Link className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded lg:text-xl">
                <GoBookmark className="text-primary text-xl lg:text-3xl" />
                <span>Library</span>
            </Link> */}

            <Link to={"/stories"} className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded lg:text-xl">
                <GoBookmark className="text-primary text-xl lg:text-3xl" />
                <span>Stories</span>
            </Link>

            {/* <Link className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded lg:text-xl">
                <CiSettings className="text-primary text-xl lg:text-3xl" />
                <span>Settings</span>
            </Link> */}

            <li className="px-3 py-4 flex items-center gap-2 hover:bg-white/30 cursor-pointer rounded lg:text-xl" onClick={()=>handleLogout()}>
                <CiLogout className="text-primary text-xl lg:text-3xl" />
                <span>Logout</span>
            </li>
        </ul>
    )
}

export default SideNavBar
