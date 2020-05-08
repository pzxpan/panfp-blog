import React, { useEffect, useState, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Layout, Menu } from 'antd';
import Link from 'umi/link';
import UserAvatar from '../components/common/UserAvatar';
import storageHelper from '../utils/storage';
import './HeaderFooter.less';
import { isPC } from '../utils/platform';
import { Context } from './BasicLayout';
import logo from '../assets/logo.svg';

const { Header } = Layout;
const { SubMenu } = Menu;

function MainHeader() {
  const user = storageHelper.get('web_user');
  const dismenu = useDispatch();
  const AppContext = useContext(Context);

  const [tabs, setTabs] = useState([]);
  const [isLogin, setLogin] = useState(user && user.user_id);

  useEffect(() => {
    dismenu({
      type: 'article/all_header_categories',
      payload: {
        category_id: 0,
      },
      callback: (categories) => {
        setTabs(categories);
      },
    });
  }, []);

  function logout() {
    dismenu({
      type: 'user/clearUser',
      payload: { user_id: parseInt(user.user_id) },
      callback: (res) => {
        setLogin(false);
      },
    });
    storageHelper.clear('web_user');
    setLogin(false);
  }

  function handleMenuClick(e) {
    AppContext.dispatch({
      type: 'UPDATE_CATEGORY',
      payload: { value: e.key },
    });
  }

  return (
    <Header className="main-header">
      <div className="main-header-left">
        <Link to="/" className="brand">
          <img src={logo} width="53px" height="53px"/>
        </Link>
        {isPC() && tabs &&
        <Menu mode="horizontal">
          {tabs && tabs[0] &&
          <SubMenu key={tabs[0].category_id} title={tabs[0].name} onClick={handleMenuClick}>
            {tabs[0].subcategory.map(sub => {
              return (
                <Menu.Item key={sub.category_id} onClick={handleMenuClick}>{sub.name}</Menu.Item>);
            })}
          </SubMenu>}
          {tabs && tabs[1] &&
          <SubMenu key={tabs[1].category_id} title={tabs[1].name} onClick={handleMenuClick}>
            {tabs[1].subcategory.map(sub => {
              return (
                <Menu.Item key={sub.category_id} onClick={handleMenuClick}>{sub.name}</Menu.Item>);
            })}
          </SubMenu>
          }
          {tabs && tabs[2] &&
          <SubMenu key={tabs[2].category_id} title={tabs[2].name} onClick={handleMenuClick}>
            {tabs[2].subcategory.map(sub => {
              return (
                <Menu.Item key={sub.category_id} onClick={handleMenuClick}>{sub.name}</Menu.Item>);
            })}
          </SubMenu>
          }
        </Menu>}
      </div>

      <div className="main-header-right">
        {isLogin
          ? (<div>
            <span>{user.nick_name}</span>
            <Menu mode="horizontal">
              <SubMenu
                title={
                  <UserAvatar src={user.avatar}/>}>
                <Menu.Item key="setting:1">写文章</Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="setting:6" onClick={logout}>退出</Menu.Item>
              </SubMenu>
            </Menu>
          </div>)
          : (<span>
                  <Link to="/user/login">登录</Link>
                </span>)
        }
      </div>
    </Header>
  );
}

export default MainHeader;
