import { useState } from "react";
import { Outlet } from "react-router-dom"
import { CiLogout } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Navbar from "./Navbar"
import SideNavBar from "./SideNavBar";
import Modal from "./Modal";
import ConfirmAction from "./ConfirmAction";
import useLogout from "../features/authentication/useLogout";
import useDeletePost from "../features/posts/useDeletePost";

function AppLayout() {
    const [openSideNav, setOpenSideNav] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState(null);
    const {loading: deleteLoading, deletePost} = useDeletePost();
    const {loading: logoutLoading, logout} = useLogout();
    

    const toggleSideNav = ()=>{
        setOpenSideNav((value)=> !value);
    }

    function handleLogout(){
        logout();
    }

    function handleDeletePost(){
        if(!pendingDeleteId) return;
        // Simulate deleting a post with the pending ID
        deletePost(pendingDeleteId);
        setPendingDeleteId(null); 
    }

    return (
        <div className="p-1">
            <Modal>
                <Navbar toggleSideNav={toggleSideNav} />
                <main className="text-text p-4 min-h-screen flex justify-center items-start">
                    <SideNavBar display={openSideNav} toggleSideNav={toggleSideNav} />
                    <Outlet context={{setPendingDeleteId}} />
                </main>
                
                <Modal.Window name="sign-in">
                    <Login />
                </Modal.Window>
                <Modal.Window name="sign-up">
                    <Signup />
                </Modal.Window>
                <Modal.Window name="logout">
                    <ConfirmAction onClick={handleLogout} icon={<CiLogout className="text-lg" />} action={"logout"} loading={logoutLoading} />
                </Modal.Window>
                <Modal.Window name="delete">
                    <ConfirmAction onClick={handleDeletePost} icon={<GoTrash className="text-lg"/>} action={"delete"} loading={deleteLoading} />
                </Modal.Window>
            </Modal>
        </div>
    )
}

export default AppLayout

