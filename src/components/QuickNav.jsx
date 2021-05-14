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
                    <a href="/InicioSesion">Iniciar sesión</a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/Registro">Registrarse</a>
                  </p>
                  {/* */}
                  {/* Teniendo una sesión */}
                  <p className="card-text navegacion-rápida-link">
                    <a href="/{{#unless user.idAdmin}}u{{else}}a{{/unless}}_{{user.id}}">
                      Perfil
                    </a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/{{#unless user.idAdmin}}u{{else}}a{{/unless}}_{{user.id}}?articulos=true">
                      Mis Artículos
                    </a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/CerrarSesion">Cerrar Sesión</a>
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
                    <a href="/articulos/venta">Venta</a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/articulos/intercambio">Intercambio</a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/articulos/donativo">Donativos</a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/articulo/agregar">Añadir Un Articulo</a>
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
                    <a href="/reportes/usuarios">Usuarios</a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/reportes/articulos">Artículos</a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/reporte/agregar">Añadir un Reporte</a>
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
