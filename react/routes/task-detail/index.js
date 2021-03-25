import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { asyncRouter, nomatch } from '@choerodon/boot';
import { PermissionRoute } from '@choerodon/master';

const index = asyncRouter(() => (import('./List')));

const Index = ({ match }) => (
  <Switch>
    <PermissionRoute
      exact
      path={match.url}
      component={index}
      service={(type) => (type === 'organization'
        ? ['choerodon.code.organization.manager.task.ps.default']
        : ['choerodon.code.site.manager.task-detail.ps.default'])}
    />
    <Route path="*" component={nomatch} />
  </Switch>
);

export default Index;
