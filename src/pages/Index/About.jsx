import React from "react";

import CardContainer from "../../components/cards/CardContainer";
import Card from "../../components/cards/Card";
import QuickNav from "../../components/QuickNav";
import Button from "../../components/Button";

const About = () => {
  return (
    <>
      <QuickNav />
      <article className="conenedor_terciario_1">
        <div className="navegación_secundaria_1">
          <nav className="nav nav-pills nav-fill">
            <a className="nav-link active" style={{ fontSize: 25, backgroundColor: "rgb(128,0,64)", borderRadius: "7.5px", }}>
              Acerca de Politrueque
            </a>
          </nav>
        </div>
        <CardContainer>
          <Card title="¿Qué es Politrueque?">
            <p className="card-text">
              Politrueque es un proyecto web independiente, creado por la
              pequeña empresa “Nautilus”, proveniente del Centro de Estudios
              Científicos y Tecnológicos num. 9 “Juan de Dios Batiz”. El
              objetivo, es crear un espacio seguro para la compra, venta y
              donación de artículos escolares múltiples, tales como circuitos,
              laptops, y muchos mas.
            </p>
          </Card>
          <br />
          <Card title="¿Como puedo usar Politrueque?">
            <p className="card-text">
              ¡Es muy fácil! Solo debes solicitar una cuenta. Después hacer inicio de sesión
              ingresando tu boleta, usuario, email, y una contraseña.
            </p>
            <h6 className="card-subtitle mb-2 text-muted">¿Comó solicito mi cuenta?</h6>
            <p className="card-text">
              Para hacer la solicitud de tu cuenta solo debes enviar tu solicitud en el enlace
              siguente. Te mandaremos tu usuario y contraseña al correo que nos proporciones.
              Tu solicitud será atendiada por un administrador en un lápso máximo de 24 horas.
            </p>
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
          <br />
          <Card title="Ventajas de Politruque">
            <p className="card-text">
              Politrueque se puede parecer a cualquier otro sitio de compraventa
              de objetos. Sin embargo, tiene una diferencia. Durante el proceso
              de registro, debes de colocar tu boleta, lo cual hace que tu
              cuenta este verificada como verídica. Por lo que las transacciones
              y tratos son mas seguras que los otros sitios. Además de que
              nuestra plataforma ofrece la posibilidad de donar o intercambiar
              artículos por otros. Así que si tienes un material que ya no
              necesitas y quieres deshacerte de el, puedes hacerlo en nuestro
              sitio.
            </p>
          </Card>
          <br />
          <Card title="Términos y Condiciones" >
            <p className="card-text">
              Para usar nuestra página web y / o recibir nuestros servicios,
              debes ser estudiante o egresado del Instituto Politécnico Nacional
              para tener el derecho y la libertad para participar en estos
              Términos como un acuerdo vinculante. No tienes permitido utilizar
              esta página web y / o recibir servicios si No cumples o no
              respetas los Términos y Condiciones
            </p>
            <p className="card-text">
              Si quieres saber acerca de los términos y condiciones de
              Politrueque, haz clic en el siguiente botón:
            </p>
            <Button refer="/terms">
              Ver términos y Condiciones &nbsp;
              <i className="fa fa-info-circle" />
            </Button>
          </Card>
          <br />
          <Card title="Logo e imágenes propias" subtitle="Créditos">
            <p className="card-text">
              El creador de las ilustraciones de nuestro Logo y las imágenes de
              perfil por defecto las creó NSC ó Not So Creative. Muchas gracias
              por este pequeño gran aporte a la página.
            </p>
            <a
              href="https://twitter.com/CH_Toons"
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary"
              style={{
                backgroundColor: "rgb(255,255,255)",
                borderColor: "rgb(128,0, 64)",
                color: "rgb(128,0, 64)",
              }}
            >
              <i className="fa fa-twitter" />
                &nbsp;Visitar
              </a>
          </Card>
        </CardContainer>
      </article>
    </>
  );
};

export default About;