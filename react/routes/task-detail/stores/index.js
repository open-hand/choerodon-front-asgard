/* eslint-disable no-shadow */
import React, { createContext, useMemo } from 'react';
import { DataSet } from 'choerodon-ui/pro';
import { inject } from 'mobx-react';
import { injectIntl } from 'react-intl';
import { useFormatCommon, useFormatMessage } from '@choerodon/master';
import SagaTaskDataSet from './TaskDataSet';

const Store = createContext();

export default Store;

export const StoreProvider = injectIntl(inject('AppState')(
  (props) => {
    const { AppState: { currentMenuType: { type, id, organizationId } }, intl, children } = props;

    const taskdetail = {
      type, id,
    };
    const intlPrefix = 'c7n.taskdetail';
    const intlPrefixNew = 'c7ncd.task-detail';
    const formatCommon = useFormatCommon();
    const formatClient = useFormatMessage(intlPrefixNew);

    const levelType = type === 'site' ? '' : `/${type}s/${id}`;
    const taskDataSet = useMemo(() => new DataSet(SagaTaskDataSet({
      id, intl, levelType, intlPrefix, formatClient,
    })), [id]);

    const value = {
      ...props,
      taskDataSet,
      taskdetail,
      prefixCls: 'c7n-saga',
      levelType,
      intlPrefix,
      organizationId,
      formatClient,
      formatCommon,
    };
    return (
      <Store.Provider value={value}>
        {children}
      </Store.Provider>
    );
  },
));
