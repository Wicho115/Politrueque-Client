import React from 'react';
import {Link} from 'react-router-dom';

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
          return ("Dibujo Técnico");
      case 6:
          return ("Programación");
      case 7:
          return ("Máquinas con Sistemas Automatizados");
      case 8:
          return ("Sistemas Digitales");
      default:
          return ("Otro");
  }
}

const Article = ({data, user, number}) =>{

    const {title, img, description, category, _id, available} = data;

    const handleLink = () =>{
      if(number == 1) return `/article?a=${_id}`
      if(number == 2) return `/article/verify?a=${_id}`
    }

    return(
        <Link to={handleLink()} className="enlace-artículo">
          <div className="card mb-3 enlace">
            <div className="row no-gutters">
              <div className="col-ml-4">
                <img
                  src={img}
                  className="card-img img-thumbnail img-artículo"
                  alt="#"
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{title}</h5>
                  <p className="card-text">{description}</p>
                  <p className="card-text">Propietario: {user}</p>
                  <p className="card-text">
                    <small className="text-muted">Categoría: {handleCategory(category)} </small>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
    );
}

export default Article;