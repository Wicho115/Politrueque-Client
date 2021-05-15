import React from "react";
import { Route, Switch } from 'react-router-dom';
import Container from '../components/Container';
import Principal from '../pages/Principal';
import NotFound from '../pages/NotFound';
import About from '../pages/Index/About';
import TermANDCond from '../pages/Index/term&cond';
import LogIn from "../pages/Index/Login";
import AdminLogIn from "../pages/Index/AdminLogin";

const anonRoutes = (
  <Switch>
    <Route exact path="/">
      <Container>
        <Principal />
      </Container>
    </Route>

    <Route exact strict path="/about">
      <Container>
        <About />
      </Container>
    </Route>

    <Route exact strict path="/terms">
      <Container>
        <TermANDCond />
      </Container>
    </Route>

    {/* Rutas por Revisar */}

    <Route exact strict path="/login">
      <Container>
        <LogIn />
      </Container>
    </Route>

    <Route exact strict path="/adminlogin">
      <Container>
        <AdminLogIn />
      </Container>
    </Route>

    <Route>
      <Container>
        <NotFound />
      </Container>
    </Route>
  </Switch>
);

export default anonRoutes;
