import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";

import SecondNav from "../../components/SecondNav";
import FormsContainer from "../../components/FormsContainer";
import FormInput from "../../components/inputs/FormInput";
import DescriptionInput from "../../components/inputs/DescriptionInput";

import userJSON from "../../helpers/UserSample";
import articleJSON from "../../helpers/ArticleSample";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const CreateReport = () => {
    const query = useQuery();
    const type = query.get('t');

    const [user, setUser] = useState({});
    const [article, setArticle] = useState({});

    useEffect(() => {
        setUser(userJSON.user);
        setArticle(articleJSON);
    }, []);

    switch (type) {
        case 'a':
            return (
                <>
                    <div className="conetnedor_secundario_2">
                        <SecondNav>
                            <a className="nav-link">Reportar Artículo " {article.name} "</a>
                        </SecondNav>
                        <FormsContainer>

                            <div className="artículos_display">
                                <div className="card mb-3">
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
                                <hr />
                            </div>

                            <form action="#" method="POST">
                                <FormInput small="Título del Reporte" label="Título">
                                    <input type="text" className="form-control" name="title" id="exampleInputEmail1" />
                                </FormInput>
                                <div className="form-group">
                                    <DescriptionInput
                                        toDescribe="Cuerpo del Reporte"
                                        suggestion="Explica porque se está reportando el Artículo."
                                        minmax="Máximo 500 Caracteres">
                                        <textarea className="form-control" name="contenido" id="exampleFormControlTextarea1" rows={3} />
                                    </DescriptionInput>
                                </div>
                                <div className="form-group centrar">
                                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Generar Reporte</button>
                                </div>
                            </form>
                        </ FormsContainer>
                    </div >
                </>
            );
        case 'u':
            return (
                <>
                    <div className="conetnedor_secundario_2">
                        <SecondNav>
                            <a className="nav-link">Reportar Usuario " {user.name} "</a>
                        </SecondNav>

                        <FormsContainer>

                            <div className="artículos_display">
                                <div className="card mb-3">
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
                                <hr />
                            </div>

                            <form action="#" method="POST">
                                <FormInput small="Título del Reporte" label="Título">
                                    <input type="text" className="form-control" name="title" id="exampleInputEmail1" />
                                </FormInput>
                                <div className="form-group">
                                    <DescriptionInput
                                        toDescribe="Cuerpo del Reporte"
                                        suggestion="Explica porque se está reportando a este Usuario"
                                        minmax="Máximo 500 Caracteres">
                                        <textarea className="form-control" name="contenido" id="exampleFormControlTextarea1" rows={3} />
                                    </DescriptionInput>
                                </div>
                                <div className="form-group centrar">
                                    <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Generar Reporte</button>
                                </div>
                            </form>
                        </ FormsContainer>
                    </div >
                </>
            );

        default:
            return (<Redirect to="reports?t=u" />);
    }

};

export default CreateReport;