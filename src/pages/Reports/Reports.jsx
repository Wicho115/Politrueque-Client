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

//importar json de articulo (DEV)
//import reportsJSON from "../../helpers/ReportsSample";

const GET_REPORTS = gql`
  query{
    getReportsByType( type: "u" ){
        _id,
        author,
        description,
        title,
        type
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

    const { data, loading, error } = useQuery(GET_REPORTS);
    if (data) {
        const reports_data = data.getReportsByTypes;
        reports = reports_data;
    }

    //const [reports, setReports] = useState([]);

    /*useEffect(() => {
        setReports(reportsJSON);
    }, []);*/

    switch (type) {
        case 'user':
            return (
                <>
                    <QuickNav />
                    <article className="conenedor_terciario_1">
                        <SecondNav>
                            <Link className="nav-link active" to="/reports?t=user" style={{ backgroundColor: 'rgb(128,0,64)', borderRadius: '7.5px' }}>Reportes de Usuarios</Link>
                            <Link className="nav-link" to="/reports?t=article">Reportes de Artículos</Link>
                        </SecondNav>
                        <CardContainer>
                            <ListPageBeg to="/" category="Reporte" type="Usuario" />
                            <br />
                            {/* Mostrar los reportes de la categoría */}

                            {(reports.length === 0) ?
                                <div className="error">
                                    <br />
                                    <h3 className="reintentar">
                                        Lo sentimos, No hay reportes disponibles por el momento, intenta recargar la página o vuelve más tarde.
                                    </h3>
                                    <br />
                                </div> : null}

                            {reports.map((rpt) => {
                                return (<ReportsDis
                                    to="/report?t=u"
                                    title={rpt.title}
                                    author={rpt.author}
                                    content={rpt.content}
                                    createdAt={rpt.createdAt} />);
                            })}

                            {/*  */}
                            <br />
                            <ListPageEnd to="/" category="reporte" />
                        </CardContainer>
                    </article>
                </>
            );
        case 'article':
            return (
                <>
                    <QuickNav />
                    <article className="conenedor_terciario_1">
                        <SecondNav>
                            <Link className="nav-link" to="/reports?t=user">Reportes de Usuarios</Link>
                            <Link className="nav-link active" to="/reports?t=article" style={{ backgroundColor: 'rgb(128,0,64)', borderRadius: '7.5px' }}>Reportes de Artículos</Link>
                        </SecondNav>
                        <CardContainer>
                            <ListPageBeg to="/" category="Reporte" type="Artículo" />
                            <br />
                            {/* Mostrar los reportes de la categoría */}

                            {(reports.length === 0) ?
                                <div className="error">
                                    <br />
                                    <h3 className="reintentar">
                                        Lo sentimos, No hay reportes disponibles por el momento, intenta recargar la página o vuelve más tarde.
                                    </h3>
                                    <br />
                                </div> : null}

                            {reports.map((rpt) => {
                                return (<ReportsDis
                                    to="/report?t=a"
                                    title={rpt.title}
                                    author={rpt.author}
                                    content={rpt.content}
                                    createdAt={rpt.createdAt} />);
                            })}

                            {/*  */}
                            <br />
                            <ListPageEnd to="/" category="reporte" />
                        </CardContainer>
                    </article>
                </>
            );
        default:
            return (<Redirect to="reports?t=user" />);
    }

}

export default Reports;