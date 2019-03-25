import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import App from './App/index';
import DevTool from './DevTool';
import { store } from './store';

const DT = DevTool();
const root = document.getElementById('bd');
const Test = () => (
  <div>
    路由跳转
  </div>
);
render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/test" exact component={Test} />
    </Switch>
    <DT store={store} />
  </BrowserRouter>, root,
);
