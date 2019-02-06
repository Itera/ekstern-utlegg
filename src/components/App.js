import React from "react";
import Helmet from "react-helmet";
import { Container, Row, Col } from "reactstrap";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from "react-router-dom";

import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";

import { Provider } from "react-redux";

import Home from "./Home";
import Personalia from "./Personalia";
import Rows from "./Rows";
import Report from "./Report";

import reducers from "../reducers";

import "../styles/app.css";

const store = createStore(reducers, devToolsEnhancer());

const App = () => {
  return (
    <Provider store={store}>
      <Helmet>
        <title>Itera - extern utlegg</title>
      </Helmet>

      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/start" component={Personalia} />
          <Route path="/rows" component={Rows} />
          <Route path="/done" component={Report} />

          <footer className="footer">
            <Container>
              <Row>
                <Col className="col-sm-2">
                  <Link to="/">Forklaring</Link>
                </Col>
                <Col className="col-sm-2">
                  <NavLink activeClassName="active" to="/start">
                    Mine detaljer
                  </NavLink>
                </Col>
                <Col className="col-sm-2">
                  <NavLink activeClassName="active" to="/rows">
                    Utlegg
                  </NavLink>
                </Col>
                <Col className="col-sm-2">
                  <NavLink activeClassName="active" to="/done">
                    Ferdig
                  </NavLink>
                </Col>
                <Col className="col-sm-4">
                  <a
                    className="float-right"
                    href="https://github.com/Itera/ekstern-utlegg"
                  >
                    Kildekode på github
                  </a>
                </Col>
              </Row>
            </Container>
          </footer>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
