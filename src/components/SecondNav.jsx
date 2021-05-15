import React from "react";

const ArticlesNav = ({children}) => {

    return (
        <div className="navegación_secundaria_1">
            <nav className="nav nav-pills nav-fill">
                {children}
            </nav>
        </div>
    )

}

export default ArticlesNav;