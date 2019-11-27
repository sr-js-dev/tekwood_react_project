import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore'
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import App from './layouts/app';
import history from './history';
import './assets/css/style.min.css';
import './assets/css/bootstrap.min.css';
import './assets/css/style.app.css';
import { getAuth } from './components/auth';
const isAuthenticated = getAuth(); 
const store = configureStore()
if(!isAuthenticated){
  window.localStorage.setItem('tekwoods_lang',  'nl_BE');
  window.localStorage.setItem('tekwoods_label',  'NL');
}
window.React = React
ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route path="/" component={App} />
      </Switch>
      </Router>
    </Provider>,
  document.getElementById('app')
)
