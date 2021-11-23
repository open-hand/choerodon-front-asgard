import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useRouteMatch } from 'react-router';
import { ModalContainer } from 'choerodon-ui/pro';
import {
  asyncLocaleProvider, asyncRouter, nomatch, useCurrentLanguage,
} from '@choerodon/master';
import './index.less';

const taskDetail = asyncRouter(() => import('./routes/task-detail'));
const saga = asyncRouter(() => import('./routes/saga'));
const sagaInstance = asyncRouter(() => import('./routes/saga-instance'));
// saga 事务管理
const Index = () => {
  const language = useCurrentLanguage();
  const match = useRouteMatch();
  const IntlProviderAsync = asyncLocaleProvider(language, () => import(`./locale/${language}`));
  return (
    <IntlProviderAsync>
      <>
        <Switch>
          <Route path={`${match.url}/saga`} component={saga} />
          <Route path={`${match.url}/saga-instance`} component={sagaInstance} />
          <Route path={`${match.url}/task-detail`} component={taskDetail} />
          <Route path={`${match.url}/org-saga-instance`} component={sagaInstance} />
          <Route path={`${match.url}/project-saga-instance`} component={sagaInstance} />
          <Route path="*" component={nomatch} />
        </Switch>
        <ModalContainer />
      </>
    </IntlProviderAsync>
  );
};

export default Index;
