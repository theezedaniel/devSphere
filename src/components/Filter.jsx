import Tags from "./Tags"

function Filter() {
    return (
        <aside className="flex-2 space-y-5 py-3 px-2 lg:p-8">
            {/* <h2 className="text-xl">Filter by Tags</h2> */}
            <ul className="flex flex-wrap justify-center gap-5">
                <Tags tag="API" />
                <Tags tag="Backend" />
                <Tags tag="Best Practices" />
                <Tags tag="CSS" />
                <Tags tag="Express" />
                <Tags tag="Frontend" />
                <Tags tag="Hooks" />
                <Tags tag="JavaScript" />
                <Tags tag="Node.js" />
                <Tags tag="React" />
                <Tags tag="Web Design" />
                <Tags tag="TypeScript" />
            </ul>
        </aside>
    )
}

export default Filter
