import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { gql, useQuery, useMutation } from '@apollo/client';

import Button from "../../components/Button";
import Loading from "../../components/Loading";

import masculino from '../../img/DefaultMA.png';
import femenino from '../../img/DefaultFE.png';
import auth from "../../auth/auth";

const GET_REPORT = gql`
    query getReport($id : String!){
        getReport(id : $id){
            _id,
            type,
            author{
                _id,
                username,
                img    
            }
            title,
            description,
            ref_id,
            User_ref{
                _id,
                username,
                email,
                gender,
                img
            },
            Article_ref{
                _id,
                name,
                description,
                category,
                img
            propietary{
                username
            }
        }
        }
    }
`

const DELETE_REPORT = gql`
mutation g($id : String!){
  deleteReport(id : $id){
    type
  }
}`

const useQueryURL = () => {
    return new URLSearchParams(useLocation().search);
};

const ReportPage = () => {
    const query = useQueryURL();
    const report_id = query.get('r');

    let report = {}
    let user = {}
    let article = {}
    let type = '';

    const { data, loading, error } = useQuery(GET_REPORT, { variables: { id: report_id } });
    const [deleteReport, {loading : Mloading}] = useMutation(DELETE_REPORT, { variables: { id: report_id }, 
    onCompleted : (data) =>{
        window.location.assign(`${window.location.origin}/reports?t=${data.deleteReport.type}`)
    }});

    if (loading) return (<Loading />);
    if(error) return <h1>{error.message}</h1>
    if (data) {
        const report_data = data.getReport;
        type = report_data.type;
        article = report_data.Article_ref;
        user = report_data.User_ref;
        report = report_data;
        console.log(report.author._id);
        console.log(auth.user._id);
    }

    const handleDelete = e =>{
        deleteReport();
    }

    const handleUserImage = () =>{
        if(!user.img){
            if(user.gender === "H") return masculino;
            if(user.gender === "M") return femenino;
        }
        return user.img;
    }

    const handleCategory = (category) => {
        switch (category) {
            case 1:
                return ("Matem??ticas");
            case 2:
                return ("Qu??mica");
            case 3:
                return ("F??sica");
            case 4:
                return ("Ingl??s");
            case 5:
                return ("Historia");
            case 6:
                return ("Filosof??a");
            case 7:
                return ("Dibujo T??cnico");
            case 8:
                return ("Programaci??n");
            case 9:
                return ("M??quinas con Sistemas Automatizados");
            case 10:
                return ("Sistemas Digitales");
            default:
                return ("Otro");
        }
    }

    switch (type) {
        case 'articulo':
            return (
                <article className="conenedor_terciario_1">
                    <div className="art??culos_display">

                        <div className="card mb-3" style={{ maxWidth: 1000 }}>
                            <div className="card-body">
                                <h5 className="card-title">{report.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Autor: {report.author.username}</h6>                                
                            </div>
                           
                            {(auth.user._id != report.author._id) ? null : <div className="card-body" style={{ textAlign: 'right' }}>
                                <Button refer={`/report/edit?art=${report._id}`}>
                                    Editar &nbsp; <i className="fa fa-pencil" />
                                </Button> &nbsp;&nbsp;&nbsp;
                                <button onClick={handleDelete} className="btn btn-primary" style={{backgroundColor: "rgb(255,255,255)" , borderColor: "rgb(128,0, 64)", color: "rgb(128,0, 64)"}}>
                                    Eliminar &nbsp; <i className="fa fa-trash" />
                                    </button>                                    
                            </div>}                                                        
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    {report.description}
                                </li>
                            </ul>
                            <div className="card-body">
                                <Button refer={`/user?u=${report.author._id}`} fill={true}>
                                    Contactar al Autor
                                </Button>
                            </div>
                        </div>

                        <div className="card mb-3" style={{ maxWidth: 1000 }}>
                            <div className="art??culos_display">
                                <h5 className="card-title">Art??culo Reportado</h5>
                                <div className="card">
                                    <div className="row no-gutters">
                                        <div className="col-ml-4">
                                            <img src={article.img} className="card-img img-thumbnail img-art??culo-display" alt={article.name} />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{article.name}</h5>
                                                <p className="card-text">{article.description}</p>
                                                <p className="card-text">Propietario: {article.propietary.username}</p>
                                                <p className="card-text"><small className="text-muted">Categor??a: {handleCategory(article.category)}</small></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            );

        case 'usuario':
            return (
                <article className="conenedor_terciario_1">
                    <div className="art??culos_display">

                        <div className="card mb-3" style={{ maxWidth: 1000 }}>
                            <div className="card-body">
                                <h5 className="card-title">{report.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Autor: {report.author.username}</h6>                               
                            </div>
                            {(auth.user._id != report.author._id) ? null : <div className="card-body" style={{ textAlign: 'right' }}>
                            <Button refer={`/report/edit?art=${report._id}`}>
                                    Editar &nbsp; <i className="fa fa-pencil" />
                                </Button>
                                <button onClick={handleDelete}>
                                    Eliminar &nbsp; <i className="fa fa-trash" />
                                    </button>   
                            </div>} 
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    {report.description}
                                </li>
                            </ul>
                            <div className="card-body">
                                <Button refer={`/user?u=${report.author._id}`} fill={true}>
                                    Contactar al Autor
                                </Button>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="art??culos_display">
                                <h5 className="card-title">Usuario Reportado</h5>
                                <div className="card">
                                    <div className="row no-gutters">
                                        <div className="col-ml-4" style={{ margin: "0.5rem" }}>
                                            <img
                                                src={handleUserImage()}
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
                            </div>
                        </div>

                    </div>
                </article>
            );

        default:
            return (<Redirect to="/reports?t=u" />);

    };

}

export default ReportPage;
