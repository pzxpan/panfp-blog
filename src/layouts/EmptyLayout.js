import React from 'react';
import { Layout } from 'antd';
import MainFooter from './Footer.js';

const { Content } = Layout;

function EmptyLayout({ children }) {
  return (
    <React.Fragment>
      <Layout>
          <Content>
            {children}
          </Content>
          <MainFooter/>
      </Layout>
    </React.Fragment>);
}

export default EmptyLayout;
