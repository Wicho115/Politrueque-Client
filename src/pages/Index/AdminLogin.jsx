import React from "react";
import { Link } from "react-router-dom";

import QuickNav from "../../components/QuickNav";
import Button from "../../components/Button";

const AdminLogin = () => {

    return (
        <>
            <QuickNav />
            <article className="conenedor_terciario_1">
                <div>
                    <div className="navegación_secundaria_1">
                        <nav className="nav nav-pills nav-fill">
                            <Link className="nav-link" to="/login">Miembro de la Comunidad</Link>
                            <Link
                                className="nav-link active"
                                to="/adminlogin"
                                style={{ backgroundColor: 'rgb(128, 0, 64)', borderRadius: '7.5px' }}
                            >
                                Administrador
                            </Link>
                        </nav>
                    </div>
                    <div className="formulario">
                        <form action="#" method="POST">
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Correo Electrónico</label>
                                <input type="email" name="correo" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Boleta</label>
                                <input type="text" name="boleta" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Contraseña</label>
                                <input type="password" name="contraseña" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">ID de Administrador</label>
                                <input type="text" name="idAdmin" className="form-control" id="exampleInputPassword1" />
                                <small id="emailHelp" className="form-text text-muted">El ID se proporcionó previamente en el registro
              de administrador</small>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input name="AceptoTermCond" className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Acepto los <Link to="/terms">Términos y Condiciones</Link>, así como el <Link to="/terms">Aviso de Privacidad</Link>.
              </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Iniciar sesión</button>
                            </div>
                        </form>
                    </div>
                    <div className="crear_cuenta">
                        <div className="card-body">
                            <h5 className="card-title">Advertencia</h5>
                            <p className="card-text">Se debe contar con una ID de administrador que se proporcionó previamenete.</p>
                            <Button refer="/login" fill={true}>
                                No soy un Administrador
                            </Button>
                        </div>
                    </div>
                </div>
            </article>
        </>

    )

}

export default AdminLogin;