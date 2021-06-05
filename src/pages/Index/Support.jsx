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
              Si tienes alguna duda, puedes revisar la sección de preguntas 
              frecuentes y ver si podemos contestar tu duda. También, si lo deseas, 
              puedes enviarnos un correo a politrueque.oficial@gmail.com , uno de nuestros 
              administradores te atenderá a la brevedad. Si encontraste un error, no dudes 
              mandar un correo a la misma dirección comentando el error con el que te topaste, 
              y si es posible, agregar una captura de pantalla a este. Te agradecemos por 
              ayudarnos a mantener un ambiente de compra, venta e intercambio seguro.
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
            </a></p><br />
            <h6 className="card-subtitle mb-2 text-muted">¿Qué pasa si encuentro un artículo ilícito en la sección de clasificados?</h6>
            <p className="card-text">
              ¡Fácil! Solo debes de entrar a la pestaña de reportes dentro de la página principal 
              y escribir tu reporte. Recuerda ser sincero y contar todos los detalles que puedas 
              acerca del artículo que viste. De esta manera será más sencillo que los administradores 
              tomen acción contra la persona que publicó dicho artículo.
            </p><br />      
            <h6 className="card-subtitle mb-2 text-muted">¿Quiénes son los administradores del sitio?</h6>
            <p className="card-text">
              Son alumnos del Instituto Politécnico Nacional, como tú, sin embargo también trabajamos 
              con directivos y docentes que participan para poder mantener el orden en este sitio web.
            </p><br />      
            <h6 className="card-subtitle mb-2 text-muted">¿Si pertenezco a otro CECyT podré usar el programa?</h6>
            <p className="card-text">
              De momento no, Politrueque está diseñada de momento solo para alumnos del CECyT 9, 
              pero se irá actualizando y en el futuro si será posible.
            </p><br />      
            <h6 className="card-subtitle mb-2 text-muted">¿Se puede encontrar  material de todas las materias o solo algunas?</h6>
            <p className="card-text">
              Si, se puede encontrar artículos de todas las materias que hay en la escuela, ya 
              que Politrueque cuenta con una lista en donde puedes encontrar las materias y con 
              ella sus artículos.
            </p>
          </Card>
          <br />

        </CardContainer>
      </article>
    </>
  );
};

export default Support;