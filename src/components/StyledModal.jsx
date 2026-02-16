import { forwardRef } from "react";

export const StyledModal = forwardRef(({ children, className }, ref) => {
    return (
        <div ref={ref} className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl ${className}`}>
            {children}
        </div>
    );
});
