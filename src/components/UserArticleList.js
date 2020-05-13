import React from 'react';
import { Timeline, Icon, Tooltip } from 'antd';
import Link from 'umi/link';
import moment from 'moment';
import UserAvatar from './common/UserAvatar';

moment.locale('zh-cn');

function UserArticleList({ data }) {
  return (
    <>
      <Timeline className="mp-1">
        {data.map(item => (
          <Timeline.Item
            key={item.article_id}>
            <div className="mml-15">
              <Link to={`/article/editor/${item.article_id}`} target="_block">
                <h3 className="fw-700 ft-16">
                  {item.title}
                </h3>
              </Link>
              <div className="mtb-10 ft-13">{item.intro}</div>
              <div className="ft-13">
              <span>
                <Tooltip>{moment(item.date).fromNow()} &nbsp;&nbsp; </Tooltip>
              </span>
                <span>
                <Icon
                  type="like"
                  theme="outlined"/>
                <span className="pointer pl-5">{item.like_count}</span>
              </span>
                <span className="ml-10">
                <Icon
                  type="eye"
                  theme="outlined"/>
                <span className="pointer pl-5">{item.view_count}</span>
              </span>
                <span className="ml-10">
                <Icon
                  type="message"
                  theme="outlined"/>
                <span className="pointer pl-5">{item.comment_count}</span>
              </span>
              </div>
            </div>
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
}

export default UserArticleList;
