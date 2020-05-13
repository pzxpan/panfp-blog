import React from 'react';
import { Layout } from 'antd';
import Header from './Header';
import MainFooter from './Footer.js';
const { Content } = Layout;
function UserLayout({ children }) {
  return (
    <React.Fragment>
      <Layout>
        <Header/>
        <Content>
          {children}
        </Content>
        <MainFooter/>
      </Layout>
    </React.Fragment>);
}

export default UserLayout;
