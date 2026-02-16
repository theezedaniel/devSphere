export default function ConfirmAction({action, icon, onClick, loading,  onCloseModal}){

    function handleClick(){
        onClick?.();
        onCloseModal?.();
    }

    function handleCancel(){
        onCloseModal?.();
    }

    return (
        <div className="flex flex-col gap-8 py-10 px-6 rounded-md w-[500px] m-auto lg:w-[800px] lg:px-20">
            <p className="text-center font-medium text-xl lg:text-2xl">Are you sure you want to {action}?</p>
            <div className="flex gap-4">
                <button className="flex-4 ring-2 ring-stone-300 p-3 font-medium rounded cursor-pointer hover:shadow lg:text-lg" onClick={handleCancel}>Cancel</button>
                <button 
                className="flex-4 flex gap-1 items-center justify-center capitalize p-3 bg-red-600 text-white rounded font-medium cursor-pointer hover:shadow lg:text-lg"
                onClick={handleClick}
                disabled={loading}>
                    {icon}
                    <span>{loading ? "confirming..." : action}</span>
                </button>
            </div>
        </div>
    );
}