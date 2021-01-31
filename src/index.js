import React from 'react';
import ReactDOM from 'react-dom';
import Channel from './Components/Channel/Channel';

import {BrowserRouter,Route, Switch} from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/Channel" component={Channel} />

    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);


