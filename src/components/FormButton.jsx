import SpinnerMini from "./SpinnerMini";

function FormButton({text, disabled, onClick}) {
    return (
        <button 
        className={`px-6 py-3 capitalize cursor-pointer hover:shadow-md  rounded 
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
