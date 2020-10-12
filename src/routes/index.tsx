import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import MapOrphanages from '../pages/Map';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/map" component={MapOrphanages} />
    </Switch>
  );
};

export default Routes;
