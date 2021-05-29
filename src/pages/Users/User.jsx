import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/cards/Card";
import Article from "../../components/articles/Article";
import Section from "../../components/Section";
import Report from "../../components/reports/Report";
import UserCard from "../../components/cards/UserCard";
import Quicknav from "../../components/QuickNav";
import {useQuery, gql} from '@apollo/client'


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
        action_id,
        category
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

  let user = {};
  let articles = [];
  let reports = [];


  const {data, loading, error} = useQuery(GET_ACTUAL_USER);
  if(data){
    const user_data = data.bye;
    articles = user_data.Articles;    
    reports = user_data.Reports;    
    user = {...user_data, Reports : null, Articles : null};    
    console.log(articles);
  }  

  return (
    <>
      <Quicknav />
      <article className="conenedor_terciario_1">
        <div className="artículos_display">
          <Section>Datos del usuario</Section>
          {/* Datos generales del Usuario */}
          <UserCard user={user} />

          <Section>Contacto de {user.username}</Section>

          <Card title="Correo electronico">
            <p className="card-text">{user.email}</p>
          </Card>

          <br />

          {/* [A] Si tiene artículos */}
          {(articles.length > 0) ? <Section>Artículos de {user.username}</Section> : null}
          {/* [A] Termina If */}

          {/* Ponemos todos los artículos del usuario */}
          {articles.map((art) =>{
              return(<Article data={art} user={user.username} />);
          })}          
          {/* */}

          {/* Sección de Reportes que solo los Admins tienen */}
          {/* [B] Si hay reportes */}
          {(reports.length > 0 ? <Section>Reportes de {user.username}</Section> : null)}
          {/* [B] Termina If */}
          {/* A partir de aqui van los reportes del Admin */}
          {/* Los reportes del usuario */}

          {reports.map((rep, index, arr) =>{
              return (<><Report report={rep} user={user.username}/>{(index < (arr.length-1)) ? <br/> : null}</>);
          })}
          {/* */}
        </div>
      </article>
    </>
  );
};

export default User;
