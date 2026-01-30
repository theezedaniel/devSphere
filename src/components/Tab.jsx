function Tab({active, onClick, name}) {
    return (
        <li className={`cursor-pointer ${active ? "font-semibold" : ""}`} onClick={onClick}>
            {name}
        </li>
    )
}

export default Tab
