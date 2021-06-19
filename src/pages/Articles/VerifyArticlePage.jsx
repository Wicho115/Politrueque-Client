import React, { useState } from "react";
import { useLocation, Link} from "react-router-dom";
import Card from "../../components/cards/Card";
import FormsContainer from "../../components/FormsContainer";
import Comment from "../../components/articles/Comment";
import Button from "../../components/Button";
import Loading from "../../components/Loading";

import { gql, useMutation, useQuery } from '@apollo/client'
import auth from "../../auth/auth";

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

const CREATE_COMMENT = gql`
mutation createComment($payload : CreateCommentInput!){
  createComment(payload : $payload){
    _id,
    content,
    author_id,
    content
  }
}`

const DELETE_COMMENT = gql`
mutation delete($id : String!){
  deleteComment(id : $id){
    _id,
    content
  }
}`

const VERIFY_ARTICLE = gql`
mutation verify($id : String!){
  confirmArticle(id : $id){
    _id
  }
}
`

const DELETE_ARTICLE = gql`
mutation deleteNVA($id : String!){
    deleteNVArticle(id :$id){
        _id 
    }
}
`

const useQueryURL = () => {
    return new URLSearchParams(useLocation().search);
};

const VerifyArticlePage = () => {
    const query = useQueryURL();
    const id = query.get('a');
    const [comment, setComment] = useState('')
    let article = {};
    let comments = [];

    const [createComment, { loading: mutationLoading }] = useMutation(CREATE_COMMENT, {
        onCompleted:
            () => console.log('se termino')
    });

    const [deleteComment, { loading: deleteLoading }] = useMutation(DELETE_COMMENT);
    const [verifyArticle] = useMutation(VERIFY_ARTICLE, {
        variables: { id },
        onCompleted: (data) => {  
            window.location.assign(`${window.location.origin}/article?a=${data.confirmArticle._id}`)    
        }
    })

    const [deleteArticle] = useMutation(DELETE_ARTICLE, {variables : {id}, 
        onCompleted : (data) =>{
        if(!auth.privileges) {            
            window.location.assign(`${window.location.origin}/articles?t=1`)
        }else{
            window.location.assign(`${window.location.origin}/articles/verify`)
        }
    }})

    const { data, loading, error } = useQuery(GET_NV_ARTICLE, { variables: { id } })

    if (loading) return (<Loading />);
    if (mutationLoading) return (<Loading />);
    if (deleteLoading) return (<Loading />);
    if (error) return <h1>{error.message}</h1>

    if (data) {
        article = data.getNVArticle;
        comments = data.getNVArticle.Comments;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (comment.length < 15) return;
        createComment({
            variables: {
                payload:
                    { content: comment, NVArticle_id: article._id }
            },
            refetchQueries: [{ query: GET_NV_ARTICLE, variables: { id } }],
            awaitRefetchQueries: false
        })

    };

    const handleDeleteArticle = () =>{
        deleteArticle();
    }

    const handleDelete = comment_id => {
        deleteComment({
            variables: { id: comment_id },
            refetchQueries: [{ query: GET_NV_ARTICLE, variables: { id } }],
            awaitRefetchQueries: false
        })
    };

    const handleVerify = e => {
        verifyArticle();
    }

    const handleChange = (e) => {

        setComment(e.target.value);
    };

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

    return (
        <article className="conenedor_terciario_1">
            <div className="artículos_display">
                <div className="card mb-3">

                    {article.available ? null : (
                        <div className="marcado">
                            <p>&nbsp; Lo sentimos, este artículo ya no está disponible.</p>
                        </div>
                    )}

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
                    <div className="alinear-izquierda">
                        {(auth.user._id != article.Propietary._id) ? null : <>
                            <Button refer={`/article/verify/edit?art=${article._id}`}>
                                Editar  <i className="fa fa-pencil" />
                            </Button>&nbsp;&nbsp;&nbsp;</>}
                        {(() => {
                            if (!auth.privileges?.canDeleteArticles) {
                                if ((auth.user._id != article.Propietary._id)) return null;
                            }
                            return <>
                            <button onClick={handleDeleteArticle} className="btn btn-primary" style={{ backgroundColor:"#FFFFFF", color:"#800040", borderColor:"#800040" }} > Eliminar <i className="fa fa-trash" /> </button>
                            &nbsp;&nbsp;&nbsp;
                            </>
                        })()}
                    </div>

                    <ul
                        className="list-group list-group-flush"
                        style={{ marginTop: "0.5rem" }}
                    >
                        <li className="list-group-item">Propietario: <Link to={`/user?u=${article.Propietary._id}`}>{article.Propietary.username}</Link></li>
                        <li className="list-group-item"> {handleArticle()} </li>
                        <li className="list-group-item">Cantidad: {article.stock}</li>
                        <li className="list-group-item">Estado: {article.state ? "Nuevo" : "Usado"}</li>
                        <li className="list-group-item">Categoría: {handleCategory(article.category)}</li>
                        {(!auth.privileges?.canAcceptArticles) ? null :
                            <li className="list-group-item"><button onClick={handleVerify} className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Verificar</button></li>}

                    </ul>
                </div>

                <div className="card mb-3">
                    <ul className="list-group list-group-flush" style={{ marginTop: "0.5rem" }}>
                        <li className="list-group-item">
                            <h5 className="card-title">Comentarios</h5>

                            <Card>
                                {(comments.length === 0) ?
                                    <div className="error">
                                        <h6 className="reintentar">
                                            No hay comentarios por el momento.
                                        </h6>
                                    </div> : null}

                                {comments.map((com) => {
                                    return (<Comment
                                        key={com._id}
                                        id={com._id}
                                        author={com.Author}
                                        content={com.content}
                                        Click={handleDelete} />);
                                })}
                            </Card>

                            {(!auth.privileges) ? null :<>
                            <hr />

                            <p className="card-text">Agregar un Comentario</p>

                            <FormsContainer>
                                <div style={{ margin: "1rem" }}>
                                    <textarea onChange={handleChange} type="text" name="usuario" className="form-control" id="exampleInputName" aria-describedby="emailHelp" rows={3} />
                                    <small id="emailHelp" className="form-text text-muted">Máximo 100 caracteres</small>
                                    <br />
                                    <div className="alinear-izquierda">
                                        <button onClick={handleSubmit} className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Comentar</button>
                                    </div>
                                </div>
                            </FormsContainer></>
                            }

                        </li>
                    </ul>
                </div>

            </div>
        </article>
    );

};

export default VerifyArticlePage;
