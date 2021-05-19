import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";

import Button from "../../components/Button";

import reportJSON from "../../helpers/ReportSample";
import userJSON from "../../helpers/UserSample";
import articleJSON from "../../helpers/ArticleSample";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const ReportPage = () => {
    const query = useQuery();
    const type = query.get('t');

    const [report, setReport] = useState({});
    const [user, setUser] = useState({});
    const [article, setArticle] = useState({});

    useEffect(() => {
        setReport(reportJSON);
        setUser(userJSON.user);
        setArticle(articleJSON);
    }, []);

    switch (type) {
        case 'a':
            return (
                <article className="conenedor_terciario_1">
                    <div className="artículos_display">

                        <div className="card mb-3" style={{ maxWidth: 1000 }}>
                            <div className="card-body">
                                <h5 className="card-title">{report.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Autor: {report.author}</h6>
                                <h6 className="card-subtitle mb-2 text-muted">Creado el {report.createdAt}</h6>
                            </div>
                            {/* [A] Si es el autor */}
                            {/* Botones que solo salen si el artículo es del usuario */}
                            <div className="card-body" style={{ textAlign: 'right' }}>
                                <Button refer="/report/edit?art=">
                                    Editar &nbsp; <i className="fa fa-pencil" />
                                </Button>
                                <Button refer="/report/delete?art=">
                                    Eliminar &nbsp; <i className="fa fa-trash" />
                                </Button>
                            </div>
                            {/* [A] Termina If */}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    {report.content}
                                </li>
                            </ul>
                            <div className="card-body">
                                <Button refer="/user?u=" fill={true}>
                                    Contactar al Autor
                                </Button>
                            </div>
                        </div>

                        <div className="card mb-3" style={{ maxWidth: 1000 }}>
                            <div className="artículos_display">
                                <h5 className="card-title">Artículo Reportado</h5>
                                <div className="card">
                                    <div className="row no-gutters">
                                        <div className="col-ml-4">
                                            <img src={article.img} className="card-img img-thumbnail img-artículo-display" alt={article.name} />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{article.name}</h5>
                                                <p className="card-text">{article.description}</p>
                                                <p className="card-text">Propietario: {article.propietary}</p>
                                                <p className="card-text"><small className="text-muted">Categoría: {article.category}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </article>
            );

        case 'u':
            return (
                <article className="conenedor_terciario_1">
                    <div className="artículos_display">

                        <div className="card mb-3" style={{ maxWidth: 1000 }}>
                            <div className="card-body">
                                <h5 className="card-title">{report.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Autor: {report.author}</h6>
                                <h6 className="card-subtitle mb-2 text-muted">Creado el {report.createdAt}</h6>
                            </div>
                            {/* [A] Si es el autor */}
                            {/* Botones que solo salen si el artículo es del usuario */}
                            <div className="card-body" style={{ textAlign: 'right' }}>
                                <Button refer="/report/edit?art=">
                                    Editar &nbsp; <i className="fa fa-pencil" />
                                </Button>
                                <Button refer="/report/delete?art=">
                                    Eliminar &nbsp; <i className="fa fa-trash" />
                                </Button>
                            </div>
                            {/* [A] Termina If */}
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    {report.content}
                                </li>
                            </ul>
                            <div className="card-body">
                                <Button refer="/user?u=" fill={true}>
                                    Contactar al Autor
                                </Button>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="artículos_display">
                                <h5 className="card-title">Usuario Reportado</h5>
                                <div className="card">
                                    <div className="row no-gutters">
                                        <div className="col-ml-4" style={{ margin: "0.5rem" }}>
                                            <img
                                                src={user.img}
                                                className="card-img img-perfil"
                                                alt="pfp"
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{user.name}</h5>
                                                <p className="card-text">
                                                    <small className="text-muted">Artículos del Usuario: 1</small>
                                                </p>
                                                <p className="card-text">
                                                    <small className="text-muted">Escuela: CECYT no.9 JDB</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </article>
            );

        default:
            return (<Redirect to="reports?t=u" />);

    };

}

export default ReportPage;
