import React, { useEffect, useState } from "react";
import Button from "../../components/Button";

import reportJSON from "../../helpers/ReportSample";

const ReportPage = () => {
    const [report, setReport] = useState({});

    useEffect(() => {
        setReport(reportJSON);
    }, []);

    return (
        <article className="conenedor_terciario_1">
            <div className="artículos_display">
                <div className="card" style={{ maxWidth: 1000 }}>
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
            </div>
        </article>
    );
};

export default ReportPage;
