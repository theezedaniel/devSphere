import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import SideNavBar from "./SideNavBar";
import { useState } from "react";
import Modal from "./Modal";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

function AppLayout() {
    const [openSideNav, setOpenSideNav] = useState(false);

    const toggleSideNav = ()=>{
        setOpenSideNav((value)=> !value);
    }

    return (
        <div className="p-1">
            <Modal>
                <Navbar toggleSideNav={toggleSideNav} />
                <main className="text-text p-4 min-h-screen flex justify-center items-start">
                    <SideNavBar display={openSideNav} />
                    <Outlet />
                </main>
                
                <Modal.Window name="sign-in">
                    <Login />
                </Modal.Window>
                <Modal.Window name="sign-up">
                    <Signup />
                </Modal.Window>
            </Modal>
        </div>
    )
}

export default AppLayout

