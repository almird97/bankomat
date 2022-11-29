import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.js'; 
import 'popper.js/dist/popper.js';
import './css/stilovi.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Pocetna from './components/Pocetna';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Pocetna} />
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
