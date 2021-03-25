import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { asyncRouter, nomatch } from '@choerodon/boot';
import { PermissionRoute } from '@choerodon/master';

const index = asyncRouter(() => import('./Saga'));

const Index = ({ match }) => (
  <Switch>
    <PermissionRoute
      exact
      path={match.url}
      component={index}
      service={['choerodon.code.site.manager.saga-manager.saga.ps.default']}
    />
    <Route path="*" component={nomatch} />
  </Switch>
);

export default Index;
