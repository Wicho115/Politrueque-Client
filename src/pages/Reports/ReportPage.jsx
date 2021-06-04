import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { gql, useQuery } from '@apollo/client';

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

    const { data, loading, error } = useQuery(GET_REPORT, { variables: { id: report_id } })

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

    const handleUserImage = () =>{
        if(!user.img){
            if(user.gender === "H") return masculino;
            if(user.gender === "M") return femenino;
        }
        return user.img;
    }

    switch (type) {
        case 'articulo':
            return (
                <article className="conenedor_terciario_1">
                    <div className="artículos_display">

                        <div className="card mb-3" style={{ maxWidth: 1000 }}>
                            <div className="card-body">
                                <h5 className="card-title">{report.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Autor: {report.author.username}</h6>                                
                            </div>
                           
                            {(auth.user._id != report.author._id) ? null : <div className="card-body" style={{ textAlign: 'right' }}>
                                <Button refer="/report/edit?art=">
                                    Editar &nbsp; <i className="fa fa-pencil" />
                                </Button>
                                <Button refer="/report/delete?art=">
                                    Eliminar &nbsp; <i className="fa fa-trash" />
                                </Button>
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
                                                <p className="card-text">Propietario: {article.propietary.username}</p>
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

        case 'usuario':
            return (
                <article className="conenedor_terciario_1">
                    <div className="artículos_display">

                        <div className="card mb-3" style={{ maxWidth: 1000 }}>
                            <div className="card-body">
                                <h5 className="card-title">{report.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Autor: {report.author.username}</h6>                               
                            </div>
                            {(auth.user._id != report.author._id) ? null : <div className="card-body" style={{ textAlign: 'right' }}>
                                <Button refer="/report/edit?art=">
                                    Editar &nbsp; <i className="fa fa-pencil" />
                                </Button>
                                <Button refer="/report/delete?art=">
                                    Eliminar &nbsp; <i className="fa fa-trash" />
                                </Button>
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
                            <div className="artículos_display">
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
            return (<Redirect to="/reports?t=u" />);

    };

}

export default ReportPage;
