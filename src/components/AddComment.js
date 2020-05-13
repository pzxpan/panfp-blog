import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Comment, Input, Button, Tooltip, List, message } from 'antd';
import moment from 'moment';
import Link from 'umi/link';
import UserAvatar from './common/UserAvatar';
import storageHelper from '../utils/storage';

import './styles/Comment.less';

moment.locale('zh-cn');

const Datetime = ({ time }) => {
  return (
    <Tooltip
      title={time}>
        <span>
          {moment(time).fromNow()}
        </span>
    </Tooltip>
  );
};

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <div style={{ marginBottom: 10 }}>
      <Input.TextArea rows={2} onChange={onChange} value={value}/>
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
      <div style={{ opacity: 0 }}><span>表情</span></div>
      <div>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          评论
        </Button>
      </div>
    </div>
  </div>
);

function AddComment({ article_id }) {
  const user = storageHelper.get('web_user');
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    dispatch({
      type: 'article/userCommentList',
      payload: {
        article_id: parseInt(article_id),
      },
      callback: (commentList) => {
        setCommentList(commentList);
      },
    });
  }, []);

  function handleChange(e) {
    setContent(e.target.value);
  }

  function handleSubmit() {
    if (content && user) {
      dispatch({
        type: 'article/addComment',
        payload: {
          content,
          article_id: parseInt(article_id),
          user_id: parseInt(user.user_id),
        },
        callback: (res) => {
          message.success('评论添加成功');
          dispatch({
            type: 'article/commentList',
            payload: {
              article_id: parseInt(article_id),
            },
            callback: (commentList) => {
              setCommentList(commentList);
            },
          });
        },
      });
    }
  }

  return (
    <>
      <Comment
        avatar={
          user && user.user_id && <UserAvatar src={user.avatar}/>}
        content={
          user && user.user_id
            ? (
              <Editor
                onChange={handleChange}
                onSubmit={handleSubmit}
                value={content}
              />
            )
            : (
              <Link to="/user/login">登录后可评论</Link>
            )
        }
      />
      <List
        className="comment-list"
        itemLayout="horizontal"
        split={false}
        dataSource={commentList}
        renderItem={item => (
          <List.Item>
            <Comment
              author={item.nick_name}
              content={<p>{item.content}</p>}
              datetime={<Datetime time={item.date}/>}
            />
          </List.Item>
        )}
      />,
    </>);
}

export default AddComment;

