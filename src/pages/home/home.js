import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Empty, Row, Col } from 'antd';
import HomeLeftSiderBar from '../../components/HomeLeftSiderBar';
import SiderList from '../../components/SiderList';
import HomeArticleList from '../../components/HomeArticleList';
import { Context } from './../../layouts/BasicLayout';
import './home.less';

function Home() {
  const dispatch = useDispatch();
  const [articleList, setArticleList] = useState([]);
  const [hotList, setHotList] = useState([]);
  const AppContext = useContext(Context);
  useEffect(() => {
    dispatch({
      type: 'article/articleList',
      payload: {
        category_id: parseInt(AppContext.state.value),
      },
      callback: (list) => {
        setArticleList(list);
      },
    });
    dispatch({
      type: 'article/articleListHot',
      payload: {
        category_id: parseInt(AppContext.state.value) > 10 ? Math.round(parseInt(AppContext.state.value) / 10) : parseInt(AppContext.state.value),
      },
      callback: (list) => {
        setHotList(list);
      },
    });
  }, []);
  useEffect(() => {
    dispatch({
      type: 'article/articleList',
      payload: {
        category_id: parseInt(AppContext.state.value),
      },
      callback: (list) => {
        setArticleList(list);
      },
    });
    dispatch({
      type: 'article/articleListHot',
      payload: {
        category_id: parseInt(AppContext.state.value) > 10 ? Math.round(parseInt(AppContext.state.value) / 10) : parseInt(AppContext.state.value),
      },
      callback: (list) => {
        setHotList(list);
      },
    });
  }, [AppContext.state.value]);
  return (
    <div style={{ padding: '1.5rem' }}>
      <Row type="flex" justify="center">
        <Col md={19} sm={20} xs={24}>
          <Row type="flex" justify="space-between">
            <Col lg={3} sm={7} xs={0}>
              <HomeLeftSiderBar
                category_id={1}/>
            </Col>
            <Col lg={16} sm={16} xs={24}>
              <Card
                bordered={false}>
                {articleList ? (
                  <HomeArticleList
                    data={articleList}/>) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}
              </Card>
            </Col>
            <Col lg={4} sm={0} xs={0}>
              <Card
                size="small"
                bordered={false}
                title="热门文章">
                <SiderList
                  dataSource={hotList}
                  bordered={false}
                  size="small"
                  split={false}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
