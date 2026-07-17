import { useAuth } from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import { TbPencilCode } from "react-icons/tb"
import { useModal } from "./Modal";

function WritePostButton() {
    const navigate = useNavigate();
    const {user} = useAuth();
    const {open} = useModal();

    const writePost = ()=> {
        if(!user){
            open("sign-in");
            return;
        }
        navigate("/stories/write")
    }

    return (
        <div onClick={writePost} className="px-4 py-1 rounded flex items-center gap-2 bg-primary cursor-pointer">
            <TbPencilCode className="text-xl text-white" />
            <p className="text-white text-sm lg:text-base">Write</p>
        </div>
    )
}

export default WritePostButton;
