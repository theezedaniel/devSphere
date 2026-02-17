import { useAuth } from "../context/AuthContext";
import {Link} from "react-router-dom";
import { TbPencilCode } from "react-icons/tb"

function WritePostButton() {
    const {user} = useAuth();

    if(!user){
        return (
            <span className="px-5 py-2 rounded flex items-center gap-2 bg-primary opacity-60 cursor-not-allowed">
                <TbPencilCode className="text-xl text-white" />
                <p className="text-white text-xl lg:text-2xl">Write</p>
            </span>
        )
    }
    return (
        <Link to="/stories/write" className="px-5 py-2 rounded flex items-center gap-2 bg-primary">
            <TbPencilCode className="text-xl text-white" />
            <p className="text-white text-xl lg:text-2xl">Write</p>
        </Link>
    )
}

export default WritePostButton;
