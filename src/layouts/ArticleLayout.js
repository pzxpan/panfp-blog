import React from 'react';
import { Layout } from 'antd';
import ArticleHeader from './ArticleHeader';
import MainFooter from './Footer.js';
const { Content } = Layout;
function ArticleLayout({ children }) {
  return (
    <React.Fragment>
      <Layout>
          <ArticleHeader/>
          <Content>
            {children}
          </Content>
          <MainFooter/>
      </Layout>
    </React.Fragment>);
}

export default ArticleLayout;
