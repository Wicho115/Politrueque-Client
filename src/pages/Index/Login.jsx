import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import QuickNav from "../../components/QuickNav";

const Login = () => {

    const [loginUser, setLoginUser] = useState({});
    const [check, setCheck] = useState(false);

    useEffect(() => {
        console.log('El componente se monto');

        return(() => {
            console.log('El componente se fue');
        });
    }, [check]);    

    const handleChange = (e) =>{        
        setLoginUser({...loginUser, [e.target.name] : e.target.value});        
    }

    const handleTerms = (e) => {
        setCheck(!check);
    }

    const submitHandle = (e) =>{
        e.preventDefault();   
        console.log(loginUser);  
        console.log(check);        
    }

    return (
        <>
            <QuickNav />
            <article className="conenedor_terciario_1">
                <div>
                    <div className="navegación_secundaria_1">
                        <nav className="nav nav-pills nav-fill">
                            <Link
                                className="nav-link active"
                                to="/login"
                                style={{ backgroundColor: 'rgb(128, 0, 64)', borderRadius: '7.5px' }}
                            >
                                Miembro de la Comunidad
                            </Link>
                            <Link className="nav-link" to="/adminlogin">Administrador</Link>
                        </nav>
                    </div>
                    <div className="formulario">
                        <form onSubmit={submitHandle}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Correo Electrónico</label>
                                <input onChange={handleChange} type="email" name="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Boleta</label>
                                <input onChange={handleChange} type="text" name="boleta" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Contraseña</label>
                                <input onChange={handleChange} type="password" name="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input onChange={handleTerms} value={check} name="AceptoTermCond" className="form-check-input" type="checkbox" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Acepto los <Link to="/terms">Términos y Condiciones</Link>, así como el <Link to="/terms">Aviso de Privacidad</Link>.
              </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Iniciar sesión</button>
                            </div>
                        </form>
                    </div>
                    <div className="crear_cuenta">
                        <div className="card-body">
                            <h5 className="card-title">¿Aún no tienes cuenta?</h5>
                            <p className="card-text">Envía una Solicitud en el enlace siguiente. Te mandaremos tu usuario y contraseña al correo que nos proporciones.</p>
                            <a href="https://forms.gle/LKFd8gMFGCC3tt2N7" target="_blank" className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>¡Enviar mi Solicitud!</a>
                        </div>
                    </div>
                </div>
            </article>
        </>

    )

}

export default Login;