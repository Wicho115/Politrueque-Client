import React, { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css';

import QuickNav from "../components/QuickNav";
import CardContainer from "../components/cards/CardContainer";
import Card from "../components/cards/Card";
import Button from "../components/Button";

const localStorage = require('localStorage');

const Principal = () => {

  useEffect(() =>{    
    fetch(`http://10.129.199.45:5000/login`)
    .then((data) => {
      return data.json();
    })
    .then((value) => {
      console.log(value);
    })
  }, [])

  return (
    <>
      <QuickNav/>
      <article className="conenedor_terciario_1">
        <div className="navegación_secundaria_1">
          <nav className="nav nav-pills nav-fill">
            <a className="nav-link active" style={{ fontSize: 25, backgroundColor: "rgb(128,0,64)", borderRadius: "7.5px" }}>
              ¡ Bienvenido a Politrueque !
            </a>
          </nav>
        </div>

        <CardContainer>
          <Card title="Bienvenida" subtitle="Esto es Politrueque">
            <p className="card-text">
              Politrueque es un proyecto independiente, creado con la finalidad
              de facilitar y apoyar la venta, intercambio y donación de
              artículos escolares usados para el trabajo en las instalaciones
              del Instituto Politecnico Nacional
            </p>
          </Card>
          <br />
          <Card title="Cuentas de Politrueque">
            <p className="card-text">
              Para poder hacer uso completo de Politrueque, deberás tener una
              cuenta, si ya cuentas con una, inicia sesión. Si no cuentas con
              una puedes solicitarla de una manera muy rápida.
            </p>
            <Button refer="/login">
              <i className="fa fa-sign-in" />
              &nbsp;Iniciar Sesión
            </Button>
            {" "}
            <a
              href="https://forms.gle/LKFd8gMFGCC3tt2N7"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{
                backgroundColor: "rgb(255,255,255)",
                borderColor: "rgb(128,0, 64)",
                color: "rgb(128,0, 64)",
              }} >
              <i className="fa fa-envelope" />
                &nbsp; ¡Enviar mi Solicitud!
            </a>
          </Card>
          <Card title="Artículos Disponibles">
            <p className="card-text">
              Podrás encontrar diversos artículos en las secciones de Venta,
              Intercambio y Donativo. Puedes acceder a ellas mediente la barra
              de navegación o haciendo clic en el siguiente botón.
            </p>
            <Button>
              <i className="fa fa-shopping-bag" />
              &nbsp;Ver los Artículos
            </Button>
          </Card>
          <br />
          <Card title="Términos y Condiciones" subtitle="Recuerda">
            <p className="card-text">
              Para usar nuestra página web y / o recibir nuestros servicios,
              debes ser estudiante o egresado del Instituto Politécnico Nacional
              para tener el derecho y la libertad para participar en estos
              Términos como un acuerdo vinculante. No tienes permitido utilizar
              esta página web y / o recibir servicios si no cumples o no
              respetas los Términos y Condiciones
            </p>
            <p className="card-text">
              Si quieres saber acerca de los términos y condiciones de
              Politrueque, haz clic en el siguiente botón:
            </p>
            <Button refer="/otra">
              Ver términos y Condiciones &nbsp;{" "}
              <i className="fa fa-info-circle" />
            </Button>
          </Card>
        </CardContainer>        
      </article>
    </>
  );
};

export default Principal;
