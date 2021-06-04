import React, {useEffect, useState} from "react";
import auth from '../auth/auth'

const QuickNav = () => {

  const [user, setUser] = useState(null)
  const [privileges, setPrivileges] = useState(null);

  useEffect(() => {
    setUser(auth.user);
    setPrivileges(auth.privileges);
  }, [])
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
                  {(!user) ? 
                  (<>
                    <p className="card-text navegacion-rápida-link">
                    <a href="/login">Iniciar sesión</a>
                  </p>
                  <p className="card-text navegacion-rápida-link">
                    <a href="/accountrequest">Registrarse</a>
                  </p>
                  </>)                  
                  : 
                  (<>
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
                  </>)}                  
                </div>
              </div>
              {/* Parte de los artículos solo con sesión */}
              {(!user) ? null : 
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
                    <a href="/article/new">Añadir un Articulo</a>
                  </p>
                </div>
              </div>}
              {(!privileges) ? null :
              <div className="card mb-3 navegacion-rápida-contenedor">
              <div className="card-header navegacion-rápida-título">
                Reportes
              </div>
              <div className="card-body navegacion-rápida-cuerpo">
                <p className="card-text navegacion-rápida-link">
                  <a href="/reports?t=usuario">Usuarios</a>
                </p>
                <p className="card-text navegacion-rápida-link">
                  <a href="/reports?t=articulo">Artículos</a>
                </p>
              </div>
            </div>}              
              {/* */}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default QuickNav;
