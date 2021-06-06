import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { gql, useMutation, useQuery } from '@apollo/client';

import Button from "../../components/Button";
import ReportBtn from "../../components/inputs/ReportBtn";
import Loading from "../../components/Loading";

import auth from '../../auth/auth'

//import ArticleJSON from "../../helpers/ArticleSample";

const GET_ARTICLE = gql`
    query getArticle($id : String!){
      getArticle(id : $id){
            _id,
            action_id,
            available,
            category,
            description,
            exchange_product,     
            img
            name,
            price,
            propietary{
                _id,
                username 
            },
            state,
            stock        
        }
    }

`

const DELETE_ARTICLE = gql`
mutation deleteArticle($id : String!){
  deleteArticle(id : $id){
    action_id
  }
}`

const SELL_ARTICLE =   gql`
mutation g($id : String!){
  sellArticle(id : $id){
    _id
  }
}`

const useQueryURL = () => {
  return new URLSearchParams(useLocation().search);
};

const ArticlePage = () => {

  const [user, setUser] = useState(null)
  const [privileges, setPrivileges] = useState(null);

  useEffect(() => {
    setUser(auth.user);
    setPrivileges(auth.privileges);
  }, [])

  const query = useQueryURL();
  const article_id = query.get('a');

  let article = {};

  const { data, loading, error } = useQuery(GET_ARTICLE, { variables: { id: article_id } })
  const [deleteArticle, { loading: Mloading }] = useMutation(DELETE_ARTICLE, {
    onCompleted: (data) => {
      window.location.assign(`${window.location.origin}/articles?t=${data.deleteArticle.action_id}`)
    }, onError: (err) => console.error(err.message)
  })
  const [sellArticle, {loading : Mloagin2}] = useMutation(SELL_ARTICLE, {onCompleted : (data) =>{
    window.location.reload();
  }})

  if (loading) return (<Loading />);
  if (error) return <h1>{error.message}</h1>
  if (data) {
    const article_data = data.getArticle;    
    article = article_data;
  }

  const Sell = e =>{
    sellArticle({variables : {id : article_id}})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //setArticle({ ...article, avaliable: false });
  };

  const handleCategory = (category) => {
    switch (category) {
      case 1:
        return ("Matemáticas");
      case 2:
        return ("Química");
      case 3:
        return ("Física");
      case 4:
        return ("Inglés");
      case 5:
        return ("Historia");
      case 6:
        return ("Filosofía");
      case 7:
        return ("Dibujo Técnico");
      case 8:
        return ("Programación");
      case 9:
        return ("Máquinas con Sistemas Automatizados");
      case 10:
        return ("Sistemas Digitales");
      default:
        return ("Otro");
    }
  }



  const handleArticle = () => {
    switch (article.action_id) {
      case 1:
        return (`Precio: $${article.price}`);
      case 2:
        return (`Intercambio por: ${article.exchange_product}`);
      case 3:
        return (`Donativo`);
      default:
        return (`???`);
    }
  }

  const handleMark = () => {
    switch (article.action_id) {
      case 1:
        return ("Vendido");
      case 2:
        return ("Intercambiado");
      case 3:
        return ("Donado");
      default:
        return (`???`);
    }
  }

  return (
    <article className="conenedor_terciario_1">
      <div className="artículos_display">
        <div className="card mb-3">

          {(article.available) ? null : (
            <div className="marcado">
              <p>&nbsp; Lo sentimos, este artículo ya no está disponible.</p>
            </div>
          )}
          {(!privileges?.canReportArticles) ? null : <ReportBtn refer={`/report/new?t=a&id=${article._id}`} />}

          <div className="row no-gutters" style={{ margin: "0.5rem" }}>
            <div className="col-ml-4">
              <img src={article.img} className="card-img img-artículo-display" alt={article.description} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">
                  Nombre de artículo: {article.name}
                </h5>
                <p className="card-text">
                  Descripción: {article.description}
                </p>
              </div>
            </div>
          </div>
          {(user?._id !== article.propietary._id) ? null : <div className="alinear-izquierda">
            {(() =>{
              if(article.available) return<> <Button refer={`/article/edit?art=${article._id}`}>
              Editar &nbsp; <i className="fa fa-pencil" />
            </Button>&nbsp;&nbsp;&nbsp;</>
            })()}
           <button className="btn btn-primary" style={{ backgroundColor:"#FFFFFF", color:"#800040", borderColor:"#800040" }}
              onClick={(e) => deleteArticle({ variables: {id : article._id} })}>
              Eliminar &nbsp; <i className="fa fa-trash" />
            </button>&nbsp;&nbsp;&nbsp;
          </div>}
          <ul
            className="list-group list-group-flush"
            style={{ marginTop: "0.5rem" }}
          >
            <li className="list-group-item">Propietario: {article.propietary.username}</li>
            <li className="list-group-item">
              {handleArticle()}
            </li>
            <li className="list-group-item">Cantidad: {article.stock}</li>
            <li className="list-group-item">Estado: {article.state ? "Nuevo" : "Usado"}</li>
            <li className="list-group-item">Categoría: {handleCategory(article.category)}</li>
          </ul>
          {(user?._id != article.propietary._id) ? <>
            <div className="card-body">
              <Button refer={`/user?u=${article.propietary._id}`} fill={true}>
                Contactar al Propietario
            </Button>
            </div>
          </> : <>
            {(() => {
              if (article.available)
                return (<div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <button
                    onClick={Sell}
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "rgb(128,0, 64)",
                        borderColor: "rgb(128,0, 64)",
                      }}
                    >
                      Marcar como {handleMark()}
                    </button>
                  </form>
                </div>)
            })()}
          </>
          }
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;
