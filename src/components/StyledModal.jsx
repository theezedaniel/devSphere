export function StyledModal({ children }) {
    return (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background rounded-lg shadow-lg p-8 md:p-12 transition-all duration-500">
            {children}
        </div>
    );
}
