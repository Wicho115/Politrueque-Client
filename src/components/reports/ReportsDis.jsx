import React from "react";
import { Link } from "react-router-dom";

const ReportsDis = ({ to, title, author, content, createdAt }) => {

    return (
        <Link to={to} className="enlace-reporte">
            <div className="card mb-3 enlace">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">Autor: {author} </h6>
                    <p className="card-text">{content}</p>
                </div>
            </div>
        </Link>
    )

}

export default ReportsDis;