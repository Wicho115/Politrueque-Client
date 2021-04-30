import "./App.css";
import React, { useEffect, useState } from "react";
import {BrowserRouter as Router} from "react-router-dom";

import user from "./helpers/sample";

import userRoutes from './Routes/user.routes';
import adminRoutes from './Routes/admin.routes';
import anonRoutes from './Routes/anon.routes'

const App = () => {
  const [routes, setRoutes] = useState(null);

  useEffect(() => {
    switch (user.id) {
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
  }, []);

  return <Router>{routes}</Router>;
};

export default App;