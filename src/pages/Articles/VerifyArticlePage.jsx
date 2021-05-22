import React, { useEffect, useState } from "react";

import Card from "../../components/cards/Card";
import FormsContainer from "../../components/FormsContainer";
import Comment from "../../components/articles/Comment";
import Button from "../../components/Button";

import articleJSON from "../../helpers/NonVerArticleSample";

const VerifyArticlePage = () => {
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        setArticle(articleJSON);
        setComments(articleJSON.comments);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setArticle({ ...article, avaliable: false });
    };

    const handleChange = (e) => {
        console.log(e.target);
    };

    const handleArticle = () => {
        switch (article.action_id) {
            case 1:
                return (`Precio: $${article.price}`);
            case 2:
                return (`Intercambio por: ${article.exchange}`);
            case 3:
                return (`Donativo`);
            default:
                return (`???`);
        }
    }

    return (
        <article className="conenedor_terciario_1">
            <div className="artículos_display">
                <div className="card mb-3">

                    {article.avaliable ? null : (
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
                                <Button>
                                    Editar &nbsp; <i className="fa fa-file-image-o" />
                                </Button>
                                <p />
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
                        <Button refer="/article/verify/edit?art=">
                            Editar &nbsp; <i className="fa fa-pencil" />
                        </Button>&nbsp;&nbsp;&nbsp;
                        <Button refer="/article/delete?art=">
                            Eliminar &nbsp; <i className="fa fa-trash" />
                        </Button>&nbsp;&nbsp;&nbsp;
                    </div>

                    <ul
                        className="list-group list-group-flush"
                        style={{ marginTop: "0.5rem" }}
                    >
                        <li className="list-group-item">Propietario: {article.propietary}</li>
                        <li className="list-group-item"> {handleArticle()} </li>
                        <li className="list-group-item">Cantidad: {article.stock}</li>
                        <li className="list-group-item">Estado: {article.state ? "Nuevo" : "Usado"}</li>
                        <li className="list-group-item">Categoría: {article.category}</li>
                    </ul>
                </div>

                <div className="card mb-3">
                    <ul className="list-group list-group-flush" style={{ marginTop: "0.5rem" }}>
                        <li className="list-group-item">
                            <h5 className="card-title">Comentarios</h5>

                            <Card>
                                {comments.map((com) => {
                                    return (<Comment
                                        author={com.author}
                                        content={com.content}
                                        createdAt={com.createdAt} />);
                                })}
                            </Card>

                            <hr />

                            <p className="card-text">Agregar un Comentario</p>

                            <FormsContainer>
                                <div style={{ margin: "1rem" }}>
                                    <textarea type="text" name="usuario" className="form-control" id="exampleInputName" aria-describedby="emailHelp" rows={3} />
                                    <small id="emailHelp" className="form-text text-muted">Máximo 100 caracteres</small>
                                    <br />
                                    <div className="alinear-izquierda">
                                        <button className="btn btn-primary" style={{ backgroundColor: 'rgb(128,0, 64)', borderColor: 'rgb(128,0, 64)' }}>Comentar</button>
                                    </div>
                                </div>
                            </FormsContainer>

                        </li>
                    </ul>
                </div>

            </div>
        </article>
    );

};

export default VerifyArticlePage;
