import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";

import CardContainer from "../../components/cards/CardContainer";
import SecondNav from "../../components/SecondNav";
import ArticleToVer from "../../components/articles/ArticleToVer";
import QuickNav from "../../components/QuickNav";
import ListPageEnd from "../../components/ListPageEnd";
import {gql, useQuery} from '@apollo/client'

//importar json de articulo (DEV)
//import articlesJSON from "../../helpers/ArticlesSample";

const GET_VERIFY_ARTICLES = gql`
    query{
    getNonVerifiedArticles{
        _id,
        name,
        description,
        img,
        category,
        Propietary{
        username
        }
    }
    }
`

const Articles = () => {

    let articles = [];

    const {data, loading, error} = useQuery(GET_VERIFY_ARTICLES);

    if(data){
        articles = data.getNonVerifiedArticles;
        console.log(data.getNonVerifiedArticles)
    }

    return (
        <>
            <QuickNav />
            <article className="conenedor_terciario_1">
                <SecondNav>
                    <a className="nav-link active" style={{ backgroundColor: 'rgb(128,0,64)', borderRadius: '7.5px' }} >Verificación de Artículos</a>
                </SecondNav>
                <CardContainer>
                    {/* Donde se imprime cada uno de los artículos */}

                    {articles.map((art) => {
                        return (<ArticleToVer
                            key={art._id}
                            to={`/article/verify?a=${art._id}`}
                            img={art.img}
                            alt={art.name}
                            name={art.name}
                            description={art.description}
                            propertary={art.Propietary.username}
                            category={art.category} />);
                    })}

                    {/* */}
                </CardContainer>
                <ListPageEnd to="/article/new" category="ver-artículo"/>
            </article>
        </>
    );

}

export default Articles;