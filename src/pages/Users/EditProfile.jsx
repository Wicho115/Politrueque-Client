import React, { useState } from "react";
import Card from "../../components/cards/Card";
import Section from "../../components/Section";
import Quicknav from "../../components/QuickNav";
import FileInput from "../../components/inputs/FileInput";
import Button from '../../components/Button'

import { gql, useMutation, useQuery } from '@apollo/client';

import FEMALE from '../../img/DefaultFE.png';
import MASCULINE from '../../img/DefaultMA.png'

//importar json de usuario (DEV)
import userJSON from "../../helpers/UserSample";

const GET_ACTUAL_USER = gql`
query{
  bye{
    img,
    _id,
    username,
    gender
  }
}
`

const UPLOAD_PFP = gql`
mutation uploadPFP($payload : UpdateUserInput!){
  updateUser(payload : $payload){
    _id
  }
}
`

const EditProfile = () => {

  const [user, setUser] = useState({});
  const [img, setImg] = useState(null);

  const handelSub = e => {
    const payload = { img, _id: user._id }
    console.log(payload);
    updatePFP({ variables: { payload } })
  }

  const handleImage = () => {
    if (!user.img) {
      if (user.gender == "M") return FEMALE;
      return MASCULINE;
    }
    return user.img
  }

  const { loading, error } = useQuery(GET_ACTUAL_USER, { onCompleted: (data) => setUser(data.bye) })
  const [updatePFP, { loading: loadingMutation, error: errorMutation }] = useMutation(UPLOAD_PFP,
    {
      onCompleted: (data) => {
        window.location.assign(`${window.location.origin}/user`)
      }, 
      onError : (err) =>{
        console.log(err.message);
      }
    })

  if (loadingMutation) return <h1>Loading...</h1>
  if (loading) return <h1>Loading...</h1>
  if (error) return <h1>{error.message}</h1>

  return (
    <>
      <Quicknav />
      <article className="conenedor_terciario_1">
        <div className="artículos_display">
          <Section>Modificando datos de {user.username}</Section>

          <Card title="Imágen de Perfil">
            <div className="centrar">
              <FileInput instuctions="Seleccione una imágen de perfil" defaultImg={handleImage()} imgFormat="profile" upperChange={(files) => setImg(files[0])} />
            </div>
            <div className="centrar">
              <button onClick={handelSub}>GUARDAR CAMBIOS <i className="fa fa-floppy-o" /></button>
            </div>
          </Card>

        </div>
      </article>
    </>
  );
};

export default EditProfile;