function Tab({active, onClick, name}) {
    return (
        <li className={`flex items-center gap-1 cursor-pointer ${active ? "font-semibold" : ""}`} onClick={onClick}>
            {name} 
        </li>
    )
}

export default Tab
