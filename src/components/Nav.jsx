import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import Logo from "../img/PoliTrue.png";

import userJSON from '../helpers/UserSample';

const Nav = (props) => {
  

  const [user, setUSer] = useState({})

  useEffect(() =>{
    setUSer(userJSON.user);
  },[])

  return (
    <header>
      <div className="justificar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {/* Primer bloque de la Navegación (Logo) */}
          <div className="nav-logo">
            <ul className="navbar-nav ml-auto">
              <li>
                <Link to="/">
                  <img src={Logo} width={70} height="auto" alt={"Logo"} />
                </Link>
              </li>
            </ul>
          </div>
          {/* Segundo Bloque de la Navegación (Inicio, Artículos, Reportes, Acerca de) */}
          <div className="nav-1">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link className="nav-link" to="/">
                    <i className="fa fa-home" />
                    &nbsp;Inicio
                  </Link>
                  <span className="sr-only">(current)</span>
                </li>
                {/* [A] Solo si se ha iniciado sesión se muestra esta parte (Artículos, Añadir Artículo) */}
                <li className="nav-item dropdown active">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    href="/articles"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-shopping-bag" />
                    &nbsp;Artículos
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link to="/articles?t=sell" className="dropdown-item">
                      <i className="fa fa-shopping-cart" />
                      &nbsp;Venta
                    </Link>
                    <Link to="/articles?t=exchange" className="dropdown-item">
                      <i className="fa fa-handshake-o" />
                      &nbsp;Intercambio
                    </Link>
                    <Link to="/articles?t=donate" className="dropdown-item" href="#">
                      <i className="fa fa-heart-o" />
                      &nbsp;Donaciones
                    </Link>
                    <div className="dropdown-divider" />
                    <Link to="/article/new" className="dropdown-item" href="#">
                      <i className="fa fa-plus-square-o" />
                      &nbsp;Añadir
                    </Link>
                    <Link to="/articles/verify" className="dropdown-item" href="#">
                      <i className="fa fa-check-square-o" />
                      &nbsp;Verificar
                    </Link>
                  </div>
                </li>
                {/* [A] Termina If */}
                {/* [B] Solo si se ha iniciado sesión Y es administrador (Reportes, Añadir Reporte) */}
                <li className="nav-item dropdown active">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    href="/reports"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-flag-o" />
                    &nbsp;Reportes
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link to="/reports?t=user" className="dropdown-item">
                      <i className="fa fa-user-circle" />
                      &nbsp;Usuarios
                    </Link>
                    <Link to="/reports?t=article" className="dropdown-item">
                      <i className="fa fa-shopping-bag" />
                      &nbsp;Artículos
                    </Link>
                    <div className="dropdown-divider" />
                    <Link to="/report/new" className="dropdown-item">
                      <i className="fa fa-plus-square-o" />
                      &nbsp;Añadir
                    </Link>
                  </div>
                </li>
                {/* [B] Termina If */}
                <li className="nav-item active">
                  <Link to="/about" className="nav-link">
                    <i className="fa fa-question-circle" />
                    &nbsp;Acerca de
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          {/* Tercer Bloque de la Navegación (Usuario, Iniciar Sesión, Cerrar Sesión) */}
          <div className="nav-3">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
              style={{ textAlign: "right" }}
            >
              <ul className="navbar-nav ml-auto">
                {/* [A] Si se ha iniciado sesión */}
                <li className="nav-item dropdown active">
                  <a
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    href="/user"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user-circle" />
                    &nbsp; {user.name}
                  </a>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <Link to="/user" className="dropdown-item">
                      <i className="fa fa-id-card-o" />
                      &nbsp;Perfil
                    </Link>
                    <Link to="/user/articles?u=algo" className="dropdown-item">
                      <i className="fa fa-cubes" />
                      &nbsp;Mis Artículos
                    </Link>
                    <div className="dropdown-divider" />
                    <Link to="/logout" className="dropdown-item">
                      <i className="fa fa-sign-out" />
                      &nbsp;Cerrar Sesion
                    </Link>
                  </div>
                </li>
                {/* [A] ELSE Si no se ha iniciado sesión */}
                <li className="nav-item active">
                  <Link to="/login" className="nav-link">
                    <i className="fa fa-sign-in" />
                    &nbsp;Iniciar Sesión
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/accountrequest" className="nav-link">
                    <i className="fa fa-address-book-o" />
                    &nbsp;Registrarse
                  </Link>
                </li>
                {/* [A] Termina If */}
              </ul>
            </div>
            {/* Quinto bloque de la navegación (Menu responsivo - POR MEJORAR) */}
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
