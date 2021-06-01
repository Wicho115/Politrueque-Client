import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import { useQuery, gql } from '@apollo/client';

import QuickNav from "../../components/QuickNav";
import CardContainer from "../../components/cards/CardContainer";
import SecondNav from "../../components/SecondNav";
import ListPageEnd from "../../components/ListPageEnd";
import ListPageBeg from "../../components/ListPageBeg";
import ArticlesDis from "../../components/articles/ArticlesDis";

const GET_ARTICLES = gql`
  query{
    getArticles( action_id: 1 ){
        _id,
        action_id,
        available,
        category,
        description,
        name,
        propietary{
        username
        }
    }
}
`

/*const GET_ARTICLES = gql`
  query getArticles($action_id: Int!){
    getArticles( action_id: $action_id ){
        _id,
        action_id,
        available,
        category,
        description,
        name,
        propietary{
        username
        }
    }
}
`*/

const useQueryURL = () => {
    return new URLSearchParams(useLocation().search);
};

const Articles = () => {
    const query = useQueryURL();
    const action_id = query.get('t');

    let articles = [];

    const { data, loading, error } = useQuery(GET_ARTICLES);
    //const { data, loading, error } = useQuery(GET_ARTICLES, { variables: { action_id } });
    if (data) {
        const articles_data = data.getArticles;
        console.log(articles_data);
        articles = articles_data;
    }

    switch (action_id) {
        case '1':
            return (
                <>
                    <QuickNav />
                    <article className="conenedor_terciario_1">
                        <SecondNav>
                            <Link className="nav-link active" to="/articles?t=sell" style={{ backgroundColor: 'rgb(128,0,64)', borderRadius: '7.5px' }}>Artículos en Venta</Link>
                            <Link className="nav-link" to="/articles?t=exchange">Artículos de Intercambio</Link>
                            <Link className="nav-link" to="/articles?t=donate">Artículos de Donativo</Link>
                        </SecondNav>
                        <CardContainer>
                            <ListPageBeg to="/article/new" category="Artículo" type="Venta" />
                            <br />
                            {/* Donde se imprime cada uno de los artículos */}

                            {(articles.length === 0) ?
                                <div className="error">
                                    <br />
                                    <h3 className="reintentar">
                                        Lo sentimos, No hay artículos disponibles por el momento, intenta recargar la página o vuelve más tarde.
                                    </h3>
                                    <br />
                                </div> : null}

                            {articles.map((art) => {
                                return (<ArticlesDis
                                    to="/article?a="
                                    img={art.img}
                                    alt={art.name}
                                    name={art.name}
                                    description={art.description}
                                    propertary={art.propietary.username}
                                    category={art.category} />);
                            })}

                            {/* */}
                            <br />
                            <ListPageEnd to="/article/new" category="artículo" />
                        </CardContainer>
                    </article>
                </>
            );
        case '2':
            return (
                <>
                    <QuickNav />
                    <article className="conenedor_terciario_1">
                        <SecondNav>
                            <Link className="nav-link" to="/articles?t=sell">Artículos en Venta</Link>
                            <Link className="nav-link active" to="/articles?t=exchange" style={{ backgroundColor: 'rgb(128,0,64)', borderRadius: '7.5px' }}>Artículos de Intercambio</Link>
                            <Link className="nav-link" to="/articles?t=donate">Artículos de Donativo</Link>
                        </SecondNav>
                        <CardContainer>
                            <ListPageBeg to="/article/new" category="Artículo" type="Intercambio" />
                            <br />
                            {/* Donde se imprime cada uno de los artículos */}

                            {(articles.length === 0) ?
                                <div className="error">
                                    <br />
                                    <h3 className="reintentar">
                                        Lo sentimos, No hay artículos disponibles por el momento, intenta recargar la página o vuelve más tarde.
                                    </h3>
                                    <br />
                                </div> : null}

                            {articles.map((art) => {
                                return (<ArticlesDis
                                    to="/article"
                                    img={art.img}
                                    alt={art.name}
                                    name={art.name}
                                    description={art.description}
                                    propertary={art.propietary.username}
                                    category={art.category} />);
                            })}

                            {/* */}
                            <br />
                            <ListPageEnd to="/article/new" category="artículo" />
                        </CardContainer>
                    </article>
                </>
            );
        case '3':
            return (
                <>
                    <QuickNav />
                    <article className="conenedor_terciario_1">
                        <SecondNav>
                            <Link className="nav-link" to="/articles?t=sell">Artículos en Venta</Link>
                            <Link className="nav-link" to="/articles?t=exchange">Artículos de Intercambio</Link>
                            <Link className="nav-link active" to="/articles?t=donate" style={{ backgroundColor: 'rgb(128,0,64)', borderRadius: '7.5px' }}>Artículos de Donativo</Link>
                        </SecondNav>
                        <CardContainer>
                            <ListPageBeg to="/article/new" category="Artículo" type="Donativo" />
                            <br />
                            {/* Donde se imprime cada uno de los artículos */}

                            {(articles.length === 0) ?
                                <div className="error">
                                    <br />
                                    <h3 className="reintentar">
                                        Lo sentimos, No hay artículos disponibles por el momento, intenta recargar la página o vuelve más tarde.
                                    </h3>
                                    <br />
                                </div> : null}

                            {articles.map((art) => {
                                return (<ArticlesDis
                                    to="/article"
                                    img={art.img}
                                    alt={art.name}
                                    name={art.name}
                                    description={art.description}
                                    propertary={art.propietary.username}
                                    category={art.category} />);
                            })}

                            {/* */}
                            <br />
                            <ListPageEnd to="/article/new" category="artículo" />
                        </CardContainer>
                    </article>
                </>
            );
        default:
            return (<Redirect to="articles?t=1" />);
    }

}

export default Articles;