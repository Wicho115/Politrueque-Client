import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import QuickNav from "../../components/QuickNav";

const Login = () => {

    const [loginUser, setLoginUser] = useState({});
    const [check, setCheck] = useState(false);

    const boletaRegex = /^[2][0]([1-2][0-9])(([0][1-9])|([1][0-9]))\d{4}$/;
    const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleChange = (e) => {
        setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
    }

    const handleTerms = (e) => {
        setCheck(!check);
    }

    const validateInputs = (e) => {
        e.preventDefault();
        const {email, boleta, password} = loginUser;
        const terms = check;

        console.log(terms);
        console.log(email);

        //Comprobamos datos vacíos
        if (!email) {
            toast.error("Por favor, proporciona un Correo");
        } if (!boleta) {
            toast.error("Por favor, proporciona una Boleta");
        } if (!password) {
            toast.error("Por favor, proporciona una Contraseña");
        } if (!terms) {            
            toast.error("Debes aceptar los Términos");
        } else {
            //Comprobamos datos válidos
            if (!mailRegex.test(email)){
                toast.error("Correo no válido");
            }if (!boletaRegex.test(boleta)){
                toast.error("Boleta no válido");
            }else {
                toast("Campos válidos");
            }
        }
    }

    return (
        <>
            <QuickNav />
            <article className="conenedor_terciario_1">
                <ToastContainer />
                <div>
                    <div className="navegación_secundaria_1">
                        <nav className="nav nav-pills nav-fill">
                            <a className="nav-link active" style={{ backgroundColor: 'rgb(128, 0, 64)', borderRadius: '7.5px' }}>
                                Miembro de la Comunidad - Iniciar Sesión
                            </a>
                        </nav>
                    </div>
                    <div className="formulario">
                        <form action="#" method="GET" onSubmit={validateInputs}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Correo Electrónico</label>
                                <input onChange={handleChange} type="email" name="email" className="form-control" id="mail-input" aria-describedby="emailHelp" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Boleta</label>
                                <input onChange={handleChange} type="text" name="boleta" className="form-control" id="boleta-input" maxlength={10} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Contraseña</label>
                                <input onChange={handleChange} type="password" name="password" className="form-control" id="password-input" />
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input onChange={handleTerms} value={check} name="AceptoTermCond" className="form-check-input" type="checkbox" id="terms" />
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