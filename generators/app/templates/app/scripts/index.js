import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './containers/App';
import configStore from './store/configStore';
<% if (includeBootstrap) { %>
import 'bootstrap/dist/css/bootstrap.css';
<% } %>
const store = new configStore();

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('layout'));
