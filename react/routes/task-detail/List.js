import React, { useContext, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { Modal, Table, Button } from 'choerodon-ui/pro';
import { FormattedMessage } from 'react-intl';
import {
  Content, Header, Page, Breadcrumb, Permission, Action, axios, StatusTag, Choerodon, HeaderButtons,
} from '@choerodon/boot';
import { useDebounceFn } from 'ahooks';
import './List.less';
import '../../common/ConfirmModal.less';
import MouseOverWrapper from '../../components/mouseOverWrapper';

import Store, { StoreProvider } from './stores';
import Create from './create';
import Detail from './detail';
import Executable from './executable-program';

// 页面权限
function getPermission(AppState) {
  const { type } = AppState.currentMenuType;
  let methodService = ['choerodon.code.site.manager.task-detail.ps.schedules-methods'];
  let normalService = ['choerodon.code.site.manager.task-detail.ps.default'];
  let createService = ['choerodon.code.site.manager.task-detail.ps.create'];
  let enableService = ['choerodon.code.site.manager.task-detail.ps.enabled'];
  let disableService = ['choerodon.code.site.manager.task-detail.ps.disabled'];
  let deleteService = ['choerodon.code.site.manager.task-detail.ps.delete'];
  let detailService = ['choerodon.code.site.manager.task-detail.ps.task-detail'];
  if (type === 'organization') {
    methodService = ['choerodon.code.organization.manager.task.ps.methods'];
    normalService = ['choerodon.code.organization.manager.task.ps.default'];
    createService = ['choerodon.code.organization.manager.task.ps.create'];
    enableService = ['choerodon.code.organization.manager.task.ps.enabled'];
    disableService = ['choerodon.code.organization.manager.task.ps.disabled'];
    deleteService = ['choerodon.code.organization.manager.task.ps.delete'];
    detailService = ['choerodon.code.organization.manager.task.ps.detail'];
  } else if (type === 'project') {
    createService = ['asgard-service.schedule-task-project.create'];
    enableService = ['asgard-service.schedule-task-project.enable'];
    disableService = ['asgard-service.schedule-task-project.disable'];
    deleteService = ['asgard-service.schedule-task-project.delete'];
    detailService = ['asgard-service.schedule-task-project.getTaskDetail'];
  }
  return {
    methodService,
    createService,
    enableService,
    disableService,
    deleteService,
    detailService,
    normalService,
  };
}
const { Column } = Table;
const List = observer(() => {
  const {
    AppState, intl, intlPrefix, taskDataSet, taskdetail, levelType, formatClient,
  } = useContext(Store);

  const { run } = useDebounceFn(
    (func) => {
      func();
    },
    {
      wait: 500,
    },
  );

  const {
    deleteService, detailService, createService, disableService, enableService,
    normalService, methodService,
  } = getPermission(AppState);
  function getLevelType(type, id) {
    return (type === 'site' ? '' : `/${type}s/${id}`);
  }
  /**
   * 启停用任务
   * @param record 表格行数据
   */
  const handleAble = (record) => {
    const id = record.get('id');
    const objectVersionNumber = record.get('objectVersionNumber');
    const status = record.get('status') === 'ENABLE' ? 'disable' : 'enable';

    axios.put(`/hagd/v1/schedules${getLevelType(taskdetail.type, taskdetail.id)}/tasks/${id}/${status}?objectVersionNumber=${objectVersionNumber}`).then((data) => {
      if (data.failed) {
        Choerodon.prompt(data.message);
      } else {
        Choerodon.prompt(intl.formatMessage({ id: `${status}.success` }));
        taskDataSet.query();
      }
    }).catch(() => {
      Choerodon.prompt(intl.formatMessage({ id: `${status}.error` }));
    });
  };
  /**
   * 渲染任务明细列表启停用按钮
   * @param record 表格行数据
   * @returns {*}
   */
  function showActionButton(record) {
    const status = record.get('status');
    if (status === 'ENABLE') {
      return [{
        service: disableService,
        action: handleAble.bind(this, record),
        text: <FormattedMessage id="boot.stop" />,
      }];
    } if (status === 'DISABLE') {
      return [{
        service: enableService,
        action: handleAble.bind(this, record),
        text: <FormattedMessage id="boot.enable" />,
      }];
    }
    return [];
  }

  const handleCreateOk = () => {
    taskDataSet.query();
  };
  /**
   * 删除任务
   * @param record 表格行数据
   */
  const handleDelete = (record) => {
    const { type, id } = taskdetail;
    Modal.confirm({
      className: 'c7n-iam-confirm-modal',
      title: intl.formatMessage({ id: `${intlPrefix}.delete.title` }),
      children: intl.formatMessage({ id: `${intlPrefix}.delete.content` }, { name: record.get('name') }),

      onOk: () => axios.delete(`/hagd/v1/schedules${getLevelType(type, id)}/tasks/${record.get('id')}`).then(({ failed, message }) => {
        if (failed) {
          Choerodon.prompt(message);
        } else {
          Choerodon.prompt(intl.formatMessage({ id: 'delete.success' }));
          taskDataSet.query();
        }
      }).catch(() => {
        Choerodon.prompt(intl.formatMessage({ id: 'delete.error' }));
      }),
    });
  };

  function createTask() {
    Modal.open({
      title: <FormattedMessage id={`${intlPrefix}.create`} />,
      drawer: true,
      style: {
        width: 'calc(100% - 3.52rem)',
      },
      className: 'c7n-task-create',
      okText: '保存',
      children: <Create onOk={handleCreateOk} />,
    });
  }

  function openExecutableProgram() {
    Modal.open({
      title: '可执行程序',
      drawer: true,
      style: {
        width: 'calc(100% - 3.52rem)',
      },
      okText: '关闭',
      okCancel: false,
      children: <Executable />,
    });
  }

  /**
   * 开启侧边栏
   * @param selectType create/detail
   * @param record 列表行数据
   */
  const openDetail = async (record) => {
    const id = record.get('id');
    const info = await axios.get(`/hagd/v1/schedules${levelType}/tasks/${id}`);
    Modal.open({
      drawer: true,
      style: {
        width: 'calc(100% - 3.52rem)',
      },
      className: 'c7n-task-detail-sidebar',
      title: <FormattedMessage id={`${intlPrefix}.detail.header.title`} />,
      children: <Detail info={info} taskId={id} />,
      footer: (okBtn) => okBtn,
      okText: <FormattedMessage id="close" />,
    });
  };

  const renderName = ({ text, record }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <MouseOverWrapper text={text} width={0.2}>
        <Permission service={detailService} noAccessChildren={text}>
          <span
            className="c7n-asgard-table-cell-click"
            onClick={() => run(() => openDetail(record))}
            role="none"
          >
            {text}
          </span>
        </Permission>
      </MouseOverWrapper>
      <Action
        style={{ marginLeft: 'auto', flexShrink: 0, color: 'rgb(83, 101, 234)' }}
        data={[
          ...showActionButton(record),
          {
            service: deleteService,
            action: handleDelete.bind(this, record),
            text: <FormattedMessage id="boot.delete" />,
          }]}
      />
    </div>
  );
  const renderStatus = ({ text: status }) => (
    <StatusTag
      name={intl.formatMessage({ id: status.toLowerCase() })}
      colorCode={status}
    />
  );

  return (
    <Page service={normalService}>
      <Header>
        <HeaderButtons
          items={[{
            permissions: createService,
            name: formatClient({ id: 'create' }),
            icon: 'playlist_add',
            handler: createTask,
            display: true,
          }, {
            permissions: methodService,
            name: formatClient({ id: 'executableProgram' }),
            icon: 'running',
            handler: openExecutableProgram,
            display: true,
          }]}
          showClassName={false}
        />
      </Header>
      <Breadcrumb />
      <Content>
        <Table
          dataSet={taskDataSet}
        >
          <Column name="name" renderer={renderName} />
          <Column
            name="description"
            tooltip="overflow"
          />
          <Column name="lastExecTime" className="c7n-asgard-table-cell" />
          <Column name="nextExecTime" className="c7n-asgard-table-cell" />
          <Column name="status" renderer={renderStatus} width={100} />
        </Table>
      </Content>
    </Page>
  );
});
export default (props) => (
  <StoreProvider {...props}>
    <List />
  </StoreProvider>
);
