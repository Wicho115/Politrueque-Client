import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Link, Redirect } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import QuickNav from "../../components/QuickNav";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const RegisterUser = () => {

    const query = useQuery();
    const type = query.get('t');

    const [newUser, setNewUser] = useState({});

    const boletaRegex = /^[2][0]([1-2][0-9])(([0][1-9])|([1][0-9]))\d{4}$/;
    const mailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    const handleSub = (e) => {
        e.preventDefault();
        const { name, email, boleta, password } = newUser;

        //Comprobamos datos vacíos
        if (!name) {
            toast.error("Por favor, proporciona un Nombre");
        } if (!email) {
            toast.error("Por favor, proporciona un Correo");
        } if (!boleta) {
            toast.error("Por favor, proporciona una Boleta");
        } if (!password) {
            toast.error("Por favor, proporciona una Contraseña");
        } else {
            //Comprobamos datos válidos
            if (!mailRegex.test(email)) {
                toast.error("Correo no válido");
            } else if (!boletaRegex.test(boleta)) {
                toast.error("Boleta no válida");
            } else {
                toast.success("Campos válidos");
            }
        }
    }

    switch (type) {
        case "u":
            return (
                <>
                    <QuickNav />
                    <article className="conenedor_terciario_1">
                        <ToastContainer />
                        <div>
                            <div className="navegación_secundaria_1">
                                <nav className="nav nav-pills nav-fill">
                                    <Link className="nav-link active" to="/registeruser?t=u" style={{ backgroundColor: 'rgb(128, 0, 64)', borderRadius: '7.5px' }}>
                                        Registrar Nuevo Usuario
                                    </Link>
                                    <Link className="nav-link" to="/registeruser?t=a">
                                        Registrar Nuevo Administrador
                                    </Link>
                                </nav>
                            </div>
                            <div className="formulario">
                                <form action="#" method="GET" onSubmit={handleSub}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Nombre</label>
                                        <input onChange={handleChange} type="text" name="name" className="form-control" id="name-input" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Correo Electrónico</label>
                                        <input onChange={handleChange} type="email" name="email" className="form-control" id="mail-input" />
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
                                        <button className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Registrar Usuario</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </article>
                </>

            );

        case "a":
            return (
                <>
                    <QuickNav />
                    <article className="conenedor_terciario_1">
                        <ToastContainer />
                        <div>
                            <div className="navegación_secundaria_1">
                                <nav className="nav nav-pills nav-fill">
                                    <Link className="nav-link" to="/registeruser?t=u">
                                        Registrar Nuevo Usuario
                                    </Link>
                                    <Link className="nav-link active" to="/registeruser?t=a" style={{ backgroundColor: 'rgb(128, 0, 64)', borderRadius: '7.5px' }}>
                                        Registrar Nuevo Administrador
                                    </Link>
                                </nav>
                            </div>
                            <div className="formulario">
                                <form action="#" method="GET" onSubmit={handleSub}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Nombre</label>
                                        <input onChange={handleChange} type="text" name="name" className="form-control" id="name-input" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Correo Electrónico</label>
                                        <input onChange={handleChange} type="email" name="email" className="form-control" id="mail-input" />
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
                                        <button className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Registrar Usuario</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </article>
                </>

            );

        default:
            return (<Redirect to="/registeruser?t=u" />);
    }


};

export default RegisterUser;