import React from 'react';
import { List, Icon } from 'antd';
import Link from 'umi/link';
function SiderList({ dataSource, bordered, size, split }) {
  return (
    <List
      itemLayout="vertical"
      dataSource={dataSource}
      bordered={bordered}
      size={size}
      split={split}
      renderItem={item => (
        <List.Item
          actions={[
            <span>
            <Icon
              type="eye"
              theme="outlined"/>
            <span className="pl-5 pointer">{item.view_num}</span>
          </span>,
          ]}>
          <Link to={`/article/${item.article_id}`} style={{ color: '#000000a6' }} target="_block">{item.title}</Link>
        </List.Item>
      )}
    />
  );
}

export default SiderList;
