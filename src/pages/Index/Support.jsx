import React from "react";

import CardContainer from "../../components/cards/CardContainer";
import Card from "../../components/cards/Card";
import QuickNav from "../../components/QuickNav";

const Support = () => {
  return (
    <>
      <QuickNav />
      <article className="conenedor_terciario_1">
        <div className="navegación_secundaria_1">
          <nav className="nav nav-pills nav-fill">
            <a className="nav-link active" style={{ fontSize: 25, backgroundColor: "rgb(128,0,64)", borderRadius: "7.5px", }}>
              Soporte Politrueque
            </a>
          </nav>
        </div>
        <CardContainer>
        <Card title="¿Cómo podemos ayudarte?">
            <p className="card-text">
                Texto...
            </p>
          </Card>
          <br />
          <Card title="Preguntas Frecuentes">
            <h6 className="card-subtitle mb-2 text-muted">¿Comó solicito mi cuenta?</h6>
            <p className="card-text">
              Para hacer la solicitud de tu cuenta solo debes enviar tu solicitud en el enlace
              siguente. Te mandaremos tu usuario y contraseña al correo que nos proporciones.
              Tu solicitud será atendiada por un administrador en un lápso máximo de 24 horas.
            </p>
            <p><a href="https://forms.gle/LKFd8gMFGCC3tt2N7" target="_blank" rel="noreferrer" className="btn btn-primary"
              style={{
                backgroundColor: "rgb(255,255,255)",
                borderColor: "rgb(128,0, 64)",
                color: "rgb(128,0, 64)",
              }} >
              <i className="fa fa-envelope" />
                &nbsp; ¡Enviar mi Solicitud!
            </a></p>
            <h6 className="card-subtitle mb-2 text-muted">¿Pregunta?</h6>
          </Card>
          <br />
          
        </CardContainer>
      </article>
    </>
  );
};

export default Support;