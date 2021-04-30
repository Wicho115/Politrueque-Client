import React from "react";
import { Route, Switch } from "react-router-dom";
import Container from "../components/Container";
import Principal from "../pages/Principal";
import NotFound from "../pages/NotFound";
import About from "../pages/Index/About";
import TermANDCond from "../pages/Index/term&cond";
import User from "../pages/Users/User";
import ArticlePage from "../pages/Articles/ArticlePage";

const userRoutes = (
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

    <Route exact strict path="/user">
      <Container>
        <User />
      </Container>
    </Route>

    <Route exact strict path="/article">
      <Container>
        <ArticlePage />
      </Container>
    </Route>

    <Route>
      <Container>
        <NotFound />
      </Container>
    </Route>
  </Switch>
);

export default userRoutes;
