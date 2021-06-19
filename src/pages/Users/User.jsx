import React, { useState, useEffect } from "react";
import { Redirect, useLocation } from "react-router-dom";
import Card from "../../components/cards/Card";
import Article from "../../components/articles/Article";
import Section from "../../components/Section";
import Report from "../../components/reports/Report";
import UserCard from "../../components/cards/UserCard";
import Quicknav from "../../components/QuickNav";
import { useQuery, gql } from '@apollo/client'
import auth from '../../auth/auth';
import Loading from "../../components/Loading";

const GET_USER = gql`
query getU($_id : String!){
  getUserByID(_id : $_id){
      _id,
      email,
      img,
      username,
      gender,
      Articles{
        _id,
        name,
        img,
        description,
        action_id,
        category
      },
      Reports{
        _id,
        title,
        description,
        ref_id    
      },
     	NonAvailableArticles{
        _id,
        name,
        description,
        action_id,
        img,
        category
      },
      NVArticles{
        _id,
        name,
        description,
        action_id,
        img,
        category
      }
    }
}
`
const useQueryURL = () => {
  return new URLSearchParams(useLocation().search);
};

const User = () => {
  const query = useQueryURL();
  let _id = query.get('u');

  let user = {};
  let articles = [];
  let reports = [];
  let NAarticles = [];
  let NVArticles = [];

  if (!_id) _id = auth.user._id
  const { data, loading, error } = useQuery(GET_USER, { variables: { _id } })

  if (loading) return (<Loading />);

  if (error) return (<Redirect to="/error" />)

  if (!data) {
    return <h1>No hay</h1>
  }

  const user_data = data.getUserByID;
  articles = user_data.Articles;
  reports = user_data.Reports;
  NAarticles = user_data.NonAvailableArticles;
  NVArticles = user_data.NVArticles;
  user = { ...user_data, Reports: null, Articles: null, NonAvailableArticles: null };
  console.log(articles);

  return (
    <>
      <Quicknav />
      <article className="conenedor_terciario_1">
        <div className="artículos_display">
          <Section>Datos del usuario</Section>
          <UserCard user={user} articles={articles.length}/>

          <Section>Contacto de {user.username}</Section>

          <Card title="Correo electronico">
            <p className="card-text">{user.email}</p>
          </Card>

          <br />
          {(articles.length > 0) ? <Section>Artículos de {user.username}</Section> : null}

          {articles.map((art) => {
            return (<Article key={art._id} data={art} user={user.username} number={1} />);
          })}

          {((reports.length > 0 && auth.privileges) ? <Section>Reportes de {user.username}</Section> : null)}

          {reports.map((rep, index, arr) => {
            if (auth.privileges) return (<><Report key={rep._id} report={rep} user={user.username} /><br/></>);
          })}
          <br />

          {(NAarticles.length > 0) ? <Section>Artículos Vendidos de {user.username}</Section> : null}

          {NAarticles.map((art) => {
            return (<Article key={art._id} data={art} user={user.username} number={1}/>)
          })}

          <br />

          {(NVArticles.length > 0 && (auth.user._id == user._id)) ? <Section>Artículos no verificados de {user.username}</Section> : null}

          {NVArticles.map((art) => {
            if((auth.user._id == user._id))
            return (<Article key={art._id} data={art} user={user.username} number={2}/>)
          })}
        </div>
      </article>
    </>
  );
};

export default User;
