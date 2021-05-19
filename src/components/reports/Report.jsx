import React from 'react';
import {Link} from 'react-router-dom'

const Report = ({report, user}) =>{
  const {title, content} = report;
    return(
    <Link to="/report?t=u" className="enlace-reporte">
    <div className="card enlace">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">Autor: {user}</h6>
        <p className="card-text">{content}</p>
      </div>
    </div>
  </Link>
  );
}

export default Report;