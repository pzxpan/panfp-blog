import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Empty, Row, Col } from 'antd';
import UserArticleList from '../../components/UserArticleList';
import storageHelper from '@/utils/storage';

function MyArticle() {
  const user = storageHelper.get('web_user');
  const dispatch = useDispatch();
  const [articleList, setArticleList] = useState([]);
  // // const [hotList, setHotList] = useState([]);
  // // const AppContext = useContext(Context);
  useEffect(() => {
    dispatch({
      type: 'article/userArticles',
      payload: {
        user_id: user.user_id
      },
      callback: (list) => {
        setArticleList(list);
      },
    });
  },[]);
  //   dispatch({
  //     type: 'article/articleListHot',
  //     payload: {
  //       category_id: parseInt(AppContext.state.value) > 10 ? Math.round(parseInt(AppContext.state.value) / 10) : parseInt(AppContext.state.value),
  //     },
  //     callback: (list) => {
  //       setHotList(list);
  //     },
  //   });
  // }, []);
  // useEffect(() => {
  //   dispatch({
  //     type: 'article/articleList',
  //     payload: {
  //       category_id: parseInt(AppContext.state.value),
  //     },
  //     callback: (list) => {
  //       setArticleList(list);
  //     },
  //   });
  //   dispatch({
  //     type: 'article/articleListHot',
  //     payload: {
  //       category_id: parseInt(AppContext.state.value) > 10 ? Math.round(parseInt(AppContext.state.value) / 10) : parseInt(AppContext.state.value),
  //     },
  //     callback: (list) => {
  //       setHotList(list);
  //     },
  //   });
  // }, [AppContext.state.value]);
  return (
    <div style={{ padding: '1.5rem' }}>
      <Row type="flex" justify="center">
        <Col md={19} sm={20} xs={24}>
          <Row type="flex" justify="space-between">
            <Col lg={16} sm={16} xs={24}>
              <Card
                bordered={false}>
                {articleList ? (
                  <UserArticleList
                    data={articleList}/>) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default MyArticle;
