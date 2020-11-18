export default ({ id = 0, type }) => {
  function getQueryUrl() {
    switch (type) {
      case 'site':
        return '/iam/choerodon/v1/site/enableUsers';
      default:
        return `/iam/choerodon/v1/organizations/${id}/enableUsers`;
    }
  }
  return {
    autoQuery: false,
    selection: 'single',
    paging: false,
    transport: {
      read: ({ data }) => ({
        url: getQueryUrl(),
        method: 'get',
        params: {
          user_name: '',
          exact_match_flag: true,
        },
      }),
    },
    fields: [
      { name: 'realName', type: 'string' },
      { name: 'loginName', type: 'string' },
      { name: 'id', type: 'string', unique: true },
    ],
  };
};
