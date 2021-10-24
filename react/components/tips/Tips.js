import React, { Fragment } from 'react';
import { injectIntl, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Popover, Icon } from 'choerodon-ui';
import './Tips.less';

function Tips(props) {
  const {
    type,
    data,
    intl,
  } = props;
  return (
    <>
      {type === 'title' && (
        <div className="c7n-iam-table-title-tip">
          <FormattedMessage id={data} />
          <Popover
            content={<FormattedMessage id={`${data}.tip`} />}
            overlayClassName="c7n-iam-tips-popover"
            arrowPointAtCenter
          >
            <Icon type="help" />
          </Popover>
        </div>
      )}
      {type === 'form' && (
        <Popover
          content={<>{intl.formatMessage({ id: data }).split('\n').map((v) => <div key={v}>{v}</div>)}</>}
          overlayClassName="c7n-iam-tips-popover"
          placement="topRight"
          arrowPointAtCenter
        >
          <Icon type="help c7n-iam-select-tip" />
        </Popover>
      )}
    </>
  );
}

Tips.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
};

export default injectIntl(Tips);
