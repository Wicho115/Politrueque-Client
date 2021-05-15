import React from "react";
import { Link } from "react-router-dom";

const ListPageBeg = ({ to, category, type }) => {

    return (
        <div className="card info-sección">
            <div className="card-body">
                <div className="info-sección-1">
                    <Link to={to} className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>
                        <i className="fa fa-plus-square-o" />&nbsp;Agregar {category}</Link>
                </div>
                <div className="info-sección-2">
                    <p>A continuación, se muestran los {category}s de la Categoría: {type}</p>
                </div>
            </div>
        </div>
    )

}

export default ListPageBeg;