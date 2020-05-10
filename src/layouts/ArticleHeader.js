import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Layout, Menu } from 'antd';
import Link from 'umi/link';
import UserAvatar from '../components/common/UserAvatar';
import storageHelper from '../utils/storage';
import './HeaderFooter.less';
import logo from '@/assets/logo.svg';

const { Header } = Layout;
const { SubMenu } = Menu;


function ArticleHeader() {
  const user = storageHelper.get('web_user');
  const [isLogin, setLogin] = useState(user && user.user_id);
  const dispatch = useDispatch();

  function logout() {
    dispatch({
      type: 'user/clearUser',
      payload: { user_id: parseInt(user.user_id) },
      callback: (res) => {
        setLogin(false);
      },
    });
    storageHelper.clear('web_user');
    setLogin(false);
  }

  return (
    <Header className="main-header">
      <Link to="/" className="brand">
        <Link to="/" className="brand">
          <img src={logo} width="53px" height="53px"/>
        </Link>
      </Link>
      <div className="desc">不止于技术，还有生活</div>
      <div className="main-header-right">
        {isLogin
          ? (<div>
            <span>{user.nick_name}</span>
            <Menu mode="horizontal">
              <SubMenu
                title={
                  <UserAvatar src={user.avatar}/>}>
                <Menu.Item key="setting:1"><Link to="/article/editor">写文章</Link></Menu.Item>
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

export default ArticleHeader;
