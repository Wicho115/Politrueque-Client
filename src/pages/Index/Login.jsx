import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Auth from '../../auth/auth'

import QuickNav from "../../components/QuickNav";
import CustomToast from "../../components/CustomToast";
import auth from "../../auth/auth";


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

    const handleSub = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if(token) return toast.error(<CustomToast type="error" message="Ya has iniciado sesión" />);
        const {email, boleta, password} = loginUser;
        const terms = check;

        //Comprobamos datos vacíos
        if (!email) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona un Correo" />);
        } else if (!boleta) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona una Boleta" />);
        } else if (!password) {
             toast.error(<CustomToast type="error" message="Por favor, proporciona una Contraseña" />);
        } else if (!terms) {            
             toast.error(<CustomToast type="error" message="Debes aceptar los términos" />);
        } else {
            //Comprobamos datos válidos
            if (!mailRegex.test(email)){
                return toast.error(<CustomToast type="error" message="Correo no válido" />);
            }else if (!boletaRegex.test(boleta)){
                return toast.error(<CustomToast type="error" message="Boleta no válida" />);
            }else {                
                const json = await Auth.login(loginUser)
                if(json.error){                    
                    return toast.error(<CustomToast type="error" message="Correo o contraseña invalidos" />);
                } 
                toast.success(<CustomToast type="success" message="Campos válidos" />);  
                window.location.reload();
            }
        }
    }

    if(auth.user) return (<Redirect to="/"/>)
    

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
                        <form action="#" method="GET" onSubmit={handleSub}>
                            <div className="form-group">
                                <label htmlFor="exampleInputEmail1">Correo Electrónico</label>
                                <input onChange={handleChange} type="email" name="email" className="form-control" id="mail-input"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Boleta</label>
                                <input onChange={handleChange} type="text" name="boleta" className="form-control" id="boleta-input" maxLength={10} />
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