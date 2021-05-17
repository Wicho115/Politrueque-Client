import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import ReportBtn from "../../components/inputs/ReportBtn";

import ArticleJSON from "../../helpers/ArticleSample";

const ArticlePage = () => {
  const [article, setArticle] = useState({});

  useEffect(() => {
    setArticle(ArticleJSON);
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

          <ReportBtn refer="/report/new?t=a" />
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
          {/* [C] Botones que solo salen si el artículo es del usuario */}
          <div className="alinear-izquierda">
            <Button refer="/article/edit?art=">
              Editar &nbsp; <i className="fa fa-pencil" />
            </Button>
            &nbsp;&nbsp;
            <Button refer="/article/delete?art=">
              Eliminar &nbsp; <i className="fa fa-trash" />
            </Button>
            &nbsp;&nbsp;&nbsp;
          </div>
          {/* [C] Termina If */}
          <ul
            className="list-group list-group-flush"
            style={{ marginTop: "0.5rem" }}
          >
            <li className="list-group-item">Propietario: {article.propietary}</li>
            <li className="list-group-item">
              {handleArticle()}
            </li>
            <li className="list-group-item">Cantidad: {article.stock}</li>
            <li className="list-group-item">Estado: {article.state ? "Nuevo" : "Usado"}</li>
            <li className="list-group-item">Categoría: {article.category}</li>
          </ul>
          {/* [D] Si NO es el propietario */}
          <div className="card-body">
            <Button refer="/user?u=" fill={true}>
              Contactar al Propietario
            </Button>
          </div>
          {/* [D] ELSE es el propietario */}
          {/* [E] Si no está marcado (Disponible) */}
          {article.avaliable ? (<div className="card-body">
            <form onSubmit={handleSubmit}>
              <button
                className="btn btn-primary"
                style={{
                  backgroundColor: "rgb(128,0, 64)",
                  borderColor: "rgb(128,0, 64)",
                }}
              >
                Marcar como Vendido o Donado o Intercambio
              </button>
            </form>
          </div>) : null}

          {/* [E] Termina If */}
          {/* [D] Termina If */}
        </div>
      </div>
    </article>
  );
};

export default ArticlePage;
