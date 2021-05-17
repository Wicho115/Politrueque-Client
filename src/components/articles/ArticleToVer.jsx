import React from "react";
import { Link } from "react-router-dom";

const ArticleToVer = ({ to, img, alt, name, description, propertary, category }) => {

    return (
        <div className="enlace-artículo">
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
                            <p className="card-text"><small className="text-muted">Categoría: {category}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ArticleToVer;