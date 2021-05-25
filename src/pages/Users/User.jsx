import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/cards/Card";
import Article from "../../components/articles/Article";
import Section from "../../components/Section";
import Report from "../../components/reports/Report";
import UserCard from "../../components/cards/UserCard";
import Quicknav from "../../components/QuickNav";
import {useQuery, gql} from '@apollo/client'

//importar json de usuario (DEV)
import userJSON from "../../helpers/UserSample";

const GET_ACTUAL_USER = gql`
  query{
    bye{
      _id,
      email,
      img,
      username,
      gender,
      Articles{
        _id,
        name,
        description,
        action_id
      },
      Reports{
        _id,
        title,
        description,
        ref_id    
      }
    }
  }
`

const useQueryURL = () => {
  return new URLSearchParams(useLocation().search);
};

const User = () => {
  const query = useQueryURL();  

  const [user, setUser] = useState({});
  const [articles, setArticles] = useState([]);
  const [reports, setReports] = useState([]);  

  useEffect(() => {
      setUser(userJSON.user);

      setArticles(userJSON.articles);

      setReports(userJSON.reports);

  }, []);  


  const {data, loading, error} = useQuery(GET_ARTICLES);
  if(data){
    console.table(data.getArticles);
  }  

  return (
    <>
      <Quicknav />
      <article className="conenedor_terciario_1">
        <div className="artículos_display">
          <Section>Datos del usuario</Section>
          {/* Datos generales del Usuario */}
          <UserCard user={user} />

          <Section>Contacto de {user.name}</Section>

          <Card title="Correo electronico">
            <p className="card-text">{user.mail}</p>
          </Card>

          <br />

          {/* [A] Si tiene artículos */}
          {(articles.length > 0) ? <Section>Artículos de {user.name}</Section> : null}
          {/* [A] Termina If */}

          {/* Ponemos todos los artículos del usuario */}
          {articles.map((art) =>{
              return(<Article data={art} user={user.name} />);
          })}          
          {/* */}

          {/* Sección de Reportes que solo los Admins tienen */}
          {/* [B] Si hay reportes */}
          {(reports.length > 0 ? <Section>Reportes de {user.name}</Section> : null)}
          {/* [B] Termina If */}
          {/* A partir de aqui van los reportes del Admin */}
          {/* Los reportes del usuario */}

          {reports.map((rep, index, arr) =>{
              return (<><Report report={rep} user={user.name}/>{(index < (arr.length-1)) ? <br/> : null}</>);
          })}
          {/* */}
        </div>
      </article>
    </>
  );
};

export default User;
