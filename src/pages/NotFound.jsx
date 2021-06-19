import React from 'react'

const NotFound = () => {
    return (
        <div className="conetnedor_secundario_2 error_contenedor">
            <div className="navegación_secundaria_1">
                <nav className="nav nav-pills nav-fill">
                    <a className="nav-link active" style={{ fontSize: 25, backgroundColor: 'rgb(128,0,64)', borderRadius: '7.5px' }}>
                        ¡ Vaya ! Algo ocurrió...</a>
                </nav>
            </div>
            <div className="error">
                <br />
                <h3 className="reintentar">Lo sentimos, no pudimos encontrar la página que estabas buscando. Lamentamos las molestias.</h3>
                <h5 className="reintentar">Puedes enviarnos un correo a politrueque.oficial@gmail.com para ayudarte a resolver el problema.</h5>
                <div style={{ textAlign: 'center' }}>
                    <i className="fa fa-frown-o fa-5x" />
                </div>
                <br />
            </div>
        </div>
    );
}

export default NotFound