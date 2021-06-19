import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";

import SecondNav from "../../components/SecondNav";
import FormsContainer from "../../components/FormsContainer";
import FormInput from "../../components/inputs/FormInput";
import DescriptionInput from "../../components/inputs/DescriptionInput";
import Loading from "../../components/Loading";

import masculino from '../../img/DefaultMA.png';
import femenino from '../../img/DefaultFE.png';

import { gql, useMutation, useQuery } from '@apollo/client'

const useQueryURL = () => {
    return new URLSearchParams(useLocation().search);
};

const GET_ARTICLE = gql`
query getArticle($id : String!){
    getArticle(id : $id){
        _id,
        action_id,
        available,
        category,
        description,
        exchange_product,     
        img
        name,
        price,
        propietary{
            _id,
            username 
        },
        state,
        stock        
    }
}`

const GET_USER = gql`
query getU($_id : String!){
  getUserByID(_id : $_id){
      _id,
      email,
      img,
      username,
      gender
    }
}
`

const CREATE_REPORT = gql`
mutation g($payload : CreateReportInput!){
  createReport(payload : $payload ){
    _id,
  }
}`

const CreateReport = () => {
    const query = useQueryURL();
    const type_url = query.get('t');
    let type = "--"
    if (type_url === "u") type = "usuario";
    if (type_url === "a") type = "articulo";
    const id = query.get('id');
    const [user, setUser] = useState({});
    const [article, setArticle] = useState({});
    const [report, setReport] = useState({ title: "", description: "" });
    const { loading: loading2, error: error2 } = useQuery(GET_ARTICLE, {
        variables: { id },
        onCompleted: (data) => {
            console.log(data);
            setArticle(data.getArticle);
        }, skip: !(type_url === "a")
    });

    const { loading: loading1, error: error1 } = useQuery(GET_USER, {
        variables: { _id: id },
        onCompleted: (data) => {
            console.log(data);
            setUser(data.getUserByID)
        }, skip: !(type_url === "u")
    });

    const [createArticle, { loading: Mloading }] = useMutation(CREATE_REPORT,
        {
            onCompleted: (data) => {
                window.location.assign(`${window.location.origin}/report?r=${data.createReport._id}`)
            }
        });

    if (loading1 || loading2 || Mloading) return (<Loading />);
    if (error1) return <h1>Error || {error1.message}</h1>
    if (error2) return <h1>Error || {error2.message}</h1>

    const handleChange = e => {
        setReport({ ...report, [e.target.name]: e.target.value });
    }

    const getImg = () => {
        if (!user.img) {
            if (user.gender === "H") return masculino;
            if (user.gender === "M") return femenino;
        }
        return user.img;
    }

    const handleCreate = e => {
        const { description, title } = report;
        const payload = {
            description,
            title,
            ref_id: id,
            type
        }
        createArticle({ variables: { payload } })
    }

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

    switch (type_url) {
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
                                                <p className="card-text">Propietario: {article.propietary?.username}</p>
                                                <p className="card-text"><small className="text-muted">Categoría: {handleCategory(article.category)}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>


                            <FormInput small="Título del Reporte" label="Título">
                                <input value={report.title} onChange={handleChange} type="text" className="form-control" name="title" id="exampleInputEmail1" />
                            </FormInput>
                            <div className="form-group">
                                <DescriptionInput
                                    toDescribe="Cuerpo del Reporte"
                                    suggestion="Explica porque se está reportando el Artículo."
                                    minmax="Máximo 500 Caracteres">
                                    <textarea value={report.description} onChange={handleChange} className="form-control" name="description" id="exampleFormControlTextarea1" rows={3} />
                                </DescriptionInput>
                            </div>
                            <div className="form-group centrar">
                                <button onClick={handleCreate} className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Generar Reporte</button>
                            </div>
                        </ FormsContainer>
                    </div >
                </>
            );
        case 'u':
            return (
                <>
                    <div className="conetnedor_secundario_2">
                        <SecondNav>
                            <a className="nav-link">Reportar Usuario " {user.username} "</a>
                        </SecondNav>

                        <FormsContainer>

                            <div className="artículos_display">
                                <div className="card mb-3">
                                    <div className="row no-gutters">
                                        <div className="col-ml-4" style={{ margin: "0.5rem" }}>
                                            <img
                                                src={getImg()}
                                                className="card-img img-perfil"
                                                alt="pfp"
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{user.username}</h5>
                                                <p className="card-text">
                                                    <small className="text-muted">Escuela: CECYT no.9 JDB</small>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>


                            <FormInput small="Título del Reporte" label="Título">
                                <input value={report.title} onChange={handleChange} type="text" className="form-control" name="title" id="exampleInputEmail1" />
                            </FormInput>
                            <div className="form-group">
                                <DescriptionInput
                                    toDescribe="Cuerpo del Reporte"
                                    suggestion="Explica porque se está reportando a este Usuario"
                                    minmax="Máximo 500 Caracteres">
                                    <textarea value={report.description} onChange={handleChange} className="form-control" name="description" id="exampleFormControlTextarea1" rows={3} />
                                </DescriptionInput>
                            </div>
                            <div className="form-group centrar">
                                <button onClick={handleCreate} className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Generar Reporte</button>
                            </div>
                        </ FormsContainer>
                    </div >
                </>
            );

        default:
            return (<Redirect to="reports?t=u" />);
    }

};

export default CreateReport;