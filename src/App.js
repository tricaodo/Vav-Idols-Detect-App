import React from 'react';
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import './App.css';
import _ from "lodash"
import Home from './Home';
import DetectIdol from './DetectIdol';
class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <nav className="navbar is-transparent is-fixed-top" role="navigation" aria-label="main navigation">
          <div className="container">
            <div id="navbarBurger" className="navbar-menu is-active">
              <div className="navbar-end">
                <Link to="/" className="navbar-item has-text-weight-medium">Home</Link>
                <Link to="/detect" className="navbar-item has-text-weight-medium">Detect Idol</Link>
              </div>
            </div>
          </div>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detect" component={DetectIdol} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
