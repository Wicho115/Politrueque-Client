import React from "react";
import { Route, Switch } from "react-router-dom";
import Container from "../components/Container";
import Principal from "../pages/Principal";
import NotFound from "../pages/NotFound";
import About from "../pages/Index/About";
import TermANDCond from "../pages/Index/term&cond";
import User from "../pages/Users/User";
import ArticlePage from "../pages/Articles/ArticlePage";
import ArticlesPage from "../pages/Articles/Articles";
import CreateArticle from "../pages/Articles/CreateArticle";
import EditNonVerArticle from "../pages/Articles/EditNonVerArticle";
import EditPublishedArticle from "../pages/Articles/EditPublishedArticle";
import LogIn from "../pages/Index/Login";
import AccountRequest from "../pages/Index/AccountRequest";
import EditProfile from "../pages/Users/EditProfile";
import Support from "../pages/Index/Support";

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

    {/* Rutas por Revisar */}

    <Route exact strict path="/help">
      <Container>
        <Support />
      </Container>
    </Route>

    <Route exact strict path="/user/edit">
      <Container>
        <EditProfile />
      </Container>
    </Route>

    <Route exact strict path="/articles">
      <Container>
        <ArticlesPage />
      </Container>
    </Route>

    <Route exact strict path="/article/new">
      <Container>
        <CreateArticle />        
      </Container>
    </Route>

    <Route exact strict path="/article/edit">
      <Container>
        <EditPublishedArticle />        
      </Container>
    </Route>

    <Route exact strict path="/article/verify/edit">
      <Container>
        <EditNonVerArticle />        
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

    <Route>
      <Container>
        <NotFound />
      </Container>
    </Route>
  </Switch>
);

export default userRoutes;
