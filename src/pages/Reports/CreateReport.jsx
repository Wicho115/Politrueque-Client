import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
                            <form action="#" method="POST">
                                <div className="columna_doble_fomulario">
                                    <FormInput small="Título del Reporte" label="Título">
                                        <input type="text" className="form-control" name="title" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </FormInput>
                                    <FormInput small="¿A qué va dirigido el Reporte?" label="Tipo">
                                        <select className="custom-select" name="tipoArticuloNum" id="inputGroupSelect01" disabled>
                                            <option value={2}>Artículo</option>
                                        </select>
                                    </FormInput>
                                </div>
                                <div className="form-group">
                                    <DescriptionInput
                                        toDescribe="Cuerpo del Reporte"
                                        suggestion="Explica a que artículo o a que usuario está dirigido el reporte y porque se genera este reporte."
                                        minmax="Máximo 500 Caracteres">
                                        <textarea className="form-control" name="contenido" id="exampleFormControlTextarea1" rows={3} />
                                    </DescriptionInput>
                                </div>
                                <div className="form-group centrar">
                                    <small id="emailHelp" className="form-text text-muted">Podrás modificar los datos posteriormente</small>
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
                                <form action="#" method="POST">
                                    <div className="columna_doble_fomulario">
                                        <FormInput small="Título del Reporte" label="Título">
                                            <input type="text" className="form-control" name="title" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        </FormInput>
                                        <FormInput small="¿A qué va dirigido el Reporte?" label="Tipo">
                                            <select className="custom-select" name="tipoArticuloNum" id="inputGroupSelect01" disabled>
                                                <option value={1}>Usuario</option>
                                            </select>
                                        </FormInput>
                                    </div>
                                    <div className="form-group">
                                        <DescriptionInput
                                            toDescribe="Cuerpo del Reporte"
                                            suggestion="Explica a que artículo o a que usuario está dirigido el reporte y porque se genera este reporte."
                                            minmax="Máximo 500 Caracteres">
                                            <textarea className="form-control" name="contenido" id="exampleFormControlTextarea1" rows={3} />
                                        </DescriptionInput>
                                    </div>
                                    <div className="form-group centrar">
                                        <small id="emailHelp" className="form-text text-muted">Podrás modificar los datos posteriormente</small>
                                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Generar Reporte</button>
                                    </div>
                                </form>
                            </ FormsContainer>
                        </div >
                    </>
                );
    }


};

export default CreateReport;