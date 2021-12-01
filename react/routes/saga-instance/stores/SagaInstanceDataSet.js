import { DataSet } from 'choerodon-ui/pro';

export default ({
  id = 0, apiGetway, intl, intlPrefix,
}) => {
  const sagaCode = intl.formatMessage({ id: `${intlPrefix}.saga.instance` });
  const searchId = intl.formatMessage({ id: `${intlPrefix}.searchId` });
  const status = intl.formatMessage({ id: `${intlPrefix}.status` });
  const startTime = intl.formatMessage({ id: `${intlPrefix}.start.time` });
  const refType = intl.formatMessage({ id: `${intlPrefix}.reftype` });
  const refId = intl.formatMessage({ id: `${intlPrefix}.refid` });
  const progress = intl.formatMessage({ id: `${intlPrefix}.progress` });
  const statusDataSet = new DataSet({
    data: [{
      value: 'RUNNING',
      meaning: intl.formatMessage({ id: 'boot.running' }),
    }, {
      value: 'FAILED',
      meaning: intl.formatMessage({ id: 'boot.failed' }),
    }, {
      // value: 'COMPLETED' || 'NON_CONSUMER',
      value: 'COMPLETED',
      meaning: intl.formatMessage({ id: 'boot.complete' }),
    }],
  });

  return {
    autoQuery: false,
    selection: false,
    transport: {
      read: {
        url: `${apiGetway}instances`,
        method: 'get',
      },
    },
    fields: [
      { name: 'searchId', label: searchId },
      { name: 'sagaCode', type: 'string', label: sagaCode },
      { name: 'status', type: 'string', label: status },
      { name: 'startTime', type: 'string', label: startTime },
      { name: 'refType', type: 'string', label: refType },
      { name: 'refId', type: 'string', label: refId },
      { name: 'progress', type: 'string', label: progress },
    ],
    queryFields: [
      { name: 'searchId', label: searchId },
      { name: 'sagaCode', type: 'string', label: sagaCode },
      {
        name: 'status', type: 'string', label: status, options: statusDataSet,
      },
      { name: 'refType', type: 'string', label: refType },
      { name: 'refId', type: 'string', label: refId },
    ],
  };
};
