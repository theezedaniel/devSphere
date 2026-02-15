import { cloneElement, createContext, useContext, useState } from "react";
import {useOutsideClick} from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import { StyledModal } from "./StyledModal";


const ModalContext = createContext();


function Modal({children}){
    const [openName, setOpenName] = useState("");

    const close = ()=> setOpenName("");
    const open = (e)=> setOpenName(e);

    return <ModalContext.Provider value={{openName, close, open}}>
        {children} 
    </ModalContext.Provider>
}


function Open({children, opens: opensWindowName}){
    const {open} = useContext(ModalContext);

    return cloneElement(children, {onClick: ()=> open(opensWindowName)})
}

function Window({children, name}){
    const {openName, close} = useContext(ModalContext);
    const ref = useOutsideClick(close);

    if(name !== openName) return null;

    return createPortal (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/20 backdrop-blur-sm transition-all duration-500 z-50">
            <StyledModal ref={ref}>
                <button className="p-1.5 rounded-sm absolute top-5 right-7 group hover:bg-primary cursor-pointer" onClick={close}>
                    <HiXMark className="text-xl group-hover:text-white" />
                </button>
                <div>
                    {cloneElement(children, {onCloseModal: close})}
                </div>
            </StyledModal>
        </div>,
        document.body
    )
}

function Button({children}){
    return (
        <button>
            {children}
        </button>
    )
}

Modal.Open = Open
Modal.Window = Window
Modal.Button = Button


export default Modal;
