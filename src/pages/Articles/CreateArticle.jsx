import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SecondNav from "../../components/SecondNav";
import FormsContainer from "../../components/FormsContainer";
import FormInput from "../../components/inputs/FormInput";
import DescriptionInput from "../../components/inputs/DescriptionInput";
import FileInput from "../../components/inputs/FileInput";
import CustomToast from "../../components/CustomToast";

const CreateArticle = () => {

    const [newArticle, setNewArticle] = useState({});

    const handleChange = (e) => {
        console.log("cambio");
        setNewArticle({ ...newArticle, [e.target.name]: e.target.value });        
    };

    const handlePrice = () => {
        const opciones = {
            //Texto pequeño, Texto input
            1: ["¿Cuánto costará tu artículo?", "Precio"],
            2: ["¿Qué te gustaría recibir a cambio?", "Artículo"],
            3: ["Este será un artículo de donativo, muchas gracias", "N/A"]
        }

        const opcion = document.getElementById("id_action").value;

        document.getElementById("small").innerHTML = opciones[opcion][0];
        document.getElementById("label").innerHTML = opciones[opcion][1];
        

        switch (opcion) {
            case "3":
                document.getElementById("warning").innerHTML = "Solamente podrás modificar la  cantidad y la descripción posteriormente.";
                document.getElementById("price").value = "Donativo";
                document.getElementById("price").disabled = true;
                break;

            case "2":
                document.getElementById("warning").innerHTML = "Solamente podrás modificar la  cantidad, la descripción y el intercambio posteriormente.";
                document.getElementById("price").disabled = false;
                document.getElementById("price").value = "";
                break;

            default:
                document.getElementById("warning").innerHTML = "Solamente podrás modificar la  cantidad, la descripción y el precio posteriormente.";
                document.getElementById("price").disabled = false;
                document.getElementById("price").value = "";
                break;
        }

    }

    const handleSub = (e) => {
        e.preventDefault();

        const {name, stock, description, id_action, price} = newArticle;

        console.log(name);
        console.log(stock);
        console.log(description);
        console.log(id_action);
        console.log(price);

        //Comprobamos datos vacíos
        if (!name) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona un Nombre" />);
        } else if (!stock) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona una Cantidad" />);
        } else if (!description) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona una Descripción" />);
        } else if (!price) {
            switch (id_action) {
                case "1":
                    toast.error(<CustomToast type="error" message="Por favor, proporciona un Precio" />);
                    break;
                case "2":
                    toast.error(<CustomToast type="error" message="Por favor, proporciona un Artículo" />);
                    break;
                default:
                    toast.error(<CustomToast type="error" message="Error, recarga la página" />);
                    break;
            }
        } else {
            toast.success(<CustomToast type="success" message="Campos llenos" />)
        }


    }

    return (
        <>
            {/* Contenedor para agregar un nuevo artículo */}
            <div className="conetnedor_secundario_2">
                <ToastContainer />
                <SecondNav>
                    <a className="nav-link">Agregar un Nuevo Artículo</a>
                </SecondNav>
                <FormsContainer>
                    <form onSubmit={handleSub}>
                        {/* Imágen del Artículo */}
                        <div className="centrar">
                            <FileInput instuctions="Por favor, seleccione la imágen del artículo:" defaultImg="none" imgFormat="new-article" />
                        </div>
                        <hr />
                        {/* Aqui van los datos generales que se piden para un artículo */}
                        <div className="columna_doble_fomulario">
                            <FormInput small="¿Qué es el artículo?" label="Nombre">
                                <input onChange={handleChange} type="text" name="name" className="form-control" id="name"/>
                            </FormInput>
                            <FormInput small="¿Cuántas unidades de tu artículo tendrás? ( 1 a 100 )" label="Cantidad">
                                <input onChange={handleChange} type="number" name="stock" className="form-control" id="stock" min={1} max={100} />
                            </FormInput>
                        </div>
                        <div className="form-group">
                            <DescriptionInput
                                toDescribe="Descripción del Artículo"
                                suggestion="Preguntas de Sugerencia: ¿Cómo es este artículo? ¿En qué estado se encuentra? ¿Para qué sirve?"
                                minmax="Mínino 20 Caracteres - Máximo 200 Caracteres">
                                <textarea onChange={handleChange} className="form-control" name="description" id="description" rows={3} minlength={20} maxlength={500} />
                            </DescriptionInput>
                        </div>
                        <div className="columna_doble_fomulario">
                            <FormInput small="¿En que categoría se encontrará tu artículo?" label="Categoría">
                                <select onChange={handleChange} className="custom-select" name="category" id="category">
                                    <option value={1}>Matemáticas</option>
                                    <option value={2}>Química</option>
                                    <option value={3}>Física</option>
                                    <option value={4}>Inglés</option>
                                    <option value={5}>Dibujo Técnico</option>
                                    <option value={6}>Programación</option>
                                    <option value={7}>Máquinas con Sistemas Automatizados</option>
                                    <option value={8}>Sistemas Digitales</option>
                                </select>
                            </FormInput>
                            <FormInput small="¿En qué estado se encuentra tu artículo?" label="Estado">
                                <select onChange={handleChange} className="custom-select" name="state" id="state">
                                    <option value={1}>Nuevo</option>
                                    <option value={2}>Usado</option>
                                </select>
                            </FormInput>
                        </div>
                        <div className="columna_doble_fomulario">
                            <FormInput small="¿Qué deseas hacer con tu artículo?" label="Acción">
                                <select onChange={handlePrice} className="custom-select" name="id_action" id="id_action">
                                    <option selected value={1}>Vender</option>
                                    <option value={2}>Intercambiar</option>
                                    <option value={3}>Donar</option>
                                </select>
                            </FormInput>
                            {/* Aqui es lo que depende de la acción que se vaya a hacer */}
                            <div className="columna_formulario">
                                <small id="small" className="form-text text-muted">¿Cuánto costará tu artículo?</small>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <label className="input-group-text" id="label">Precio</label>
                                    </div>
                                    <input onChange={handleChange} type="text" name="price" className="form-control" id="price" />
                                </div>
                            </div>
                        </div>
                        <div className="form-group centrar">
                            <small id="warning" className="form-text text-muted">Solamente podrás modificar la  cantidad, la descripción y el precio posteriormente.</small>
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Crear Artículo</button>
                        </div>
                    </form>
                </FormsContainer>
            </div>
        </>
    );
};

export default CreateArticle;