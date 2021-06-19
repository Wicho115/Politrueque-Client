import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import {useLocation} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

import SecondNav from "../../components/SecondNav";
import FormsContainer from "../../components/FormsContainer";
import FormInput from "../../components/inputs/FormInput";
import DescriptionInput from "../../components/inputs/DescriptionInput";
import {gql, useMutation, useQuery} from '@apollo/client';
import Loading from "../../components/Loading";

import articleJSON from "../../helpers/ArticleSample";

const GET_ARTICLE = gql`
    query getArticle($id : String!){
      getArticle(id : $id){            
            action_id,
            available,
            description,  
            img
            name,
            stock        
        }
    }

`

const UPDATE_ARTICLE = gql`
mutation g($payload : UpdateArticleInput!){
  updateArticle(payload : $payload){
    _id
  }
}
`

const useQueryURL = () => {
    return new URLSearchParams(useLocation().search);
  };

const EditArticle = () => {
    const query = useQueryURL();
    const id = query.get('art');

    const [article, setArticle] = useState({});
    const [stock, setStock] = useState(0);

    const handleStock = e =>{
        console.log(e.target.value);
        setStock(e.target.value);
    }

    const [updateData, {loading : Mloading, error : Merror}] = useMutation(UPDATE_ARTICLE, {onCompleted : (data) =>{
        const id = data.updateArticle._id;
        window.location.assign(`${window.location.origin}/article?a=${id}`);
    }})
    const {loading, error} = useQuery(GET_ARTICLE, {variables : {id}, 
    onCompleted : (data) =>{
        setArticle(data.getArticle);
        setStock(data.getArticle.stock);
    }});
    if (loading) return (<Loading />);
    if(error) return <h1>Error!, {error.message}</h1>


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
                            <input value={stock} onChange={handleStock} type="number" name="stock" className="form-control" min={1} max={100} />
                        </FormInput>
                        </div>
                    </div>
                    <hr />
                    <div className="columna_doble_fomulario">
                        <FormInput label="Nombre">
                            <input type="text" name="nombre" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" defaultValue={article.name} disabled />
                        </FormInput>
                        <FormInput label="Acción">
                            <select value={article.action_id} className="custom-select" id="inputGroupSelect01" disabled>
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
                        <button onClick={(e) => {
                            updateData({variables : {payload : {id, stock : parseInt(stock)}}})
                        }} type="submit" className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Actualizar Artículo</button>
                    </div>
                </FormsContainer >
            </div >
        </>
    );
};

export default EditArticle;