import { DataSet } from 'choerodon-ui/pro';

export default ({
  id = 0, levelType, intl, intlPrefix, formatClient,
}) => {
  const name = formatClient({ id: 'name' });
  const description = formatClient({ id: 'description' });
  const lastExecTime = formatClient({ id: 'lastExecutionTime' });
  const nextExecTime = formatClient({ id: 'nextExecutionTime' });
  const status = formatClient({ id: 'status' });

  const statusDataSet = new DataSet({
    data: [{
      value: 'ENABLE',
      meaning: intl.formatMessage({ id: 'enable' }),
    }, {
      value: 'DISABLE',
      meaning: intl.formatMessage({ id: 'disable' }),
    }, {
      value: 'FINISHED',
      meaning: intl.formatMessage({ id: 'finished' }),
    }],
  });

  return {
    autoQuery: true,
    selection: false,
    transport: {
      read: {
        url: `hagd/v1/schedules${levelType}/tasks`,
        method: 'get',
      },
    },
    fields: [
      { name: 'name', type: 'string', label: name },
      { name: 'description', type: 'string', label: description },
      { name: 'lastExecTime', type: 'string', label: lastExecTime },
      { name: 'nextExecTime', type: 'string', label: nextExecTime },
      { name: 'status', type: 'string', label: status },
    ],
    queryFields: [
      { name: 'name', type: 'string', label: name },
      { name: 'description', type: 'string', label: description },
      {
        name: 'status', type: 'string', label: status, options: statusDataSet,
      },
    ],
  };
};
