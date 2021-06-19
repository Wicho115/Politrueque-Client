import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

import QuickNav from "../../components/QuickNav";
import CardContainer from "../../components/cards/CardContainer";
import SecondNav from "../../components/SecondNav";
import ListPageEnd from "../../components/ListPageEnd";
import ListPageBeg from "../../components/ListPageBeg";
import ReportsDis from "../../components/reports/ReportsDis";
import Loading from "../../components/Loading";

//importar json de articulo (DEV)
//import reportsJSON from "../../helpers/ReportsSample";

const GET_REPORTS = gql`
  query getReports($type : String!){
    getReportsByType(type : $type){
        _id,
        description,
        title,
        type
        author{
         username
        }
    }
  }
`

const useQueryURL = () => {
    return new URLSearchParams(useLocation().search);
};

const Reports = () => {
    const query = useQueryURL();
    const type = query.get('t');

    let reports = [];

    const { data, loading, error } = useQuery(GET_REPORTS, {variables : {type}});
    if (loading) return (<Loading />);
    if (data) {
        
        reports = data.getReportsByType;        
        console.log(reports);
    }

    //const [reports, setReports] = useState([]);

    /*useEffect(() => {
        setReports(reportsJSON);
    }, []);*/

    switch (type) {
        case 'usuario':
            return (
                <>
                    <QuickNav />
                    <article className="conenedor_terciario_1">
                        <SecondNav>
                            <Link className="nav-link active" to="/reports?t=usuario" style={{ backgroundColor: 'rgb(128,0,64)', borderRadius: '7.5px' }}>Reportes de Usuarios</Link>
                            <Link className="nav-link" to="/reports?t=articulo">Reportes de Artículos</Link>
                        </SecondNav>
                        <CardContainer>
                            <ListPageBeg to="/" category="Reporte" type="Usuario" />
                            <br />
                            {/* Mostrar los reportes de la categoría */}

                            {(!reports) ?
                                <div className="error">
                                    <br />
                                    <h3 className="reintentar">
                                        Lo sentimos, No hay reportes disponibles por el momento, intenta recargar la página o vuelve más tarde.
                                    </h3>
                                    <br />
                                </div> : 
                                    reports.map((rpt) => {
                                        return (<ReportsDis
                                            key= {rpt._id}
                                            to={`/report?r=${rpt._id}`}
                                            title={rpt.title}
                                            author={rpt.author.username}
                                            content={rpt.content}/>);
                                    })
                                }                                                                                                         
                            <br />
                            <ListPageEnd to="/" category="reporte" />
                        </CardContainer>
                    </article>
                </>
            );
        case 'articulo':
            return (
                <>
                    <QuickNav />
                    <article className="conenedor_terciario_1">
                        <SecondNav>
                            <Link className="nav-link" to="/reports?t=usuario">Reportes de Usuarios</Link>
                            <Link className="nav-link active" to="/reports?t=articulo" style={{ backgroundColor: 'rgb(128,0,64)', borderRadius: '7.5px' }}>Reportes de Artículos</Link>
                        </SecondNav>
                        <CardContainer>
                            <ListPageBeg to="/" category="Reporte" type="Artículo" />
                            <br />
                            {/* Mostrar los reportes de la categoría */}

                            {(!reports) ?
                                <div className="error">
                                    <br />
                                    <h3 className="reintentar">
                                        Lo sentimos, No hay reportes disponibles por el momento, intenta recargar la página o vuelve más tarde.
                                    </h3>
                                    <br />
                                </div> : 
                                reports.map((rpt) => {
                                    return (<ReportsDis
                                        key= {rpt._id}
                                        to={`/report?r=${rpt._id}`}
                                        title={rpt.title}
                                        author={rpt.author.username}
                                        content={rpt.content}/>);
                                })
                                }
                            <br />
                            <ListPageEnd to="/" category="reporte" />
                        </CardContainer>
                    </article>
                </>
            );
        default:
            return ( <div className="error">
            <br />
            <h3 className="reintentar">
                Lo sentimos, No hay reportes disponibles por el momento, intenta recargar la página o vuelve más tarde.
            </h3>
            <br />
        </div>);
    }

}

export default Reports;