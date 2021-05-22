import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SecondNav from "../../components/SecondNav";
import FormsContainer from "../../components/FormsContainer";
import FormInput from "../../components/inputs/FormInput";
import DescriptionInput from "../../components/inputs/DescriptionInput";
import FileInput from "../../components/inputs/FileInput";

import articleJSON from "../../helpers/ArticleSample";


const EditArticle = () => {

    const [article, setArticle] = useState({});

    useEffect(() => {
        setArticle(articleJSON);
    }, []);

    return (
        <>
            {/* Contenedor para editar un artículo */}
            <div className="conetnedor_secundario_2">
                <SecondNav>
                    <a className="nav-link">Modificar Artículo: {article.name}</a>
                </SecondNav>
                <FormsContainer>
                    {/* Aqui van los datos generales que se piden para un artículo */}
                    <div className="centrar">
                        <div className="add-img-1">
                            <div className="col-ml-4 img-previa">
                                <img src={article.img} className="card-img img-thumbnail img-artículo" alt="" />
                            </div>
                            <FormInput small="¿Cuántas unidades de tu artículo tienes?" label="Cantidad">
                            <input type="number" name="stock" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue={article.stock} />
                        </FormInput>
                        </div>
                    </div>
                    <hr />
                    <div className="columna_doble_fomulario">
                        <FormInput label="Nombre">
                            <input type="text" name="nombre" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue={article.name} disabled />
                        </FormInput>
                        <FormInput label="Acción">
                            <select className="custom-select" id="inputGroupSelect01" disabled>
                                <option value={1}>Vender</option>
                                <option value={2}>Intercambiar</option>
                                <option value={3}>Donar</option>
                            </select>
                        </FormInput>
                    </div>
                    <div className="form-group">
                        <DescriptionInput
                            toDescribe="Descripción del Artículo">
                            <textarea className="form-control" name="descripcion" id="exampleFormControlTextarea1" rows={3} defaultValue={article.description} disabled />
                        </DescriptionInput>
                    </div>
                    
                    <div className="form-group centrar">
                        <small id="emailHelp" className="form-text text-muted">Podrás volver a editar la cantidad disponible después</small>
                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Actualizar Artículo</button>
                    </div>
                </FormsContainer >
            </div >
        </>
    );
};

export default EditArticle;