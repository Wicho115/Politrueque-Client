import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import {Redirect, useLocation} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';

import SecondNav from "../../components/SecondNav";
import FormsContainer from "../../components/FormsContainer";
import FormInput from "../../components/inputs/FormInput";
import DescriptionInput from "../../components/inputs/DescriptionInput";
import FileInput from "../../components/inputs/FileInput";
import CustomToast from "../../components/CustomToast";
import Loading from "../../components/Loading";

import articleJSON from "../../helpers/ArticleSample";

import {gql, useQuery, useMutation} from '@apollo/client';

const GET_NV_ARTICLE = gql`
query getArticle($id : String!){
  getNVArticle(id : $id){
    _id,
    name,
    description,
    action_id,
    available,
    price,
    img,
    exchange_product,
    category,
    stock,
    state,
    Propietary{
      _id,
      username
    },
    Comments{
      _id,
      author_id,
      content,
      Author{
        _id,
        username
      }
    }
  }
}
`

const UPDATE_ARTICLE = gql`
mutation updateNVA($payload : UpdateNVArticleInput!){
  updateNVArticle(payload : $payload){
    _id
  }
}
`

const useQueryURL = () => {
    return new URLSearchParams(useLocation().search);
};

const EditArticle = () => {
    const priceRegex = /^[1-9]([0-9])*(\.(\d){1,2})?$/;
    const query = useQueryURL();
    const id = query.get('art');    

    const [name, setName] = useState('');
    const [img, setImg] = useState(null);
    const [editedArticle, setEditedArticle] = useState({});
    const [state, setState] = useState(false)

    const handleCompleteQuery = (data) => {
        setEditedArticle(data.getNVArticle);
        setState(data.getNVArticle.state);
        setName(data.getNVArticle.name);
    }

    const {data, loading, error} = useQuery(GET_NV_ARTICLE, {variables : {id}, onCompleted : handleCompleteQuery});
    const [updateArticle , {loading : loadingMutation}] = useMutation(UPDATE_ARTICLE, 
    {onCompleted : (data) =>{
        window.location.assign(`${window.location.origin}/article/verify?a=${data.updateNVArticle._id}`)
    }})
    if(loadingMutation) return (<Loading />);
    if (loading) return (<Loading />);
    if(!data)return <h1>No data</h1>;
    if(error) return <h1>Error {error.message}</h1>;

    const handleFileChange = (files) =>{
        setImg(files[0]);
    }

    const handleState = (e) =>{
        setState(e.target.value == "true")
    }

    const handleChange = (e) => {
        setEditedArticle({ ...editedArticle, [e.target.name]: e.target.value });
    };

    const handleSub = (e) => {
        e.preventDefault();
        const { name, stock, description, category, action_id, price, exchange_product } = editedArticle;
        const state_string = toString(state);        

        //Comprobamos datos vac??os
        if (!name) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona un Nombre" />);
        } else if (!stock) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona una Cantidad" />);
        } else if (!description) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona una Descripci??n" />);
        } else if (!category) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona una Categor??a" />);
        } else if (!state_string) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona un Estado" />);
        } else if (!action_id) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona una Acci??n" />);
        } else if (!price && action_id === 1) {
            toast.error(<CustomToast type="error" message="Por favor, proporciona un Precio" />)
            
        }else if(!exchange_product && action_id === 2){
            toast.error(<CustomToast type="error" message="Por favor, proporciona un Art??culo" />)
        } //Comprobamos c??mpos v??lidos
        else {
            if (action_id === 1 && !priceRegex.test(price)) {
                toast.error(<CustomToast type="error" message="Por favor, proporciona un Precio v??lido" />)
            } else {
                //succes
                toast.success(<CustomToast type="success" message="Campos llenos" />);
                const payload = {
                    id,description,name,stock : parseInt(stock),category : parseInt(category),state,img,
                    price : parseInt(price),exchange_product
                }
                updateArticle({variables : {payload}, refetchQueries : [{query : GET_NV_ARTICLE, variables : {id}}]})
            }

        }


    }

    return (
        <>
            {/* Contenedor para editar un art??culo */}
            <div className="conetnedor_secundario_2">
                <SecondNav>
                    <a className="nav-link">Modificar Art??culo: {name}</a>
                </SecondNav>
                <FormsContainer>
                    <form onSubmit={handleSub}>
                        {/* Aqui van los datos generales que se piden para un art??culo */}
                        <div className="centrar">
                            <FileInput instuctions="Esta es la im??gen de su art??culo" defaultImg={editedArticle.img} imgFormat="article" upperChange={handleFileChange} />
                        </div>
                        <hr />
                        <div className="columna_doble_fomulario">
                            <FormInput small="??Qu?? es el art??culo?" label="Nombre">
                                <input value={editedArticle.name} onChange={handleChange} type="text" name="name" className="form-control" id="name" placeholder="Nombre del Art??culo"  />
                            </FormInput>
                            <FormInput small="??Cu??ntas unidades de tu art??culo tendr??s?" label="Cantidad">
                                <input value={editedArticle.stock} onChange={handleChange} type="number" name="stock" className="form-control" id="stock" min={1} max={100} placeholder="#"  />
                            </FormInput>
                        </div>
                        <div className="form-group">
                            <DescriptionInput
                                toDescribe="Descripci??n del Art??culo"
                                suggestion="Preguntas de Sugerencia: ??C??mo es este art??culo? ??En qu?? estado se encuentra? ??Qu?? color es?"
                                minmax="M??nino 20 Caracteres - M??ximo 200 Caracteres">
                                <textarea onChange={handleChange} className="form-control" name="description" id="description" rows={3} minLength={20} maxLength={500} placeholder="Descripci??n del Art??culo" value={editedArticle.description} />
                            </DescriptionInput>
                        </div>
                        <div className="columna_doble_fomulario">
                            <FormInput small="??En que categor??a se encontrar?? tu art??culo?" label="Categor??a">
                                <select value={editedArticle.category} onChange={handleChange} className="custom-select" name="category" id="category">
                                    <option value={1}>Matem??ticas</option>
                                    <option value={2}>Qu??mica</option>
                                    <option value={3}>F??sica</option>
                                    <option value={4}>Ingl??s</option>
                                    <option value={5}>Historia</option>
                                    <option value={6}>Filosof??a</option>
                                    <option value={7}>Dibujo T??cnico</option>
                                    <option value={8}>Programaci??n</option>
                                    <option value={9}>M??quinas con Sistemas Automatizados</option>
                                    <option value={10}>Sistemas Digitales</option>
                                </select>
                            </FormInput>
                            <FormInput small="??En qu?? estado se encuentra tu art??culo?" label="Estado">
                                <select value={state} onChange={handleState} className="custom-select" name="state" id="state">
                                    <option value={true}>Nuevo</option>
                                    <option value={false}>Usado</option>
                                </select>
                            </FormInput>
                        </div>
                        <div className="columna_doble_fomulario">
                            <FormInput small="Tu art??culo se visualizar?? en:" label="Acci??n">
                                <select value={editedArticle.action_id} className="custom-select" name="action_id" id="action_id" disabled>
                                    <option value={1}>Vender</option>
                                    <option value={2}>Intercambiar</option>
                                    <option value={3}>Donar</option>
                                </select>
                            </FormInput>
                            {/* Aqui es lo que depende de la acci??n que se vaya a hacer */}
                            {(() =>{
                                if(editedArticle.action_id === 1) return (
                                    <FormInput small="??Cu??nto costar?? tu art??culo?" label="Precio">
                                    <input value={editedArticle.price} onChange={handleChange} type="text" name="price" className="form-control" id="price" placeholder="$ MXN"  />
                                </FormInput>
                                )
                                if(editedArticle.action_id === 2) return (
                                    <FormInput small="??Qu?? te gustar??a recibir a cambio?" label="Art??culo">
                                    <input value={editedArticle.exchange_product} onChange={handleChange} type="text" name="exchange_product" className="form-control" id="exchange_product" placeholder="Articulo"  />
                                </FormInput>
                                )
                                return (<FormInput small="Este articulo es donativo, muchas gracias" label="N/A">
                                <input  type="text" name="exchange_product" className="form-control" id="exchange_product" placeholder="Donativo"  />
                            </FormInput>)
                            })()}                           
                        </div>
                        <div className="form-group centrar">
                            <small id="emailHelp" className="form-text text-muted">Podr??s volver a editar estos campos  despu??s</small>
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Actualizar Art??culo</button>
                        </div>
                    </form>
                </FormsContainer >
            </div >
        </>
    );
};

export default EditArticle;