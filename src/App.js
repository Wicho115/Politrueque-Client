import "./App.css";
import React, { useEffect, useState } from "react";
import {BrowserRouter as Router} from "react-router-dom";


import userRoutes from './Routes/user.routes';
import adminRoutes from './Routes/admin.routes';
import anonRoutes from './Routes/anon.routes'
import Auth from "./auth/auth";

const App = () => {
  const [routes, setRoutes] = useState(null);

  useEffect(() => {
    console.log('Primer useEffect');
    const token = localStorage.getItem('token');
    if(token === undefined) localStorage.removeItem('token');
    Auth.validate().then((id) =>{   
      console.log(`Este es el id ${id}`);   
      switch (id) {
        case 1:
          setRoutes(userRoutes);
          break;
        case 2:
          setRoutes(adminRoutes);
          break;
        default:
          setRoutes(anonRoutes);
          break;
      }
    });
    
  }, []);

  return <Router>{routes}</Router>;
};

export default App;