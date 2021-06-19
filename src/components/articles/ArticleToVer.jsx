import React from "react";
import { Link } from "react-router-dom";

const handleCategory = (category) => {
    switch (category) {
        case 1:
            return ("Matemáticas");
        case 2:
            return ("Química");
        case 3:
            return ("Física");
        case 4:
            return ("Inglés");
        case 5:
            return ("Historia");
        case 6:
            return ("Filosofía");
        case 7:
            return ("Dibujo Técnico");
        case 8:
            return ("Programación");
        case 9:
            return ("Máquinas con Sistemas Automatizados");
        case 10:
            return ("Sistemas Digitales");
        default:
            return ("Otro");
    }
}

const ArticleToVer = ({ to, img, alt, name, description, propertary, category }) => {

    return (
        <Link to={to} className="enlace-artículo">
            <div className="card mb-3 enlace">
                <div className="row no-gutters">
                    <div className="col-ml-4">
                        <img src={img} className="card-img img-thumbnail img-artículo" alt={alt} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text">Propietario: {propertary}</p>
                            <p className="card-text"><small className="text-muted">Categoría: {handleCategory(category)}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )

}

export default ArticleToVer;