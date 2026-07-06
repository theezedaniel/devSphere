import { HiOutlineBars3,} from "react-icons/hi2"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext";
import Modal from "./Modal";
import { GoPerson } from "react-icons/go";

function Navbar({toggleSideNav}) {
    const { user } =  useAuth(); 
    
    return (
        <nav className="flex justify-between items-center px-5 py-3 max-w-sm lg:max-w-xl  mx-auto sticky top-0 z-10 w-full backdrop-blur-lg bg-white/30 border-b border-white border-opacity-30 shadow-lg rounded-full mt-10">
            <div className="flex items-center gap-4">
                {user && <HiOutlineBars3 className="text-xl cursor-pointer lg:hidden" onClick={toggleSideNav}  />}
                <Link to="/">
                    <img src="../default-monochrome-black.svg" alt="DevSphere Logo" className="w-[90px] md:w-[100px]" />
                </Link>
            </div>
            <div className="flex gap-4 items-center">
                <Link to="/posts" className="font-medium text-base lg:text-lg  hover:underline">Articles</Link>
                {user 
                ? ( 
                    <Link to="/profile">
                        <GoPerson className="text-primary text-xl"/>
                    </Link>
                )
                : (
                    <Modal.Open opens="sign-in">
                        <button className="bg-primary text-white px-4 py-1 rounded-full cursor-pointer hover:px-6 transition-all duration-500">Sign in</button>
                    </Modal.Open>
                )}
            </div>
        </nav>
    )
}

export default Navbar
