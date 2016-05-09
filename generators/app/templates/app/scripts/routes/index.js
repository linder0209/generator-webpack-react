import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from '../containers/App';
import HomePage from '../containers/HomePage';
import AboutPage from '../containers/AboutPage';
import ExamplePage from '../containers/ExamplePage';
import FilmPage from '../containers/FilmPage';
import PersonPage from '../containers/PersonPage';
import PersonList from '../components/example/person/PersonList';
import PersonForm from '../components/example/person/PersonForm';
import LoadingPage from '../containers/LoadingPage';

// 注意嵌套路由应该是相对路径，不能写成据对路径
export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage}
                onEnter={enter()} onLeave={leave()}/>
    <Route path="about" component={AboutPage}/>
    <Route path="example" component={ExamplePage}>
      <IndexRoute component={FilmPage} />
      <Route path="person" component={PersonPage}>
        <IndexRoute component={PersonList}/>
        <Route path="create" component={PersonForm}/>
      </Route>
      <Route path="loading" component={LoadingPage}/>
    </Route>
  </Route>
);

//进入
function enter() {
  console.debug('进入');
}

//离开
function leave() {
  console.debug('离开');
}
