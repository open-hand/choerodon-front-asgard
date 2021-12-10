import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { asyncRouter, nomatch } from '@choerodon/boot';
import { PermissionRoute } from '@choerodon/master';

const SagaInstance = asyncRouter(() => import('./SagaInstance'));

const service = {
  site: ['choerodon.code.site.manager.saga-manager.saga-instance.ps.default'],
  organization: ['choerodon.code.organization.manager.saga-instance.ps.default'],
  project: ['choerodon.code.project.operation.saga-instance.ps.default'],
};

const Index = ({ match }) => (
  <Switch>
    <PermissionRoute
      exact
      path={match.url}
      component={SagaInstance}
      service={(type) => service[type] || ['choerodon.code.site.manager.saga-manager.saga-instance.ps.default']}
    />
    <Route path="*" component={nomatch} />
  </Switch>
);

export default Index;
