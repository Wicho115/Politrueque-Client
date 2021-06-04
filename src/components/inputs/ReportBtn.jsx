import React from 'react';
import { Link } from "react-router-dom";

const ReportBtn = ({ refer, userData }) => {

    const divStyle = {
        marginRight: '0.7rem',
        marginTop: '0.5rem'
    }

    const buttonStyle = {
        backgroundColor: "rgb(255,255,255)",
        borderColor: "rgb(128,0, 64)",
        color: "rgb(128,0, 64)"
    }

    return (
        <>
            <div className="alinear-izquierda" style={divStyle}>
                <Link to={refer} style={buttonStyle}><i className="fa fa-exclamation-triangle" aria-hidden="true"></i></Link>
            </div>
        </>
    );
}

export default ReportBtn;