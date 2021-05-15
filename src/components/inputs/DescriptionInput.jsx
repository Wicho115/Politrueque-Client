import React from "react";

const DescriptionInput = ({ toDescribe, suggestion, minmax, children }) => {

    return (
        <>
            <label htmlFor="exampleFormControlTextarea1">{toDescribe}</label>
            <small id="emailHelp" className="form-text text-muted">{suggestion}</small>
            {children}
            <small id="emailHelp" className="form-text text-muted">{minmax}</small>
        </>
    )

}

export default DescriptionInput;