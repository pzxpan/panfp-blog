import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, List, Row, Card, Icon, message} from 'antd';
import { ThumbsUp, MessageSquare } from 'react-feather';
import Link from 'umi/link';
import moment from 'moment';
import marked from 'marked';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import rust from 'highlight.js/lib/languages/rust';
import json from 'highlight.js/lib/languages/json';
import sql from 'highlight.js/lib/languages/sql';
import nginx from 'highlight.js/lib/languages/nginx';

import UserAvatar from '../../components/common/UserAvatar';
import AddComment from '../../components/AddComment';
import './article.less';
import './markdown-github.css';
import 'highlight.js/styles/github.css';
import 'highlight.js/styles/atom-one-dark.css';
import storageHelper from '../../utils/storage';
import replaceWithKatex from '../../utils/katextext';

hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('python', python);
hljs.registerLanguage('rust', rust);
hljs.registerLanguage('json', json);
hljs.registerLanguage('sql', sql);
hljs.registerLanguage('nginx', nginx);

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  headerPrefix: 'pan',
  highlight(code) {
    return hljs.highlightAuto(code).value;
  },
});

const createMarkup = (body) => {
  return { __html: replaceWithKatex(body) };
}
function Article({ match }) {
  const user = storageHelper.get('web_user');
  const dispatch = useDispatch();
  const { params: { id } } = match;
  const [detail, setDetail] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [userArticles, setUserArticles] = useState([]);
  const [commentList, setCommentList] = useState([]);
  const [isLike, setLike] = useState(false);

  function handleLike(e) {
    if (user && user.user_id) {
      if (!isLike) {
        dispatch({
          type: 'article/addLike',
          payload: {
            user_id: user.user_id,
            article_id: parseInt(id),
          },
          callback: (isLike) => {
            setLike(true);
          },
        });
      } else {
        dispatch({
          type: 'article/cancelLike',
          payload: {
            user_id: user.user_id,
            article_id: parseInt(id),
          },
          callback: (isLike) => {
            setLike(false);
          },
        });
      }
    } else {
      message.success('请先登录');
    }
  }

  useEffect(() => {
    dispatch({
      type: 'article/articleDetail',
      payload: {
        article_id: parseInt(id),
      },
      callback: (res) => {
        setDetail(res);
        dispatch({
          type: 'user/detailUser',
          payload: {
            user_id: parseInt(res.user_id),
          },
          callback: (user) => {
            setUserDetail(user);
          },
        });
        dispatch({
          type: 'article/userArticles',
          payload: {
            user_id: parseInt(res.user_id),
          },
          callback: (userArticles) => {
            setUserArticles(userArticles);
          },
        });
      },
    });
    dispatch({
      type: 'article/commentList',
      payload: {
        article_id: parseInt(id),
      },
      callback: (commentList) => {
        setCommentList(commentList);
      },
    });
    dispatch({
      type: 'article/addArticleView',
      payload: {
        article_id: parseInt(id),
      },
    });
    dispatch({
      type: 'article/articleListHot',
    });
    if (user) {
      dispatch({
        type: 'article/isLike',
        payload: {
          user_id: user.user_id,
          article_id: parseInt(id),
        },
        callback: (id) => {
          setLike(id > 0);
        },
      });
    }
  }, []);

  useEffect(() => {
    dispatch({
      type: 'article/articleDetail',
      payload: {
        article_id: parseInt(id),
      },
      callback: (res) => {
        setDetail(res);
      },
    });
  }, [isLike]);


  return (
    <div style={{ marginTop: '1.5rem' }}>
      <Row type="flex" justify="center">
        <Col md={16} sm={20} xs={23}>
          <Row type="flex" justify="space-around">
            <Col lg={17} sm={22} xs={24}>
              {detail &&
              <Card
                bordered={false}
                style={{ padding: '1rem' }}>
                <div className="article-content-main">
                  <div className="py-3">
                    <div className="mmb-1"
                         style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {userDetail && <div style={{ display: 'flex' }}>
                        <UserAvatar src={userDetail.avatar}/>
                        <div className="pl-3">
                          <h4 style={{ marginBottom: 0, fontWeight: 700 }}>
                            {userDetail.nick_name}
                          </h4>
                          <small>
                            {moment(detail.date).format('LL')}
                            <span style={{ marginLeft: 10 }}>{detail.view_count}浏览</span>
                          </small>
                        </div>
                      </div>
                      }
                    </div>
                    <h2 className="my-4" style={{ fontWeight: 700 }}>{detail.title}</h2>
                    <div
                      className="markdown-body"
                      dangerouslySetInnerHTML={createMarkup(detail.content_html || '')} />
                  </div>
                </div>
              </Card>
              }
              <Card
                title="评论"
                bordered={false}
                style={{ marginTop: 20, marginBottom: 20 }}>
                <AddComment article_id={id} user={user}/>
              </Card>
            </Col>
            <Col lg={6} sm={0} xs={0}>
              <Card
                title="关于作者"
                bordered={false}
                size="small"
              > {userDetail &&
              <div style={{ display: 'flex', marginBottom: 20 }}>
                { <UserAvatar src={userDetail.avatar}/> }
                <div className="pl-3">
                  <h5>{userDetail.nick_name}</h5>
                  <h6> {userDetail.email}</h6>
                  <h6>{'等级:' + userDetail.level}</h6>
                  <h6> {'专业:' + userDetail.profession}</h6>
                </div>
              </div>
              }
              </Card>
              <Card
                title="相关文章"
                size="small"
                bordered={false}
                style={{ marginTop: 20 }}>
                <List
                  itemLayout="vertical"
                  dataSource={userArticles}
                  bordered={false}
                  size="small"
                  split={false}
                  renderItem={item => (
                    <List.Item
                      actions={[
                        <span>
                            <Icon
                              type="eye"
                              theme="outlined"/>
                            <span style={{ paddingLeft: 2, cursor: 'auto' }}>{item.view_count}</span>
                          </span>,
                      ]}>
                      <Link to={`/article/${item.article_id}`} target="_block"
                            style={{ color: '#000000a6' }}>{item.title}</Link>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
          {<div className="article-panel">
            <div className="article-panel-item">
              <div className="article-panel-icon" onClick={handleLike}>
                <ThumbsUp color={isLike ? '#007bff' : '#ccc'}/>
              </div>
              <div className="article-panel-count">
                <span>{detail && detail.like_count}</span>
              </div>
            </div>
            <div className="article-panel-item">
              <div className="article-panel-icon">
                <MessageSquare color="#ccc"/>
              </div>
              <div className="article-panel-count">
                <span>{detail && detail.comment_count}</span>
              </div>
            </div>
          </div>}
        </Col>
      </Row>
    </div>
  );
}

export default Article;
