import React from 'react';

import Button from '../Button';
import ReportBtn from "../../components/inputs/ReportBtn";

const UserCard = ({ user }) => {
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-ml-4" style={{ margin: "0.5rem" }}>
          <img
            src={user.img}
            className="card-img img-perfil"
            alt="pfp"
          />
        </div>
        <div className="col-md-8" >
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">
              <small className="text-muted">Artículos del Usuario: 1</small>
            </p>
            <p className="card-text">
              <small className="text-muted">Escuela: CECYT no.9 JDB</small>
            </p>
            {/* Si es el perfil del usuario */}
            <Button refer="/user/edit">
              Editar Foto de Perfil &nbsp; <i className="fa fa-file-image-o" />
            </Button>
            <div >
              {/* NO se muestra si el perfil es del usuario */}
              <ReportBtn refer="/report/new?t=u" userData={user.user} />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default UserCard;