import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore'
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import App from './layouts/app';
import history from './history';
const store = configureStore()
window.localStorage.setItem('lang',  'nl_BE');
window.localStorage.setItem('label',  'Nl');
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
