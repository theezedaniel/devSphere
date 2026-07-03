import SpinnerMini from "./SpinnerMini";

function FormButton({text, disabled, onClick}) {
    return (
        <button 
        className={`px-4 py-2 lg:px-6 capitalize cursor-pointer hover:shadow-md  rounded 
        ${disabled ? 'opacity-80 cursor-not-allowed' : ''} 
        ${text === "save draft" ? "ring ring-primary text-primary":"bg-primary text-white flex items-center gap-1" }`} 
        disabled={disabled}
        onClick={onClick}
        >
            {disabled && text !== "save draft" && <SpinnerMini />}
            {text}
        </button>
    )
}

export default FormButton;
