import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter, Route, Switch, Link,
} from 'react-router-dom';
import Hook from './Hook';
import Classic from './Classic';
import DevTool from './DevTool';
import { store } from './store';

const DT = DevTool();
const root = document.getElementById('bd');
const Index = () => (
  <ul>
    <li>
      <Link to="/hook">
        hook模式
      </Link>
    </li>
    <li>
      <Link to="/classic">
        connect模式
      </Link>
    </li>
  </ul>
);
render(
  <BrowserRouter>
    <Switch>
      <Route path="/hook" exact component={Hook} />
      <Route path="/classic" exact component={Classic} />
      <Route path="*" component={Index} />
    </Switch>
    <DT store={store} />
  </BrowserRouter>, root,
);
