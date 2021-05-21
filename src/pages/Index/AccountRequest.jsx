import React from "react";

import { Link } from "react-router-dom";

import SecondNav from "../../components/SecondNav";
import FormsContainer from "../../components/FormsContainer";
import FormInput from "../../components/inputs/FormInput";
import DescriptionInput from "../../components/inputs/DescriptionInput";
import FileInput from "../../components/inputs/FileInput";
import Card from "../../components/cards/Card";
import CardContainer from "../../components/cards/CardContainer";
import QuickNav from "../../components/QuickNav";


const AccountRequest = () => {
    return (
        <>
            <QuickNav />
            {/* Contenedor para agregar un nuevo artículo */}
            <div className="conetnedor_secundario_2">
                <SecondNav>
                    <a className="nav-link">Solicitud de Cuenta de Politrurque</a>
                </SecondNav>
                <FormsContainer>
                    <CardContainer>
                        <Card title="¿Que debo hacer para tener una cuenta?">
                            <p className="card-text">Para utilizar Politrueque es necesario que cuentes con una cuenta. Envía tu solicitud mediante el formulario haciendo clic en <a href="https://forms.gle/LKFd8gMFGCC3tt2N7"> ¡Enviar mi Solicitud!</a>. Proporciona los datos que si te piden y en un lapso máximo de 24 horas uno de nuestros administradores te enviará un correo al correo que nos proporciones.</p>
                            <p className="card-text">Recuerda leer antes los <Link to="/terms">Términos y Condiciones</Link>, así como el <Link to="/terms">Aviso de Privacidad</Link>. Para hacer uso de Politruque debes estar de acuerdo con ellos.</p>
                        </Card>
                        <FormsContainer>
                            <div className="centrar">
                                <a href="https://forms.gle/LKFd8gMFGCC3tt2N7" target="_blank" className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>¡Enviar mi Solicitud!</a>
                            </div>
                            <br />
                        </FormsContainer>
                        <Card title="Ya cuento con una cuenta de Politrueque">
                            <p className="card-text">¡Perfecto! Ahora solo debes iniciar sesión para comenzar a hacer uso de Politrueque. Nos alegra tenerte por aquí.</p>
                        </Card>
                        <FormsContainer>
                            <div className="centrar">
                                <Link to="/login" target="_blank" className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>¡Iniciar Sesión!</Link>
                            </div>
                            <br />
                        </FormsContainer>
                    </CardContainer>
                </FormsContainer>
            </div>
        </>
    );
};

export default AccountRequest;