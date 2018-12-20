import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from "react-router";
import { ConnectedRouter } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import store from './store';

import Todos from './components/todos';
import './style.scss';

const history = createHistory();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Todos} />
      </div>
    </ConnectedRouter>
  </Provider>, document.getElementById('app')
);