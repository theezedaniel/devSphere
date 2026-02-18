import { BiLoaderAlt } from "react-icons/bi";

function SpinnerMini() {
    return (
        <BiLoaderAlt 
          className="w-[2.4rem] h-[2.4rem] animate-spin" 
          style={{ animationDuration: '1.5s' }} 
        />
    )
}

export default SpinnerMini
