import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/cards/Card";
import Section from "../../components/Section";
import Quicknav from "../../components/QuickNav";
import FileInput from "../../components/inputs/FileInput";
import Button from '../../components/Button'

//importar json de usuario (DEV)
import userJSON from "../../helpers/UserSample";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const EditProfile = () => {

  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(userJSON.user);

  }, []);

  return (
    <>
      <Quicknav />
      <article className="conenedor_terciario_1">
        <div className="artículos_display">
          <Section>Modificando datos de {user.name}</Section>

          <Card title="Imágen de Perfil">
            <div className="centrar">
              <FileInput instuctions="Seleccione una imágen de perfil" defaultImg={user.img} imgFormat="profile" />
            </div>
            <div className="centrar">
            <Button refer="/user" fill={true} >
              Guardar Cambios &nbsp; <i className="fa fa-floppy-o" />
            </Button>
            </div>            
          </Card>

        </div>
      </article>
    </>
  );
};

export default EditProfile;