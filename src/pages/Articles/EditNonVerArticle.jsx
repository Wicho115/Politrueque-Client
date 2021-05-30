import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SecondNav from "../../components/SecondNav";
import FormsContainer from "../../components/FormsContainer";
import FormInput from "../../components/inputs/FormInput";
import DescriptionInput from "../../components/inputs/DescriptionInput";
import FileInput from "../../components/inputs/FileInput";
import CustomToast from "../../components/CustomToast";

import articleJSON from "../../helpers/ArticleSample";


const EditArticle = () => {

    const name = articleJSON.name
    const [editedArticle, setEditedArticle] = useState(articleJSON);

    const priceRegex = /^[1-9]([0-9])*(\.(\d){1,2})?$/;

    useEffect(() => {
        setEditedArticle(articleJSON);
    }, []);

    const handleChange = (e) => {
        setEditedArticle({ ...editedArticle, [e.target.name]: e.target.value });
    };

    const handleSub = (e) => {
        e.preventDefault();

        const { name, stock, description, category, action_id, state, price } = editedArticle;

        console.log(editedArticle);

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
            if (action_id === 1 && !priceRegex.test(price)) {
                toast.error(<CustomToast type="error" message="Por favor, proporciona un Precio válido" />)
            } else {
                toast.success(<CustomToast type="success" message="Campos llenos" />);
            }

        }


    }

    return (
        <>
            {/* Contenedor para editar un artículo */}
            <div className="conetnedor_secundario_2">
                <ToastContainer />
                <SecondNav>
                    <a className="nav-link">Modificar Artículo: {name}</a>
                </SecondNav>
                <FormsContainer>
                    <form onSubmit={handleSub}>
                        {/* Aqui van los datos generales que se piden para un artículo */}
                        <div className="centrar">
                            <FileInput instuctions="Esta es la imágen de su artículo" defaultImg={articleJSON.img} imgFormat="article" />
                        </div>
                        <hr />
                        <div className="columna_doble_fomulario">
                            <FormInput small="¿Qué es el artículo?" label="Nombre">
                                <input value={editedArticle.name} onChange={handleChange} type="text" name="name" className="form-control" id="name" placeholder="Nombre del Artículo"  />
                            </FormInput>
                            <FormInput small="¿Cuántas unidades de tu artículo tendrás?" label="Cantidad">
                                <input value={editedArticle.stock} onChange={handleChange} type="number" name="stock" className="form-control" id="stock" min={1} max={100} placeholder="#"  />
                            </FormInput>
                        </div>
                        <div className="form-group">
                            <DescriptionInput
                                toDescribe="Descripción del Artículo"
                                suggestion="Preguntas de Sugerencia: ¿Cómo es este artículo? ¿En qué estado se encuentra? ¿Qué color es?"
                                minmax="Mínino 20 Caracteres - Máximo 200 Caracteres">
                                <textarea onChange={handleChange} className="form-control" name="description" id="description" rows={3} minLength={20} maxLength={500} placeholder="Descripción del Artículo" value={editedArticle.description} />
                            </DescriptionInput>
                        </div>
                        <div className="columna_doble_fomulario">
                            <FormInput small="¿En que categoría se encontrará tu artículo?" label="Categoría">
                                <select value={editedArticle.category} onChange={handleChange} className="custom-select" name="category" id="category">
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
                                <select value={editedArticle.state} onChange={handleChange} className="custom-select" name="state" id="state">
                                    <option value={true}>Nuevo</option>
                                    <option value={false}>Usado</option>
                                </select>
                            </FormInput>
                        </div>
                        <div className="columna_doble_fomulario">
                            <FormInput small="Tu artículo se visualizará en:" label="Acción">
                                <select value={editedArticle.action_id} className="custom-select" name="action_id" id="action_id" disabled>
                                    <option value={1}>Vender</option>
                                    <option value={2}>Intercambiar</option>
                                    <option value={3}>Donar</option>
                                </select>
                            </FormInput>
                            {/* Aqui es lo que depende de la acción que se vaya a hacer */}
                            <FormInput small="¿Cuánto costará tu artículo?" label="Precio">
                                <input value={editedArticle.price} onChange={handleChange} type="text" name="price" className="form-control" id="price" placeholder="$ MXN"  />
                            </FormInput>
                        </div>
                        <div className="form-group centrar">
                            <small id="emailHelp" className="form-text text-muted">Podrás volver a editar estos campos  después</small>
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Actualizar Artículo</button>
                        </div>
                    </form>
                </FormsContainer >
            </div >
        </>
    );
};

export default EditArticle;