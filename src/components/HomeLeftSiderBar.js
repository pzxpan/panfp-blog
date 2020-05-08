import { Card, Menu, Divider } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Context } from './../layouts/BasicLayout';


function HomeLeftSiderBar({ category_id }) {
  const AppContext = useContext(Context);
  const dispatch = useDispatch();
  const [subCategories, setSubCategories] = useState([]);
  const [show, setShow] = useState(true);
  useEffect(() => {
    // setShow(true);
    dispatch({
      type: 'article/recommendCategory',
      callback: (categories) => {
        setSubCategories(categories);
      },
    });
  }, []);

  function onClickItem(e) {
    AppContext.dispatch({
      type: 'UPDATE_CATEGORY',
      payload: { value: e.key },
    });
  }

  return (
    <div>
      {show &&
      <Card
        size="small"
        bordered={false}
        bodyStyle={{ padding: 0 }}>
        <div>
          <Divider orientation="left">
            <small>推荐</small>
          </Divider>
          <Menu className="mbb-1 br-0" onClick={onClickItem}>
            {subCategories && subCategories.map((item) => {
              return (
                <Menu.Item key={item.category_id}>
                  {item.name}
                </Menu.Item>
              );
            })}
          </Menu>
        </div>
      </Card>}
    </div>
  );
}

export default HomeLeftSiderBar;
