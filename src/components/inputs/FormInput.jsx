import React from "react";

const FormInput = ({ small, label, children }) => {

    return (
        <div className="columna_formulario">
            <small id="emailHelp" className="form-text text-muted">{small}</small>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">{label}</label>
                </div>
                {children}
            </div>
        </div>
    )

}

export default FormInput;