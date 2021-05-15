import React from "react";

const FormsContainer = ({children}) => {

    return (
        <div className="formulario">
            <div className="card text-center">
                <br />
                <div className="justificar">
                    {children}
                </div>
            </div>
        </div>
    )

}

export default FormsContainer;