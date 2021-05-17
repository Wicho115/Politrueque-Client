import React, { useState, useEffect } from "react";

import SecondNav from "../../components/SecondNav";
import FormsContainer from "../../components/FormsContainer";
import FormInput from "../../components/inputs/FormInput";
import DescriptionInput from "../../components/inputs/DescriptionInput";
import FileInput from "../../components/inputs/FileInput";

import articleJSON from "../../helpers/ArticleSample";


const EditArticle = () => {

    const [article, setArticle] = useState([]);

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
                        <FileInput instuctions="Esta es la imágen de su artículo" defaultImg={article.img}/>
                    </div>
                    <hr />
                    <div className="columna_doble_fomulario">
                        <FormInput small="¿Qué es el artículo?" label="Nombre">
                            <input type="text" name="nombre" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" readOnly defaultValue={article.name} />
                        </FormInput>
                        <FormInput small="¿Cuántas unidades de tu artículo tendrás?" label="Cantidad">
                            <input type="number" name="stock" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue={article.stock} />
                        </FormInput>
                    </div>
                    <div className="form-group">
                        <DescriptionInput
                            toDescribe="Descripción del Artículo"
                            suggestion="Preguntas de Sugerencia: ¿Cómo es este artículo? ¿En qué estado se encuentra? ¿Qué color es?"
                            minmax="Mínino 20 Caracteres - Máximo 200 Caracteres">
                            <textarea className="form-control" name="descripcion" id="exampleFormControlTextarea1" rows={3} defaultValue={article.description}/>
                        </DescriptionInput>
                    </div>
                    <div className="columna_doble_fomulario">
                        <FormInput small="¿En que categoría se encontrará tu artículo?" label="Categoría">
                            <select className="custom-select" id="inputGroupSelect01" disabled>
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
                            <select className="custom-select" id="inputGroupSelect01" disabled>
                                <option value={1}>Nuevo</option>
                                <option value={2}>Usado</option>
                            </select>
                        </FormInput>
                    </div>
                    <div className="columna_doble_fomulario">
                        <FormInput small="¿Qué deseas hacer con tu artículo?" label="Acción">
                            <select className="custom-select" id="inputGroupSelect01" disabled>
                                <option value={1}>Vender</option>
                                <option value={2}>Intercambiar</option>
                                <option value={3}>Donar</option>
                            </select>
                        </FormInput>
                        {/* Aqui es lo que depende de la acción que se vaya a hacer */}
                        <FormInput small="¿Cuánto costará tu artículo?" label="Precio">
                            <input type="text" name="precio" className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp" defaultValue={article.price} />
                        </FormInput>
                    </div>
                    <div className="form-group centrar">
                        <small id="emailHelp" className="form-text text-muted">Podrás volver a editar estos campos  después</small>
                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Actualizar Artículo</button>
                    </div>
                </FormsContainer >
            </div >
        </>
    );
};

export default EditArticle;