import React from 'react';
import './App.css';
import {Navigation} from "./components/drawer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from '@material-ui/core/Container';
import {Callback} from "./components/callback";
import {SilentCallback} from "./components/silentRenew";

const App:React.FC = () => {
    return (
      <Container>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Navigation} />
              <Route exact path="/callback" component={Callback} />
              <Route exact path="/silent" component={SilentCallback} />
            </Switch>
          </div>
        </Router>
      </Container>
  );
}

export default App;
