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

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Articles = () => {
    const query = useQuery();
    const type = query.get('t');

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        setArticles(articlesJSON);
    }, []);

    switch (type) {
        case 'sell':
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
                            <br />
                            <ListPageEnd to="/article/new" category="artículo"/>
                        </CardContainer>
                    </article>
                </>
            );
        case 'exchange':
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
                            <br />
                            <ListPageEnd to="/article/new" category="artículo"/>
                        </CardContainer>
                    </article>
                </>
            );
        case 'donate':
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
                            <br />
                            <ListPageEnd to="/article/new" category="artículo"/>
                        </CardContainer>
                    </article>
                </>
            );
        default:
            return (<Redirect to="articles?t=sell"/>);
    }

}

export default Articles;