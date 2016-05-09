import React from 'react';
import {render} from 'react-dom';
import {useRouterHistory} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import {syncHistoryWithStore} from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import promise from 'es6-promise';
import Root from './containers/Root';
import configureStore from './store';
<% if (bootstrap) { %>import 'bootstrap/dist/css/bootstrap.css';<% } %>
import '../styles/main.css';

// Promise 兼容性处理
promise.polyfill();

// 初始化 tapEvent 事件, 移动端
injectTapEventPlugin();

// 去掉地址栏中的默认 queryKey
const hashHistory = useRouterHistory(createHashHistory)({
  queryKey: false
});

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Root store={store} history={history}/>,
  document.getElementById('layout')
);
