import React from "react";
import {Link} from 'react-router-dom'

import Polifooter from "../img/PoliTrueBN.png";

const Footer = () => {
  return (
    <footer>
      <div className="contenedor_general_2">
        <div className="contenedor_footer">
          Enlaces útiles: <br />
          <Link to="/" style={{ color: "white" }}>
            Inicio
          </Link>
          {" "}|{" "}
          <Link to="/login" style={{ color: "white" }}>
            Iniciar Sesión
          </Link>
          <br />
          <Link to="about" style={{ color: "white" }}>
            Acerca de Politrueque
          </Link>
          {" "}|{" "}
          <Link to="/terms" style={{ color: "white" }}>
            Téminos y Condiciones
          </Link>
          <br />
          <br />
          <Link to="/accountrequest" style={{ color: "white" }}>
            Aún no tengo una cuenta
          </Link>
        </div>
        <div className="contenedor_footer">
          <p>
            <Link to="/">
              <img src={Polifooter} width={200} height="auto" alt="Logo"/>
            </Link>
          </p>
          <small>
            
            Copyright © 2020, Nautilus. Todos los derechos reservados.
          </small>
        </div>
        <div className="contenedor_footer">
          <Link to="/about" style={{ color: "white" }}>
            ¿Qué es Politruque?
          </Link>
          <br />
          <br />
          El creador de nuestros íconos <br />
          <a href="https://twitter.com/CH_Toons" target="_blank" style={{ color: "white" }}>
            NSC <i className="fa fa-twitter" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
