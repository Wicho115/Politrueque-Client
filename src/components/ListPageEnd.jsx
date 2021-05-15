import React from "react";
import { Link } from "react-router-dom";

const ListPageEnd = ({to, category}) => {

    return (
        <div className="card info-sección">
            <div className="card-body">
                <div className="info-sección-3">
                    <p>¡Vaya! Parece que has llegado al final de esta sección. Intenta recargar la página
                    para ver si hay nuevos productos. O si lo deseas, puedes agregar tu propio {category} haciendo
            <Link to={to}> clic aquí</Link>.</p>
                </div>
            </div>
        </div>
    )

}

export default ListPageEnd;