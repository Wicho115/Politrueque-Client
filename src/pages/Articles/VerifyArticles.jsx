import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";

import QuickNav from "../../components/QuickNav";
import CardContainer from "../../components/cards/CardContainer";
import SecondNav from "../../components/SecondNav";
import ListPageEnd from "../../components/ListPageEnd";
import ListPageBeg from "../../components/ListPageBeg";
import ArticlesDis from "../../components/articles/ArticlesDis";

//importar json de articulo (DEV)
import articlesJSON from "../../helpers/ArticlesSample";

const Articles = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        setArticles(articlesJSON);
    }, []);

    return (
        <>
            <article className="conenedor_terciario_1">
                <SecondNav>
                    <a className="nav-link">Verificación de Artículos</a>
                </SecondNav>
                <CardContainer>
                    {/* Donde se imprime cada uno de los artículos */}

                    {articles.map((art) => {
                        return (<ArticlesDis
                            to="/article"
                            img={art.img}
                            alt={art.name}
                            name={art.name}
                            description={art.description}
                            propertary={art.propietary}
                            category={art.category} />);
                    })}

                    {/* */}
                </CardContainer>
            </article>
        </>
    );

}

export default Articles;