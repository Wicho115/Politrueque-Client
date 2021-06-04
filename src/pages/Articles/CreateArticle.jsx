import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SecondNav from "../../components/SecondNav";
import FormsContainer from "../../components/FormsContainer";
import FormInput from "../../components/inputs/FormInput";
import DescriptionInput from "../../components/inputs/DescriptionInput";
import FileInput from "../../components/inputs/FileInput";
import CustomToast from "../../components/CustomToast";

import {gql, useMutation} from '@apollo/client'
import { Redirect } from "react-router";
import auth from "../../auth/auth";

const CREATE_ARTICLE = gql`
mutation CArticle($payload : CreateArticleInput!, $action : ActionInput!){
  createArticle(action : $action, payload : $payload){
    _id
  }
}`

const CreateArticle = () => {

    const [newArticle, setNewArticle] = useState({});
    const [action_id, setAction] = useState(1);
    const [state, setState] = useState(true);
    const [category, setCategory] = useState(1);
    const [stock, setStock] = useState(1);
    const [img, setImg] = useState(null);      

    const [createArticle] = useMutation(CREATE_ARTICLE, {onCompleted : (data) =>{  
        if(auth.privileges){
            window.location.assign(`${window.location.origin}/article/verify?a=${data.createArticle._id}`)
        }else{
            window.location.assign(`${window.location.origin}/user`)
        }
        
    } })

    const priceRegex = /^[1-9]([0-9])*(\.(\d){1,2})?$/;

    const handleChange = (e) => {
        setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
    };

    const handleFileChange = files =>{
        setImg(files[0]);
    }

    const handleState = (e) => {    
        setState(e.target.value);
    }

    const handleCategory = (e) => {
        setCategory(parseInt(e.target.value));
    }

    const handleStock = (e) => {
        setStock(parseInt(e.target.value));
    }

    const handlePrice = (e) => {

        const opciones = {
            //Texto pequeño, Texto input
            1: ["¿Cuánto costará tu artículo?", "Precio", "$ MXN"],
            2: ["¿Qué te gustaría recibir a cambio?", "Artículo", "Artículo"],
            3: ["Este será un artículo de donativo, muchas gracias", "N/A", "Donativo"]
        }

        const opcion = e.target.value;
        setAction(parseInt(e.target.value));

        document.getElementById("small").innerHTML = opciones[opcion][0];
        document.getElementById("label").innerHTML = opciones[opcion][1];
        document.getElementById("price").placeholder = opciones[opcion][2];

        switch (opcion) {
            case "3":
                document.getElementById("warning").innerHTML = "Solamente podrás modificar la  cantidad y la descripción posteriormente.";
                document.getElementById("price").value = "Donativo";
                document.getElementById("price").disabled = true;
                setNewArticle({...newArticle, price:""})
                break;

            case "2":
                document.getElementById("warning").innerHTML = "Solamente podrás modificar la  cantidad, la descripción y el intercambio posteriormente.";
                document.getElementById("price").disabled = false;
                document.getElementById("price").value = "";
                setNewArticle({...newArticle, price:""})
                break;

            default:
                document.getElementById("warning").innerHTML = "Solamente podrás modificar la  cantidad, la descripción y el precio posteriormente.";
                document.getElementById("price").disabled = false;
                document.getElementById("price").value = "";
                setNewArticle({...newArticle, price:""})
                break;
        }

    }

    const handleSub = (e) => {
        e.preventDefault();

        const { name, description, price } = newArticle;

        //Comprobamos datos vacíos
        if (!name) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona un Nombre" />);
        } else if (!stock) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona una Cantidad" />);
        } else if (!description) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona una Descripción" />);
        } else if (!category) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona una Categoría" />);
        } else if (!state) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona un Estado" />);
        } else if (!action_id) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona una Acción" />);
        } else if (!price && action_id != 3) {
            if (action_id === 1) {
                toast.error(<CustomToast type="error" message="Por favor, proporciona un Precio" />)
            } if (action_id === 2) {
                toast.error(<CustomToast type="error" message="Por favor, proporciona un Artículo" />)
            }
        } //Comprobamos cámpos válidos
        else {
            if (action_id === 1 &&!priceRegex.test(price)) {
                toast.error(<CustomToast type="error" message="Por favor, proporciona un Precio válido" />)
            } else {
                toast.success(<CustomToast type="success" message="Campos llenos" />);
                let action = {action_id, exchange_article : "", price : 0};
                let payload = { ...newArticle, stock, category, state : (state === "true"), img };
                delete payload.price;
                if(action_id === 1){
                    action.price=parseInt(price);
                }else if(action_id === 2){
                    action.exchange_article = price;
                }   
                createArticle({variables : {action, payload}, awaitRefetchQueries : true});
            }
            
        }


    }

    return (
        <>
            {/* Contenedor para agregar un nuevo artículo */}
            <div className="conetnedor_secundario_2">
                <SecondNav>
                    <a className="nav-link">Agregar un Nuevo Artículo</a>
                </SecondNav>
                <FormsContainer>
                    <form onSubmit={handleSub}>
                        {/* Imágen del Artículo */}
                        <div className="centrar">
                            <FileInput instuctions="Por favor, seleccione la imágen del artículo:" defaultImg="none" imgFormat="new-article" upperChange={handleFileChange} />
                        </div>
                        <hr />
                        {/* Aqui van los datos generales que se piden para un artículo */}
                        <div className="columna_doble_fomulario">
                            <FormInput small="¿Qué es el artículo?" label="Nombre">
                                <input onChange={handleChange} type="text" name="name" className="form-control" id="name" placeholder="Nombre del Artículo" />
                            </FormInput>
                            <FormInput small="¿Cuántas unidades de tu artículo tendrás? ( 1 a 100 )" label="Cantidad">
                                <input onChange={handleStock} type="number" name="stock" className="form-control" id="stock" min={1} max={100} defaultValue={1} placeholder="#" />
                            </FormInput>
                        </div>
                        <div className="form-group">
                            <DescriptionInput
                                toDescribe="Descripción del Artículo"
                                suggestion="Preguntas de Sugerencia: ¿Cómo es este artículo? ¿En qué estado se encuentra? ¿Para qué sirve?"
                                minmax="Mínino 20 Caracteres - Máximo 200 Caracteres">
                                <textarea onChange={handleChange} className="form-control" name="description" id="description" rows={3} minLength={20} maxLength={500} placeholder="Descripción del Artículo" />
                            </DescriptionInput>
                        </div>
                        <div className="columna_doble_fomulario">
                            <FormInput small="¿En que categoría se encontrará tu artículo?" label="Categoría">
                                <select onChange={handleCategory} className="custom-select" name="category" id="category">
                                    <option value={1}>Matemáticas</option>
                                    <option value={2}>Química</option>
                                    <option value={3}>Física</option>
                                    <option value={4}>Inglés</option>
                                    <option value={5}>Historia</option>
                                    <option value={6}>Filosofía</option>
                                    <option value={7}>Dibujo Técnico</option>
                                    <option value={8}>Programación</option>
                                    <option value={9}>Máquinas con Sistemas Automatizados</option>
                                    <option value={10}>Sistemas Digitales</option>
                                </select>
                            </FormInput>
                            <FormInput small="¿En qué estado se encuentra tu artículo?" label="Estado">
                                <select onChange={handleState} className="custom-select" name="state" id="state">
                                    <option value={true}>Nuevo</option>
                                    <option value={false}>Usado</option>
                                </select>
                            </FormInput>
                        </div>
                        <div className="columna_doble_fomulario">
                            <FormInput small="¿Qué deseas hacer con tu artículo?" label="Acción">
                                <select value={action_id} onChange={handlePrice} className="custom-select" name="action_id" id="action_id">
                                    <option value={1}>Vender</option>
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
                                    <input onChange={handleChange} type="text" name="price" className="form-control" id="price" placeholder="$ MXN" />
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