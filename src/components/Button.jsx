function Button({children, type, disabled}) {

    
    return (
        <button 
        className={`cursor-pointer disabled:cursor-not-allowed 
            ${type === "primary" 
                ? "bg-stone-800 text-stone-100 p-3 rounded font-medium hover:bg-stone-900"
                : type === "submit" 
                ? "bg-primary px-8 py-3 rounded-3xl text-stone-100"
                : "ring ring-neutral-300 px-4 py-2 rounded hover:ring-neutral-400"}`}
        disabled={disabled}
        >
            {children}
        </button>        
    )
}

export default Button
