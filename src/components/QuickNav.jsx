import React from "react";

const QuickNav = () => {
  return (
    <>      
      {/* Parte de la navegación Rápida */}
      <aside className="conetnedor_secundario_1">
        <div className="justificar">
          <div className="card mb-3 navegacion-rápida-contenedor-general">
            <div className="card-header navegacion-rápida-título">
              Navegación Rápida
            </div>
            <div className="card-body navegacion-rápida-cuerpo">
              {/* Parte que siempre está */}
              <div className="card mb-3 navegacion-rápida-contenedor">
                <div className="card-header navegacion-rápida-título">
                  Utilidades
                </div>
                <div className="card-body navegacion-rápida-cuerpo">
                  <p className="card-text navegacion-rápida-link">
                    <a href="/">Inicio</a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/about">Acerca de</a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/terms">Términos y condiciones</a>
                  </p>
                </div>
              </div>
              {/* */}
              <div className="card mb-3 navegacion-rápida-contenedor">
                <div className="card-header navegacion-rápida-título">
                  Cuenta
                </div>
                <div className="card-body navegacion-rápida-cuerpo">
                  {/* En caso de no tener una sesión */}
                  <p className="card-text navegacion-rápida-link">
                    <a href="/login">Iniciar sesión</a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/accountrequest">Registrarse</a>
                  </p>
                  {/* */}
                  {/* Teniendo una sesión */}
                  <p className="card-text navegacion-rápida-link">
                    <a href="/user">
                      Perfil
                    </a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/user/articles?u=algo">
                      Mis Artículos
                    </a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/logout">Cerrar Sesión</a>
                  </p>
                  {/* */}
                </div>
              </div>
              {/* Parte de los artículos solo con sesión */}
              <div className="card mb-3 navegacion-rápida-contenedor">
                <div className="card-header navegacion-rápida-título">
                  Artículos
                </div>
                <div className="card-body navegacion-rápida-cuerpo">
                  <p className="card-text navegacion-rápida-link">
                    <a href="/articles?t=sell">Venta</a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/articles?t=exchange">Intercambio</a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/articles?t=donate">Donativos</a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/article/new">Añadir Un Articulo</a>
                  </p>
                </div>
              </div>
              {/* */}
              {/* Parte de solo admins, reportes */}
              <div className="card mb-3 navegacion-rápida-contenedor">
                <div className="card-header navegacion-rápida-título">
                  Reportes
                </div>
                <div className="card-body navegacion-rápida-cuerpo">
                  <p className="card-text navegacion-rápida-link">
                    <a href="/reports?t=user">Usuarios</a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/reports?t=articles">Artículos</a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/report/new">Añadir un Reporte</a>
                  </p>
                </div>
              </div>
              {/* */}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default QuickNav;
