import React from "react";
import "./style.scss"

const LayoutWrapper = ({ children, className }) => {

    return (
        <div className={`dimark-wrapper ${className || ''}`}>
            {children}
        </div>
    )

}

export default LayoutWrapper;