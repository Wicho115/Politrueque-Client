import React from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import Container from '../components/Container';
import Principal from '../pages/Principal';
import NotFound from '../pages/NotFound';
import About from '../pages/Index/About';
import TermANDCond from '../pages/Index/term&cond';
import LogIn from "../pages/Index/Login";
import AccountRequest from "../pages/Index/AccountRequest";
import Support from "../pages/Index/Support";
import Logout from '../pages/Index/Logout'

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

    <Route exact strict path="/help">
      <Container>
        <Support />
      </Container>
    </Route>

    <Route exact strict path="/login">
      <Container>
        <LogIn />
      </Container>
    </Route>

    <Route exact strict path="/accountrequest">
      <Container>
        <AccountRequest />
      </Container>
    </Route>

    <Route exact strict path="/logout">
      <Container>
         <Redirect to="/login"/>
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
