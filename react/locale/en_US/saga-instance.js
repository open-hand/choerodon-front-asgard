const docServer = 'http://v0-14.choerodon.io/zh/docs';

// 事务实例

const SAGA_INSTANCE = {
  'c7ncd.saga-instance.title': 'Transaction Instance',
  'c7ncd.saga-instance.description': '事务实例属于事务定义，您可以查看事务实例的运行情况并查看事务实例中每个任务的运行情况。',
  'c7ncd.saga-instance.link': `${docServer}/user-guide/microservice-development/global-transaction/saga-instance/`,

  'c7ncd.saga-instance.detail.title': '查看事务实例"{name}"的详情',
  'c7ncd.saga-instance.detail.description': '您可以在此查看事务实例所包含任务的信息。',
  'c7ncd.saga-instance.detail.link': `${docServer}/user-guide/microservice-development/global-transaction/saga-instance/`,

  'c7ncd.saga-instance.searchId': 'Number',
  'c7ncd.saga-instance.header.title': 'Transaction Instance',
  'c7ncd.saga-instance.detail': 'Transaction Instance Details',
  'c7ncd.saga-instance.view': 'Check Transaction Instance',
  'c7ncd.saga-instance.instance': 'Transaction',
  'c7ncd.saga-instance.task': 'Task',
  'c7ncd.saga-instance.id': 'ID',
  'c7ncd.saga-instance.status': 'Status',
  'c7ncd.saga-instance.start.time': 'Start Time',
  'c7ncd.saga-instance.end.time': 'End Time',
  'c7ncd.saga-instance.saga': 'Transaction Instance',
  'c7ncd.saga-instance.reftype': 'Associated Service Type',
  'c7ncd.saga-instance.refid': 'Associated Service ID',
  'c7ncd.saga-instance.progress': 'Progress',
  'c7ncd.saga-instance.completedCount': 'Finished',
  'c7ncd.saga-instance.failedCount': 'Failed',
  'c7ncd.saga-instance.runningCount': 'Pending',
  'c7ncd.saga-instance.waitToBePulledCount': 'Ongoing',

  'c7ncd.saga-instance.overview': 'Overview of Transaction Instance Status',
  'c7ncd.saga-instance.code': 'Overview of Instance Status',
  'c7ncd.saga-instance.saga.instance': 'Transaction Instance',
  'c7ncd.saga-instance.saga.instance.id': 'ID',
  'c7ncd.saga-instance.saga.instance.sagaCode': '所属事务定义',
  'c7ncd.saga-instance.saga.instance.description': 'Description',
  'c7ncd.saga-instance.saga.instance.service': '所属微服务',
  'c7ncd.saga-instance.saga.instance.level': '触发层级',
  'c7ncd.saga-instance.saga.instance.level.site': 'Site Level',
  'c7ncd.saga-instance.saga.instance.level.project': 'Project Level',
  'c7ncd.saga-instance.saga.instance.level.organization': 'Orgnization Level',
  'c7ncd.saga-instance.task.retry-count': 'Retry Count',
};

export { SAGA_INSTANCE };
