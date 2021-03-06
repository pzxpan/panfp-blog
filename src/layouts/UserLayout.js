import React from 'react';
import { Layout } from 'antd';
import UserHeader from './UserHeader';
import MainFooter from './Footer.js';
const { Content } = Layout;
function UserLayout({ children }) {
  return (
    <React.Fragment>
      <Layout>
        <UserHeader/>
        <Content>
          {children}
        </Content>
        <MainFooter/>
      </Layout>
    </React.Fragment>);
}

export default UserLayout;
